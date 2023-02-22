import { useState, useEffect} from "react";
import { delay } from "../service/helpers/delay";
import { searchSpaces } from "../service/search";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<any>({ addresses: [] });

  const handleSearch = async (text: string) => {
    try {
      const searchResults = await delay(500).then(() => searchSpaces(text));
      console.log(searchResults);
      setResults(searchResults);
      console.log("results: ", results);
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
      <ul>
        {results.spaces.map((space: any) => (
            <li key={space.id}>{space.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
