import { useNavigate } from "react-router-dom";

useNavigate;
function Header() {
  const nav = useNavigate();
  function handleHomePage() {
    nav("/");
  }
  return (
    <header>
      <button onClick={handleHomePage}>HomePage</button>
      <h1>Welcome to NC News</h1>
    </header>
  );
}
export default Header;
