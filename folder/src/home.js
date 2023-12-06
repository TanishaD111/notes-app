import React, {useState, useEffect} from 'react';
//import { Button } from 'bootstrap'; // Import Bootstrap Button component
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import axios from 'axios';
import Navigation from './navigation.js'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function Home() {
    
    const [auth,setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8080/home')
        .then(res => {
            if(res.data.Status === "Success"){
                setAuth(true)
                setName(res.data.name)
            } else{
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err => console.log(err));
    }, [])

    const handleDelete = () => {
        axios.get('http://localhost:8080/logout')
        .then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return(
        <div>
            <Navigation />
            <div>
                {
                    auth ?
                    <div>
                        <h3>You are authorized {name}</h3>
                        <button className='btn btn-danger' onClick={handleDelete} >Logout</button>
                    </div>
                    :
                    <div>
                        <h3>{message}</h3>
                        <h3>Login Now</h3>
                        <Link to="/login" className='btn btn-primary' >Login</Link>
                    </div>
                }
            </div>
        </div>
    )
}