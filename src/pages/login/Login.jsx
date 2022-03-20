import { useContext, useRef } from "react";
import { Link } from "react-router-dom";

import "./login.css";
import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    LoginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Phakesocial</h3>
          <span className="loginDesc">
            Connect phake world around you on Phakesocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
            />
            <button className="loginButton">
              {isFetching ? "loading" : "Login"}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <Link to="/register" className="loginRegisterButton">
              Create a new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
