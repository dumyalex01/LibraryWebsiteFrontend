import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './Notificari.css';

const Notificari = () => {
  const [cartiExpirare, setCartiExpirare] = useState([]);
  const [notificari, setNotificari] = useState([]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const tip = localStorage.getItem('user');
    
        if (tip === 'admin') {
            window.location.href =  "/error";
        }
    const userID = localStorage.getItem('id');
    const userType = localStorage.getItem('user');
    setUserType(userType);

    if (!userID) {
      console.error('ID-ul utilizatorului nu este disponibil.');
      return;
    }

    axios.post('http://localhost:8081/rezervariExpirare', { userID })
      .then(response => {
        setCartiExpirare(response.data);
      })
      .catch(error => {
        console.error('Eroare la obținerea listei de cărți cu expirare:', error);
      });

    axios.post('http://localhost:8081/notificariUtilizator', { userID })
      .then(response => {
        setNotificari(response.data);
      })
      .catch(error => {
        console.error('Eroare la obținerea listei de notificări pentru utilizator:', error);
      });
  }, []);

  return (
    <div className="notificari-container">
      <Carousel controls={false} className="carousel-container">
        {cartiExpirare.map((carte) => (
          <Carousel.Item key={carte.ID}>
            <div className="notificare">
              <p><strong>{carte.Nume}:</strong> {carte.Autor}</p>
              <p>Rezervarea expiră în curând!</p>
            </div>
          </Carousel.Item>
        ))}
        {notificari.map((notif) => (
          <Carousel.Item key={notif.ID}>
            <div className="notificare">
              <p className="notification-message">{notif.Mesaj}</p>
            </div>
          </Carousel.Item>
        ))}
        {userType === 'guest' && (
          <Carousel.Item>
            <div className="notificare invitation-message">
              <p>Bine ați venit! Vă invităm să vă autentificați pentru a avea acces la funcționalitățile complete ale site-ului.</p>
              <a href="/autentif">Apasati aici!</a>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default Notificari;