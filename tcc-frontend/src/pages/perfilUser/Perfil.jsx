import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./perfil.css";

function Profile() {
    const [user, setUser] = useState({
        nome_utilizador: "Carregando...",
        cargo: "",
        curso: "",
        numProcesso: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const idLogado = localStorage.getItem('userId');
                const response = await axios.get('http://localhost/TCC_PROJETO/tcc_back/selects/pegarUserLog.php?idUtilisador=${idLogado}');
                setUser(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div className='divPerfil'>
                <div className='photoProfile'>
                    <img src="" alt="Perfil" />
                </div>
                <div className='prefilInfo'>
                    <h1>{user.nome_utilizador}</h1>
                    <span>{user.cargo}</span><br />
                    <span>Curso: {user.curso}</span><br />
                    <span>Nº Processo: {user.numProcesso}</span><br />
                </div>
                <div>
                    <button className='editProfile'>Editar</button>
                </div>
            </div>

            <div className="info">
                <div className="divProfile">

                    <h3>Trabalhos Lidos</h3>
                    <p>12</p>
                </div>
                <div className="divProfile">
                    <h3>Meus Favoritos</h3>
                    <p>Total: 5</p>
                </div>
            </div>

            <h1>Recomendações para Você</h1>
        </>
    );
}

export default Profile;