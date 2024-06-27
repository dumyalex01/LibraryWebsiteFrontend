import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './GuestPage.css';
import Footer from '../Footer/Footer';

const GuestForm = () => {
  var pressed=0;
  function showContact(){
    var d=document.getElementsByClassName('contactGrid')[0];
    if(pressed==0){
        d.style=" background-color:whitesmoke;display: inline-block;padding: 20px;border: 4px double #7CFC00;border-radius: 10px;background: linear-gradient(to right, #9ACD32, #7CFC00) box-shadow: 0 0 10px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3);text-align:center";
        var parag=document.createElement('p');
        var parag2=document.createElement('p');
        parag.style="padding:20px; font-size: 1.2em;color: #4CAF50;text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);animation: pulse 1s infinite alternate; "
        parag.textContent="Telefon: 0753513418";
        parag2.style="font-size: 1.2em;color: #4CAF50;text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);animation: pulse 1s infinite alternate; "
        parag2.textContent="E-mail: dumy_alex01@yahoo.com";
        d.appendChild(parag);
        d.appendChild(parag2);
        pressed=1;
    }
    else{
      var d=document.getElementsByClassName('contactGrid')[0];
      while(d.firstChild){
        d.removeChild(d.firstChild);
      }
      d.style="border:none;background:transparent;";
      pressed=0;
    }
  }
  var pressedMap=0;
  
  function showMap(){
    if(pressedMap==1){
        const element = document.getElementById('googleMap');
        if (element) 
          element.remove();
        pressedMap=0;
  
      
    }
    else {
      var ifr = document.createElement('iframe');
      ifr.id = 'googleMap';
      ifr.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.7297764949317!2d26.08382851178634!3d44.418190502498334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0b54881f97%3A0xae84d2f47f65a3a7!2sAcademia%20Tehnic%C4%83%20Militar%C4%83%20Ferdinand%20I!5e0!3m2!1sro!2sro!4v1712595582513!5m2!1sro!2sro'; // setează sursa iframe-ului
      ifr.allowfullscreen = ''; 
      ifr.loading = 'lazy'; 
      ifr.referrerpolicy = 'no-referrer-when-downgrade'; 
      pressedMap=1;
      
      var cont=document.getElementsByClassName("container")[0];
    
      cont.appendChild(ifr);
    }
  };
  const mailFunction = () => {
    var sendEmailDiv = document.getElementsByClassName("send-email")[0];
    sendEmailDiv.innerHTML = '';

    var form = document.createElement("form");
    form.className = "form-container";

    var sourceInput = document.createElement("input");
    sourceInput.type = "email";
    sourceInput.placeholder = "Mail sursă";
    sourceInput.required = true;
    sourceInput.id = "source-input";

    var subjectInput = document.createElement("input");
    subjectInput.type = "text";
    subjectInput.placeholder = "Subiect";
    subjectInput.required = true;
    subjectInput.id = "subject-input";

    var contentInput = document.createElement("textarea");
    contentInput.placeholder = "Conținut mail";
    contentInput.required = true;
    contentInput.id = "content-input";

    var sendButton = document.createElement("button");
    sendButton.type = "button";
    sendButton.textContent = "Trimite mail";
    sendButton.id = "send-button";

    form.appendChild(sourceInput);
    form.appendChild(subjectInput);
    form.appendChild(contentInput);
    form.appendChild(sendButton);

    sendEmailDiv.appendChild(form);

    sendButton.addEventListener("click", function() {
        var source = document.getElementById("source-input").value;
        var subject = document.getElementById("subject-input").value;
        var content = document.getElementById("content-input").value;

        window.location.href = "mailto:dumy_alex01@yahoo.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(content) + "&cc=" + encodeURIComponent(source);
    });
};

  const aboutUs = () =>{
    window.location.href="/guest/about";
  }
  const goHome = () =>{
    window.location.href="/";
  }
  const goToClientPage = () =>{
    window.location.href="/client";
    localStorage.setItem("id",-1);
    localStorage.setItem("user","guest");
  }
  const goAuth = () =>{
    window.location.href="/autentif";
  }

  return (
      <div className="container">
        <div className="navbar">
            <button onClick={goAuth}>Creaza cont!</button>
            <button onClick={showMap}>Locatie</button>
            <button onClick={showContact}>Contactati-ne!</button>
            <button onClick={aboutUs}>Detalii</button>
            <button onClick={goHome}>Acasa</button>
            <button onClick={goToClientPage}>Continua pe site!</button>
            
        </div>
        <div className="contactGrid">
        </div>-
        <div className="carousel-container">
          <Carousel showThumbs={false} showArrows={true} showStatus={false} dynamicHeight={false} centerMode={true} centerSlidePercentage={100}>
            <div>
              <div className='clasa'></div>
              <p className='aditional'></p>
              <p className="legend">Carti de interes maxim</p>
            </div>
            <div>
              <div className='clasa2'></div>
              <p className='aditional'></p>
              <p className="legend">Timpul e cea mai imporanta resursa, asa ca nu-l pierde!</p>
            </div>
            <div>
              <div className='clasa3'></div>
              <p className='aditional'></p>
              <p className="legend">Sistem de notificari smart</p>
            </div>
          </Carousel>
        </div>
        <Footer/>
      </div>
     
  );
};

export default GuestForm;