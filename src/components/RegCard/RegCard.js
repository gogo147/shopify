import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../store/auth/atom";
import "./RegCard.css";
import axios from "axios";

function RegCard(props) {
  const [_, setAuth] = useRecoilState(authState);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "Stockholm",
      street: "Ringvägen",
      zipcode: "17298",
      number: 23,
    },
    phone: "+46707092356",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
   
    axios.post("https://k4backend.osuka.dev/users", user).then((response) => {
      axios
        .post("https://k4backend.osuka.dev/auth/login", {
          username: response.data.username,
          password: response.data.password,
          
        })
        .then((response) => {
          axios
            .get(`https://k4backend.osuka.dev/users/${response.data.userId}`)
            .then((userData) => {
              console.log(userData.data)
              setAuth({
                user: userData.data,
                token: response.data.token,
                
              });
              navigate("/profile");
            });
        });
   
  
    });
  };



  return (
    <div className="Wrapper_reg">
      <div className="RegBox">
        <div className="Title">Create an account</div>
        <div className="box" onSubmit={(e) => {e.preventDefault()}}>
          <input type="text"
            className="Input_reg"
            placeholder="Firstname"
            required
            label="First name"
            value={user.name.firstname}
            onChange={(e) =>
              setUser({
                ...user,
                name: {
                  ...user.name,
                  firstname: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="Input_reg"
            placeholder="Lastname"
            required
            label="Lastname"
            value={user.name.lastname}
            onChange={(e) =>
              setUser({
                ...user,
                name: {
                  ...user.name,
                  lastname: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="Input_reg"
            placeholder="Email"
            required
            label="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            className="Input_reg"
            placeholder="Username"
            required
            label="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="text"
            className="Input_reg"
            placeholder="Password"
            required
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
       
          <div className="btn_reg" onClick={handleSubmit}>Register</div>
        </div>
      </div>
    </div>
  );
}

export default RegCard;
