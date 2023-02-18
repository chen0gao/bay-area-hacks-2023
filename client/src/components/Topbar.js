import "./css/main.css";
import "./css/css.css";
import "./css/css1.css";
import "uikit/dist/js/uikit.js";
import { EventHandler, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  var str_url = String(url);
  return (
    <div>
      <nav className="uk-navbar-container uk-letter-spacing-small">
        <div className="uk-container">
          <div className="uk-position-z-index" data-uk-navbar>
            <div className="uk-navbar-left">
              <Link to="/">
                <a className="uk-navbar-item uk-logo">Bon Appetit</a>
              </Link>
              <ul className="uk-navbar-nav uk-visible@m uk-margin-large-left">
                <li className={(url === "/" ? "uk-active" : "")}>
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li className={(url === "/Recipes" ? "uk-active" : "")}>
                  <Link to="/Recipes">
                    Recipes
                  </Link>
                </li>
                <li className={(str_url.startsWith("/Search") ? "uk-active" : "")}>
                  <Link to="/Search">
                    <span >Search</span>
                  </Link>
                </li>
                {/* <li>
                  <a href="contact.html">Contact</a>
                </li> */}
              </ul>
            </div>
            {/* <div className="uk-navbar-right">
              <ul className="uk-navbar-nav uk-visible@m">
                <li>
                  <a>Sign In</a>
                </li>
              </ul>
              <div className="uk-navbar-item">
                <div>
                  <a
                    className="uk-button uk-button-primary"
                    href="sign-up.html"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
              <a
                className="uk-navbar-toggle uk-hidden@m"
                href="#offcanvas"
                data-uk-toggle
              >
                <span data-uk-navbar-toggle-icon />
              </a>
            </div> */}
          </div>
        </div>
      </nav>
      {/* <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/Recipe/:recipeId' element={<Recipe recipeId={102} />} />
        <Route path='/Search/*' element={<Search />} />
      </Routes> */}
    </div>
  );
}
