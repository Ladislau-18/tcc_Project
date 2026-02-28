import React from "react";
import { UserIcon } from "../../assets/icons";
import '../Header/header.css';

const Header = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    return(
        <header className="header">
            <h2>Acervo Digital</h2>
                {user && (
                    <div className="user-info">
                       <UserIcon/> {user.nome} {user.tipo}
                    </div>
                    
                )} 
        </header>
    )



}
export default Header;