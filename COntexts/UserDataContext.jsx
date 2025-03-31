import { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState("unauthorised");
  const [userID, setUserID] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  const value = { user, userID, userAvatar, setUser };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
