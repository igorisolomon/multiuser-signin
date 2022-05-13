import jwt_decode from "jwt-decode";

export const getUsers = () => {
  let users;
  const token = localStorage.getItem("bitmama_token");

  // Decode token if available
  if (token) {
    users = jwt_decode(token);
  }

  return users;
};

export const getUserData = (current) => {
  const users = getUsers();

  return users[current];
};

export const logout = () => {
  localStorage.removeItem("bitmama_token");

  window.location = "/";
};
