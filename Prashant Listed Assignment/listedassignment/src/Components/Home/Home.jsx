import React, { useEffect, useState, useCallback } from 'react'
import { getAuth } from 'firebase/auth';
import usersData from '../../Data/Users.json';
import Sidebar from '../Sidebar/Sidebar';
import './SCSS/Home.css';
import Navbar from '../Navbar/Navbar';
import StatsCard from './StatsCard';
import Charts from './Charts';

const Home = ({ logout}) => {
  const [maxPopulation, setMaxPopulation] = useState(0);
  const [user, setUser] = useState(null);
  const [savedUsers, setSavedUsers] = useState(usersData);
  const auth = getAuth();

  const handleMaxPopulation = (maxPopulation) => {
    setMaxPopulation(maxPopulation);
  };

  const saveUser = useCallback((user) => {
    const newUser = {
      id: user?.uid,
      name: user?.displayName,
      imageUrl: user?.photoURL,
    };

    const existingUser = savedUsers.find((existingUser) => existingUser.id === newUser.id);

    if (!existingUser) {
      setSavedUsers((prevUsers) => [...prevUsers, newUser]);
    }
  }, [savedUsers]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
        saveUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, saveUser]);

  const handleLogout = () => {
    logout();
  };

  const userEmail = user?.email;
  const userName = user?.displayName;
  const userImage = user?.photoURL;
  const copyrightYear = new Date().getFullYear();

  useEffect(() => {
    document.title = userName ? `${userName.split(' ')[0]} - Board.` : 'Dashboard - Board.';
  }, [userName]);
  

  return (
    <div className='home'>
      <Sidebar />

      <div className="main">
        <Navbar saveUser={saveUser} logout={handleLogout} userEmail={userEmail} userName={userName} userImage={userImage} savedUsers={savedUsers}  />
        <StatsCard maxPopulation={maxPopulation}/>
        <Charts onMaxPopulation={handleMaxPopulation} />
        
        <p className='credit'><a target='_blank' rel="noreferrer" href="https://enally.in/projects/">Checkout More Projects</a> </p>
        <p className='credit'>Similar Dashboard: <a target='_blank' rel="noreferrer" href="https://classroombucket-v1.onrender.com/">Classroom Bucket</a> - example@mail.com || password123 </p>
        <p className='credit'>Copyright © {copyrightYear} Board.</p>

      </div>
    </div>
  );
};

export default Home;
