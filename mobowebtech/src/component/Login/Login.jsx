// LoginWithFB.js
import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import AuthContext from '../../Auth/LoginAuthContext';
const LoginWithFB = () => {
  const { setUser } = useContext(AuthContext);

  const responseFacebook = (response) => {
    console.log(response);
    if (!response.error) {
      setUser(response); // Set user data to the context
    } else {
      console.log(response.error);
    } 
  };

  return (
    <div>
      <FacebookLogin
        appId="1103342474330424"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
};

export default LoginWithFB;
