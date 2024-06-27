import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OurBooks.css';

const OurBooks = () => {
    const [carti, setCarti] = useState([]);
    useEffect(() => {
        const userType = localStorage.getItem("user");
        if (userType !== "admin") {
            window.location.href = "/error";
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8081/carti')
            .then(response => {
                setCarti(response.data);
            })
            .catch(error => {
                console.error('Eroare la preluarea datelor:', error);
            });
    }, []);

    return (
        <div className="containerOurBooks">
            <h2>Cartile bibliotecii</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nume</th>
                        <th>Autor</th>
                        <th>Tip</th>
                        <th>Stoc</th>
                        <th>Imagine</th>
                    </tr>
                </thead>
                <tbody>
                    {carti.map(cartea => (
                        <tr key={cartea.ID}>
                            <td>{cartea.ID}</td>
                            <td>{cartea.Nume}</td>
                            <td>{cartea.Autor}</td>
                            <td>{cartea.Tip}</td>
                            <td>{cartea.Stoc}</td>
                            <td><img src={cartea.URL}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OurBooks;