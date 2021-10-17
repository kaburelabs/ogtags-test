import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./components/Navbar.js";
import Home from "./components/Home.js";
import Footer from "./components/Footer"
import ProjectListing from './components/ProjectList'
import BarChart from "./components/Top50BarChart.js";
import About from "./components/About.js";
import { Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';

function App() {

  const [click, setClick] = useState(0);
  const [slider, setSlider] = useState(30);
  const [sliderTitle, setSliderTitle] = useState(slider);

  const handleClick = () => {
    setClick(click+1)
    setSliderTitle(slider)
  }

  const handleSliderValue =(e) => {
    setSlider(prevState => e.target.value)
  }

  return (
    <div className="App">
      <NavbarComponent/>
      <div id="container">
        <Switch> 
          <Route exact path="/">
            <Home 
              handleClick={handleClick} 
              totalClicks={click}
              slider={slider}
              sliderTitle={sliderTitle}
              onChangeSlider={handleSliderValue}/>
          </Route>
          <Route path="/projects"> 
            <ProjectListing/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/monitor">
            <BarChart/>
          </Route>
        </Switch> 
      </div>
      <Footer/>
    </div>
  );
}


export default App;