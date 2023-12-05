import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Validation from './signupvalidation.js'
import axios from 'axios';

export default function Signup() {
    const [values,setValues] = useState({
        username:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post("http://localhost:8080/users", values)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/login');
                } else {
                    alert("Error");
                }
                
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className='container sign-up-form'>
            <div className='card sign-up-card'>
                <h2 className="sign-up-header text-center mb-5">Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <label className="form-label sign-up-name" htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='name' onChange={handleInput} className='form-control name' />
                        {errors.name && <span className='text-danger' >{errors.name}</span>}
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label sign-up-email" htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control sign-up-email' />
                        {errors.email && <span className='text-danger' >{errors.email}</span>}
                    </div>
                    <div className="form-outline mb-5">
                        <label className="form-label sign-up-password" htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control sign-up-password' />
                        {errors.password && <span className='text-danger' >{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn w-100 btn-lg sign-up-button'><strong>Sign in</strong></button>
                    <Link to="/login" className='btn w-100 btn-lg sign-up-button btn-default border'>Log in</Link>
                </form>
            </div>
        </div>
    )
}