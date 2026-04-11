import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";
import toast from "react-hot-toast";
import DeleteModal from "../../components/common/divConfirmDelete";
import ModalDetailsTcc from "../../components/Modal/ModalDetalhesTcc"; 

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estados para os Modais
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [tccSelecionado, setTccSelecionado] = useState(null);

    // Abrir apenas os detalhes
    const visualizarDetalhes = (tcc) => {
        setTccSelecionado(tcc);
        setShowDetailsModal(true);
    };

    // Abrir a confirmação de exclusão (pode ser chamado do card ou de dentro do modal de detalhes)
    const confirmarExclusao = (tcc) => {
        setTccSelecionado(tcc);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost/TCC_PROJETO/tcc_back/DeleteTcc/delTcc.php?id=${tccSelecionado.idTcc}`);

            setResults(prev => prev.filter(item => item.idTcc !== tccSelecionado.idTcc));

            // Fecha ambos para garantir que a tela limpe
            setShowDeleteModal(false);
            setShowDetailsModal(false);
            
            toast.success("Relatório removido com sucesso!");
        } catch (error) {
            toast.error("Erro ao apagar o relatório");
        }
    };

    useEffect(() => {
        const buscarNoAcervo = async () => {
            setLoading(true);
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
                onDetailsClick={visualizarDetalhes} // Nova prop para ver detalhes
                loading={loading} 
                query={query} 
            />

            {/* Modal de Detalhes - Fica por baixo se o de delete abrir */}
            <ModalDetailsTcc
                show={showDetailsModal} 
                tcc={tccSelecionado}
                onClose={() => setShowDetailsModal(false)}
                onDelete={confirmarExclusao} // Chama o delete por cima
                onEdit={(tcc) => console.log("Editar:", tcc)}
            />

            {/* Modal de Confirmação de Exclusão - Z-index deve ser maior */}
            <DeleteModal
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                tccTitulo={tccSelecionado ? tccSelecionado.titulo : ''}
            />
        </>
    );
}

export default SearchPage;