import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConfigPage.css';

const ConfigPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const userType = localStorage.getItem("user");
        if (userType !== "admin") {
            window.location.href = "/error";
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/utilizatori1');
            setUsers(response.data);
        } catch (error) {
            console.error('Eroare la obținerea utilizatorilor:', error);
        }
    };

    const createContent = () => {
        var container = document.getElementsByClassName("contentContainer")[0];
        container.innerHTML = '';
        
    
        var thisForm = document.createElement("form");
        thisForm.classList = "form3";
    
        users.forEach(user => {
            var checkboxContainer = document.createElement("div"); // Creează un container pentru fiecare checkbox
            checkboxContainer.classList.add("checkbox-container");
    
            var checkbox = document.createElement("input");
            checkbox.className = "my-checkbox";
            checkbox.type = "checkbox";
            checkbox.name = "utilizator";
            checkbox.value = user.ID_User;
            checkbox.id = "user_" + user.ID_User;
            checkboxContainer.appendChild(checkbox);
    
            var label = document.createElement("label");
            label.textContent = user.Username;
            label.htmlFor = "user_" + user.ID_User;
            checkboxContainer.appendChild(label);
    
            thisForm.appendChild(checkboxContainer); 
        });
    
        var header = document.createElement("h1");
        header.id = "my-header";
        header.textContent = "Alegeti utilizatorii de sters!";
        
        container.appendChild(header);
        container.appendChild(thisForm);
    
        var deleteButton = document.createElement("button");
        deleteButton.id="deleteB";
        deleteButton.textContent = "Sterge utilizatorii selectati";
        deleteButton.addEventListener("click", deleteUser);
        container.appendChild(deleteButton);
    };
    const createContentNotification = () =>{

        var container=document.getElementsByClassName("contentContainer")[0];

        container.innerHTML='';

        var myHeader=document.createElement("h1");
        myHeader.textContent="Notificare Utilizator";
        myHeader.style.margin="margin-top:30px";
        myHeader.id="headerNotif";
        
        var form2=document.createElement("form");
        form2.className="form2";

        var inputUser=document.createElement("input");
        inputUser.setAttribute('type','text');
        inputUser.id="inputUser";
        inputUser.setAttribute('placeholder','Username');

        var messageInput=document.createElement("textarea");
        messageInput.setAttribute('type','text');
        messageInput.setAttribute('placeholder', '   Mesajul dumneavoastra');
        messageInput.id="messageInput";

        var submitButton = document.createElement("button");
        submitButton.textContent = "Trimite";
        submitButton.type = "submit";
        submitButton.id="butonNotificare";
        submitButton.addEventListener("click", handleSubmit);

        form2.appendChild(inputUser);
        form2.appendChild(messageInput);
        form2.appendChild(submitButton);

        container.appendChild(form2);
        container.appendChild(myHeader);
    }

    const createContentStoc = async () => {
        var container = document.getElementsByClassName("contentContainer")[0];
        container.innerHTML = '';
        container.style.backgroundImage = "url('./carti.jpeg')";
        container.style.backgroundSize = "cover"; 
        container.style.backgroundRepeat = "no-repeat"; 
        
    
        var header = document.createElement("h1");
        header.textContent = "Modificare Stoc";
        header.id="modifH";
        container.appendChild(header);
    
        var form = document.createElement("form");
        form.classList = "formStoc";

        var centeredContainer = document.createElement("div");
        centeredContainer.classList.add("container");
    
        var selectLabel = document.createElement("label");
        selectLabel.textContent = "Selectati o carte:";
        form.appendChild(selectLabel);
    
        var select = document.createElement("select");
        select.name = "carte";
        select.id="selectorCarti"
    
        try {
            const response = await axios.get('http://localhost:8081/carti');
            const carti = response.data;
    
            carti.forEach(carte => {
                var option = document.createElement("option");
                option.value = carte.ID; 
                option.textContent = carte.Nume;
                select.appendChild(option);
            });
    
            form.appendChild(select);
        } catch (error) {
            console.error('Eroare la obținerea listei de cărți:', error);
            var errorMessage = document.createElement("p");
            errorMessage.textContent = "A apărut o eroare la obținerea listei de cărți.";
            container.appendChild(errorMessage);
            return;
        }
    
        var numarLabel = document.createElement("label");
        numarLabel.textContent = "Numărul de cărți pentru stoc:";
        form.appendChild(numarLabel);
    
        var numarInput = document.createElement("input");
        numarInput.type = "number";
        numarInput.name = "numarCarti";
        numarInput.min = "1";
        numarInput.required = true;
        form.appendChild(numarInput);
    
        var submitButton = document.createElement("button");
        submitButton.textContent = "Modifica";
        submitButton.type = "submit";
        submitButton.addEventListener("click", sendStockData);

        form.appendChild(submitButton);
    
        container.appendChild(form);
    };

    const createContentAdmin = () => {
        
        var container=document.getElementsByClassName("contentContainer")[0];
        container.innerHTML='';

        var button1=document.createElement("button");
        button1.id="button1Admin";
        button1.textContent="Creare dintr-un utilizator deja existent!";
        button1.addEventListener('click',createAdminSelector);
        
        var button2=document.createElement("button");
        button2.id="button2Admin";
        button2.textContent="Creare nou cont de admin, cu credentiale!";
        button2.addEventListener('click', gotoAutentif);

        container.appendChild(button1);
        container.appendChild(button2);

    }
    const createAdminSelector = () => {
        var container = document.getElementsByClassName("contentContainer")[0];
        container.innerHTML = '';
    
        var header1=document.createElement("h1");
        header1.id="head1";
        header1.textContent="Oferiti rolul de admin!";
        var header2=document.createElement("h3");
        header2.id="head2";
        header2.textContent="Atentie, cel care a primit acest rol are aceleasi atributii cu tine!";
        var selectElement = document.createElement('select');
        selectElement.id = 'userSelector';
        container.appendChild(header1);
        container.appendChild(header2);
       
        
        var wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('formWrapper'); 

        wrapperDiv.appendChild(selectElement);
        
    
        axios.get('http://localhost:8081/utilizatori1')
            .then(response => {
                const data = response.data;
          
                data.forEach(user => {
                    var option = document.createElement('option');
                    option.value = user.ID_User;
                    option.text = user.Username;
                    selectElement.appendChild(option);
                });
            })
            .catch(error => console.error('Eroare în timpul solicitării de utilizatori:', error));

        var modifyButton = document.createElement('button');
        modifyButton.id="modifyButton";
        modifyButton.textContent = 'Setează ca admin';
        modifyButton.addEventListener('click', setAdmin);
        wrapperDiv.appendChild(modifyButton);

        container.appendChild(wrapperDiv);
    };
    
   
    const setAdmin = () => {
        var selectedUserID = document.getElementById('userSelector').value;
        axios.post('http://localhost:8081/updateDetaliiUtilizator1', {
            userID: selectedUserID,
            optiune: 'Tip',
            nouaValoare: 1
        })
        .then(response => {
            const data = response.data;
            alert("Modificare reusita!");
            console.log(data.message);
      
        })
        .catch(error => console.error('Eroare în timpul solicitării de actualizare a utilizatorului:', error));
    };
    const gotoAutentif = () =>{
        localStorage.setItem("autentificare_admin",1);
        window.location.href="/autentif";
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        sendNotification();
    }
    const sendNotification = async () => {
        const username = document.getElementById("inputUser").value;
        const message = document.getElementById("messageInput").value;
        console.log(username,message);
        console.log("SALUT");
        try {

            await axios.post('http://localhost:8081/notificariAdmin', {
                username: username,
                message: message
            });
    
            alert("Notificare trimisă cu succes!");
        } catch (error) {
            console.error('A apărut o eroare:', error);
            alert("A apărut o eroare în timpul trimiterea notificării.");
        }
    };
    const sendStockData = async (event) => {
        event.preventDefault(); 
    
        var selectElement = document.getElementById("selectorCarti");
        var bookName = selectElement.options[selectElement.selectedIndex].textContent;
        var newStock = document.getElementsByName("numarCarti")[0].value;
    
        console.log(bookName);
       
       try {
            const response = await axios.post('http://localhost:8081/updateStock', { bookID: bookName, newStock : newStock });
            window.alert("Stocul cărții a fost actualizat cu succes!");
        } catch (error) {
            console.error('Eroare la trimiterea datelor:', error);
        }
    };

    const deleteUser = async () => {
        var checkboxes = document.getElementsByName("utilizator");
        var usersToDelete = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                usersToDelete.push(checkbox.value);
            }
        });

        try {
            const response = await axios.post('http://localhost:8081/deleteUsers', { usersToDelete });
            window.alert("Stergere realizata cu succes!");
            fetchUsers();
        } catch (error) {
            console.error('Eroare la ștergerea utilizatorilor:', error);
        }
    };

    return (
        <div className="configPageContainer">
            <div className="navbarConfig">
                <ul>
                    <li><button id="removeButton" onClick={createContent}></button></li>
                    <li><button id="createAdmin" onClick={createContentAdmin}></button></li>
                    <li><button id="notificationButton" onClick={createContentNotification}></button></li>
                    <li><button id="modificareStoc" onClick={createContentStoc}></button></li>
                </ul>
            </div>
            <div className="contentContainer">
            </div>
        </div>
    );
};

export default ConfigPage;