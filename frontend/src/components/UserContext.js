import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const login = () => {
    // Your login logic here
    setLogin(true);
};

const logout = () => {
    // Your logout logic her
    localStorage.clear();
    setLogin(false);
  };

  return (
    <UserContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
