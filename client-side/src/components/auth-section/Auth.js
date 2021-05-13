import React, { useState } from 'react';
import axios from 'axios'

import '../../styles/auth-section.css'

const Auth = () => {

    const SERVER_URL = 'http://localhost:3030'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

   const handleSubmit = (e) => {
       e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(SERVER_URL + '/api/auth/login', 
        { 
            email: email,
            password: password
         })
            .then( res => {
                console.log(res)
            })

   }

    return (
        <div className="auth__section">
            <div className="auth__section__login">
                <form onSubmit={ handleSubmit }>
                    <div>username: <input onChange={ handleEmail } className="auth__section__input" type="text" placeholder="asd" /></div>
                    <br />
                    <div>password: <input onChange={ handlePassword } className="auth__section__input" type="text" placeholder="asd" /></div>
                    <br />
                    <button type="submit" className="auth__section__button">Login</button>                   
                </form>
            </div>
        </div>
    )
}

export default Auth
