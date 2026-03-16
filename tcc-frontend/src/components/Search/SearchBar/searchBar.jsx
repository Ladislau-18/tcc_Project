
import './searchBar.css';
import { SearchIcon } from '../../../assets/icons';

function SearchBar ({ query, setQuery, onSearch }){


    return (
        <div className="searchMain">
            <div className="searchContainer">
                <div className="divIcon">
                    <SearchIcon  />
                </div>
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busque por projeto ou aluno..." 
                    className='imputSearchP'
                />
        
            </div>
        </div>
    );
}
export default SearchBar;