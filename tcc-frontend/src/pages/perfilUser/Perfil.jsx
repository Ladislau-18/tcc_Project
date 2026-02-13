import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./perfil.css"
function Profile() {
    
    return(
        <>
        <div className='divPerfil'>
            <div className='photoProfile'>
                <img src="" alt="L" />
            </div>
            <div className='prefilInfo'>
                <h1>Ladislau Cabanga</h1>
                <span>admin</span><br />
                <span>Curso: </span><br />
                <span>Nº Processo: 00000</span><br />
            </div>
        </div>
        
        </>
    )
    
}

export default Profile;