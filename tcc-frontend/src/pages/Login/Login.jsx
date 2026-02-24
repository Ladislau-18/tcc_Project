import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';


function Login(){
    const [numProcesso, setNumProcesso] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoAcesso, settipoAcesso] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost/TCC_PROJETO/tcc_back/logPHP/login.php', {
            numProcesso,
            senha,
            tipoAcesso
          });

          if (response.data.id) {

            alert("Bem-vindo, " + response.data.nome);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            navigate('./pages/home');
          } 
          else {
            alert(response.data.error || "Erro desconhecido");
          }
        } 
        catch (error) {
          console.error(error);
          alert("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div className="login-screen">
            <div className="form">
                <div className='divTitle'>
                    <h3 className="labelTitle">Bem-Vindo ao Acervo Digital</h3>
                    <p className="labelSubtitle">Preencha com os seus dados</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    <input type="number" placeholder="Nº de Processo" className="inputForm" 
                           onChange={(e) => setNumProcesso(e.target.value)} required/>
                    <input type="password" placeholder="Senha" className="inputForm" 
                           onChange={(e) => setSenha(e.target.value)} required/>
                    <div className="radioContainer">
                        <span className="labelSubtitle">Entrar como:</span>
                        <div className="radioOptions">
                            <label className="radioLabel">
                                <input 
                                    type="radio" 
                                    name="tipoAcesso" 
                                    value="aluno" 
                                    checked={tipoAcesso === 'aluno'} 
                                    onChange={(e) => settipoAcesso(e.target.value)} 
                                />
                                Aluno
                            </label>
                            <br></br>
                            <label className="radioLabel">
                                <input 
                                    type="radio" 
                                    name="tipoAcesso" 
                                    value="admin" 
                                    checked={tipoAcesso === 'admin'} 
                                    onChange={(e) => settipoAcesso(e.target.value)} 
                                />
                                Admin
                            </label>
                        </div>
                    </div>
                    <button className="buttonForm">Entrar</button>
                </form>
                 <Link to="" className="labelForgotPass">Esqueceu a sua senha?</Link>
                <p className="linkRegister">Não tem uma conta? <Link to="/cadastro" >Cadastre-se</Link></p>
            </div>
        </div>
    );
};

export default Login;