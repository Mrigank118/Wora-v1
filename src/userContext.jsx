// UserProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Clear userId from localStorage
    setUserId(''); // Clear userId state
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
