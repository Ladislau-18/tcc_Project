import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";

import "./layout.css"

function Layout ({children}){

        const userStorage = sessionStorage.getItem('user');
        const user = userStorage ? JSON.parse(userStorage) : null;

        return(

            <div className="layout">
                <Header nome={user.nome}/>
                
                <div className="body">
                    <Sidebar tipo={user.tipo}/>
                    <div className="content">
                        {children}
                    </div>
                </div>

            </div>
        )
}

export default Layout;

