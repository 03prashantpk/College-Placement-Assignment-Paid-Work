import React, { useEffect, useState, useContext } from 'react';
import './App.scss';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/Sidebar/Sidebar';
import Display from './component/Display/Display';
import NotificationPopUp from './component/NotificationPopUp/NotificationPopUp';
import wall from './images/wall.jpg';
import wall2 from './images/wall2.jpg';
import AuthContext from './Auth/LoginAuthContext';

function App() {
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    document.title = 'Facebook';
  }, []);

  useEffect(() => {
    // change body background image
    // random image
    const images = [wall, wall2];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url(${randomImage})`;
  })

  const receivePageInfo = (pageInfo) => {
    setPageInfo(pageInfo);
  }

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    
    <>
    
      <div className="App">
        <NotificationPopUp />
        <Navbar />
        <div className="container">
          <Sidebar sendPageInfo={receivePageInfo}/>
          <Display value={pageInfo} />
        </div>
      </div>
      <p> Some of the endpoints are not working because of the access token & restrictions. <br />
      Mobo Web Technology - Assignment</p>
    </>
  
  );
}

export default App;
