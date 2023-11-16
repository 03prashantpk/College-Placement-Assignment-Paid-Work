import React, { useState, useEffect } from 'react';
import './StepsTab.scss';
import RightCollege from '../../assets/images/rightCollege.jpg'
import RightCollege2 from '../../assets/images/rightCollege2.jpg'
import RightCollege3 from '../../assets/images/rightCollege3.png'
import RightCollege4 from '../../assets/images/rightCollege4.png'

const StepsTab = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            image: RightCollege4,
            text: 'Research Your Interests and Goals.',
            description:
                'Start by identifying your passions and career aspirations. Think about what you want to study and achieve in your academic journey.'
        },
        {
            image: RightCollege4,
            text: 'Explore College Options.',
            description:
                'Research various colleges and universities that offer programs aligning with your interests. Consider factors like size, reputation, and majors offered.'
        },
        {
            image: RightCollege4,
            text: 'Evaluate Financial Aid and Scholarships.',
            description:
                'Examine your financial resources and explore scholarships, grants, and financial aid options to make education more affordable.'
        },
        {
            image: RightCollege4,
            text: 'Visit Campuses and Attend Open Houses.',
            description:
                'Schedule visits to the campuses of your top choices. Attend open houses and tours to get a feel for the environment and facilities.'
        },
        {
            image: RightCollege4,
            text: 'Consider Location and Campus Life.',
            description:
                "Think about the location of each college, including the city or town it's in. Explore the extracurricular activities and campus culture."
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="StepsTab">
            <h1>How to Choose the Perfect College</h1>
            <div className="steps-content">
                <div className="left-side">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${index === currentStep ? 'active' : ''}`}
                            onClick={() => setCurrentStep(index)}
                        >
                            <h2>Step {index + 1}</h2>
                            <p>{step.text} - {step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="right-side">
                    {steps.map((step, index) => (
                        <img
                            key={index}
                            src={step.image}
                            alt={`Step ${index + 1}`}
                            className={`step-image ${index === currentStep ? 'active' : 'inactive'
                                }`}
                        />
                    ))}
                    <div className="controls">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentStep ? 'active' : ''}`}
                                onClick={() => setCurrentStep(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepsTab;
