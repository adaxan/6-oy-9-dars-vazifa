import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if(!location.pathname.includes("/register")) {
        navigate("/login")
      }
    }
  }, [navigate])

  function PrivateRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate("/login");
    }

    return children;
  }
  return (
    <div>
      <Routes>
        <Route index element={<PrivateRoute isAuthenticated={!!token}><MainLayout><Home /></MainLayout></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
