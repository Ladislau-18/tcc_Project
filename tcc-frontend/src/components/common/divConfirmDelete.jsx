import './divConfirmDelete.css'

function DeleteModal({ show, onCancel, onConfirm, tccTitulo }) {
  if (!show) {
    return null; // Não renderiza nada se 'show' for false
  }

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h3>Confirmar Exclusão</h3>
        </div>
        <div className="modalBody">
          <p>Tem certeza que deseja apagar o relatório:</p>
          <p className="tccTituloModal">"{tccTitulo}"?</p>
          <p className="aviso-exclusao">Esta ação não pode ser desfeita.</p>
        </div>
        <div className="modalFooter">
          <button className="btn-cancelar" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-confirmar-exclusao" onClick={onConfirm}>
            Apagar Definitivamente
          </button>
        </div>
      </div>
    </div>
  );
}


export default DeleteModal;