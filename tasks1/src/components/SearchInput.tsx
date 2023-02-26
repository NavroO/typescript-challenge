import { useState, useEffect } from "react";
import { delay } from "../helpers/delay";
import { Results, SearchFn } from "../types/types";

type SearchInputProps<T> = {
  searchFn: SearchFn<T>;
  renderResult?: (data: T[]) => JSX.Element;
};

const SearchInput = <T,>({ searchFn, renderResult }: SearchInputProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Results<T>>({ data: [] });

  const handleSearch = async (text: string) => {
    try {
      await delay(500);
      const searchResults = await searchFn(text);
      setResults(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {renderResult && results.data && renderResult(results.data)}
    </div>
  );
};


export default SearchInput;