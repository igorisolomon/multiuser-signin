import React, { useEffect, useState } from "react";
import sign from "jwt-encode";
import jwt_decode from "jwt-decode";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState();
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const secret = "Bitmama";
  // let userCount = 0;

  useEffect(() => {
    let data = {};
    let count = 0;

    const token = localStorage.getItem("bitmama_token");

    // Decode token if available
    if (token) {
      data = jwt_decode(token);
      count = Object.keys(data).length;
    }

    setUserData(data);
    setUserCount(count);
  }, [username]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const userExist = (obj) => {
    let objArr = Object.values(obj);
    let objArrLower = objArr.map((arr) => arr.name.toLowerCase());

    return objArrLower.includes(username.toLowerCase());
  };

  const handleSignin = () => {
    const data = userData;

    if (userExist(data)) {
      setError("Username already exist");
      console.log(error);
      return;
    }
    // Add user to token and encode
    data[`user${userCount + 1}`] = { name: username };

    const jwt = sign(data, secret);

    // store to localStorage
    localStorage.setItem("bitmama_token", jwt);

    if (userCount < 1) window.location.href = "/me";

    navigate("/me", {
      state: { currentUser: `user${userCount + 1}`, replace: true },
    });
  };

  const goHome = () => {
    navigate("/me");
  };

  return (
    <div className="Signin-container">
      {userCount > 0 ? (
        <button className="home-button" onClick={goHome}>
          Go Home
        </button>
      ) : (
        ""
      )}
      <div className="container">
        <div className="row centralize">
          <div className="col-lg-8 col-sm-12">
            <h1 className="display-3">Multi-user Application</h1>
            <p className="display-4">Bitmama assessment</p>
            <p className="lead">by Solomon igori</p>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="Signin-form">
              <div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control Signin-input"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={handleUsername}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn Signin-btn "
                      type="button"
                      id="button-addon2"
                      onClick={handleSignin}
                      disabled={!username}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
                {error ? <p>{error}</p> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
