import "./ProfilesDetails.scss";

const ProfileDetails = () =>{
    return (
        <div className="ProfileDetails">
            <div className="profile-status">
                <div className="profilepic">
                    <img src="https://avatars.githubusercontent.com/u/43730425?v=4" alt="user-profile" />
                </div>
                <div className="details">
                    <div className="name">
                        <h2>Prashant Kumar</h2>
                    </div>
                    <div className="stats">
                        <div className="followers">
                            <a href="#">6482</a>
                            <p>Followers</p>
                        </div>
                        <div className="following">
                            <a href="#">245</a>
                            <p>Following</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-bio">
                <p>Founder of Enally.in, UniChat & linkinblink.in</p>
                <a href="https://enally.in">https://enally.in</a>
                <div className="icons">
                    ICON 1 | ICON 2 | ICON 3 | ICON 4
                    {/* For ICON U YOU USE FONTAWESOME OR ICONIFY */}
                </div>
            </div>
                

        </div>
    )
}

export default ProfileDetails;