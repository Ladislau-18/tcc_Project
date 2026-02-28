
import { FileIcon } from '../../../assets/icons';

import './goSearch.css';



function TccCard ({tcc}){

  return (
    <div key={tcc.id} className='itenTcc'>
      <div className="icon">
        <FileIcon className ="iconTcc" />
      </div>
                  <div className="cardTccInfo">
                    <div>

                    <span> {tcc.autorNome}</span><br />
                    <h5>{tcc.titulo}</h5>
                    
                    <span>{tcc.nome}</span><br />
                    <span> {tcc.anoDefesa}</span><br />
                    
                    </div>
                    <div className="divBtnSee">
                      <button className="btnTccDect">
                        Ver detalhes
                      </button>

                    </div>
                  </div>

    </div>
  )
}



/*
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

            {tccs.map((tcc, index) => (
                <TccCard key={tcc.id || index} tcc={tcc} />
            ))}
            
        </div>
    </div>
  );
}

*/



export {TccCard };
    