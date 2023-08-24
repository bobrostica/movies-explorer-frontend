import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

const AppContextProvider = ({ children }) => {
  const state = useState({});
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState can't be used without AppContextProvider");
  }
  return context;
};

export { AppContextProvider, useAppState };
