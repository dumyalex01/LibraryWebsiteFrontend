// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginForm/Login';
import AdminPage from './Components/AdminPage/AdminPage';
import GuestPage from './Components/GuestPage/GuestPage';
import ProfilAdmin from './Components/ProfilAdmin/ProfilAdmin';
import Rezervari from './Components/Rezervari/Rezervari';
import ConfigPage from './Components/ConfigPage/ConfigPage';
import AutentichationPage from './Components/AutentichationPage/AutentichationPage';
import Client from './Components/Client/Client';
import AboutUs from './Components/AboutUs/AboutUs';
import OurBooks from './Components/OurBooks/OurBooks';
import ProfilClient from './Components/ProfilClient/ProfilClient';
import CartiClient from './Components/CartiClient/CartiClient';
import Notificari from './Components/Notificari/Notificari';
import HomePage from './Components/HomePage/HomePage';
import RezervariOnorate from './Components/RezervariOnorate/RezervariOnorate'
import ErrorPage from './Components/ErrorPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/guest" element={<GuestPage/>}/>
        <Route path="/admin/profilAdmin" element={<ProfilAdmin/>}/>
        <Route path="/admin/rezervari" element={<Rezervari/>}/>
        <Route path="/admin/configPage" element={<ConfigPage/>}/>
        <Route path="/autentif" element={<AutentichationPage/>}/>
        <Route path="/client" element={<Client/>}/>
        <Route path="/guest/about" element={<AboutUs/>}/>
        <Route path="/admin/carti" element={<OurBooks/>}/>
        <Route path='/client/profil' element={<ProfilClient/>}/>
        <Route path="/client/carti" element={<CartiClient/>}/>
        <Route path="/client/notificari" element={<Notificari/>}/>
        <Route path="/admin/rezervariOnorate" element={<RezervariOnorate/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;