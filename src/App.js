import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './Components/About/About';
import Game from './Components/Game/Game';
import Home from './Components/Home/Home';
import NoPage from './Components/NoPage/NoPage';
import Navigation from './Components/Navigation/Navigation';

function App() {

  const [ darkMode, setDarkMode ] = useState(() => {
    const dMode = localStorage.getItem("darkMode");
    return JSON.parse(dMode);
  });

  const darkModeChange = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  useEffect( () => {
    document.body.style.background = darkMode ? "#191A19" : "#EEEEEE";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode])

  return (
    <div>
      <Navigation darkModeChange={darkModeChange} darkMode={darkMode} />
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Home darkMode={darkMode}/>} />
            <Route path="game" element={<Game darkMode={darkMode} />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )  
}

export default App;
