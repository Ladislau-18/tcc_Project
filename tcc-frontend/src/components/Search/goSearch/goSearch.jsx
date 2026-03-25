
import { FileIcon } from '../../../assets/icons';
import { DeleteTcc, EditTcc } from '../../../assets/icons';
import './goSearch.css';



function TccCard({ tcc, onDelete, onCancel }) {

  const listaAutores = tcc.autores ? tcc.autores.replaceAll(',', ' | ') : "Autor por definir";


  return (
    <div key={tcc.idTcc} className='itenTcc'>
      <div className="icon">
        <FileIcon className="iconTcc" />
      </div>
      <div className="cardTccInfo">

        <div className="nameActions">

          {listaAutores}

          <div className="divBtnActions">
            <div className='iconAction1'>
              <EditTcc onClick={() => onCancel()} />
            </div>

            <div className='iconAction2' onClick={(e) => {
                  e.stopPropagation(); 
                  onDelete(tcc);
                }}>
              < DeleteTcc
                 />
            </div>

            <button className="btnTccDect">Ver detalhes</button>
          </div>

        </div>


        <h5>{tcc.titulo}</h5>
        <div className="infoCard">{tcc.curso}</div>
        <div className="infoCard">{tcc.anoDefesa}</div>

      </div>
    </div>
  )
}


export { TccCard };
