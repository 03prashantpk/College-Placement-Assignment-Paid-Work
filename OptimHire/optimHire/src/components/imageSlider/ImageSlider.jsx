import React, { useState, useEffect } from 'react';
import './ImageSlider.scss';
import banner from '../../assets/images/banner.png'

const ImageSlider = () => {
    const images = [
        banner,
        banner,
        banner,
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const nextImage = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 3000); // Auto slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Image-slider">
            <div className="slider">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={`slide ${index === activeIndex ? 'active' : ''}`}
                    />
                ))}
                <div className="navigation-button">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ImageSlider;
