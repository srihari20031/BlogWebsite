import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:3000/api/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const userName = userInfo?.username;

  return (
    <header>
      <Link to="/" className="a logo">
        My Blog
      </Link>
      <nav className="navbar">
        {userName && (
          <>
            <Link to="/create" className="a">
              Create New Post
            </Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login" className="a">
              Login
            </Link>
            <Link to="/signup" className="a">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
