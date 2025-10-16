import React, { useEffect, useState } from "react";
import axios from "axios";


function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [unfollowed, setUnfollowed] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/profile")
      .then((data) => setProfile(data.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/followers")
      .then((data) => setFollowers(data.data))
      .catch((err) => console.log(err));
  }, [unfollowed]);

  const handleUnfollow = async (id) => {
    axios
      .delete(`http://localhost:3000/followers/${id}`)
      .then(() => {
        setUnfollowed(!unfollowed);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-wrapper">
      {profile ? (
        <>
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src={profile.profile_pic}
              alt="dp"
              className="profile-avatar"
            />
            <div className="profile-details">
              <h3 className="profile-username">{profile.username}</h3>
              <p className="profile-bio">
                {profile.bio || "Carpediem!!!"}
              </p>
              <div className="profile-stats">
                <span>
                  <strong>{followers.length}</strong> Followers
                </span>
                <span>
                  <strong>120</strong> Following
                </span>
              </div>
            </div>
          </div>

          
          <div className="followers-block">
            <p
              className="followers-toggle"
              onClick={() => setShowFollowers((prev) => !prev)}
            >
              Followers ({followers.length}) {showFollowers ? "▲" : "▼"}
            </p>

            {showFollowers && (
              <div className="followers-list">
                {followers.map((f) => (
                  <div key={f.id} className="follower-row">
                    
                    <span>{f.username}</span>
                    <button
                      className="btn-unfollow"
                      onClick={() => handleUnfollow(f.id)}
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Profile;
