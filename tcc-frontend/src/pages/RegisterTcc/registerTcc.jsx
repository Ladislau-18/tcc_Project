import "./registerTcc.css";
import { FileIcon, LocationIcon } from "../../assets/icons";
import { useState } from "react";
import toast from "react-hot-toast";

function RegisterTcc (){

    // 1. Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        titulo: '', autor: '', orientador: '', areaFormacao: '', 
        curso: '', anoDefesa: '', nota: '',
        andar: '', sala: '', armario: '', prateleira: ''
    });

    // 2. Estado para controlar a visibilidade do Modal
    const [showModal, setShowModal] = useState(false);

    // 3. Captura a data atual do computador
    const dataHoraAtual = new Date().toLocaleString('pt-PT');

    // Função para atualizar os dados enquanto o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função que abre o modal ao clicar em "Visualizar"
    const handlePreview = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    // Função que seria chamada para enviar ao PHP (Registar)
    const handleFinalRegister = async () => {
    // Unindo os dados do formulário com a data automática
    const dadosParaEnviar = { ...formData, dataRegistro: dataHoraAtual };

    try {
        const resposta = await fetch("http://localhost/TCC_PROJETO/tcc_back/RegistTcc/RegistTcc.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosParaEnviar),
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            toast.success("Sucesso: " + resultado.mensagem);
            setShowModal(false);
            // Opcional: limpar o formulário ou redirecionar
        } else {
            toast.error("Erro: " + resultado.mensagem);
        }
    } catch (erro) {
        console.error(erro);
        toast.error("Erro na conexão com o servidor");
    }
};

    return (
        <div className="register-page-container">
            <h1>Registar Relatório</h1>
            <p><strong>Adicionar novos relatórios ao sistema</strong></p><br />
            
            <form onSubmit={handlePreview} className="gridMain">
                
                <div className="containerRegister">
                    <div className="section-title">
                        <FileIcon />
                        <h3>Dados do trabalho</h3>
                    </div>
                    <div className="divInputs">
                        <div className="inputContainer">
                            <input type="text" name="titulo" placeholder=" " required onChange={handleChange} />
                            <label>Título</label>
                        </div><br />
                        <div className="gridInput">
                            <div className="inputContainer">
                                <input type="text" name="autor" placeholder=" " required onChange={handleChange} />
                                <label>Autor</label>
                            </div>
                            <div className="inputContainer">
                                <input type="text" name="orientador" placeholder=" " required onChange={handleChange} />
                                <label>Orientador</label>
                            </div>
                            {/* Selects com as opções que já definiu */}
                            <div className="inputContainer">
                                <select name="area" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="Informática">Informática</option>
                                </select>
                                <label>Área de formação</label>
                            </div>
                            <div className="inputContainer">
                                <select name="curso" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="Técnico de Informática">Técnico de Informática</option>
                                    <option value="Gestão de Sistemas">Gestão de Sistemas</option>
                                </select>
                                <label>Curso</label>
                            </div>
                            <div className="inputContainer">
                                <select name="Ano" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                                <label>Ano da Defesa</label>
                            </div>
                            <div className="inputContainer">
                                <select name="Nota final" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>                      
                                </select>
                                <label>Ano da Defesa</label>
                            </div>
                        </div>
                    </div>
                    <span>*todos os campos são obrigatórios</span>
                </div>

                {/* SEÇÃO: LOCALIZAÇÃO */}
                <div className="containerRegister">
                    <div className="section-title">
                        <LocationIcon />
                        <h3>Localização do trabalho</h3>
                    </div>
                    <div className="divInputs">
                        <div className="gridInput">
                            <div className="inputContainer">
                                <select name="andar" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="Rés-do-chão">Rés-do-chão</option>
                                    <option value="1º Andar">1º Andar</option>
                                    <option value="2º Andar">2º Andar</option>
                                </select>
                                <label>Andar</label>
                            </div>
                            <div className="inputContainer">
                                <select name="sala" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="78">78</option>
                                    <option value="79">79</option>
                                    <option value="80">80</option>
                                </select>
                                <label>Sala</label>
                            </div>
                            <div className="inputContainer">
                                <select name="armario" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <label>Armário</label>
                            </div>
                            <div className="inputContainer">
                                <select name="prateleira" required onChange={handleChange}>
                                    <option value="" hidden></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <label>Prateleira</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btnDraft">Visualizar</button>
            </form>

            {/* MODAL DE PRÉ-VISUALIZAÇÃO (OVERLAY) */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <header className="modal-header">
                            <h2>Confirmar Registo</h2>
                            
                        </header>
                        
                        <div className="preview-body">
                            <p><strong>Título:</strong> {formData.titulo}</p>
                            <p><strong>Autor:</strong> {formData.autorNome}</p>
                            <p><strong>Orientador:</strong> {formData.orientadorNome}</p>
                            <p><strong>Área de formação:</strong> {formData.areaFormacao}</p>
                            <p><strong>Curso:</strong> {formData.curso}</p>
                            <p><strong>Ano:</strong> {formData.anoDefesa}</p>
                            <p><strong>Nota Final:</strong> {formData.nota}</p>
                            <p className="current-date"><strong>
                                Data do registo:</strong> {dataHoraAtual}</p>
                            <hr />
                            <p><strong>Andar: </strong>{formData.andar}</p> 
                            <p><strong>Sala: </strong> {formData.sala}</p> 
                            <p><strong>Armário: </strong>{formData.armario}</p> 
                            <p><strong>Prateleira: </strong>{formData.prateleira}</p>
                            
                        </div>

                        <div className="modal-actions">
                            <button className="btn-edit" onClick={() => setShowModal(false)}>
                                Editar
                            </button>
                            <button className="btn-save" onClick={handleFinalRegister}>
                                Registar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default RegisterTcc;