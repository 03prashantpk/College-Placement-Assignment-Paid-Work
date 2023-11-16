import './CSS/custom.css'
import './App.css';
import ShowWords from './Components/ShowWords';
import wire from './images/wire.png';

import React, {useEffect} from 'react';

function App() {
  useEffect(() => {
    document.title = "Touch Typing Test - React App"
  });

  return (
    <div className="App">
      <h1>Touch Typing Test - React App</h1>
      <ShowWords/>
      <img src={wire} className='wire' alt="typingtest.com logo"/>
      <p className='credit'>Designed and Developed by - Prashant Kumar - <a rel="noreferrer" href='https://enally.in' target='_blank' >Enally.in</a></p>

    </div>
  );
}

export default App;
