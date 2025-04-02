import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../COntexts/UserDataContext";

useNavigate;
function Header() {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  function handleLogin() {
    nav("/login_page");
  }
  function handleLogout() {
    setUser("unauthorised");
  }
  function handleHomePage() {
    nav("/");
  }
  return (
    <header>
      <button onClick={handleHomePage}>HomePage</button>
      <h1>
        Welcome {user !== "unauthorised" ? user.username : null} to NC News
      </h1>
      {user === "unauthorised" ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
}
export default Header;
