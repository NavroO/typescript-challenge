import { useState, useEffect } from "react";

type Results<T> = {
  data?: T[];
};

interface SearchFn<T> {
  (searchText: string): Promise<Results<T>>;
}

interface SearchInputProps<T> {
  searchFn: SearchFn<T>;
  renderResult: (item: T) => JSX.Element;
}

const SearchInput = <T,>({ searchFn, renderResult }: SearchInputProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Results<T>>({});

  const handleSearch = async (text: string) => {
    try {
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
      {results.data && (
        <ul>
          {results.data.map((item: T) => (
            <li key={JSON.stringify(item)}>{renderResult(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;