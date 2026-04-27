import React from 'react';
import TableHistoricMov from '../../components/Historic/tableHistóricMov';
import "./historicMov.css"

const HistoricMov = () => {
  
  return (
    <div className="logsContainer">
      <header className="logsHeader">
        <h2>Histórico de Movimentação</h2>
        <p>Acompanhe quem registou ou eliminou relatórios no acervo.</p>
      </header>

      <TableHistoricMov />
    </div>
  );
};

export default HistoricMov;