import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";
import toast from "react-hot-toast";
import DeleteModal from "../../components/common/divConfirmDelete";

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);


    // 1. Crie os estados para o modal
    const [showModal, setShowModal] = useState(false);
    const [tccParaApagar, setTccParaApagar] = useState(null);

    // 2. Função para abrir o modal
    const confirmarExclusao = (tcc) => {
        setTccParaApagar(tcc);
        setShowModal(true);
    };

    // 3. Função que chama o PHP de fato 
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost/TCC_PROJETO/tcc_back/DeleteTcc/delTcc.php?id=${tccParaApagar.idTcc}`);

            // Atualiza a lista na tela removendo o item apagado
            setResults(prev => prev.filter(item => item.idTcc !== tccParaApagar.idTcc));

            setShowModal(false);
            toast.success("Relatório removido!");
        } catch (error) {
            toast.error("Erro ao apagar o relatório");
        }
    };




    //Disparar a busca sempre que a 'query' mudar
    useEffect(() => {
        const buscarNoAcervo = async () => {
            setLoading(true);

            //promisse que espera algum tempo antes de chamar o "ReLoad"
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
                setResults([]);
            } finally {
                setLoading(false);
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
                onSearch={() => { }}
            />
            <ShowResult 
                items={results} 
                onDeleteClick={confirmarExclusao} 
                loading={loading} 
                query={query} />

            <DeleteModal
                show={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                tccTitulo={tccParaApagar ? tccParaApagar.titulo : ''}
            />
        </>
    );
}

export default SearchPage;