import React from 'react';
import './ModalDetalhesTcc.css';

function ModalDetailsTcc({ show, tcc, onClose, onEdit, onDelete }) {
    if (!show || !tcc) return null;

    console.log(tcc)

    return (
        <div className="modalOverlay">
            <div className="detailsModalContent">
                <div className="detailsHeader">
                    <h3>Informações do Relatório</h3>
                    <button className="closeX" onClick={onClose}>&times;</button>
                </div>

                <div className="detailsBody">
                    <div className="infoSection">
                        <p className="dataText" id='title'>{tcc.titulo}</p>
                    </div>

                    <div className="infoRow">
                        <div className="infoSection">
                            <p><strong>Autores: </strong><span className="dataText">{tcc.autores}</span></p>
                        </div>
                        <div className="infoSection">
                            <p className="dataText"><strong>Orientador: </strong><span>{tcc.orientadorNome || "Não informado"}</span></p>
                        </div>
                    </div>
                    <div className="infoRow">
                        <div className="infoSection">
                            <p className="dataText"><strong>Area de formação: </strong><span>{tcc.areaFormacao}</span></p>
                        </div>
                        <div className="infoSection">
                            <p className="dataText"><strong>Curso: </strong><span>{tcc.curso}</span></p>
                        </div>
                        <div className="infoSection">
                            <p className="dataText"><strong>Ano da defesa: </strong><span>{tcc.anoDefesa}</span></p>
                        </div>
                        <div className="infoSection">
                            <p className="dataText"><strong>Nota Final: </strong><span>{tcc.notaFinal}</span></p>
                        </div>
                    </div>

                    <div className="dadosLocal">
                        <h5>Localização Física</h5>
                        <div className="locationGrid">
                            <div className="locField"><span>Andar:</span> {tcc.blocoArquivo}</div>
                            <div className="locField"><span>Sala:</span> {tcc.blocoArquivo}</div>
                            <div className="locField"><span>Armário:</span> {tcc.armario}</div>
                            <div className="locField"><span>Prateleira:</span> {tcc.prateleira}</div>
                        </div>
                    </div>
                </div>

                <div className="detailsFooter">
                    <div className="dangerZone">
                        <button className="btnEdit" onClick={() => onEdit(tcc)}>Editar</button>
                        <button className="btnDelete" onClick={() => onDelete(tcc)}>Apagar</button>
                    </div>
                    <button className="btnClose" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailsTcc;