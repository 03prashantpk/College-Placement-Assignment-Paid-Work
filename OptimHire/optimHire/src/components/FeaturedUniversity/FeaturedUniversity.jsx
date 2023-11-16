import React, { useState } from 'react';
import './FeaturedUniversity.scss';
import uni_1 from '../../assets/images/1.png';
import uni_2 from '../../assets/images/2.png';
import uni_3 from '../../assets/images/3.png';
import uni_4 from '../../assets/images/4.png';
import uni_5 from '../../assets/images/5.png';
import uni_6 from '../../assets/images/6.png';
import uni_7 from '../../assets/images/7.png';
import uni_8 from '../../assets/images/1.png';
import uni_9 from '../../assets/images/2.png';
import uni_10 from '../../assets/images/3.png';
import uni_11 from '../../assets/images/4.png';
import uni_12 from '../../assets/images/5.png';
import uni_13 from '../../assets/images/6.png';
import uni_14 from '../../assets/images/7.png';

const FeaturedUniversity = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);

    const moveLeft = () => {
        if (marginLeft < 0) {
            setMarginLeft(marginLeft + 350);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const moveRight = () => {
        if (currentIndex < 6) {
            setMarginLeft(marginLeft - 350);
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="FeaturedUniversity">
            <h1>Featured Universites</h1>
            <div className="FeaturedUniversity-carrousel">
                <div className="FeaturedUniversity-items" style={{ marginLeft: `${marginLeft}px` }}>
                    <div className="item">
                        <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Hogwarts University, Campus" alt="" />
                            <div className="content">
                                <img src={uni_1} alt="" className="logo" />
                                <h3>Hogwarts University</h3>
                            </div>

                            <div className="footer">
                                <p>Hogwarts University, or simply Hogwarts, is a fictional wizarding school featured in J.K. Rowling's Harry Potter series.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Stanford University, Campus" alt="" />
                            <div className="content">
                                <img src={uni_2} alt="" className="logo" />
                                <h3>Stanford University</h3>
                            </div>

                            <div className="footer">
                                <p> Stanford is renowned for its innovation and entrepreneurial spirit, fostering groundbreaking research and technological advancements.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Oxford University, Campus" alt="" />
                            <div className="content">
                                <img src={uni_3} alt="" className="logo" />
                                <h3>Oxford University</h3>
                            </div>

                            <div className="footer">
                                <p>Oxford, with its centuries-old tradition of scholarly achievement, continues to be a symbol of academic excellence and intellectual rigor.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Cambridge University, Campus" alt="" />
                            <div className="content">
                                <img src={uni_4} alt="" className="logo" />
                                <h3>Cambridge University</h3>
                            </div>

                            <div className="footer">
                                <p>Cambridge is synonymous with cutting-edge research and boasts a rich history of producing notable scholars and Nobel laureates.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Massachusetts Institute of Technology, Campus" alt="" />
                            <div className="content">
                                <img src={uni_5} alt="" className="logo" />
                                <h3>Massachusetts Institute of Technology</h3>
                            </div>

                            <div className="footer">
                                <p>MIT is a hub for science and technology, driving advancements that shape our modern world.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?University of Tokyo, Campus" alt="" />
                            <div className="content">
                                <img src={uni_6} alt="" className="logo" />
                                <h3>University of Tokyo</h3>
                            </div>

                            <div className="footer">
                                <p>The University of Tokyo is a leading institution in Asia, recognized for its contributions to global research and education.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Yale University, Campus" alt="" />
                            <div className="content">
                                <img src={uni_7} alt="" className="logo" />
                                <h3>Yale University</h3>
                            </div>

                            <div className="footer">
                                <p>Yale's Ivy League status reflects its commitment to academic excellence and its distinguished alumni network, including former U.S. Presidents and Nobel laureates.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?University of Oxford, Campus" alt="" />
                            <div className="content">
                                <img src={uni_8} alt="" className="logo" />
                                <h3>University of Oxford</h3>
                            </div>

                            <div className="footer">
                                <p>Oxford is a world-renowned center for literature, known for producing literary giants like J.R.R. Tolkien and C.S. Lewis.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                    <div className="card">
                            <img src="https://source.unsplash.com/1600x900/?Hogwarts University, Campus" alt="" />
                            <div className="content">
                                <img src={uni_9} alt="" className="logo" />
                                <h3>Hogwarts University</h3>
                            </div>

                            <div className="footer">
                                <p>Hogwarts University, or simply Hogwarts, is a fictional wizarding school featured in J.K. Rowling's Harry Potter series.</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="cont">
                    <div className="left controls" onClick={moveLeft}>
                        <img src="https://cdn2.iconfinder.com/data/icons/electronic-line-3/64/back_Arrow_chevron_left_ui_interface_icon-512.png" />
                    </div>
                    <div className="right controls" onClick={moveRight}>
                        <img src="https://cdn1.iconfinder.com/data/icons/mixed-17/16/icon_right_rounded-512.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedUniversity;
