import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RezervariOnorate.css';

const RezervariOnorate = () => {
    const [rezervari, setRezervari] = useState([]);

    useEffect(() => {
        const userType = localStorage.getItem("user");
        if (userType !== "admin") {
            window.location.href = "/error";
        }
        fetchRezervari();
    }, []);

    const fetchRezervari = async () => {
        try {
            const response = await axios.get('http://localhost:8081/rezervariNeonorate');
            setRezervari(response.data);
        } catch (error) {
            console.error('A apărut o eroare:', error);
        }
    };

    const onFinalizareClick = async (idRezervare, idCarte, idUtilizator) => {
        try {
            const response = await axios.post('http://localhost:8081/finalizareRezervare', {
                idRezervare,
                idCarte,
                idUtilizator
            });
            console.log('Răspuns de la server:', response.data);
            fetchRezervari();
        } catch (error) {
            console.error('A apărut o eroare:', error);
        }
    };

    return (
        <div className="rezervari-container">
            <h2 className="rezervari-title">Rezervări Neonorate</h2>
            <table className="rezervari-table">
                <thead>
                    <tr>
                        <th>ID Rezervare</th>
                        <th>ID Utilizator</th>
                        <th>ID Carte</th>
                        <th>Ora</th>
                        <th>Minut</th>
                        <th>Luna</th>
                        <th>Zi</th>
                        <th>Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    {rezervari.map(rezervare => (
                        <tr key={rezervare.ID}>
                            <td>{rezervare.ID}</td>
                            <td>{rezervare.ID_User}</td>
                            <td>{rezervare.ID_Carte}</td>
                            <td>{rezervare.Ora}</td>
                            <td>{rezervare.Minut}</td>
                            <td>{rezervare.Luna}</td>
                            <td>{rezervare.Zi}</td>
                            <td>
                                {rezervare.Finalizata === null && (
                                    <button className="finalizeaza-btn" onClick={() => onFinalizareClick(rezervare.ID, rezervare.ID_Carte, rezervare.ID_User)}>Finalizează</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RezervariOnorate;
