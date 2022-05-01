import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateCartAPI } from "../../store/Cart/atom";
import { authState } from "../../store/auth/atom";
import { useRecoilState, useResetRecoilState } from "recoil";
import './Navbar.css'

function Navbar() {
  const { cart } = CreateCartAPI();

  const [auth, setAuth] = useRecoilState(authState);
  const reset = useResetRecoilState(authState);

  function handleLogged() {
    if(auth.token) {
      reset()
    }
  }

  return (
    <div className="Container">
      <div className="Wrapper">
        <div className="Left">
          <Link
            to={`${
              auth.user && auth.user.role === "admin" ? "/admin" : "none"
            }`}
            className="linkStyle"
          >
            <div className="MenuItem">
              {" "}
              {`${
                auth.user && auth.user.role === "admin" ? "Admin" : ""
              }`}{" "}
            </div>
          </Link>
          <Link to={`${auth.token ? "/profile" : "/login"}`} className="linkStyle">
            <div className="MenuItem"> {`${auth.token ? "Profile" : "Log In"}`} </div>
          </Link>
          <Link to={`${auth.token ? "/login" : "/register"}`} className="linkStyle">
            <div className="MenuItem" onClick={handleLogged}> {`${auth.token ? "Log out" : "Register"}`} </div>
          </Link>

        </div>
        <div className="Center">
          <Link to="/" className="linkStyle">
            <div className="Logo">King</div>
          </Link>
        </div>
        <div className="Right">
          <div className="MenuItem">
            <Link to="/cart" className="linkStyle">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
