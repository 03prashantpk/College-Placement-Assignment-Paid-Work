import GetAdvice from '../Assets/GetAdvice/GetAdvice';
import './TopPartners.scss';

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
import FeaturedUniversity from '../FeaturedUniversity/FeaturedUniversity';

const universityImages = [uni_1, uni_2, uni_3, uni_4, uni_5, uni_6, uni_7, uni_8, uni_9, uni_10, uni_11, uni_12, uni_13, uni_14];

const TopPartners = () => {
  return (
    <div className="TopPartners">
      <GetAdvice />

      <h1>Our Top University Partners</h1>
      <div className="slider">
        <div className="slide-track">
          {universityImages.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
        
        
        <FeaturedUniversity/>

    </div>
  );
};

export default TopPartners;
