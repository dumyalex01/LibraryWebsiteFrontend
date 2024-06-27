import React from 'react';
import axios from 'axios';
import './Template.css';

const Template = ({ bookName, bookAuthor, bookStock, bookUrl }) => {
    const handleReservation = () => {
        const userId = localStorage.getItem('id');
        if (bookStock === 0) {
            alert("Stocul pentru această carte este epuizat.");
            return;
        }
        axios.post('http://localhost:8081/rezervare', { bookName, userId })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error('Eroare la rezervare:', error);
             
            });
    };

    return (
        <div className="book-card">
            <img src={bookUrl} alt={bookName} />
            <div className="book-details">
                <p id="name">{bookName}</p>
                <p>Autor: {bookAuthor}</p>
                <p>Stoc: {bookStock}</p>
                <button id="Rezerva" onClick={handleReservation}>Rezerva</button>
            </div>
        </div>
    );
};

export default Template;
