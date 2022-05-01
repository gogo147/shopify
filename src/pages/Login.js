import React from "react";
import Navbar from "../components/Navbar/Navbar";
import LoginCard from "../components/LogCard/LogCard";
import { useRecoilState } from "recoil";
import axios from "axios";
import { authState } from "../store/auth/atom";
import { useNavigate } from "react-router-dom";


function Login() {
  const [_, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();

  function login(username, password) {
    axios
      .post("https://k4backend.osuka.dev/auth/login", {
        username: username,
        password: password,
      })

      .then((res) => {
        axios.get(`https://k4backend.osuka.dev/users/${res.data.userId}`)
        .then((userData) => {
          setAuth({
            user: userData.data,
            token: res.data.token,
          });
          navigate("/profile");
        })
      
      });
  }

  return (
    <>
      <Navbar />
      <LoginCard login={login} />
    </>
  );
}

export default Login;