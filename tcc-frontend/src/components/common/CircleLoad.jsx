import React from 'react';

const CircleLoad = ({ mensagem = "Carregando..." }) => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p className="status-msg">{mensagem}</p>
        </div>
    );
}

export default CircleLoad;