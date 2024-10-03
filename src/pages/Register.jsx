import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 6;
  };

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("User is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }
    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid. It must be at least 6 characters long.");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }
    if (passwordRef.current.value != repasswordRef.current.value) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  }

  function handRegister(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const registeredUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registeredUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "User registered successfully!") {
          navigate("/login");
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          repasswordRef.current.value = "";
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-700">
        <h1 className="text-4xl text-center font-extrabold text-blue-500 mb-6">
          Register
        </h1>
        <form className="space-y-6" onSubmit={handRegister}>
          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              ref={usernameRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Username"
            />
          </div>

          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              ref={emailRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Email"
            />
          </div>

          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            <input
              type="password"
              ref={passwordRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Create password"
            />
          </div>

          <div className="flex items-center border-b border-gray-600 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            <input
              type="password"
              ref={repasswordRef}
              className="bg-transparent w-full ml-4 text-gray-300 focus:outline-none"
              placeholder="Confirm password"
            />
          </div>

          <div className="">
            <button
              disabled={loading}
              className="btn btn-outline btn-info w-full"
            >
              {loading ? "Registering" : "Register"}
            </button>
            <Link to="/login" className="text-gray-400 mt-4 block">
            Akkauntingiz bormi?  <span className="text-red-600">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
