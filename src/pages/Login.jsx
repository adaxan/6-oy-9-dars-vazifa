import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }

  function handLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const registeredUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registeredUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message == "User Not found" || data.message == "Invalid Password!") {
          alert(data.message);
          usernameRef.current.style.outlineColor = "red";          
          passwordRef.current.style.outlineColor = "red";
        }
        if (data.id) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
          usernameRef.current.value = "";
          passwordRef.current.value = "";
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="card bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl text-center font-extrabold text-blue-500 mb-8">
          Login
        </h1>
        <form className="space-y-6" onSubmit={handLogin}>
          <div className="space-y-2">
            <label className="input flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                ref={usernameRef}
                className="grow p-2 rounded bg-gray-900  "
                placeholder="Username"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="input flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                ref={passwordRef}
                className="grow p-2 rounded bg-gray-900"
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-outline btn-info w-full"
          >
            {loading ? "Logging in" : "Login"}
          </button>
          <Link to="/register" className="mt-2">Akkaunt yaratish!! <span className="text-purple-700">Register</span></Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
