import './About.scss';
import { useState, useEffect } from 'react';

const About = () => {
    const [circleAnimation, setCircleAnimation] = useState(false);

    useEffect(() => {
        // Function to randomly allocate the circles
        const allocateCirclesRandomly = () => {
            const circleBig = document.querySelector('.circle-big');
            const circleSmall = document.querySelector('.circle-small');

            const getRandomPosition = () => `${Math.random() * 90}%`;

            circleBig.style.left = getRandomPosition();
            circleBig.style.top = getRandomPosition();

            circleSmall.style.left = getRandomPosition();
            circleSmall.style.top = getRandomPosition();
        };
        const startCircleAnimation = () => {
            setCircleAnimation(true);
            allocateCirclesRandomly();
            setTimeout(() => {
                setCircleAnimation(false);
            }, 2000); 
        };

        startCircleAnimation();
        const intervalId = setInterval(startCircleAnimation, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`About ${circleAnimation ? 'circle-animation' : ''}`}>
            <h1>Admission <span>Jockey</span></h1>
            <h2>Welcome to Admission Jockey - Your Pathway to Academic Success!</h2>
            <div className="content">
                <p>Welcome to <strong>Admission Jockey</strong> (<a href="https://www.admissionjockey.com">admissionjockey.com</a>), your comprehensive educational platform dedicated to guiding students towards academic excellence and career success. At <strong>Admission Jockey</strong>, we understand that the journey through education can be both exciting and challenging. That's why we're here to lend our expertise and support every step of the way. Our mission is clear: to empower students with the best study materials, expert counseling, and assistance in selecting the finest universities and colleges across India.</p>
                <p>With a rich repository of <strong>high-quality study materials</strong> and resources, we provide students with the tools they need to excel in their academic pursuits. Whether you're preparing for competitive exams, board examinations, or simply seeking to expand your knowledge, our platform offers a wealth of materials to meet your needs. Beyond study materials, we also offer invaluable <strong>counseling services</strong> to help you make informed decisions about your educational and career choices. Our experienced counselors are dedicated to understanding your goals and aspirations, providing personalized guidance to set you on the right path.</p>
                <p>Our impact speaks volumes, as we have already served over <strong>74,000 students</strong> who have experienced firsthand the benefits of our platform. They have achieved academic excellence and secured promising career opportunities with the help of <strong>Admission Jockey</strong>. Join us today and embark on your journey towards a brighter future. Whether you're a student, a job seeker, or simply someone looking to further their knowledge, <strong>Admission Jockey</strong> is here to support you in achieving your dreams.</p>
            </div>


            <div className="circle-big"></div>
            <div className="circle-small"></div>
            
        </div>
    );
}

export default About;
