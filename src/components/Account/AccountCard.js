import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authState } from "../../store/auth/atom";
import "./AccountCard.css";

function ProfileCard() {
  const { user } = useRecoilValue(authState);


  
const reset = useResetRecoilState(authState);

  if(!user) {
    return <div>Not yet signed in..</div>
  } 



  return (
    <div className="Wrapper_Account">
    <div className="Account_box">
      <div className="Title">Profile</div>
      <div className="data">
        <div className="UserName">{user.name.firstname}</div>
        <div className="UserName">{user.name.lastname}</div>
        <div className="UserName">{user.username}</div>
        <div className="UserName">{user.password}</div>
      </div>
      <div className="btn_account" onClick={reset}>Log out</div>
    </div>
    </div>
  );
}

export default ProfileCard;
