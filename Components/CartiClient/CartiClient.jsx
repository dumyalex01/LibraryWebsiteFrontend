import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CartiClient.css"

const CartiClient = () => {

  const [rezervariCartiActiv, setRezervariCartiActiv] = useState([]);
  const [rezervariCartiInactive, setRezervariCartiInactive] = useState([]);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    
    const tip = localStorage.getItem('user');
    
        if (tip === 'admin') {
            window.location.href =  "/error";
        }
    const userId = localStorage.getItem('id'); 
    console.log(userId);
    if (userId) { 
      axios.post('http://localhost:8081/rezervariActive', { id: userId })
        .then(response => {
          setRezervariCartiActiv(response.data);
        })
        .catch(error => {
          console.error('Eroare la obținerea rezervărilor active:', error);
        });
  
      axios.post('http://localhost:8081/rezervariInactive', { id: userId })
        .then(response => {
          setRezervariCartiInactive(response.data);
        })
        .catch(error => {
          console.error('Eroare la obținerea rezervărilor inactive:', error);
        });
    }
  }, []);

  return (
    <div className="containerCartiClient">
      <div className="rezervariCartiActiv">
        <h2>Carti Active</h2>
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Autor</th>
              <th>Luna</th>
              <th>Zi</th>
              <th>Ora</th>
            </tr>
          </thead>
          <tbody>
            {rezervariCartiActiv.map((rezervare, index) => (
              <tr key={index}>
                <td>{rezervare.NumeCarte}</td>
                <td>{rezervare.AutorCarte}</td>
                <td>{rezervare.Luna}</td>
                <td>{rezervare.Zi}</td>
                <td>{rezervare.Ora}:{rezervare.Minut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rezervariCartiInactive">
        <h2>Carti Predate</h2>
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Autor</th>
              <th>Luna</th>
              <th>Zi</th>
              <th>Ora</th>
            </tr>
          </thead>
          <tbody>
            {rezervariCartiInactive.map((rezervare, index) => (
              <tr key={index}>
                <td>{rezervare.NumeCarte}</td>
                <td>{rezervare.AutorCarte}</td>
                <td>{rezervare.Luna}</td>
                <td>{rezervare.Zi}</td>
                <td>{rezervare.Ora}:{rezervare.Minut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartiClient;