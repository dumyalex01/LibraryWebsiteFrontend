import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from 'victory';
import './Rezervari.css';

const Rezervari = () => {
    const [rezervari, setRezervari] = useState([]);
    useEffect(() => {
        const userType = localStorage.getItem("user");
        if (userType !== "admin") {
            window.location.href = "/error";
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8081/rezervari')
            .then(response => {
                setRezervari(response.data);
            })
            .catch(error => {
                console.error('Eroare la preluarea datelor:', error);
            });
    }, []);

    return (
       <div className="rezervariContainer">
            <div className="first-half">
                <h1>Rezervari</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID_Rezervare</th>
                            <th>Nume</th>
                            <th>Prenume</th>
                            <th>Luna</th>
                            <th>Zi</th>
                            <th>Ora</th>
                            <th>Minut</th>
                            <th>Nume Carte</th>
                            <th>Autor Carte</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rezervari.map(rezervare => (
                            <tr key={rezervare.Nume}>
                                <td>{rezervare.ID}</td>
                                <td>{rezervare.Nume}</td>
                                <td>{rezervare.Prenume}</td>
                                <td>{rezervare.Luna}</td>
                                <td>{rezervare.Zi}</td>
                                <td>{rezervare.Ora}</td>
                                <td>{rezervare.Minut}</td>
                                <td>{rezervare.NumeCarte}</td>
                                <td>{rezervare.AutorCarte}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
       </div>
    );
};

export default Rezervari;