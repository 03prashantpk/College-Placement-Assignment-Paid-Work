import React, { useState, useEffect } from 'react';
import './SpecialPrograms.scss';
import cards from '../../data/specialCourses.json';
import special from '../../assets/images/special2.png';
import special2 from '../../assets/images/special.png';
import special3 from '../../assets/images/special3.png';

const SpecialPrograms = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCardsPerPage(1); // Mobile
            } else if (window.innerWidth <= 1024) {
                setCardsPerPage(2); // Tablet
            } else {
                setCardsPerPage(3); // Laptop
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const nextCard = () => {
        const lastIndex = cards.length - 1;
        if (cardsPerPage < cards.length) {
            if (activeIndex < lastIndex) {
                setActiveIndex(activeIndex + 1);
            } else {
                setActiveIndex(0);
            }
        } else if (activeIndex + cardsPerPage < lastIndex) {
            setActiveIndex(activeIndex + cardsPerPage);
        }
    };

    const prevCard = () => {
        const lastIndex = cards.length - 1;
        if (cardsPerPage < cards.length) {
            if (activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            } else {
                setActiveIndex(lastIndex - (cardsPerPage - 1));
            }
        } else if (activeIndex > 0) {
            setActiveIndex(activeIndex - cardsPerPage);
        } else {
            setActiveIndex(lastIndex);
        }
    };

    // Auto slide every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextCard();
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [activeIndex]);

    return (
        <div className="SpecialPrograms">
            <h1>Special Programme</h1>

            <div className="special-program-content" >
                {cards.slice(activeIndex, activeIndex + cardsPerPage).map((card, index) => (
                    <div
                        key={index}
                        className={`special-card active`}
                        style={{ backgroundColor: index % 3 === 1 ? "#ECF9FD" : index % 3 === 2 ? "#F1E9DB" : "#E8F7F2" }}
                    >
                        <img src={index % 3 === 1 ? special : index % 3 === 2 ? special2 : special3} alt="" />
                        <h2>{card.title}</h2>
                        <div className="footer-content">
                            <p>{card.description}</p>
                            <button
                                style={{ backgroundColor: index % 3 === 1 ? "#2CC1E9" : index % 3 === 2 ? "#BF8F44" : "#00A86B" }}

                            >View Details</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="controls">
                <button onClick={prevCard} disabled={activeIndex === 0}><i className="fad fa-backward"></i></button>
                <button onClick={nextCard} disabled={activeIndex === (cards.length - cardsPerPage)}><i className="fad fa-forward"></i></button>
            </div>
        </div>
    );
};

export default SpecialPrograms;
