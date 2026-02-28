
import './searchBar.css';


function SearchBar ({ query, setQuery, onSearch }){


    return (
        <div className="searchMain">
            <div className="searchContainer">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pesquisar por título ou autor..." 
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