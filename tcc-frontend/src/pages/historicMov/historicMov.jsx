import React, { useEffect, useState } from 'react';

import "./historicMov.css"

const HistoricMov = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('http://localhost/TCC_PROJETO/tcc_back/historicMov/historic.php')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLogs(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar logs:", err);
        setLoading(false);
      });
  }, []);

  // Função para formatar a data do MySQL para o padrão de Angola
  const formatarData = (dataSql) => {
    const data = new Date(dataSql);
    return data.toLocaleString('pt-AO');
  };

  return (
    <div className="logsContainer">
      <header className="logsHeader">
        <h2>Histórico de Movimentação</h2>
        <p>Acompanhe quem registou ou eliminou relatórios no acervo.</p>
      </header>

      {loading ? (
        <div className="loadingState">Carregando atividades...</div>
      ) : (
        <div className="tableWrapper">
          <table className="logsTable">
            <thead>
              <tr>
                <th>Data e Hora</th>
                <th>Utilizador</th>
                <th>Ação Realizada</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.idMov} className="logRow">
                  <td className="dataColuna">{formatarData(log.dataAcao)}</td>
                  <td className="userColuna">
                    <span className="userBadge">{log.utilizadorNome}</span>
                  </td>
                  <td className="acaoColuna">
                    <span className={log.tipoAcao.includes('Eliminação') ? 'acaoBadge delete' : 'acaoBadge success'}>
                      {log.tipoAcao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricMov;