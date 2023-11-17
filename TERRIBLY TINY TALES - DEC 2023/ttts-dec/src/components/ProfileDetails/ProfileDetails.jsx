import React from "react";
import "./ProfilesDetails.scss";
import profileData from "./profileData.json";

const ProfileDetails = () => {
  return (
    <div className="ProfileDetails">
      <div className="profile-status">
        <div className="profilepic">
          <img src={profileData.profilePic} alt="user-profile" />
        </div>
        <div className="details">
          <div className="name">
            <h2>{profileData.name}</h2>
          </div>
          <div className="stats">
            <div className="followers">
              <a href="#">{profileData.followers}</a>
              <p>Followers</p>
            </div>
            <div className="following">
              <a href="#">{profileData.following}</a>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-bio">
        <p>{profileData.bio}</p>
        <a href={profileData.website}>{profileData.website}</a>
        <div className="icons">
          {profileData.icons.map((icon, index) => (
            <span key={index}>{icon}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
