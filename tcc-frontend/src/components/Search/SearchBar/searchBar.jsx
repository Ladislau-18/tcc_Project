
import './searchBar.css';
import { SearchIcon } from '../../../assets/icons';

function SearchBar ({ query, setQuery, onSearch }){

    //função para permitir apenas letras
    const validateLetters = (value) => {
        // Regex para apenas letras
        return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    };

    const handleInputChange = (e) => {
        const validatedValue = validateLetters(e.target.value);
        setQuery(validatedValue); // Atualiza o estado global com o valor limpo
    };


    return (
        <div className="searchMain">
            <div className="searchContainer">
                <div className="divIcon">
                    <SearchIcon  />
                </div>
                <input 
                    type="text" 
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Busque por projeto ou aluno..." 
                    className='imputSearchP'
                />
        
            </div>
        </div>
    );
}
export default SearchBar;