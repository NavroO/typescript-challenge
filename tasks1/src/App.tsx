import './App.css';
import { renderResults } from './components/Results';
import SearchInput from './components/SearchInput';
import { searchSpaces } from './service/search';
import { searchAddresses } from './service/searchAddress';

enum SearchType {
  SPACES = "name",
  ADDRESS = "address"
}

function App() {
  return (
    <div className="App">
      <SearchInput searchFn={searchSpaces} renderResult={(data) => renderResults(data, SearchType.SPACES)} />
    </div>
  );
}

export default App;
