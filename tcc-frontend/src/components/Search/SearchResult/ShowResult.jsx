import { TccCard } from '../goSearch/goSearch';
import { SearchNotFoundIcon } from '../../../assets/icons';
import './showResult.css';


function ShowResult ({ items, loading, hasSearched }){


    if (!hasSearched) {
        return (
            <div className="status-msg">
                <h2>Faça uma pesquisa para ver os resultados</h2>
            </div>
        );
    }
    if (loading) return <p className="status-msg">Pesquisando...</p>;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
        return (
            <div className='divTccNotFound' >
                <div className='tccNotFound'>
                    <SearchNotFoundIcon />
                    <h1>Nenhum ítem encontrado</h1>
                    <p><strong>Tente mudar as palavras chaves</strong></p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="resultsContainer">
            <h2>Resultado da pesquisa</h2>
            <div className="tccResults">
                {items.map((tcc, index) => (
                   <TccCard key={tcc.id || index} tcc={tcc}/>
                    
                ))}
            </div>
        </div>
    );
};


export default ShowResult;