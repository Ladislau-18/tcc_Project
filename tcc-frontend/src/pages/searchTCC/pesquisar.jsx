import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";


function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // PASSO 2: Disparar a busca sempre que a 'query' mudar
    useEffect(() => {
    const buscarNoAcervo = async () => {
        setLoading(true); // 1. Primeiro avisamos que estamos a carregar
        
        // Criamos uma promessa que "dorme" por 800ms a 1s 
        // para garantir que o usuário veja a animação
        const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            const timestamp = new Date().getTime();
            const url = query.trim() === "" 
                ? `http://localhost/TCC_PROJETO/tcc_back/selects/listaTCCsRec.php?t=${timestamp}`
                : `http://localhost/TCC_PROJETO/tcc_back/selects/searchTcc.php?q=${query}&t=${timestamp}`;

            const [response] = await Promise.all([
                axios.get(url),
                esperar(1000)
            ]);
            setResults(response.data);
            

        } catch (error) {
            console.error("Erro na busca:", error);
            setResults([]); // Em caso de erro real, limpamos
        } finally {
            setLoading(false); // 3. Só aqui paramos o estado de loading
        }
    };

    const delayDebounceFn = setTimeout(() => {
        buscarNoAcervo();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
}, [query]);

    return (
        <>
            <h1>Pesquisar Relatórios</h1>
            <p><strong>Explore e consulte todos os relatórios do sistema</strong></p>
            <SearchBar 
                query={query} 
                setQuery={setQuery} 
                // O onSearch pode continuar aqui para caso o usuário dê Enter
                onSearch={() => {}} 
            />
            <ShowResult items={results} loading={loading} query={query} />
        </>
    );
}

export default SearchPage;