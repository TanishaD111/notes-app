import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class Navigation extends React.Component {
    render() {
    
        return (
          <ul className="header nav justify-content-end homePageNav">
            
            <li className="nav-item">
              <a className="nav-link" href="notes">Notes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="todolist">To Do List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="calender">Calendar</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="profile">Profile</a>
            </li>
          </ul>
        );
      }
    
   
}


export default Navigation;