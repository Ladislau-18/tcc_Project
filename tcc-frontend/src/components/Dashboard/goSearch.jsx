import React, { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileIcon } from '../../assets/icons';

import './goSearch.css';




function SearchTCC() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/pages/pesquisar");
  };

  return (
    <div className="searchMain">
      <div className="searchContainer">
        <input 
          type="text" 
          placeholder="Pesquisar por título ou autor..." 
          className='imputSearch'
          onClick={handleRedirect}
          readOnly
        />
        
      </div>
    </div>
  );
}



function TccList() {
  const [tccs, setTccs] = useState([]);

  useEffect(() => {
    fetch("http://localhost/TCC_PROJETO/tcc_back/selects/listaTCCsRec.php")
      .then(res => res.json())
      .then(data => setTccs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
        <h2>Adicionados recentemente</h2>
        <div className='recentTcc' >
            {tccs.length === 0 && <p>Nenhum TCC encontrado.</p>}

            {tccs.map(tcc => (
                <div key={tcc.id} className='itenTcc'>
                <FileIcon />
                <h4>{tcc.titulo}</h4>
                <p><strong>Autor:</strong> {tcc.autor}</p>
                <p><strong>Ano:</strong> {tcc.anoDefesa}</p>
                <p><strong>Curso:</strong> {tcc.nome_Curso}</p>

                <button className="btnTccDect">
                    Ver detalhes
                </button>
            </div>
            ))}
            
        </div>
    </div>
  );
}


export  { SearchTCC, TccList };
    