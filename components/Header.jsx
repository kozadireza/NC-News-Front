import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../COntexts/UserDataContext";
import logo from "../assets/Buttons/preview.png";
useNavigate;
function Header({ setFilterAndSortParams }) {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  function handleLogin() {
    nav("/login_page");
  }
  function handleLogout() {
    setUser("unauthorised");
  }
  function handleHomePage() {
    setFilterAndSortParams({ order: null, topic: null, sort_by: null });
    nav("/");
  }
  console.log(user.avatar_url);
  return (
    <header>
      <Link to="/">
        <div
          className="logo"
          onClick={handleHomePage}
          style={{
            backgroundImage: `url(${logo})`,
            height: "150px",
            width: "150px",
            padding: "0px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </Link>

      <h1>
        Welcome {user !== "unauthorised" ? user.username : null} to NC News
      </h1>
      <div>
        {user === "unauthorised" ? (
          <div>
            <div className="userIconLogin" onClick={handleLogin}></div>
            <div onClick={handleLogin}>Login</div>
          </div>
        ) : (
          <div>
            <div
              className="userFrame"
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                backgroundImage: `url(${user.avatar_url})`,
                height: "80px",
                width: "80px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "50%",
              }}
            ></div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
