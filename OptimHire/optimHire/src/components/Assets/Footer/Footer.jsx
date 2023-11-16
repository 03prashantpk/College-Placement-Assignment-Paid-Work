import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="flex">
            <div className="developerInfo" onClick={() => { window.open("https://www.instagram.com/prashantpkumar/", "_blank") }}>
                <div className="image-container-2"></div>
                <div className="image-container-3"></div>
                <div className="image-container-4"></div>
                <div className="image-container-5"></div>
                <div className="image-container">
                    <img src={`https://avatars.githubusercontent.com/u/43730425?v=4`} alt="Prashant" />
                </div>
            </div>
            </div>
            <a href="https://unichatapp.vercel.app">Try - UniChat <span>New App</span></a>
            <p><a target="_blank" rel="noreferrer" href="https://enally.in/projects/">Checkout More Projects <i class="fal fa-window-restore"></i></a></p>
            <p className='copyright'>Copyright © 2023 Admission Jockey.</p>
        </footer>
    );
}

export default Footer;
