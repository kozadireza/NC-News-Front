import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState("unauthorised");
  const [userID, setUserID] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = { user, userID, userAvatar, setUser };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
