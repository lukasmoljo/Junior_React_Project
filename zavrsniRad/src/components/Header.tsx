import "./Header.css"
import { NavLink } from 'react-router-dom';

import AdminButton from './AdminButton';
import { useContext } from "react";
import AdminContext from "../context/AdminContext";


const Header = () => {
  const {isAdmin} = useContext(AdminContext);
 
  
    return (
   
      <div className="header">
       <div className="title">
        <h2 className="mainTitle" >Azil za životinje
        
          <AdminButton/>
       
        </h2>
        
       </div>
        <nav>
        

    <div className="navItem">
      <NavLink to="/about-us" className="nav-link">O nama</NavLink>
      </div>
          <div className="navItem">
            <NavLink to="/list" className="nav-link">Popis</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/donations" className="nav-link">Donacije</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/news" className="nav-link">Obavijesti</NavLink>
          </div>
          {isAdmin && <div className="navItem">
            <NavLink to="/new-animal" className="nav-link">Unos</NavLink>
          </div>}
        </nav>
      </div>
  
    )
  };
  
  export default Header;
  