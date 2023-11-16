import React, { useState, useEffect } from 'react';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userIsLoggedIn = isLoggedIn();
      setLoggedIn(userIsLoggedIn);
    };

    checkLoggedInStatus();
  }, []);

  const isLoggedIn = () => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  };

  const login = () => {
    const token = 'your-authentication-token';
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return loggedIn ? <Home logout={logout} /> : <Login login={login} />;
};

export default App;
