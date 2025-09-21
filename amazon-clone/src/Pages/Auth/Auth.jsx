import React from "react";
import { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utils/action.type";
import { ClipLoader } from "react-spinners";

// import LayOut from "../../components/LayOut/LayOut";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  // datacontext
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
const navigate = useNavigate();
  // auth handler
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      // firebase auth i
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/")
        })
        .catch((err) => {
          // console.log(err.message);
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate('/')
        })
        .catch((err) => {
          // console.log(err);
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  // console.log(password, email);
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG2.png"
          alt="amazon-logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              autoComplete="current-email"
            />
          </div>
          {/*  */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="black" size={15}></ClipLoader>
            ) : (
              " Sign In"
            )}
          </button>
        </form>
        {/* disclaimer */}
        <div className={classes.disclaimer}>
          <p>
            This site is an <em>Amazon clone</em> created for demonstration and
            educational purposes only. It is not affiliated with or endorsed by
            Amazon do not enter real payment or sensitive personal information
          </p>
        </div>
        {/* create account/new user btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={18}></ClipLoader>
          ) : (
            " Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
