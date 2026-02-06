import React from "react";

const Header = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    return(
        <header className="header">
            <h2>Acervo Digital</h2>
                {user && (
                    <div className="user-info">
                        👤 {user.nome}
                    </div>
                    
                )}
                <p>logado como: <strong>{user.tipo}</strong></p>
        </header>
    )



}
export default Header;