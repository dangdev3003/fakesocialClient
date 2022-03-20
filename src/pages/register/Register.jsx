import { useRef, useContext } from "react";

import "./register.css";
import { RegisterCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      RegisterCall(user, dispatch);
    }
  };

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
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            />
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
            <input
              type="password"
              placeholder="Re-password"
              className="loginInput"
              ref={passwordAgain}
              required
            />
            <button className="loginButton">Sign Up</button>

            <button className="loginRegisterButton">Log in account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
