import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../../services/authService";

import "./Navbar.css";

const Navbar = ({ users, currentUserKey }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleNewUser = () => {
    navigate("/");
  };

  const handleUserChange = (user) => {
    navigate("/me", {
      state: { currentUser: user, replace: true },
    });
  };

  const removeCurrentUser = () => {
    const otherUsers = { ...users };
    delete otherUsers[currentUserKey];
    return otherUsers;
  };

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  };

  return (
    <>
      <div style={{ width: "70%", margin: "auto" }}>
        <div className="navbar">
          <Link className="navbar-brand" to="/me">
            Multi-User App
          </Link>
          <div className="" id="">
            <button
              onClick={handleClick}
              className="navbar-text ml-auto avatar-button"
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 50, height: 50 }}>
                {users[currentUserKey].name[0].toUpperCase()}
              </Avatar>
            </button>
          </div>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <div className="currentUser">
            <Avatar sx={{ width: 100, height: 100 }}>
              {users[currentUserKey].name[0].toUpperCase()}
            </Avatar>
            {capitalize(users[currentUserKey].name)}
          </div>
        </MenuItem>
        <Divider />
        {Object.keys(removeCurrentUser()).map(function (key, index) {
          return (
            <MenuItem key={key} onClick={() => handleUserChange(key)}>
              <Avatar /> {capitalize(users[key].name)}
            </MenuItem>
          );
        })}
        {Object.keys(removeCurrentUser()).length ? <Divider /> : ""}
        <MenuItem onClick={handleNewUser}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
