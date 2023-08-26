import React, { createContext, useContext, useState } from 'react';

const UserStateContext = createContext();

const UserContextProvider = ({ children }) => {
  const currentUser = useState({});
  return (
    <UserStateContext.Provider value={currentUser}>
      {children}
    </UserStateContext.Provider>
  );
};

const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState can't be used without UserContextProvider");
  }
  return context;
};

export { UserContextProvider, useUserState };
