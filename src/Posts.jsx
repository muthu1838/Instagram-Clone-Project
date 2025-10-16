import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [followers, setFollowers] = useState([]); // followers list
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [sharePost, setSharePost] = useState(null); // track which post is being shared

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));

    // Fetch followers from your db.json
    fetch("http://localhost:3000/followers")
      .then((data) => data.json())
      .then((data) => setFollowers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggleComments = (postId) => {
    setOpenComments(openComments === postId ? null : postId);
  };

  const handleOpenShare = (postId) => {
    setSharePost(postId);
    setShowShareModal(true);
  };

  const handleSelectFollower = (id) => {
    setSelectedFollowers((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    if (selectedFollowers.length === 0) {
      alert("Please select at least one follower");
      return;
    }

    alert(
      `Post ${sharePost} sent to: ${followers
        .filter((f) => selectedFollowers.includes(f.id))
        .map((f) => f.username)
        .join(", ")}`
    );

    // Reset
    setShowShareModal(false);
    setSelectedFollowers([]);
    setSharePost(null);
  };

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div style={{ width: "400px" }}>
          {posts.map((post) => (
            <div className="my-3" key={post.id}>
              {/* User Info */}
              <div className="d-flex align-items-center">
                <img
                  className="dp rounded-circle"
                  src={post.user.profile_pic}
                  alt="Profile pic"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <h5>{post.user.username}</h5>
              </div>

              {/* Post Image */}
              <img className="image w-100 my-2" src={post.image} alt="post" />

              {/* Action Buttons */}
              <div>
                <i className="bi bi-heart mx-2"></i>
                <i
                  className="bi bi-chat mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleToggleComments(post.id)}
                ></i>
                <i
                  className="bi bi-send mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenShare(post.id)}
                ></i>
              </div>

              {/* Likes */}
              <div>
                <b>{post.likes} Likes</b>
              </div>

              {/* Caption */}
              <p>{post.caption}</p>

              {/* Comments Section */}
              {openComments === post.id && (
                <div className="comments mt-2 p-2 border rounded">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, idx) => (
                      <p key={idx} className="mb-1">
                        <b>{comment.user}</b> {comment.comment}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted">No comments yet</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Share Modal */}
          {showShareModal && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              <div className="bg-white p-3 rounded" style={{ width: "300px" }}>
                <h5>Select Followers</h5>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    marginBottom: "10px",
                  }}
                >
                  {followers.map((f) => (
                    <div
                      key={f.id}
                      className="d-flex align-items-center mb-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectFollower(f.id)}
                    >
                      
                      <span>{f.username}</span>
                      <input
                        type="checkbox"
                        className="ms-auto"
                        checked={selectedFollowers.includes(f.id)}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowShareModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSend}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}

export default Posts;
