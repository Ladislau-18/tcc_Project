import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, UserIcon, SearchIcon, RegistIcon, CatalogIcon } from "../../assets/icons";

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
    const goCatalog = () => {
        navigate("/pages/catalog");
    };
    

    return(

        <aside className="sidebar">
            <nav>
                
                <div onClick={goHome}> <HomeIcon /> Dashboard</div>
                <div onClick={goProfile}> <UserIcon /> Perfil</div>
                <div onClick={goSearch}> <SearchIcon /> Pesquisar</div>
                <div > <RegistIcon /> Registar TCC</div>
                <div onClick={goCatalog}> <CatalogIcon /> Catálogo de TCCs</div>
                

            </nav>
        </aside>
    )
}

export default Sidebar;
