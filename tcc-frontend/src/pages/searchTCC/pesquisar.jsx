import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";
import toast from "react-hot-toast";
import DeleteModal from "../../components/common/divConfirmDelete";
import ModalDetailsTcc from "../../components/Modal/ModalDetalhesTcc"; 

import "./pesquisa.css"

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

    // Abrir a confirmação de exclusão
    const confirmarExclusao = (tcc) => {
        setTccSelecionado(tcc);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
        // 1. Pegar o utilizador do sessionStorage (exatamente como fazes na Home)
        const userStorage = sessionStorage.getItem('user');
        console.log("usuário: ", userStorage)
        
        if (!userStorage) {
            toast.error("Sessão expirada. Faça login novamente.");
            return;
        }

        const userObj = JSON.parse(userStorage);
        const userId = userObj.id; // Verifica se o campo no banco/session é idUtilizador

        // 2. Enviar o id do TCC e o userId para o novo delTcc.php
        await axios.delete(`http://localhost/TCC_PROJETO/tcc_back/DeleteTcc/delTcc.php?id=${tccSelecionado.idTcc}&userId=${userId}`);

        // Atualizar o estado da lista
        setResults(prev => prev.filter(item => item.idTcc !== tccSelecionado.idTcc));

        setShowDeleteModal(false);
        setShowDetailsModal(false);
        
        toast.success("Relatório removido com sucesso!");
    } catch (error) {
        // Se o PHP retornar erro, o axios cai aqui. Podes exibir a mensagem vinda do banco:
        const msgErro = error.response?.data?.message || "Erro ao apagar o relatório";
        toast.error(msgErro);
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
        <>  <div className="headerSearch">
                <h1>Pesquisar Relatórios</h1>
                <p><strong>Explore e consulte todos os relatórios do sistema</strong></p>
            </div>
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