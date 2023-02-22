import './App.css';
import SearchInput from './components/SearchInput';
import { searchSpaces } from './service/search';

function App() {
  return (
    <div className="App">
      <SearchInput searchFn={searchSpaces} />
    </div>
  );
}

export default App;
