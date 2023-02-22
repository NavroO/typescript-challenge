import { useState, useEffect} from "react";

type Results = {
  spaces?: Space[];
  addresses?: Address[];
};

type Space = {
  name: string;
};

type Address = {
  address: string;
};

type SearchFn = (searchText: string) => Promise<Results>;

interface SearchInputProps {
  searchFn: SearchFn;
}

const SearchInput = ({ searchFn }: SearchInputProps) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Results>({});

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
      {results.spaces && (
        <ul>
          {results.spaces.map((space: Space) => (
            <li key={space.name}>{space.name}</li>
          ))}
        </ul>
      )}
      {results.addresses && (
        <ul>
          {results.addresses.map((address: Address) => (
            <li key={address.address}>{address.address}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
