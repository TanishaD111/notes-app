import React from 'react'
import './App.css';


class Navigation extends React.Component {
    render() {
    
        return (
          <nav className={`navbar`}>
            <div className="navbar-brand">App Name!!</div>
            <div className="navbar-links">
              <a href="home">Home</a>
              <a href="about">About</a>
              <a href="notes">Notes</a>
              <a href="todolist">To Do List</a>
              <a href="calender">Calender</a>
            </div>
          </nav>
        );
      }
    
   
}


export default Navigation;