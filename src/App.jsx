import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/ProductId";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { productState } from "./store/Products/atom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDataFromLocalStorage } from "./utility/localStorage";
import axios from "axios";
import cartState from "./store/Cart/atom";
import userState from "./store/users/atom";

function App() {
  const setProducts = useRecoilState(productState)[1];
  const setUsers = useRecoilState(userState)[1];
  const setCart = useRecoilState(cartState)[1];

  useEffect(() => {
    axios.get("https://k4backend.osuka.dev/products").then((response) => {
      setProducts(response.data);
    });
  }, [setProducts]);

  useEffect(() => {
    axios.get('https://k4backend.osuka.dev/users').then((response) => {
      setUsers(response.data);
    });
  }, [setUsers]);


  useEffect(() => {
    const cartData = getDataFromLocalStorage("cart");
    setCart(cartData);
  }, [setCart]);

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


