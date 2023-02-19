import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { login } from "../apiCalls";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  // const {user, isFetching, dispatch} = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("user_info")) {
      navigate("/");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const result = login(email.current.value, password.current.value);
    const save = async () => {
      const user = await result;
      localStorage.setItem("user_info", JSON.stringify(user));
    };
    save();
    navigate("/");
  };
  return (
    <div class="uk-grid-collapse" data-uk-grid="">
      <div
        class="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center"
        data-uk-height-viewport=""
      >
        <div class="uk-width-3-4@s">
          <div class="uk-text-center uk-margin-bottom">
            <p class="uk-logo uk-text-primary uk-text-bold">Trip</p>
          </div>
          <div class="uk-text-center uk-margin-medium-bottom">
            <h1 class="uk-h2 uk-letter-spacing-small">Sign In to Trip</h1>
          </div>
          <div class="uk-text-center uk-margin">
            <p class="uk-margin-remove">use your email account:</p>
          </div>
          <form class="uk-text-center" onSubmit={handleClick}>
            <div class="uk-width-1-1 uk-margin">
              <label class="uk-form-label">Email</label>
              <input
                class="uk-input uk-form-large uk-border-pill uk-text-center"
                type="email"
                required
                placeholder="Email"
                ref={email}
              />
            </div>
            <div class="uk-width-1-1 uk-margin">
              <label class="uk-form-label">Password</label>
              <input
                class="uk-input uk-form-large uk-border-pill uk-text-center"
                type="password"
                required
                minLength={6}
                placeholder="Password"
                ref={password}
              />
            </div>
            <div class="uk-width-1-1 uk-text-center">
              <button
                class="uk-button uk-button-primary uk-button-large"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        class="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light"
        data-uk-height-viewport=""
      >
        <div class="uk-inline">
          <img
            class="uk-border-rounded-large"
            src="https://lp-cms-production.imgix.net/2022-09/shutterstock_1821773909.jpg?auto=format&q=75&w=3840"
            width="1200"
            height="1800"
            alt=""
          />
          <div class="uk-overlay-primary uk-position-cover uk-border-rounded-large"></div>
          <div class="uk-overlay uk-position-bottom uk-dark">
            <div class="uk-text-center">
              <h2 class="uk-letter-spacing-small">Hello There, Join Us</h2>
            </div>
            <div class="uk-margin-top uk-margin-medium-bottom uk-text-center">
              <p>Enter your personal details and join our community</p>
              <div class="uk-width-1-1 uk-text-center">
                <Link to="/register">
                  <button class="uk-button uk-button-primary uk-button-large">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
