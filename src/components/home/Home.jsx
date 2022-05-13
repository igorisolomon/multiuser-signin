import React from "react";
import { useLocation } from "react-router-dom";
import { getUserData, getUsers } from "../../services/authService.js";
import Navbar from "../common/nav/Navbar.jsx";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const allUsers = getUsers()

  const currentUser = location?.state?.currentUser;
  const currentUserKey = currentUser?currentUser:"user1";
  const currentUserName = getUserData(currentUserKey).name;

  const capitalize = (str) =>{
    return str[0].toUpperCase() + str.substring(1);
  }

  return (
    <div className="Home">
      <Navbar users={allUsers} currentUserKey={currentUserKey} />
      <div className="Home-container">
        <div className="Home-content">
          <h1>Welcome {capitalize(currentUserName)}</h1>
          <p>to the multi-user application</p>
          <ul>
            <li>Click your profile icon to switch account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
