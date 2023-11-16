import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Courses from './components/Courses/Courses';
import SpecialPrograms from './components/Special/SpecialPrograms';
import ImageSlider from './components/imageSlider/ImageSlider';
import TopLocations from './components/TopLocations/TopLocations';
import TopPartners from './components/TopPatners/TopPartners';
import ApplyNow from './components/Assets/ApplyNow/ApplyNow';
import StepsTab from './components/StepsTab/StepsTab';
import StudentsCollage from './components/StudentsCollage/StudentsCollage';
import About from './components/About/About';
import Footer from './components/Assets/Footer/Footer';

function App() {
  const titles = [
    'Admission Jockey',
    'Developed by Prashant Admission Jockey',
  ];
  let currentIndex = 0;

  const [title, setTitle] = useState(titles[currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      setTitle(titles[currentIndex]);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Navbar />
      <Hero />
      <Courses />
      <SpecialPrograms />
      <ImageSlider />
      <TopLocations />
      <TopPartners />
      <ApplyNow />
      <StepsTab />
      <StudentsCollage />
      <About />
      <Footer />
    </>
  );
}

export default App;
