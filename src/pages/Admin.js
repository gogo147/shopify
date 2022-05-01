import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import { authState } from "../store/auth/atom";
import "./Admin.css"
import productState from "../store/Products/atom";
import userState from "../store/users/atom";
import { Link } from "react-router-dom";



function Admin() {
  const products = useRecoilValue(productState);
  const users = useRecoilValue(userState);
  const { user } = useRecoilValue(authState);

  if (!user) {
    return <div>You need to log in</div>;
  }

  if (user.role === "user") {
    return <div>You don't have access to this page</div>;
  }

  return (
    <>
          <Navbar />
          <div className="Wrapper">
         
      


      {users.map((user) => {
        return (
          <div className="UserContainer">
            <div key={users}>Firstname : {user.name.firstname}</div>
            <div>Lastname : {user.name.lastname}</div>
            <div>Username : {user.username}</div>
            <div>Password : {user.password}</div>
          </div>
        );
      })}
      </div>
    </>
  );
}

export default Admin;
