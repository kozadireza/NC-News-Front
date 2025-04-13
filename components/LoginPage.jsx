import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../COntexts/UserDataContext";

import { useNavigate } from "react-router-dom";
import { getUserByName } from "../Utils/data.fetching";

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const [isInputValid, setIsInputValid] = useState(true);
  const [localUserName, setLocalUserName] = useState("");
  const [isUserExist, setIsUserExist] = useState(false);
  const [input, setInput] = useState("");

  function handleInput(event) {
    setInput(event.target.value);
  }
  function handleLoginData(event) {
    event.preventDefault();
    const regex = /^(?=[a-zA-Z0-9_]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    //validation of userName
    if (!regex.test(input) && input.length > 0) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
      if (input.length > 0) {
        setLocalUserName(input);
      }
    }
  }
  ///is User in DB
  useEffect(() => {
    if (localUserName.length > 0) {
      async function getUserInf(localUserName) {
        try {
          const userInf = await getUserByName(localUserName);
          setUser(userInf);
          navigate("/");
        } catch {
          setIsUserExist(false);
        }
      }
      getUserInf(localUserName);
    } else {
      setIsUserExist(false);
    }
    setInput("");
  }, [localUserName]);

  return (
    <main
      style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        borderTop: "solid 2px #0000004d",
        alignItems: "center",
        height: "400px",
      }}
    >
      <h2>Please log in!</h2>
      <form
        action="http://localhost:5173/"
        method="get"
        name="LoginForm"
        onSubmit={handleLoginData}
      >
        <label htmlFor="Username">Username</label>
        <input
          onChange={handleInput}
          type="text"
          name="Username"
          id="UserNameInput"
          required
          value={input}
        />
        <button type="submit">LogIn</button>
        {!isInputValid ? <p role="alert">Invalid UserName!</p> : null}
      </form>
    </main>
  );
}
export default LoginPage;
