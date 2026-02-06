import React from "react";

const Sidebar = (props) =>{


    return(

        <aside className="sidebar">
            <nav>

                <div>Perfil</div>
                <div>Pesquisar TCC</div>
                <div>Catálogo de TCCs</div>
                {props.tipo === 'admin' && (
                    <>
                        <div>Cadastrar TCC</div>
                        <div>Gerir Acervo</div>
                        <div>Relatórios Gerais</div>
                        <div>configurações</div>
                    </>
                )}
                <div>Favoritos</div>

            </nav>
        </aside>
    )
}

export default Sidebar;
