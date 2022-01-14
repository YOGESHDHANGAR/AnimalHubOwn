import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import BugReportIcon from "@mui/icons-material/BugReport";
import PetsIcon from "@mui/icons-material/Pets";
import MedicationIcon from "@mui/icons-material/Medication";
import "./Style/BottomNav.css";
const BottomNav = () => {
  return (
    <>
      <div className="bottom_nav footer">
        <div className="bottom_div_Links mb-1">
          <NavLink to="/" className="text-center ms-2 ms-lg-5">
            <HomeIcon />
            <br />
            पाशु खरीदे
          </NavLink>
          <NavLink to="/" className="text-center">
            <ChatIcon /> <br />
            चैट
          </NavLink>
          <NavLink to="/sell" className="pashu_beche_NavLink text-center">
            <PetsIcon /> <br /> पाशु बेचे
          </NavLink>
          <NavLink to="/" className="text-center me-2 me-lg-5">
            <BugReportIcon />
            <br /> पाशु खोज
          </NavLink>

          <NavLink to="/doctor" className="text-center me-2 me-lg-5">
            <MedicationIcon />
            <br />
            पशु चिकित्सक
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default BottomNav;
