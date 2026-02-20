


function ShowResult ({ items, loading }){
    if (loading) return <p className="status-msg">Pesquisando...</p>;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
        return <p>Nenhum resultado encontrado.</p>;
    }
    return (
        <div className="results-container">
            <h2>Resultado da pesquisa</h2>
            <div className="tcc-grid">
                {items.map((tcc, index) => (
                    <div key={index} className="tcc-card"> 
                        <h3>{tcc.titulo}</h3>
                        <p><strong>Curso:</strong> {tcc.nome_curso}</p>
                        <p><strong>Ano:</strong> {tcc.anoDefesa}</p>
                        <button className="btn-detalhes">Ver detalhes</button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ShowResult;