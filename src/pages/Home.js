import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Products from "../components/Products/Products";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <Link to="/productlist">
      </Link>
      <Link to="/productlist">
        <Products />
      </Link>
    </div>
  );
}

export default Home;
