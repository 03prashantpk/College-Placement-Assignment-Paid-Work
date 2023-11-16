import { useEffect } from 'react';
// import './CSS/custom.css'
import './CSS/customlite.css'
import ShowWords from './Components/ShowWords';
import stickey from './images/stickey.png';

function App() {
  useEffect(() => {
    document.title = "Typing Practice - App"
  });

  return (
    <div className="App">
      <h1>Typing Practice - App</h1>
      <ShowWords/>
      <img src={stickey} className='stickey' alt="stickey"></img>
      <div className='mobile'>

      </div>
      <p className='credit'>Designed and Developed by - Prashant Kumar - <a href='https://enally.in' rel="noreferrer" target='_blank' >Enally.in</a></p>
    </div>
  );
}

export default App;
