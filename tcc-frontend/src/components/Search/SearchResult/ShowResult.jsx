import { TccCard } from '../goSearch/goSearch';
import { FileIcon } from '../../../assets/icons';

import './showResult.css';


function ShowResult ({ items, loading }){
    if (loading) return <p className="status-msg">Pesquisando...</p>;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
        return (
            <div className='TccNotFound'>
                <h1>Ups! Nenhum ítem encontrado</h1>
                <p>Tente mudar as palavras chaves</p>
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