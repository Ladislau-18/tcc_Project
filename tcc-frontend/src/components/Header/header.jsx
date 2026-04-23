import React from "react";
import { UserIcon } from "../../assets/icons";
import '../Header/header.css';


const Header = ({ isOpen }) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    return (
        <header className={`header ${isOpen ? "expanded" : "compact"}`}>
            <h2>Acervo Digital</h2>
            {user && (
                <div className="userInfo">
                    <strong>
                        <UserIcon /> {user.nome} | {user.tipo}
                    </strong>
                </div>
            )} 
        </header>
    );
}

export default Header;