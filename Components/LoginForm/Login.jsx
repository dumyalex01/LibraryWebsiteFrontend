import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import CryptoJS from 'crypto-js';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        

        const hashedPassword = CryptoJS.MD5(password).toString();

        axios.post('http://localhost:8081/utilizatori', { username, password: hashedPassword })
            .then(res => {
                console.log(res.data.message);
                if (res.data.message === 1) {
                    const userID = res.data.userID; 
                    localStorage.setItem('id', userID);
                    localStorage.setItem("user", "admin");
                    window.location.href = "/admin"; 
                } else if (res.data.message === 2) {
                    const userID = res.data.userID; 
                    localStorage.setItem('id', userID);
                    localStorage.setItem("user", "client");
                    window.location.href = "/client";
                }
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    window.alert("Nu există această combinație de nume de utilizator și parolă.");
                } else {
                    window.alert("A apărut o eroare. Vă rugăm să încercați din nou mai târziu.");
                }
            });
    };
    
    const AdminHandler = () => {
        window.location.href = "/admin";
    };
    
    const GuestHandler = () => {
        window.location.href = "/guest";
        localStorage.setItem("user", "guest");
    };

    return (
        <div className="container2">
            <div className='wrapper'>
                <div className="atm-photo"></div>
                <div className="diagonal-text">ATM DIGITALIZED LIBRARY</div>
                <h1>Login Aici!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="text" placeholder='Username' value={username} onChange={(z) => setUsername(z.target.value)} />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' value={password} onChange={(z) => setPassword(z.target.value)} />
                        <FaLock className="icon"/>
                    </div>
                    
                    <button type="submit">Login</button>
                    <button type="button" onClick={GuestHandler}>Oaspete</button>
                    
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
