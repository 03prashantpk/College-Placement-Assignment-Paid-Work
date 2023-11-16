import { useEffect, useState } from 'react';
import './StudentsCollage.scss';

const evenImage = "https://dashboard.admissionjockey.in/assets/men-1b8ce9c7.jpg";
const evenUni = "https://dashboard.admissionjockey.in/assets/logo-8f83f6db.png";

const oddImage = "https://dashboard.admissionjockey.in/assets/girl-c8538b8f.jpg";
const oddUni = "https://dashboard.admissionjockey.in/assets/graphiceralogo-31d52abc.png";

const StudentsCollage = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const upto = 74000;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTotalStudents(totalStudents + 801);
        }, 200);

        if (totalStudents >= upto) {
            setTotalStudents(upto);
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [totalStudents]);

    const formattedTotalStudents = totalStudents >= 100 ? totalStudents.toLocaleString() : totalStudents;

    return (
        <div className="StudentsCollage">
            <div className="collage-content">
                <div className="students-collage-content">
                    <h1>{formattedTotalStudents}+</h1>
                    <div className="quote">
                        <h2>Student</h2>
                        <h2>Across</h2>
                        <h2>India</h2>
                    </div>
                </div>
                <div className="student-collage-images">
                    <div className="images-per-line">
                        {Array.from({ length: 6 }, (_, index) => (
                            <div key={index} className="collage-image">
                                <img src={(index + 1) % 2 === 0 ? evenImage : oddImage} className='student' alt="" />
                                <img src={(index + 1) % 2 === 0 ? evenUni : oddUni} className='uni' alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="images-per-line center">
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="collage-image">
                                <img src={(index + 1) % 2 === 0 ? evenImage : oddImage} className='student' alt="" />
                                <img src={(index + 1) % 2 === 0 ? evenUni : oddUni} className='uni' alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="images-per-line">
                        {Array.from({ length: 6 }, (_, index) => (
                            <div key={index} className="collage-image">
                                <img src={(index + 1) % 2 === 0 ? evenImage : oddImage} className='student' alt="" />
                                <img src={(index + 1) % 2 === 0 ? evenUni : oddUni} className='uni' alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentsCollage;
