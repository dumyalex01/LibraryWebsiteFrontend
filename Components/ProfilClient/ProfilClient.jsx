import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilClient.css';
import './workingContainer.css';
const ProfilClient = () => {

    useEffect(() => {
        const tip = localStorage.getItem('user');
        if (tip === 'admin') {
            window.location.href = "/error";
        }
    }, []);

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const sendActionToServer = async (tip,myInput) => {
        const userID = localStorage.getItem('id');
        console.log(myInput.value);
        try {
            const response = await axios.post('http://localhost:8081/updateUser', {
                userID: userID,
                actionType: tip,
                value: myInput.value
            });
            alert("E BINE");
            console.log('Răspuns de la server:', response.data);
        } catch (error) {
            alert("PROBLEME");
            console.error('A apărut o eroare la actualizarea informațiilor despre utilizator:', error);
        }
    };
    const butonAction = (tip) => {
        return () => {
            var workingContainer = document.getElementsByClassName("workingContainer")[0];
            workingContainer.innerHTML = '';
            workingContainer.style.background = "white";
            var h4 = document.createElement("h3");
            h4.textContent = "Puteti modifica";
    
            var label = document.createElement("label");
            label.id = "labelProfil";
            label.textContent = tip + ":";
    
            var input = document.createElement("input");
            input.type = "text";
            input.id="input2001";
    
            var button = document.createElement("button");
            button.textContent = "Salvează";
            button.addEventListener('click', () => sendActionToServer(tip,input));
    
            const userID = localStorage.getItem("id");
    
            // Trimitem un obiect cu userID și tip la endpoint-ul /detaliiUtilizator
            axios.post('http://localhost:8081/detaliiUtilizator', { userID: userID ,tip: tip })
                .then(response => {
                    const detalii = response.data;
    
                    if (detalii.length > 0) {
                        label.textContent += detalii[0][tip];
                    }
                })
                .catch(error => {
                    console.error('A apărut o eroare la solicitarea informațiilor despre utilizator:', error);
                });
    
            workingContainer.appendChild(h4);
            workingContainer.appendChild(label);
            workingContainer.appendChild(input);
            workingContainer.appendChild(button);
        };
    };
    
    
    return(
        <div className="containerProfilClient">
            <h1>Alegeti detaliul de care sunteti interesat</h1>
            <div className="navbarProfilClient">
                <ul>
                    <li><button onClick={butonAction("Nume")}>Nume</button></li>
                    <li><button onClick={butonAction("Prenume")}>Prenume</button></li>
                    <li><button onClick={butonAction("Localitate")}>Localitate</button></li>
                    <li><button onClick={butonAction("SerieBuletin")}>Serie Buletin</button></li>
                    <li><button onClick={butonAction("Telefon")}>Telefon</button></li>
                    <li><button onClick={butonAction("Email")}>Email</button></li>
                    <li><button onClick={butonAction("Parola")}>Parola</button></li>
                </ul>
            </div>
            <div className="workingContainer">

            </div>
        </div>
    );
};

export default ProfilClient;