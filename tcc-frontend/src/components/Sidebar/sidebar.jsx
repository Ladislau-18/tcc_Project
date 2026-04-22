import React from "react";
import { NavLink } from "react-router-dom"; // Importante mudar para NavLink
import { HomeIcon, SearchIcon, RegistIcon, Statistics, CatalogIcon } from "../../assets/icons";

import '../Sidebar/sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                {/* O atributo 'end' garante que o Dashboard só fique ativo na rota exata */}
                <NavLink to="/pages/home" className="navItem" end>
                    <HomeIcon /> <span>Dashboard</span>
                </NavLink>

                <NavLink to="/pages/pesquisar" className="navItem">
                    <SearchIcon /> <span>Pesquisar</span>
                </NavLink>

                <NavLink to="/pages/registerTcc" className="navItem">
                    <RegistIcon /> <span>Registar TCC</span>
                </NavLink>

                <NavLink to="/pages/statistics" className="navItem">
                    <Statistics /> <span>Análise Acadêmica</span>
                </NavLink>

                <NavLink to="/pages/historicMov" className="navItem">
                    <CatalogIcon /> <span>Registo de actividade</span>
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;