import React, { useState, useEffect } from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const [showBooks, setShowBooks] = useState(false);

    const handleShowBooks = () => {
        setShowBooks(true);
    };

    return (
        <div className="containerAbout">
            <div className="containerA1">
                <p>În inima orașului nostru, la intersecția dintre tradiție și progres, se ridică o structură impunătoare, un sanctuar al cunoașterii și al înțelepciunii - Biblioteca Noastră. Aici, în acest refugiu de gânduri și idei, ne străduim să cultivăm un mediu care să încurajeze explorarea, învățarea și descoperirea.</p>
            </div>
            <div className="containerA2">
                <p>Biblioteca Noastră nu este doar un loc pentru cărți; este un centru cultural, un far de lumină intelectuală și un loc de întâlnire pentru mintea curioasă.</p>
                <button id="roundButton" onClick={handleShowBooks}>Cartile noastre</button>
            </div>
            {showBooks && (
                <div className="containerA3">
                    <BookImageLoader />
                </div>
            )}
        </div>
    );
};

const BookImageLoader = () => {
    const [imagesLoaded, setImagesLoaded] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setImagesLoaded(prevState => prevState + 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [imagesLoaded]);

    const bookImages = [
        require("./images/dp.jpeg"),
        require("./images/info.jpeg"),
        require("./images/beletristica.jpeg"),
        require("./images/sf.jpeg"),
        require("./images/science.jpeg")
    ];

    return (
        <div className="bookImages">
            {bookImages.slice(0, imagesLoaded).map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Book ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default AboutUs;