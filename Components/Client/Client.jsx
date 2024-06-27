import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Client.css';
import Template from './Template';
import Footer from '../Footer/Footer';

const Client = () => {
    var contor=0;
    const [carti, setCarti] = useState([]);
    const [ceaMaiImprumutataCarte, setCeaMaiImprumutataCarte] = useState(null);
    const [clientFavorit, setClientFavorit] = useState(null);
    const [clientCuCeleMaiMulteRezervari, setClientCuCeleMaiMulteRezervari] = useState(null);
  
    useEffect(() => {
        const tip = localStorage.getItem('user');
    
        if (tip === 'admin') {
            window.location.href =  "/error";
        } else if (tip === 'guest') {
            fetchCartiForGuest();
            var butonProfil=document.getElementById("Profile");
            var butonCarti=document.getElementById("CartileMeleButon");
            butonCarti.style.display="none";
            butonProfil.style.display="none";
        } else {
            fetchCarti();
        }
        fetchCeaMaiImprumutataCarte();
        fetchClientFavorit();
    }, []);
  useEffect(() => {
    axios.get('http://localhost:8081/clientCuCeleMaiMulteRezervari')
      .then(response => {
        setClientCuCeleMaiMulteRezervari(response.data);
      })
      .catch(error => {
        console.error('Eroare la obținerea clientului cu cele mai multe rezervări:', error);
      });
  }, []);
   
    const fetchCarti = async () => {
        try {
            const response = await axios.get('http://localhost:8081/cartiTemplate', {
                params: {
                    userID: localStorage.getItem('id') 
                }
            });
            setCarti(response.data);
        } catch (error) {
            console.error('A apărut o eroare:', error);
        }
    };

    const fetchCartiForGuest = async () => {
        try {
            const response = await axios.get('http://localhost:8081/cartiTemplateForGuest');
            setCarti(response.data);
        } catch (error) {
            console.error('A apărut o eroare:', error);
        }
    };

    const filterFunction = () => {
        var container = document.getElementsByClassName("filterClass")[0];
        container.innerHTML='';
        container.style.background="transparent";
        if(contor==0){
        container.style.background="#ffff";
        var form = document.createElement("form");
        form.className="filterForm"; 
    
        var select = document.createElement("select");
        select.className="filterSelect";
        select.id="filterSelect"
    
        var options = ["Beletristica", "Science Fiction", "IT", "Stiinta", "Dezvoltare Personala","Oricare"];
        for (var i = 0; i < options.length; i++) {
            var option = document.createElement("option");
            option.text = options[i];
            select.add(option);
        }
    
        form.appendChild(select);
    
        var authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.placeholder = "Nume autor";
        authorInput.className="authorInput";
    
        form.appendChild(authorInput);
    
        var stockInput = document.createElement("input");
        stockInput.type = "number";
        stockInput.placeholder = "Stoc minim";
        stockInput.id="stockInput"; 
        stockInput.defaultValue=0;
    
        form.appendChild(stockInput);
    
        var applyButton = document.createElement("button");
        applyButton.type = "button";
        applyButton.textContent = "Aplicare filtre";
        applyButton.className="filterButton"; 
    
        applyButton.addEventListener("click", filtrare);
    
        form.appendChild(applyButton);
    
        container.appendChild(form);
        contor=1;
    }
    else{
        container.innerHTML='';
        container.style.background="transparent";
        contor=0;
    }
    }

    const filtrare = async () => {
        
    const selectValue = document.getElementById('filterSelect').value;
    const authorValue = document.querySelector('.authorInput').value;
    const stockValue = document.getElementById('stockInput').value;

    localStorage.setItem("Tip", selectValue);
    localStorage.setItem("Autor", authorValue);
    localStorage.setItem("Stoc", stockValue);

    alert("Filtre aplicate cu succes!");
    };

    const fetchCeaMaiImprumutataCarte = async () => {
        try {
            const response = await axios.get('http://localhost:8081/ceaMaiRezervataCarte');
            setCeaMaiImprumutataCarte(response.data);
        } catch (error) {
            console.error('A apărut o eroare:', error);
        }
    };

    const fetchClientFavorit = async () => {
        try {
            const response = await axios.get('http://localhost:8081/clientFavorit');
            setClientFavorit(response.data);
        } catch (error) {
            console.error('A apărut o eroare:', error);
        }
    };

    const goBack = () => {
        window.location.href = "/login";
    };

    const goProfile = () => {
        window.location.href="/client/profil";
    };

    const goToBooks = () => {
        window.location.href="/client/carti";
    };

    const goToNotificari = () =>{
        window.location.href="/client/notificari";
    };
    const goHome = () =>{
        window.location.href="/";
    }

    const goToContact = () => {
        document.querySelector('.messageContainer').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    const searchFunction = async () => {
        const userType=localStorage.getItem("user");
        if(userType=='guest'){
            alert("Un utilizator de tip guest nu are dreptul sa caute! Autentificati-va!");
        }
        else{
        const tip = localStorage.getItem("Tip");
        const autor = localStorage.getItem("Autor");
        const stoc = localStorage.getItem("Stoc");
        const numeCarte=document.getElementById("numeCarte").value;
    
        try {
            const response = await axios.post('http://localhost:8081/cautareCarti', {
                tip: tip,
                autor: autor,
                stoc: stoc,
                nume:numeCarte
            });
    
            setCarti(response.data);
            localStorage.setItem("Tip","Oricare");
            localStorage.setItem("Stoc",0);
            localStorage.setItem("Autor","");
        } catch (error) {
            console.error('A apărut o eroare la căutarea cărților:', error);
        }
    }
    };

    return (
        <div className="containerClient">
            <div className="navbarClient">
                <ul>
                    <li><button id="NotificariButon" onClick={goToNotificari}>Notificari</button></li>
                    <li><button id="CartileMeleButon" onClick={goToBooks}>Cartile Mele</button></li>
                    <li><button id="ContactButon" onClick={goToContact}>Contact</button></li>
                    <li className="functions">
                        <input type="text" id="numeCarte" placeholder="Cauta..." />
                        <button id="SearchButton" onClick={searchFunction}></button>
                        <button id="FilterButton" onClick={filterFunction}></button>
                    </li>
                    <li className="functions">
                        <button id="Profile" onClick={goProfile}></button>
                        <button id="Logout" onClick={goBack}></button>
                        <button id="Home" onClick={goHome}></button>
                    </li>
                </ul>
                <div className="filterClass">

                </div>
            </div>
            <div className="bookSpace">
                {carti.map((carte, index) => (
                    <Template
                        key={index}
                        bookName={carte.Nume}
                        bookAuthor={carte.Autor}
                        bookType={carte.Tip}
                        bookStock={carte.Stoc}
                        bookUrl={carte.URL}
                    />
                ))}
            </div>
            <br/>
            <br/>
            <hr/>
            <div className="specialContent">
                {ceaMaiImprumutataCarte && (
                    <div className="news">
                        <img src={ceaMaiImprumutataCarte.URL} alt={ceaMaiImprumutataCarte.Nume} />
                        <p>Cartea favorită: {ceaMaiImprumutataCarte.Nume}</p>
                    </div>
                )}
                
                <div className="clientFavorite">
        <h3>Clientul cu cele mai multe rezervări:</h3>
        {clientCuCeleMaiMulteRezervari ? (
            <>
            <p>Nume: {clientCuCeleMaiMulteRezervari.NumeClient}</p>
            <p>Prenume: {clientCuCeleMaiMulteRezervari.PrenumeClient}</p>
            <p>Număr rezervări: {clientCuCeleMaiMulteRezervari.NumarRezervari}</p>
            </>
        ) : (
        <p>Încărcare...</p>
      )}
    </div>

            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <hr/>
            <div className="messageContainer">
                <textarea className="inputText" placeholder="Introduceți mesajul dvs. aici"></textarea>
                <button className="sendButton">Contactează-ne</button>
            </div>
            <Footer/>
        </div>
        
    );
};

export default Client;