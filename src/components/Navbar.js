import React from "react"
import { NavLink } from "react-router-dom"

function NavbarComponent() {

  const activeStyle={
    fontWeight: "bold",
    color: "black"
  }

  return (
    <div>
        <div className="navbarParent">
            <div>
                CNFT Twitter Monitor
            </div>
            <div className="navbarItems">
                <NavLink exact to="/" className="linkStyle" 
                      activeStyle={activeStyle}>Home</NavLink>
                <NavLink to="/monitor" className="linkStyle" activeStyle={activeStyle}>Twitter Monitor</NavLink>
                <NavLink to="/projects" className="linkStyle" activeStyle={activeStyle}>NFT Projects</NavLink>
                <NavLink to="/About" className="linkStyle" activeStyle={activeStyle}>About</NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavbarComponent
