import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FileIcon, LocationIcon, CancelAuthor } from "../../../assets/icons";
 // Certifique-se de que este arquivo existe e importa o estilo do register

function ModalEditTcc({ show, tcc, onClose, onSave }) {
    const [formData, setFormData] = useState({
        titulo: '', orientadorNome: '', areaFormacao: '', 
        curso: '', anoDefesa: '', nota: '', 
        andar: '', sala: '', armario: '', prateleira: ''
    });
    const [autores, setAutores] = useState(['']);

    useEffect(() => {
        if (show && tcc) {
            setFormData({
                titulo: tcc.titulo || '',
                orientadorNome: tcc.orientadorNome || '',
                areaFormacao: tcc.areaFormacao || 'Informática',
                curso: tcc.curso || '',
                anoDefesa: tcc.anoDefesa || '',
                nota: tcc.notaFinal || '',
                andar: tcc.blocoArquivo || '',
                sala: tcc.estante || '',
                armario: tcc.compartimento || '',
                prateleira: tcc.prateleira || ''
            });
            if (tcc.autores) setAutores(tcc.autores.split(' | '));
        }
    }, [show, tcc]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAutorChange = (index, value) => {
        const novos = [...autores];
        novos[index] = value;
        setAutores(novos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const payload = { ...formData, idTcc: tcc.idTcc, idLocal: tcc.idLocal, userId: user.id, autores };

        try {
            const res = await axios.post("http://localhost/TCC_PROJETO/tcc_back/UpdateTcc/updateTcc.php", payload);
            if (res.data.status === "success") {
                toast.success(res.data.message);
                onSave();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Erro na conexão");
        }
    };

    if (!show) return null;

    return (
        <div className="modalOverlay"> 
            <div className="modalContent">
                <form onSubmit={handleSubmit} className="gridMain">
                    
                    {/* SEÇÃO 1: DADOS DO TRABALHO */}
                    <div className="containerRegister">
                        <div className="section-title">
                            <FileIcon />
                            <h3>Dados do trabalho</h3>
                        </div>
                        
                        <div className="divInputs">
                            <div className="inputContainer">
                                <input type="text" name="titulo" placeholder=" " required value={formData.titulo} onChange={handleChange} />
                                <label>Título</label>
                            </div>

                            <div className="gridInput">
                                {/* Lista de Autores */}
                                <div className="autores-section">
                                    {autores.map((nome, index) => (
                                        <div key={index} className="autor-item" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                            <div className="inputContainer" style={{ flex: 1 }}>
                                                <input type="text" placeholder=" " required value={nome} onChange={(e) => handleAutorChange(index, e.target.value)} />
                                                <label>Autor {index + 1}</label>
                                            </div>
                                            {autores.length > 1 && (
                                                <button type="button" onClick={() => setAutores(autores.filter((_, i) => i !== index))} className="btn-remove-autor">
                                                    <CancelAuthor />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => setAutores([...autores, ''])} className="btn-add-autor">
                                        Adicionar mais um autor
                                    </button>
                                </div>

                                <div className="inputContainer">
                                    <input type="text" name="orientadorNome" placeholder=" " required value={formData.orientadorNome} onChange={handleChange} />
                                    <label>Orientador</label>
                                </div>

                                <div className="inputContainer">
                                    <select name="areaFormacao" required value={formData.areaFormacao} onChange={handleChange}>
                                        <option value="Informática">Informática</option>
                                    </select>
                                    <label>Área de formação</label>
                                </div>

                                <div className="inputContainer">
                                    <select name="curso" required value={formData.curso} onChange={handleChange}>
                                        <option value="Técnico de Informática">Técnico de Informática</option>
                                        <option value="Gestão de Sistemas">Gestão de Sistemas</option>
                                    </select>
                                    <label>Curso</label>
                                </div>

                                <div className="inputContainer">
                                    <select name="anoDefesa" required value={formData.anoDefesa} onChange={handleChange}>
                                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                    <label>Ano da Defesa</label>
                                </div>

                                <div className="inputContainer">
                                    <select name="nota" required value={formData.nota} onChange={handleChange}>
                                        {Array.from({length: 20}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                    <label>Nota Final</label>
                                </div>
                            </div>
                        </div>
                        <span>*todos os campos são obrigatórios</span>
                    </div>

                    {/* SEÇÃO 2: LOCALIZAÇÃO */}
                    <div className="containerRegister">
                        <div className="section-title">
                            <LocationIcon />
                            <h3>Localização do trabalho</h3>
                        </div>
                        <div className="divInputs">
                            <div className="gridInput">
                                <div className="inputContainer">
                                    <select name="andar" required value={formData.andar} onChange={handleChange}>
                                        <option value="Rés-do-chão">Rés-do-chão</option>
                                        <option value="1º Andar">1º Andar</option>
                                        <option value="2º Andar">2º Andar</option>
                                    </select>
                                    <label>Andar</label>
                                </div>
                                <div className="inputContainer">
                                    <select name="sala" required value={formData.sala} onChange={handleChange}>
                                        <option value="78">78</option><option value="79">79</option><option value="80">80</option>
                                    </select>
                                    <label>Sala</label>
                                </div>
                                <div className="inputContainer">
                                    <select name="armario" required value={formData.armario} onChange={handleChange}>
                                        <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                                    </select>
                                    <label>Armário</label>
                                </div>
                                <div className="inputContainer">
                                    <select name="prateleira" required value={formData.prateleira} onChange={handleChange}>
                                        <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                                    </select>
                                    <label>Prateleira</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} className="btnDraft" style={{ background: '#ccc' }}>Cancelar</button>
                        <button type="submit" className="btnDraft">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditTcc;