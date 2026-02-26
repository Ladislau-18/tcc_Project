import React from "react";
import { useNavigate } from "react-router-dom";

import '../Sidebar/sidebar.css';
const Sidebar = (props) =>{

    const navigate = useNavigate();
    const goSearch = () => {
        navigate("/pages/pesquisar");
    };
    const goProfile = () => {
        navigate("/pages/perfil");
    };
    const goHome = () => {
        navigate("/pages/home");
    };
    

    return(

        <aside className="sidebar">
            <nav>
                <div onClick={goHome}>Dashboard</div>
                <div onClick={goProfile}>Perfil</div>
                <div onClick={goSearch}>Pesquisar</div>
                <div>Registar TCC</div>
                <div>Catálogo de TCCs</div>
                

            </nav>
        </aside>
    )
}

export default Sidebar;
