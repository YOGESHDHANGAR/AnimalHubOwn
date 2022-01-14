import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
// import "./Style/Navbar.css";
import { Link,NavLink } from 'react-router-dom';
import "./Style/LogoNav.css"
const LogoNav = () => {
    return (
        <div  className="logo_div">
        <div className="logo_div_Links">
          <NavLink to='/' className="navbar-brand ms-4"><h3>Animal Hub</h3></NavLink>
          <NavLink to='/profile' className="profile me-3 mt-3"><PersonIcon fontSize="large"/></NavLink>
          <hr className="dark" />
        </div>
        
        </div>
    )
}

export default LogoNav
