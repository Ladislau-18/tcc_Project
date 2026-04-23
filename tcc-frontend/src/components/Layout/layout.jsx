import React, { useState } from "react"; // Adicionado useState
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { Outlet } from 'react-router-dom';
import "./layout.css"

function Layout() {
    // Estado da sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="layout">
            <Header isOpen={isSidebarOpen} />
            <div className="body">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                
                <div className={`content ${isSidebarOpen ? "expanded" : "compact"}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;