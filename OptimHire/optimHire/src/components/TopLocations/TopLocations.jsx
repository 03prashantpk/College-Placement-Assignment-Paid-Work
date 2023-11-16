import React, { useEffect } from 'react';
import './TopLocations.scss';
import kolkata from '../../assets/images/kolkata.png'
import hydrabad from '../../assets/images/hydrabad.png'
import Delhi from '../../assets/images/Delhi.png'
import Dehradun from '../../assets/images/Dehradun.png'
import Bangalore from '../../assets/images/Bangalore.png'
import Pune from '../../assets/images/Pune.png'
import GetAdvice from '../Assets/GetAdvice/GetAdvice';

const locations = [
    { name: "Delhi", image: Delhi },
    { name: "Dehradun", image: Dehradun },
    { name: "Bangalore", image: Bangalore },
    { name: "Kolkata", image: kolkata },
    { name: "Hyderabad", image: hydrabad },
    { name: "Pune", image: Pune },
];

const TopLocations = () => {
    useEffect(() => {
        function resizeGridItems() {
            const gridItems = document.querySelectorAll(".grid-item");
            const grid = document.querySelector(".grid-container");
            const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"));

            gridItems.forEach((item) => {
                const content = item.querySelector(".content");

                if (content) {
                    const contentHeight = content.getBoundingClientRect().height;
                    const rowSpan = Math.ceil(contentHeight / (rowGap + 1));
                    item.style.gridRowEnd = "span " + rowSpan;
                }
            });
        }

        resizeGridItems();

        window.addEventListener("resize", resizeGridItems);

        const intervalId = setInterval(resizeGridItems, 5000);

        return () => {
            window.removeEventListener("resize", resizeGridItems);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="TopLocations">
            <h1>Top Study Places</h1>
            <div className="grid-container">
                {locations.map((location, index) => (
                    <div className="grid-item" key={index}>
                        <div className="content">
                            <h2>{location.name}</h2>
                            <img src={location.image} alt={location.name} />
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default TopLocations;
