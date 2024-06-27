import React, { useState } from 'react';
import './AutentichationPage.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const AutenthicationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        locality: '',
        dateOfBirth: '',
        idSeries: '',
        phone: '',
        email: '',
        username: '',
        password: ''
    });
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const autentificareAdmin = localStorage.getItem('autentificare_admin');

            const hashedPassword = CryptoJS.MD5(formData.password).toString();

            const requestData = autentificareAdmin
                ? { ...formData, password: hashedPassword, autentificare_admin: autentificareAdmin }
                : { ...formData, password: hashedPassword };

            const response = await axios.post('http://localhost:8081/autentificare', requestData);
            localStorage.setItem('autentificare_admin', 0);
            alert("Autentificare reusita!");
            await sleep(1000);
            window.location.href="/";
        
        } catch (error) {
            alert("Autentificare nereusita!");
        }
    };

    return (
        <div className="bigContainer">
            <div className="containerAut">
                <h2>Autentificare</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="input-field" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nume" required />
                        <input type="text" className="input-field" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Prenume" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="input-field" name="locality" value={formData.locality} onChange={handleChange} placeholder="Localitate" required />
                        <input type="date" className="input-field" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Data Nașterii" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="input-field" name="idSeries" value={formData.idSeries} onChange={handleChange} placeholder="Serie Buletin" required />
                        <input type="tel" className="input-field" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" required />
                    </div>
                    <div className="form-group">
                        <input type="email" className="input-field" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="input-field" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                        <input type="password" className="input-field" name="password" value={formData.password} onChange={handleChange} placeholder="Parola" required />
                    </div>
                    <button id="but1" type="submit">Autentificare</button>
                </form>
            </div>
        </div>
    );
};

export default AutenthicationPage;