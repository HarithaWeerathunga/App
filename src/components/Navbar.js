import React, {useState} from "react";
import * as FaIcons  from "react-icons/cg";
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import {SideBarComponentsData} from "./SideBarComponentsData";

import './Navbar.css';
import {IconContext} from "react-icons";


function Navbar(){

    const [sideBarDrawer, setComponentsToSideBar] = useState(false);

    const displaySideBar = () => setComponentsToSideBar(!sideBarDrawer);


    return(
        <>
            <IconContext.Provider value={{color: '#fff'}}>

            <div className="navbar">

                <Link to="#" className='menu-bars'>

                    <AiIcons.AiOutlineMenuUnfold onClick={displaySideBar}/>


                </Link>
            </div>

            <nav className={sideBarDrawer ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={displaySideBar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>

                    {SideBarComponentsData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName} >
                                <Link to={item.redirect_path}>
                                    {item.icon}
                                    <span>{item.tab_name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar