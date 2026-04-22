import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";
import toast from "react-hot-toast";
import DeleteModal from "../../components/common/divConfirmDelete";
import ModalDetailsTcc from "../../components/Modal/ModalDetalhesTcc";
import ModalEditTcc from "../../components/Modal/ModalEditTcc/EditTcc";

import "./pesquisa.css";

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estados para os Modais
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [tccSelecionado, setTccSelecionado] = useState(null);

    // 1. Função de busca unificada (Reutilizável)
    const executarBusca = useCallback(async () => {
        setLoading(true);
        try {
            const timestamp = new Date().getTime();
            // Verifica se a query está vazia para decidir qual endpoint chamar
            const url = query.trim() === ""
                ? `http://localhost/TCC_PROJETO/tcc_back/selects/listaTCCsRec.php?t=${timestamp}`
                : `http://localhost/TCC_PROJETO/tcc_back/selects/searchTcc.php?q=${query}&t=${timestamp}`;

            const response = await axios.get(url);
            setResults(response.data);
        } catch (error) {
            console.error("Erro na busca:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [query]);

    // 2. useEffect para busca automática com Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            executarBusca();
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [query, executarBusca]);

    // --- AÇÕES DO USUÁRIO ---

    const prepararEdicao = (tcc) => {
        setTccSelecionado(tcc);
        setShowEditModal(true);
        setShowDetailsModal(false);
    };

    const visualizarDetalhes = (tcc) => {
        setTccSelecionado(tcc);
        setShowDetailsModal(true);
    };

    const confirmarExclusao = (tcc) => {
        setTccSelecionado(tcc);
        setShowDeleteModal(true);
    };

    // Função disparada após sucesso no Modal de Edição
    const handleUpdateSuccess = () => {
        setShowEditModal(false);
        executarBusca(); // Atualiza a lista imediatamente
    };

    const handleConfirmDelete = async () => {
        try {
            const userStorage = sessionStorage.getItem('user');
            if (!userStorage) {
                toast.error("Sessão expirada. Faça login novamente.");
                return;
            }

            const userObj = JSON.parse(userStorage);
            const userId = userObj.idUtilizador || userObj.id;

            await axios.delete(`http://localhost/TCC_PROJETO/tcc_back/DeleteTcc/delTcc.php?id=${tccSelecionado.idTcc}&userId=${userId}`);

            // Atualiza o estado local para remover o item da tela instantaneamente
            setResults(prev => prev.filter(item => item.idTcc !== tccSelecionado.idTcc));
            
            setShowDeleteModal(false);
            setShowDetailsModal(false);
            toast.success("Relatório removido com sucesso!");
        } catch (error) {
            const msgErro = error.response?.data?.message || "Erro ao apagar o relatório";
            toast.error(msgErro);
        }
    };

    return (
        <>  
            <div className="headerSearch">
                <h1>Pesquisar Relatórios</h1>
                <p><strong>Explore e consulte todos os relatórios do sistema</strong></p>
            </div>

            <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={() => { /* O useEffect já cuida da busca */ }}
            />

            <ShowResult
                items={results}
                onEdit={prepararEdicao}
                onDeleteClick={confirmarExclusao}
                onDetailsClick={visualizarDetalhes}
                loading={loading}
                query={query}
            />

            {/* Modal de Detalhes */}
            <ModalDetailsTcc
                show={showDetailsModal}
                tcc={tccSelecionado}
                onClose={() => setShowDetailsModal(false)}
                onDelete={confirmarExclusao}
                onEdit={prepararEdicao}
            />

            {/* Modal de Edição */}
            <ModalEditTcc
                show={showEditModal}
                tcc={tccSelecionado} 
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdateSuccess} // Certifique-se que o Modal chama props.onSave()
            />

            {/* Modal de Confirmação de Exclusão */}
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