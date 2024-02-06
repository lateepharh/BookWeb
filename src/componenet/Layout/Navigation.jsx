import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Layout from "./Layout.module.css";
import Logo from "../utils/bbooklogo1.gif";
import Favourite_context from "../store/favourite-context";

const navLinkStyles = ({ isActive }) => {
  return {
    backgroundColor: isActive && "#254e4e",
    color: isActive && " #edfcfc",
    width: isActive && "fit-content",
    height: isActive && "fit-content",
    padding: isActive && "10px",
    borderRadius: isActive && "8px",
  };
};
function Navigation() {
  const favorite_CTX = useContext(Favourite_context);
  return (
    <main>
      <header className={Layout.header}>
        <div className={Layout.logo}>
          <h3>BookChronicles</h3>
          <span>
            <img src={Logo} alt="" />
          </span>
        </div>
        <div className={Layout.nav}>
          <NavLink to="/" style={navLinkStyles}>
            All Books
          </NavLink>
          <NavLink to="/books" style={navLinkStyles}>
            New Books
          </NavLink>
          <NavLink to="/favourite" style={navLinkStyles}>
            Favourite <sup>{favorite_CTX.totalFavourite}</sup>
          </NavLink>
        </div>
      </header>
    </main>
  );
}

export default Navigation;
