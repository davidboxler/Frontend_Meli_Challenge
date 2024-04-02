import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_ML.png";
import search from "../../assets/ic_Search.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const updateInput = (e) => {
    setSearchInput(e.target.value);
  };

  const searchData = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      navigate("/error_404");
      return;
    }
    navigate(`/items?search=${searchInput}`);
  };

  return (
    <nav className="nav-navbar">
      <div className="main-container">
        <div className="navbar-search-container">
          <Link to="/">
            <img
              className="header-logo"
              src={logo}
              alt="Logo de Mercado Libre"
            />
          </Link>
          <form
            className="search-input-container"
            noValidate
            autoComplete="off"
            onSubmit={searchData}
          >
            <input
              className="search-input"
              type="text"
              placeholder="Nunca dejes de buscar"
              onChange={updateInput}
            />
            <button className="search-icon" type="submit">
              <img src={search} alt="Boton de búsqueda" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
