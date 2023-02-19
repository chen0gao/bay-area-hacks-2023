import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export default function SignUp() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user_info")) {
      navigate("/");
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div class="uk-grid-collapse" data-uk-grid="">
        <div
          class="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center"
          data-uk-height-viewport=""
        >
          <div class="uk-width-3-4@s">
            <div class="uk-text-center uk-margin-medium-bottom">
              <h1 class="uk-h2 uk-letter-spacing-small">Create an Account</h1>
            </div>
            <div class="uk-text-center uk-margin">
              <p class="uk-margin-remove">Use your email for registration:</p>
            </div>
            <form class="uk-text-center" onSubmit={handleClick}>
              <div class="uk-width-1-1 uk-margin">
                <label class="uk-form-label">User Name</label>
                <input
                  class="uk-input uk-form-large uk-border-pill uk-text-center"
                  type="text"
                  required
                  placeholder="User Name"
                  ref={username}
                />
              </div>
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
                  placeholder="type your password"
                  ref={password}
                />
              </div>
              <div class="uk-width-1-1 uk-margin">
                <label class="uk-form-label">Confirm Password</label>
                <input
                  class="uk-input uk-form-large uk-border-pill uk-text-center"
                  type="password"
                  required
                  minLength={6}
                  placeholder="re-type your password"
                  ref={passwordAgain}
                />
              </div>
              <div class="uk-width-1-1 uk-text-center">
                <Button variant="contained" type="submit">Sign Up</Button>
                {/* <button class="uk-button uk-button-primary uk-button-large">
                  Sign Up
                </button> */}
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
              src="https://www.fodors.com/wp-content/uploads/2020/07/jake-blucker-tMzCrBkM99Y-unsplash-desktop-crop.jpg"
              width="1200"
              height="1800"
              alt=""
            />
            <div class="uk-overlay-primary uk-position-cover uk-border-rounded-large"></div>
            <div class="uk-overlay uk-position-bottom uk-dark">
              <div class="uk-text-center">
                <h2 class="uk-letter-spacing-small">Welcome Back</h2>
              </div>
              <div class="uk-margin-top uk-margin-medium-bottom uk-text-center">
                <p>
                  Already signed up, enter your details and start cooking your
                  first meal today
                </p>
                <div class="uk-width-1-1 uk-text-center">
                  <Link to="/">
                    <Button variant="contained">Sign In</Button>
                    {/* <a class="uk-button uk-button-primary uk-button-large">
                      Sign In
                    </a> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
