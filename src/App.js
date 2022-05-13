import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signin/Signin";
import Home from "./components/home/Home";
import { getUsers } from "./services/authService";
import "./App.css";

function App() {
  const user = getUsers();

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route
        path="me"
        element={user ? <Home /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
