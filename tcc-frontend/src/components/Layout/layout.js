import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { Outlet } from 'react-router-dom';

import "./layout.css"

function Layout (){

        const userStorage = sessionStorage.getItem('user');
        const user = userStorage ? JSON.parse(userStorage) : null;

        return (
            <div className="layout">
                <Header />
                <div className="body">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;

