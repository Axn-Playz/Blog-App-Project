import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../redux/Store";

const NavBar = () => {
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    dispatch(authActions.logOut())
    localStorage.clear();
  }
  return (
    <div>
      <nav className=" navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand app-name" to="/blog">
            || Blog App ||{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLogin && (<>
                <li className="nav-item">
                  <Link className="nav-link active bg-info " to="/post-blog">
                    Hello ' {localStorage.getItem('userName')}'
                  </Link>
                </li>
              </>)}
            </ul>
            {isLogin && (<>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item mx-4">
                  <Link className="nav-link active " to="/blog">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link className="nav-link active" to="/all-blog">
                    My Blogs
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link className="nav-link active" to="/post-blog">
                    Post  Blogs
                  </Link>
                </li>
              </ul>
            </>)}

            {!isLogin && (<>
              <div className="justify-content-center">
                <nav className="nav log-comp">
                  <Link className="nav-link  log-in" aria-current="page" to="/">
                    Login
                  </Link>
                  <Link className="nav-link log-out" to="/register">
                    Register
                  </Link>
                </nav>
              </div>
            </>)}
            {isLogin && (<>
              <nav className="nav ">
                <Link className="nav-link active bg-info text-dark fw-bold" aria-current="page" to="/" onClick={handleLogOut}>
                  Log Out
                </Link>
              </nav>
            </>)}


          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
