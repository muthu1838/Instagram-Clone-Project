import axios from 'axios';
import React, { useEffect,useState } from 'react'

function Suggestions() {


   const [profile, setProfile] = useState([null]);
   const [suggestions,setSuggestions] = useState([]);
   
    useEffect(() => {
      fetch('http://localhost:3000/profile')
        .then((data) => data.json())
        .then((data) => setProfile(data))
        .catch((err) => console.log(err));


         fetch('http://localhost:3000/suggestions')
        .then((data) => data.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.log(err));
    }, []);

    const handleFollow = async (id, username) =>{
      axios.post('http://localhost:3000/followers',{"id":id,"username":username})
      .then(alert('Followed'))
    }
  
  
  
  return (
    <div>
      <div className="suggestions m-4">
  {/* Profile row */}
  {profile ? (
    <div className="d-flex align-items-center mb-3">
      <img
        className="dp rounded-circle me-2"
        src={profile.profile_pic}
        alt="Profile pic"
        style={{ width: "40px", height: "40px" }}
      />
      <h5 className="mb-0">{profile.username}</h5>
      <small className="ms-auto text-primary">Switch</small>
    </div>
  ) : (
    <p>Loading..</p>
  )}

 
  <div className="d-flex align-items-center mb-2">
    <p className="mb-3 text-muted">Suggested for you</p>
    <b className="ms-auto mb-3">See All</b>
  </div>


  {suggestions.length > 0 ? (
    <div>
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="d-flex align-items-center mb-2">
          <img
            className="dp rounded-circle me-2"
            src={suggestion.profile_pic}
            alt="Profile pic"
            style={{ width: "32px", height: "32px" }}
          />
          <h6 className="mb-0">{suggestion.username}</h6>
          <a className="text-primary mb-0 ms-auto" onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
        </div>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  )}
</div>


      </div>
      
  )
}

export default Suggestions