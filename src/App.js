import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={!user ? <Navigate to="/" /> : <Profile />}
        />
      </Routes>
    </div>
  );
}

export default App;
