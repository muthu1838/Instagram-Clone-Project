import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewStory() {
  const { id, tot } = useParams();
  const storyId = Number(id);
  const total = Number(tot);

  const [story, setStory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (storyId > total || storyId <= 0) {
      navigate('/');
      return;
    }

    fetch(`http://localhost:3000/story/${storyId}`)
      .then((data) => data.json())
      .then((data) => setStory(data))
      .catch((err) => console.log(err));
  }, [storyId, total, navigate]);

  const handleNext = () => {
    if (storyId === total) {
      navigate('/');
    } else {
      navigate(`/story/${storyId + 1}/${total}`);
    }
  };

  
  const handlePrev = () => {
    if (storyId === 1) {
      navigate('/');
    } else {
      navigate(`/story/${storyId - 1}/${total}`);
    }
  };

  return (
    <div className="story-view d-flex justify-content-center align-items-center bg-dark text-white" style={{ height: "100vh" }}>
      {story ? (
        <div className="position-relative" style={{ width: "400px", height: "100%" }}>
         
          <div className="d-flex align-items-center justify-content-between px-2 py-2 position-absolute top-0 w-100" style={{ zIndex: 3 }}>
            <div className="d-flex align-items-center">
              <img
                src={story.user.profile_pic}
                alt="profile"
                className="rounded-circle me-2"
                style={{ width: "35px", height: "35px", objectFit: "cover" }}
              />
              <strong>{story.user.username}</strong>
            </div>
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => navigate('/')}
            ></i>
          </div>

     
          <img
            src={story.image}
            alt="story"
            className="w-100 h-100"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />

          
          <i
            className="bi bi-arrow-left-circle-fill position-absolute"
            style={{ top: "50%", left: "-40px", fontSize: "2rem", cursor: "pointer", zIndex: 2 }}
            onClick={handlePrev}
          ></i>

          <i
            className="bi bi-arrow-right-circle-fill position-absolute"
            style={{ top: "50%", right: "-50px", fontSize: "2rem", cursor: "pointer", zIndex: 2 }}
            onClick={handleNext}
          ></i>

        
          <div className="position-absolute bottom-0 w-100 d-flex justify-content-between align-items-center px-3 py-2" style={{ background: "rgba(0,0,0,0.3)" }}>
            <input
              type="text"
              placeholder="Send message"
              className="form-control form-control-sm bg-transparent text-white border-0"
              style={{ width: "70%" }}
            />
            <div className="d-flex align-items-center">
              <i className="bi bi-heart mx-2" style={{ fontSize: "20px", cursor: "pointer" }}></i>
              <i className="bi bi-send mx-2" style={{ fontSize: "20px", cursor: "pointer" }}></i>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ViewStory;
