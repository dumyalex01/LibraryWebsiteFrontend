import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilAdmin.css';

function functieAfisare() {
    var workingContainer = document.getElementsByClassName("containerButon")[0];
    workingContainer.innerHTML = '';

    var form = document.createElement("form");

    var selector = document.createElement("select");
    selector.id = "selector";
    selector.name = "selector";
    selector.className = "selectorClass";
    const selectorOptions = [
        { value: "Nume", text: "Nume" },
        { value: "Prenume", text: "Prenume" },
        { value: "Email", text: "Email" },
        { value: "Telefon", text: "Telefon" },
        { value: "Localitate", text: "Localitate" }
    ];
    selectorOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        selector.appendChild(optionElement);
    });
    form.appendChild(selector);

    // Input
    var input = document.createElement("input");
    input.type = "text";
    input.id = "newValue";
    input.name = "newValue";
    input.placeholder = "Introduceți noua valoare";
    form.appendChild(input);

    var submitButton = document.createElement("button");
    submitButton.id="butonModificare";
    submitButton.type = "button";
    submitButton.textContent = "Modifica";
    submitButton.addEventListener("click", handleSubmitAction);
    form.appendChild(submitButton);

    workingContainer.appendChild(form);
}

function handleSubmitAction(){
    const userID=localStorage.getItem('id');
    const formData = new FormData();
    formData.append('userID',userID);
    formData.append('optiune', document.getElementById("selector").value);
    formData.append('nouaValoare', document.getElementById("newValue").value); 
    

    console.log(formData.get("userID").value);

    axios.post('http://localhost:8081/updateDetaliiUtilizator', formData)
        .then(response => {
            console.log('Răspuns de la server:', response.data);
        })
        .catch(error => {
            console.error('Eroare la trimiterea către server:', error);
        });
    window.alert("Modificare reusita!");
}

const ProfilAdmin = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userType = localStorage.getItem("user");
        if (userType !== "admin") {
            window.location.href = "/error";
        }
    }, []);
    useEffect(() => {
        const userID = localStorage.getItem('id');

        if (userID) {
            const formData = new FormData();
            formData.append('userID', userID);

            axios.post('http://localhost:8081/detaliiutilizatori', formData)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Eroare la preluarea datelor utilizatorului:', error);
                });
        }
    }, []);

    return (
        <div className="containerProfilAdmin">
            <div className="containerButon">
                <button id="butonas" onClick={functieAfisare}>Modifica date</button>
            </div>
            <div className="containerContent">
                <h2 style={{ textAlign: "center" }}>Profilul Utilizatorului</h2>
                {userData ? (
                    <div className="profilContent">
                        <p>ID utilizator: {userData.ID_User}</p>
                        <p>Nume admin: {userData.Nume}</p>
                        <p>Prenume admin: {userData.Prenume}</p>
                        <p>Email utilizator: {userData.Email}</p>
                        <p>Telefon: {userData.Telefon}</p>
                        <p>Localitate: {userData.Localitate}</p>
                    </div>
                ) : (
                    <p>Se încarcă...</p>
                )}
            </div>
        </div>
    );
};

export default ProfilAdmin;
