import {Link} from 'react-router-dom'
import Navigation from './navigation.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Profile() {

    const [auth,setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    //const [email, setEmail] = useState('')
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

    /*
    useEffect(() => {
        axios.get('http://localhost:8080/home2')
        .then(res => {
            if(res.data.Status === "Success"){
                setEmail(res.data.email)
            } else{
                setMessage(res.data.Error)
            }
        })
        .then(err => console.log(err));
    }, [])*/

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
                        <div className="flex-c-row for-account-page">
                            <div className="flex-c-col">
                                <div className="container account-page-container border border-5">
                                    <div className="right-side">
                                        <i className="bi bi-file-person"></i>
                                        <h2 className="name-account">Hello {name} </h2>
                                        <button className='btn btn-default border w-50 logout-button btn' onClick={handleDelete}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    :
                    <div>
                        <h3 className="LogoutMessage">{message}</h3>
                        <h3 className="LogoutMessage">Login Now</h3>
                        <Link to="/login" className='btn btn-primary login' >Login</Link>
                    </div>
                }
            </div>
			
			
		</div>
    )
}
/*
<Link to="/" className='btn btn-default border w-50 bg-light rounded-0 text-decoration-none'>Log Out</Link>
*/