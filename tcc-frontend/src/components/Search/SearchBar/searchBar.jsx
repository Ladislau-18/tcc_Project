
import './searchBar.css';
import { SearchIcon } from '../../../assets/icons';

function SearchBar ({ query, setQuery, onSearch }){


    return (
        <div className="searchMain">
            <div className="searchContainer">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busque por aluno, projeto, ou ano..." 
                    className='imputSearchP'
                />
                
                <div className="divBtn">
                    <button onClick={onSearch} className="btnSearch">
                        Pesquisar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SearchBar;