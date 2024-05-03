// AuthProvider.js
import React, { useState } from 'react';
import AuthContext from './LoginAuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user logged in

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
