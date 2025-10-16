import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Story() {
const[Story,setStory]= useState([]);

const navigate = useNavigate();

let tot=0;

useEffect(()=>{
      fetch('http://localhost:3000/story')
      .then((data) => data.json())
      .then((data) => setStory(data))
      .catch((err) => console.log(err));

},[]);


  return (
  <div className="story d-flex">
    <div className='d-none'>
      {tot=Story.length}
    </div>
    
    {Story.length > 0 ? (
      Story.map((story) => (
        <div key={story.id} className='mx-2' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
          <div className='gradinet-border'>
                  <img
                src={story.user.profile_pic}
                alt="dp"
                className="story-dp rounded-circle"
              />
          </div>
          <p className='text-truncate' style={{width:"55px"}}>{story.user.username}</p>
        </div>
      ))
    ) : (
      <p>Loading</p>
    )}
  </div>
);

}

export default Story