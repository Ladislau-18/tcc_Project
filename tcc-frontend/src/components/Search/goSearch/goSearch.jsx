
import { FileIcon } from '../../../assets/icons';
import { DeleteTcc, EditTcc } from '../../../assets/icons';
import './goSearch.css';



function TccCard({ tcc, onDelete, onDetails, onEdit }) {

  const listaAutores = tcc.autores ? tcc.autores.replaceAll(',', ' | ') : "Autor por definir";


  return (
    <div className='itemTcc'>
      <div className="iconContainer">
        <FileIcon className="iconTcc" />
      </div>

      <div className="cardTccInfo" >
        <div className="nameActions" >
          <span className="autoresTexto">{listaAutores}</span>

          <div className="divBtnActions" style={{border:"1 px solid red"}}>
            
            {/* Ícone de Editar */}
            <div className='iconAction1' onClick={(e) => { 
                e.stopPropagation(); 
                onEdit(tcc); 
            }}>
              <EditTcc />
            </div>

            {/* Ícone de Apagar */}
            <div className='iconAction2' onClick={(e) => {
                e.stopPropagation();
                onDelete(tcc);
            }}>
              <DeleteTcc />
            </div>

            {/* Botão Ver Detalhes*/}
            <button 
              className="btnTccDet" 
              onClick={() => onDetails(tcc)}
            >
              Ver detalhes
            </button>
          </div>
        </div>

        <h5>{tcc.titulo}</h5>
        <div className="infoCard">{tcc.curso}</div>
        <div className="infoCard">{tcc.anoDefesa}</div>
      </div>
    </div>
  );
}

export { TccCard };