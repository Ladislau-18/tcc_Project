
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


export {TccCard };
    