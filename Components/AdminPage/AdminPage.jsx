import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';


const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const userType = localStorage.getItem("user");
        if (userType !== "admin") {
            window.location.href = "/error";
        }
    }, []);
    const goToNext = () => {
        window.location.href="/admin/rezervari";
    }
    const profilFunction = () =>{
        window.location.href="/admin/profilAdmin";
    }
    const configFunction = () =>{
        window.location.href="/admin/configPage";
    }

    const bookFunction = () => {
        var contentGrid = document.getElementsByClassName("contentGrid")[0];
        while(contentGrid.firstChild){
            contentGrid.removeChild(contentGrid.firstChild);
        }
        var fullGrid=document.getElementsByClassName("fullOptionGrid")[0];
        fullGrid.style.background="#FF9F9F";
        var divButoane=document.createElement("div");
        divButoane.className="clasaAdmin";
        var button1=document.createElement("button");
        var button2=document.createElement("button");
        button2.textContent="Carti in stoc";
        button1.id="button1";
        button2.id="button2";
        divButoane.appendChild(button1);
        divButoane.appendChild(button2);
        contentGrid.appendChild(divButoane);
        button1.addEventListener("click", function() {
            window.location.href = "/admin/rezervari";
        });
        button2.addEventListener("click",function() {
            window.location.href="/admin/carti";
        });
    };
    const showForm = () => {
        const x = document.getElementsByClassName("contentGrid")[0];
        const full = document.getElementsByClassName("fullOptionGrid")[0];
        full.style.background = "#DDDEDD";
        x.style.background = "#F7F7F7";
        x.innerHTML = ''; 
    
        const form = document.createElement("form");
        form.id = "bookForm";
        form.setAttribute("enctype", "multipart/form-data"); 
        form.addEventListener("submit", submitForm);
        
        const bookNameLabel = document.createElement("label");
        bookNameLabel.textContent = "Nume Carte";
        const bookNameInput = document.createElement("input");
        bookNameInput.type = "text";
        bookNameInput.id = "bookName";
        bookNameInput.name = "bookName";
        bookNameInput.className = "form-control";
        const bookNameFormGroup = document.createElement("div");
        bookNameFormGroup.className = "form-group";
        bookNameFormGroup.appendChild(bookNameLabel);
        bookNameFormGroup.appendChild(bookNameInput);
        form.appendChild(bookNameFormGroup);
    
        const bookTypeLabel = document.createElement("label");
        bookTypeLabel.textContent = "Tip";
        const bookTypeSelect = document.createElement("select");
        bookTypeSelect.id = "bookType";
        bookTypeSelect.name = "bookType";
        bookTypeSelect.className = "form-control";
        const bookTypeOptions = [
            { value: "Beletristica", text: "Beletristica" },
            { value: "Stiinta", text: "Stiinta" },
            { value: "Dezvoltare Personala", text: "Dezvoltare Personala" },
            { value: "IT", text: "IT" },
            { value: "Science Fiction", text: "Science Fiction" }
        ];
        bookTypeOptions.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            bookTypeSelect.appendChild(optionElement);
        });
        const bookTypeFormGroup = document.createElement("div");
        bookTypeFormGroup.className = "form-group";
        bookTypeFormGroup.appendChild(bookTypeLabel);
        bookTypeFormGroup.appendChild(bookTypeSelect);
        form.appendChild(bookTypeFormGroup);
    
       
        const bookAuthorLabel = document.createElement("label");
        bookAuthorLabel.textContent = "Autor";
        const bookAuthorInput = document.createElement("input");
        bookAuthorInput.type = "text";
        bookAuthorInput.id = "bookAuthor";
        bookAuthorInput.name = "bookAuthor";
        bookAuthorInput.className = "form-control";
        const bookAuthorFormGroup = document.createElement("div");
        bookAuthorFormGroup.className = "form-group";
        bookAuthorFormGroup.appendChild(bookAuthorLabel);
        bookAuthorFormGroup.appendChild(bookAuthorInput);
        form.appendChild(bookAuthorFormGroup);
    

        const bookStockLabel = document.createElement("label");
        bookStockLabel.textContent = "Stoc";
        const bookStockInput = document.createElement("input");
        bookStockInput.type = "number";
        bookStockInput.id = "bookStock";
        bookStockInput.name = "bookStock";
        bookStockInput.className = "form-control";
        bookStockInput.min = "0";
        const bookStockFormGroup = document.createElement("div");
        bookStockFormGroup.className = "form-group";
        bookStockFormGroup.appendChild(bookStockLabel);
        bookStockFormGroup.appendChild(bookStockInput);
        form.appendChild(bookStockFormGroup);
    
        
        const bookUrlLabel = document.createElement("label");
        bookUrlLabel.textContent = "URL";
        const bookUrlInput = document.createElement("input");
        bookUrlInput.type = "file";
        bookUrlInput.id = "bookUrl";
        bookUrlInput.name = "bookUrl";
        bookUrlInput.className = "form-control";
        bookUrlInput.accept = "image/*";
        const bookUrlFormGroup = document.createElement("div");
        bookUrlFormGroup.className = "form-group";
        bookUrlFormGroup.appendChild(bookUrlLabel);
        bookUrlFormGroup.appendChild(bookUrlInput);
        form.appendChild(bookUrlFormGroup);
    
        const submitButton = document.createElement("button");
        submitButton.className = "btn";
        submitButton.type = "submit";
        submitButton.textContent = "Adaugă Carte";
        form.appendChild(submitButton);
    
        x.appendChild(form);
    };
    const submitForm = (event) => {
        event.preventDefault();
        const bookName = document.getElementById('bookName').value;
        const bookType = document.getElementById('bookType').value;
        const bookAuthor = document.getElementById('bookAuthor').value;
        const bookStock = document.getElementById('bookStock').value;
        var stringToSendURL="/assets/";
        const bookUrl = document.getElementById('bookUrl').files[0].name; 
        stringToSendURL+=bookUrl;
    
        
        var formData = new FormData();
        formData.append('bookName', bookName);
        formData.append('bookType', bookType);
        formData.append('bookAuthor', bookAuthor);
        formData.append('bookStock', bookStock);
        formData.append('bookUrl', stringToSendURL);

        console.log(formData.get("bookUrl"));

        axios.post('http://localhost:8081/carti', formData)
            .then(response => {
                console.log(response.data);
                window.alert("Informatii adaugate cu succes!");
            })
            .catch(error => {
                console.error('Eroare la trimiterea datelor către server:', error);
            });
    };

    const constructTable = (users) => {
        var x = document.getElementsByClassName("contentGrid")[0];
        var full=document.getElementsByClassName("fullOptionGrid")[0];
        full.style.background="#DDDEDD"
        x.style.background="#F7F7F7";
        x.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Nume</th>
                    <th>Prenume</th>
                    <th>Serie</th>
                    <th>Oras</th>
                    <th>Telefon</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => (
                    `<tr key=${user.Username}>
                        <td>${user.Email}</td>
                        <td>${user.Nume}</td>
                        <td>${user.Prenume}</td>
                        <td>${user.SerieBuletin}</td>
                        <td>${user.Localitate}</td>
                        <td>${user.Telefon}</td>
                    </tr>`
                )).join('')}
            </tbody>
        </table>
        `;
    };

    const fetchUsersAndConstructTable = () => {
        axios.get('http://localhost:8081/utilizatori')
            .then(response => {
                setUsers(response.data);
                constructTable(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const goHome = () =>{
        window.location.href="/";
    }
    const goToRezervari = () =>{
        window.location.href="/admin/rezervariOnorate";
    }

    return (
        <div className="containerAdmin">
            <div className="myNavbar">
                <ul>
                    <li><button id="adauga_carte" onClick={showForm}></button></li>
                    <li><button id="gestioneaza_contacte" onClick={configFunction}></button></li>
                    <li><button id="afiseaza_carti" onClick={bookFunction}></button></li>
                    <li><button id="profilul_meu" onClick={profilFunction}></button></li>
                    <li><button id="utilizatori" onClick={fetchUsersAndConstructTable}></button></li>
                    <li><button id="rezervari" onClick={goToRezervari}></button></li>
                    <li><button id="home" onClick={goHome}></button></li>
                </ul>
            </div>
            <div className="fullOptionGrid">
                <div className="contentGrid">
                </div>
            </div>
        </div>
    );
};

export default Admin;