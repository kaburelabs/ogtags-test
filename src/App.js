import './App.css';
// import "bootstrap/dist/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./components/Navbar.js";
// import OtherComponent from "./components/chart.js";
import { Switch, Route } from 'react-router-dom';
function App() {
  
  return (
    <div className="App">
      <NavbarComponent/> 
      <div id="container">
        <Switch> 
          <Route exact path="/">
            {/* <OtherComponent/> */}
          </Route>
          <Route path="/projects"> 
            <div>test projects</div>
          </Route>
          <Route path="/about">
            <div>test about</div>
          </Route>
          <Route path="/monitor">
            <div>test monitor</div>
          </Route>
        </Switch> 
      </div>
    </div>
  );
}


export default App;