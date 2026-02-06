import React, { useState } from 'react';

import '../Dashboard/DashboardUser.css';


const SearchTCC = ({ onSearch }) => {
   

    return (
        <div className="searchMain">
            <div className='searchContainer'>
                    <div className="">
                        <input 
                            type="text" 
                            name="busca"
                            className="imputSearch" 
                            placeholder="Pesquisar por título ou autor..." 
                        />
                    </div>

                    <div className="divBtn">
                        <button className="btnSearch">
                            Pesquisar
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default SearchTCC;