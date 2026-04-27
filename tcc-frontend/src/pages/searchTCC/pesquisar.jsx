import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/Search/SearchBar/searchBar";
import ShowResult from "../../components/Search/SearchResult/ShowResult";
import toast from "react-hot-toast";
import DeleteModal from "../../components/common/divConfirmDelete";
import ModalDetailsTcc from "../../components/Modal/ModalDetalhesTcc";
import ModalEditTcc from "../../components/Modal/ModalEditTcc/EditTcc";

import "./pesquisa.css";

function SearchPage() {
    // 1. Estados de Dados e Navegação
    const [tccs, setTccs] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [termoBusca, setTermoBusca] = useState("");
    const [loading, setLoading] = useState(false);

    // 2. Estados para os Modais
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [tccSelecionado, setTccSelecionado] = useState(null);

    // Estados de filtros...
    const [filtros, setFiltros] = useState({
    ano: "",
    curso: "",
    notaMin: 0,
    notaMax: 20
});

    // 3. Lógica Unificada de Busca e Paginação
    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            try {
                // Usamos o timestamp para evitar cache do navegador e garantir dados frescos
                const timestamp = new Date().getTime();
                const url = `http://localhost/TCC_PROJETO/tcc_back/selects/searchTcc.php?` + 
                `page=${pagina}&query=${termoBusca}&` +
                `ano=${filtros.ano}&curso=${filtros.curso}&` +
                `notaMin=${filtros.notaMin}&notaMax=${filtros.notaMax}`;
                
                const res = await fetch(url);
                const data = await res.json();

                console.log("Dados recebidos do PHP:", data);

                if (data.tccs) {
                    setTccs(data.tccs); // Atualiza os cards com os 5 resultados da página
                    setTotalPaginas(data.totalPaginas);
                } else {
                    setTccs([]);
                    setTotalPaginas(0);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                toast.error("Erro ao conectar com o servidor.");
            } finally {
                setLoading(false);
            }
        };

        // Debounce: aguarda 500ms após o utilizador parar de digitar para fazer a busca
        const delayDebounceFn = setTimeout(() => {
            carregarDados();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [pagina, termoBusca, filtros]);

    // --- FUNÇÕES DE INTERAÇÃO ---

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

    const handleUpdateSuccess = () => {
        setShowEditModal(false);
        // Resetamos para a página 1 para ver as alterações
        setPagina(1);
        setTermoBusca(termoBusca); // Dispara o useEffect novamente
    };

    const handleConfirmDelete = async () => {
        try {
            const userStorage = sessionStorage.getItem('user'); // Verifica sessão
            const userObj = JSON.parse(userStorage);
            const userId = userObj.idUtilizador || userObj.id;

            await axios.delete(`http://localhost/TCC_PROJETO/tcc_back/DeleteTcc/delTcc.php?id=${tccSelecionado.idTcc}&userId=${userId}`);

            // Remove localmente para feedback instantâneo
            setTccs(prev => prev.filter(item => item.idTcc !== tccSelecionado.idTcc));
            
            setShowDeleteModal(false);
            setShowDetailsModal(false);
            toast.success("Relatório removido com sucesso!");
        } catch (error) {
            toast.error("Erro ao apagar o relatório");
        }
    };

    return (
        <div className="pesquisa-page-container">
            <div className="headerSearch">
                <h1>Pesquisar Relatórios</h1>
                <p><strong>Explore e consulte todos os relatórios do sistema</strong></p>
            </div>

            <SearchBar
                query={termoBusca}
                setQuery={(val) => {
                    setTermoBusca(val);
                    setPagina(1); // Sempre que pesquisar, volta para a página 1
                }}
                onSearch={() => {}} 
            />

            <ShowResult
                items={tccs} // Agora usa o estado unificado 'tccs'
                onEdit={prepararEdicao}
                onDeleteClick={confirmarExclusao}
                onDetailsClick={visualizarDetalhes}
                loading={loading}
                query={termoBusca}
            />

            {/* Paginação Estilo Catálogo */}
            {totalPaginas > 1 && (
                <div className="pagination-wrapper">
                    <button 
                        className="pag-btn"
                        disabled={pagina === 1} 
                        onClick={() => { setPagina(p => p - 1); window.scrollTo(0,0); }}
                    > 
                        &laquo; Anterior 
                    </button>
                    
                    <span className="page-indicator"> 
                        Página <strong>{pagina}</strong> de {totalPaginas} 
                    </span>
                    
                    <button 
                        className="pag-btn"
                        disabled={pagina >= totalPaginas} 
                        onClick={() => { setPagina(p => p + 1); window.scrollTo(0,0); }}
                    > 
                        Próximo &raquo; 
                    </button>
                </div>
            )}

            {/* Modais */}
            <ModalDetailsTcc
                show={showDetailsModal}
                tcc={tccSelecionado}
                onClose={() => setShowDetailsModal(false)}
                onDelete={confirmarExclusao}
                onEdit={prepararEdicao}
            />

            <ModalEditTcc
                show={showEditModal}
                tcc={tccSelecionado} 
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdateSuccess}
            />

            <DeleteModal
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                tccTitulo={tccSelecionado ? (tccSelecionado.tituloTcc || tccSelecionado.titulo) : ''}
            />
        </div>
    );
}

export default SearchPage;