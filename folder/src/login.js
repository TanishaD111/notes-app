import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Validation from './loginvalidation.js'
import axios from 'axios';

export default function Login() {
    const [values,setValues] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === ""){
            axios.post("http://localhost:8080/login", values)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/home');
                } else {
                    alert(res.data.Error);
                }
                
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="container login-form">
            <div className='card login-card'>
                <h2 className="login-header text-center mb-5">Log In</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-outline mb-4'>
                        <label className="form-label login-username" htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className="form-control login-email" />
                        {errors.email && <span className='text-danger' >{errors.email}</span>}
                    </div>
                    <div className='form-outline mb-5'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className="form-control login-password" />
                        {errors.password && <span className='text-danger' >{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn w-100 btn-lg login-button'><strong>Log in</strong></button>
                    <Link to="/signup" className='btn w-100 btn-lg sign-up-button btn-default border'>Sign Up</Link>
                </form>
            </div>
        </div>
    )
}