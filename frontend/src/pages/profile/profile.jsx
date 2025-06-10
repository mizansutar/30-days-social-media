import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftSidebar from '../home/leftBar/LeftSidebar';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import './profile.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/userSlice';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [textStories, setTextStories] = useState([]);
  const [photoPosts, setPhotoPosts] = useState([]);
  const[polls,setPolls]=useState([]);

  const { user } = useSelector(state => state.user);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const fetchTextPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/text-stories/user/posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setTextStories(res.data.storyPosts || []);
      else setTextStories([]);
    } catch {
      setTextStories([]);
    }
  };

  const fetchPhotoPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts/user/getallpost", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setPhotoPosts(res.data.posts || []);
      else setPhotoPosts([]);
    } catch {
      setPhotoPosts([]);
    }
  };

  const handleClickOpen = () => {
    setUsername(user?.username || '');
    setBio(user?.bio || '');
    setPreview(user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&size=128`);
    setImage(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (image) formData.append('file', image);
      formData.append('bio', bio);
      formData.append('username', username); // include username if API supports

      const res = await axios.post(
        "http://localhost:5000/api/users/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully!", { position: "top-right", delay: 1000 });
        // Use res.data.data or res.data.user depending on your API response structure
        dispatch(setUser({ user: res.data.data || res.data.user, token }));
        setOpen(false);
      } else {
        toast.error("Profile update failed.", { position: "top-right" });
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Profile update failed.", { position: "top-right" });
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const fetch_allpolls = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/polls/allpolls", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setPolls(res.data.polls || []);
      else setPolls([]);
    } catch {
      setPolls([]);
    }
  }

  return (
    <div className='profile-container'>
      <nav className='profile-nav'><LeftSidebar /></nav>
      <main className='profile-main'>
        <div className="profile-main-header">
          <div className="imagecontainer">
            <img
              src={preview || user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&size=128`}
              alt="avatar"
              className='profile-avatar'
              onClick={handleClickOpen}
            />
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <div className="container-follow">
              <div className='foll-div'>
                Followers
                <div className="follower"><p>{user?.followers?.length || 0}</p></div>
              </div>
              <div className='foll-div'>
                Following
                <div className="follower"><p>{user?.following?.length || 0}</p></div>
              </div>
              <div className='foll-div'>
                Posts
                <div className="follower"><p>{user?.posts?.length || 0}</p></div>
              </div>
            </div>
            <div className="dec">
              <p>{user?.bio || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}</p>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={handleClickOpen}>
                <EditIcon style={{ marginRight: '8px' }} />Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="middle">
          <hr color='#081b29' />
          <div className="box">
            <div className="com">
              <div className="textPost element" onClick={fetchTextPosts}>Text</div>
              <div className="photoPost element" onClick={fetchPhotoPosts}>Photos</div>
              <div className="videoPost element">Videos</div>
              <div className="pollPost element"onClick={fetch_allpolls}>Polls</div>
            </div>
          </div>
        </div>

        <div className="main-images-grid">
          <div className="profile-textPost-gallery">
            {textStories.map((post, i) => (
              <div key={post._id || i} className="post-thumbnail" style={{ padding: '1rem', border: '1px solid #0ef', marginBottom: '1rem', borderRadius: '8px', backgroundColor: '#081b29', color: '#0ef' }}>
                <p>{post.description}</p>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="main-images-grid">
          <div className="profile-post-gallery">
            {photoPosts.map((post, i) => (
              <div key={post._id || i} className="post-thumbnail">
                <img src={post.mediaUrl} alt={`post-${i}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="polls_display">
          {polls.map(poll => (
            <article key={poll._id} className="poll-card">
              <h2 className="poll-question">{poll.question}</h2>
              <small className="poll-date">
                {new Date(poll.createdAt).toLocaleString()}
              </small>
              <ul className="poll-options">
                {poll.options.map(option => (
                  <li key={option._id} className="poll-option">
                    <span className="option-text">{option.text}</span>
                    <span className="option-votes">{option.votes} votes</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>



      </main>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: '#081b29', border: '2px solid #0ef', color: '#0ef' } }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img
              src={preview || user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&size=128`}
              alt="preview"
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '2px solid #0ef' }}
              onClick={() => document.getElementById('fileInput').click()}
            />
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="bio"
            label="Bio"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
