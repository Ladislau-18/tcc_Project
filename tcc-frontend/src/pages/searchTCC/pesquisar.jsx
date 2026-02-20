
import React from "react";
import axios from "axios";
import { useState } from "react";

import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); 

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost/TCC_PROJETO/tcc_back/selects/searchTcc.php?q=${query}`);
            console.log(response.data)
            setResults(response.data);
        } catch (error) {
            console.error("Erro na pesquisa:", error);
        } finally {
            setLoading(false); 
        }
    }; 

    return (
        <>
            <SearchBar 
                query={query} 
                setQuery={setQuery} 
                onSearch={handleSearch} 
            />
            <ShowResult items={results} loading={loading} />
        </>
    );
}

export default SearchPage;