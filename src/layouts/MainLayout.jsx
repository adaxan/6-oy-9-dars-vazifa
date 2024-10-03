import React from "react";
import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {

  const navigate = useNavigate()

  function handLogout(e) {
    e.preventDefault();
    navigate('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  return (
    <div className="base-container">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost">Home</a>
        </div>
        <div className="flex-none">
          <button onClick={handLogout} className="btn btn-ghost">Log out</button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
