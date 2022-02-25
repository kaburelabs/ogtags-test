import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./components/Navbar.js";
import Home from "./components/Home.js";
import Footer from "./components/Footer"
// import ProjectListing from './components/ProjectList'
import ProjectListing from './components/projectListNew'
import BarChart from "./components/Top50BarChart.js";
import About from "./components/About.js";
import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';

export const dataContext = createContext('data');

function App() {

  const [click, setClick] = useState(0);
  const [slider, setSlider] = useState(30);
  const [sliderTitle, setSliderTitle] = useState(slider);
  const [responseData, setResponseData] = useState(null);
  const [totalProjs, setTotalProjs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cards = await fetch(
        'https://fastapi-hrk.herokuapp.com/projects/cards',
      );
      const projs = await fetch(
        'https://fastapi-hrk.herokuapp.com/projects/list',
      );
      const jsonCards = await cards.json();
      const jsonList = await projs.json();
      setResponseData(jsonCards);
      setTotalProjs(jsonList)
    };
    fetchData();
  }, []);

  // console.log("response and total projs", responseData, totalProjs)

  const handleClick = () => {
    setClick(click + 1)
    setSliderTitle(slider)
  }

  const handleSliderValue = (e) => {
    setSlider(prevState => e.target.value)
  }

  return (
    <div className="App">
      <NavbarComponent />
      <dataContext.Provider value={{ responseData, totalProjs }}>
        <div id="container">
          <Switch>
            <Route exact path="/">
              <Home
                handleClick={handleClick}
                totalClicks={click}
                slider={slider}
                sliderTitle={sliderTitle}
                onChangeSlider={handleSliderValue} />
            </Route>
            <Route path="/projects">
              {/* <ProjectListing /> */}
              <ProjectListing />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/monitor">
              <BarChart />
            </Route>
          </Switch>
        </div>
      </dataContext.Provider>
      <Footer />
    </div>
  );
}


export default App;