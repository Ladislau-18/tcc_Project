import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Register = () => {
    const [nome, setNome] = useState('');
    const [numProcesso, setNumProcesso] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoAcesso, setTipoUsuario] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // 2. ADICIONAR O 'CARGO' NO OBJETO ENVIADO PARA O PHP
            const response = await axios.post('http://localhost/TCC_PROJETO/tcc_back/logPHP/register.php', {
                nome,
                numProcesso,
                email,
                senha 
            });

            if (response.data.message) {
                toast.success("Usuário cadastrado com sucesso");
                navigate("/");
            } else {
                toast.error("Erro inesperado: " + JSON.stringify(response.data));
            }
        } catch (error) {
            const mensagemErro = error.response?.data?.error || error.message;
            toast.error("Erro na requisição: " + mensagemErro);
            console.error(error);
        }
    }

    return (
        <div className="login-screen">
            <div className="form">
                <div className='divTitle'>
                    <h3 className="labelTitle">Crie sua conta</h3>
                    <p className="labelSubtitle">Preencha com os seus dados pessoais</p>
                </div>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Nome Completo" className="inputForm" 
                           onChange={(e) => setNome(e.target.value)} required />
                    
                    <input type="number" placeholder="Nº de Processo" className="inputForm" 
                           onChange={(e) => setNumProcesso(e.target.value)} required />
                    
                    <input type="email" placeholder="E-mail" className="inputForm" 
                           onChange={(e) => setEmail(e.target.value)} required />
                    
                    <input type="password" placeholder="Senha" className="inputForm" 
                           onChange={(e) => setSenha(e.target.value)} required />
                    
                    <button type="submit" className="buttonForm">Registar</button>
                </form>
                <p className="linkRegister">Já tem conta? <Link to="/">Faça Login</Link></p>
            </div>
        </div>
    );
};

export default Register;