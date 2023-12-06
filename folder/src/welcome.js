import React from 'react';
//import { Button } from 'bootstrap'; // Import Bootstrap Button component
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import axios from 'axios';
//import Navigation from './navigation.js'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Welcome() {
    return(
        <div className="welcome-page-container" align="center">
			<h1>Welcome!</h1>
			<h2>Please choose one option.</h2>
			<span>
                <Link to="/signup" className='btn'>Sign Up</Link>
                <Link to="/login" className='btn'>Log in</Link>
			</span>
			
		</div>
    )
}