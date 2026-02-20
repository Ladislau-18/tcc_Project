import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./perfil.css"
function Profile() {
    
    return(
        <>
        <div className='divPerfil'>
            <div className='photoProfile'>
                <img src="../../assent/do-utilizador.png" alt="" />
            </div>
            <div className='prefilInfo'>
                <h1>Ladislau Cabanga</h1>
                <span>admin</span><br />
                <span>Curso: </span><br />
                <span>Nº Processo: 00000</span><br />
            </div>
            <div>
                <button className='editProfile'>Editar</button>
            </div>
            
        </div>

        <div className="info">
            <div className="divProfile">
                <h3>Undefined</h3>
            </div>
            <div className="divProfile">
                <h3>Meus Favoritos</h3>
                <p>Tal</p>
            </div>
        </div>


        <h1>Recomendações para Você</h1>
        </>
    )
    
}

export default Profile;