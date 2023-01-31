import React, { useState } from "react";
import logo from "../images/logo.png";
import css from "./Login.module.css";
import avatar from "../images/avatar.png";
import { FiMail } from "react-icons/fi";
import { AiTwotoneStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { request } from "../request";
import { logIn } from "../redux/redux.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await request.post("/user/login", {
        email,
        password,
      });
      dispatch(logIn());
      navigate("/home");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className={css.login}>
      <div className={css.signup}>
        <div className={css.left}>
          <div className={css.nav}>
            <img src={logo} alt="logo" />
          </div>
          <div className={css.contentContainer}>
            <div className={css.content}>
              <div className={css.stars}>
                <div className={css.starIcon}>
                  <div className={css.star}>
                    <AiTwotoneStar />
                  </div>
                </div>
                <div className={css.starIcon}>
                  <div className={css.star}>
                    <AiTwotoneStar />
                  </div>
                </div>
                <div className={css.starIcon}>
                  <div className={css.star}>
                    <AiTwotoneStar />
                  </div>
                </div>
                <div className={css.starIcon}>
                  <div className={css.star}>
                    <AiTwotoneStar />
                  </div>
                </div>
                <div className={css.starIcon}>
                  <div className={css.star}>
                    <AiTwotoneStar />
                  </div>
                </div>
              </div>
              <div className={css.title}>
                KLink has saved us thousands of hours of work. We’re able to
                spin up projects and features much faster.
              </div>
              <div className={css.quote}>
                <div className={css.avatar}>
                  <img src={avatar} alt="avatar" />
                </div>
                <div className={css.texts}>
                  <span className={css.name}>Lori Bryson</span>
                  <span className={css.supporting}>
                    Product Designer, Sisyphus
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={css.footer}>
            <span className={css.text}>© klinkenterprise.com</span>

            <div className={css.row}>
              <div className={css.mail}>
                <FiMail />
              </div>
              <span> help@klinkenterprise.com</span>
            </div>
          </div>
        </div>
        <div className={css.right}>
          <div className={css.rightContainer}>
            <div className={css.rightTexts}>
              <div className={css.rightText}>Log in</div>
              <div className={css.supportingText}>
                Welcome back! Please enter your details.
              </div>
            </div>
            <div className={css.rightContent}>
              <form onSubmit={handleClick}>
                <div className={css.input}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={css.input}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={css.action}>
                  <button type="submit">Sign in</button>
                </div>
              </form>
              {error && <div className={css.error}>Wrong Credentials!</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
