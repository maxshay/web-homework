import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginButton({ type, setShowLogin }) {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");

  const handleLogin = () => {
    if (loginId !== "") {
      if (type === "user") {
        navigate(`user/${loginId}`);
      } else {
        navigate(`merchant/${loginId}`);
      }
    }
  };

  return (
    <div className="loginButtonPositioning p-2 bg-gray-100 border border-gray-100 rounded-sm shadow">
      <div class="mb-4">
        <div className="flex justify-between mb-2">
          <label class="block text-gray-700 text-sm font-bold" for="username">
            {type === "user" ? "User login" : "Merchant login"}
          </label>
          <button
            className="font-bold px-1 -mt-1"
            onClick={() => setShowLogin(-1)}
          >
            x
          </button>
        </div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder={`Enter ${type} id`}
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
      </div>
      <button
        disabled={loginId === ""}
        className="mainButton"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

function Navigation() {
  const [showLogin, setShowLogin] = useState(-1);

  return (
    <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 p-3">
      <div className="logo my-4">
        <div className="w-3/4 mx-auto">
          <img
            src="https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19.png"
            alt="divvy logo"
          />
        </div>
      </div>

      <nav className="my-4">
        <ul className="">
          <li className="mb-3">
            <p className="lineAround">main</p>
          </li>
          <li>
            <Link to="/">
              <button className="mainButton w-full font-bold">Home</button>
            </Link>
          </li>

          <li className="mt-8 mb-3">
            <p className="lineAround">admin</p>
          </li>

          <li className="mt-3">
            <Link to="/transactions">
              <button className="mainButton w-full font-bold">
                Transactions
              </button>
            </Link>
          </li>
          <li className="mt-3">
            <Link to="/participients">
              <button className="mainButton w-full font-bold">
                Users nd Merchants
              </button>
            </Link>
          </li>

          <li className="mt-8 mb-3">
            <p className="lineAround">users</p>
          </li>

          <li className="mt-3 relative">
            <button
              className="mainButton w-full font-bold"
              onClick={() => setShowLogin(0)}
            >
              User "Login"
            </button>
            {showLogin == 0 && (
              <LoginButton type="user" setShowLogin={setShowLogin} />
            )}
          </li>
          <li className="mt-3 relative">
            <button
              className="mainButton w-full font-bold"
              onClick={() => setShowLogin(1)}
            >
              Merchant "Login"
            </button>
            {showLogin == 1 && (
              <LoginButton type="merchant" setShowLogin={setShowLogin} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export { Navigation };
