import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, UserIcon, SearchIcon, RegistIcon, Statistics, CatalogIcon } from "../../assets/icons";

import '../Sidebar/sidebar.css';
const Sidebar = (props) =>{

    const navigate = useNavigate();
    const goSearch = () => {
        navigate("/pages/pesquisar");
    };
    const goStatistics = () => {
        navigate("/pages/statistics");
    };
    const goHome = () => {
        navigate("/pages/home");
    };
    const goCatalog = () => {
        navigate("/pages/catalog");
    };
    const goRegist = () => {
        navigate("/pages/registerTcc");
    };
    

    return(

        <aside className="sidebar">
            <nav>
                
                <div onClick={goHome}> <HomeIcon /> Dashboard</div>
                <div onClick={goSearch}> <SearchIcon /> Pesquisar</div>
                <div onClick={goRegist}> <RegistIcon /> Registar TCC</div>
                <div onClick={goStatistics}> <Statistics /> Análise Acadêmica</div>
                <div onClick={goCatalog}> <CatalogIcon /> Registo de actividade</div>
                

            </nav>
        </aside>
    )
}

export default Sidebar;
