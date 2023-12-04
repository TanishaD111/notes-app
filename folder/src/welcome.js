import React from 'react';
//import { Button } from 'bootstrap'; // Import Bootstrap Button component
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import axios from 'axios';
//import Navigation from './navigation.js'
import {Link} from 'react-router-dom'

export default function Welcome() {
    return(
        <div className="welcome-page-container" align="center">
			<h1>Welcome to *insert app name*!</h1>
			<h2>Please choose one option.</h2>
			<span>
                <Link to="/signup" className='btn btn-default border w-50 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                <Link to="/login" className='btn btn-default border w-50 bg-light rounded-0 text-decoration-none'>Log in</Link>
			</span>
			
		</div>
    )
}