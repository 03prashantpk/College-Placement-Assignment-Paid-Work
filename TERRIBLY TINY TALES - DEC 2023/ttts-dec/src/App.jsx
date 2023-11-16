import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";
import Posts from "./components/Posts/Posts";

const App = () =>{
  return (
    <div className="App">
        <Navbar/>
        <Header/>
        <ProfileDetails/>
        <Posts/>
    </div>
  )
}

export default App;