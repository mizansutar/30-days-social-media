import React, { useContext, useState } from 'react';
import './create-post.css';
import LeftSidebar from "../home/leftBar/LeftSidebar";
import { DataContext } from "../../dataPRovider/dataProvider";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function CreatePost() {
  const { data } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState('');
  const [textContent, setTextContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoDesc, setPhotoDesc] = useState('');
  const [reel, setReel] = useState(null);
  const [videoDesc, setVideoDesc] = useState('');
  const [liveTitle, setLiveTitle] = useState('');
  const [pollData, setPollData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
  const [visibility, setVisibility] = useState('public');

  // Poll helpers
  const handlePollQuestionChange = (e) => {
    setPollData((prev) => ({ ...prev, question: e.target.value }));
  };
  const handlePollOptionChange = (idx, value) => {
    setPollData((prev) => {
      const newOptions = [...prev.options];
      newOptions[idx] = value;
      return { ...prev, options: newOptions };
    });
  };
  const handlePollCorrectAnswerChange = (e) => {
    setPollData((prev) => ({ ...prev, correctAnswer: e.target.value }));
  };

  const handleCardClick = (postType) => {
    setSelectedPostType(postType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPostType('');
    setTextContent('');
    setPhoto(null);
    setPhotoDesc('');
    setReel(null);
    setVideoDesc('');
    setLiveTitle('');
    setPollData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    });
    setVisibility('public');
  };

  const handleSubmit = async () => {
    switch (selectedPostType) {
      case 'Text':
        await handleTextPostSubmit();
        break;
      case 'Photo':
        await handlePhotoPostSubmit();
        break;
      case 'Reel':
        await handleReelPostSubmit();
        break;
      case 'Live':
        await handleLivePostSubmit();
        break;
      case 'Poll':
        await handlePollPostSubmit();
        break;
      default:
        console.warn('Unknown post type');
    }
    handleClose(); // Close dialog after submission
  };

  const handleTextPostSubmit = async () => {
    try {
      await axios.post('/api/posts/create', {
        description: textContent,
        privacy: visibility,
        type: "text",
        author: data?._id,
      });
    } catch (err) {
      console.error("Text post error:", err);
    }
  };

  const handlePhotoPostSubmit = async () => {
    if (!photo) return;
    try {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("description", photoDesc);
      formData.append("privacy", visibility);
      formData.append("type", "photo");
      formData.append("author", data?._id);

      await axios.post('/api/posts/create', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Photo post error:", err);
    }
  };

  const handleReelPostSubmit = async () => {
    if (!reel) return;
    try {
      const formData = new FormData();
      formData.append("file", reel);
      formData.append("description", videoDesc);
      formData.append("privacy", visibility);
      formData.append("type", "reel");
      formData.append("author", data?._id);

      await axios.post('/api/posts/create', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Reel post error:", err);
    }
  };

  const handleLivePostSubmit = async () => {
    try {
      await axios.post('/api/posts/create', {
        title: liveTitle,
        privacy: visibility,
        type: "live",
        author: data?._id,
      });
    } catch (err) {
      console.error("Live post error:", err);
    }
  };

  const handlePollPostSubmit = async () => {
    try {
      await axios.post('/api/posts/create', {
        question: pollData.question,
        options: pollData.options,
        correctAnswer: pollData.correctAnswer,
        privacy: visibility,
        type: "poll",
        author: data?._id,
      });
    } catch (err) {
      console.error("Poll post error:", err);
    }
  };

  return (
    <div className='create-post'>
      <div className="navBarcnt">
        <LeftSidebar />
      </div>
      <div className='create-post-container'>
        <div className='create-post-header'>
          <div className="left">
            <h1>Be a content creator</h1>
          </div>
          <div className="right">
            <div className="profile">
              <div className="profile-name">{data?.username}</div>
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className='avatar' />
            </div>
          </div>
        </div>
        <div className="create-post-main">
          <div className="post-card" onClick={() => handleCardClick('Text')}>
            <h2>📝 Text</h2>
            <p>Share your thoughts with the world. Express ideas, opinions, or emotions using just your words, fast and easy.</p>
          </div>
          <div className="post-card" onClick={() => handleCardClick('Photo')}>
            <h2>📷 Photo</h2>
            <p>Capture and share special moments. Let your followers see what you see, in vivid, expressive photographs anytime.</p>
          </div>
          <div className="post-card" onClick={() => handleCardClick('Reel')}>
            <h2>🎬 Reel</h2>
            <p>Record short-form videos. Show off skills, trends, or stories with dynamic, vertical content that grabs attention fast.</p>
          </div>
          <div className="post-card" onClick={() => handleCardClick('Live')}>
            <h2>📡 Live</h2>
            <p>Connect in real time. Stream live to engage instantly with your audience and receive reactions without delay.</p>
          </div>
          <div className="post-card" onClick={() => handleCardClick('Poll')}>
            <h2>📊 Poll</h2>
            <p>Ask quick questions. Gather opinions or feedback from your followers easily using interactive, tappable voting options.</p>
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose} className='dialog' PaperProps={{
        style: {
          backgroundColor: '#081b29',
          boxShadow: 'none',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #0ef',
        },
      }}>
        <DialogTitle style={{ color: '#0ef', fontSize: '24px', backgroundColor: '#081b29', width: "100%", textAlign: "center", border: "1px solid #0ef" }}>{selectedPostType} Post</DialogTitle>
        <DialogContent>
          {/* Text */}
          {selectedPostType === 'Text' && (
            <textarea
              placeholder="Write your text post here..."
              rows="4"
              className='text-input'
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          )}
          {/* Photo */}
          {selectedPostType === 'Photo' && (
            <>
              <label htmlFor="file-upload" className="file-label">
                Upload Image
              </label>
              <input type="file" id="file-upload" accept="image/*" className="file-input" onChange={(e) => setPhoto(e.target.files[0])} />

              <label htmlFor="description" className="text-label">
                Description
              </label>
              <textarea id="description" name="description" className="text-inputdescription" value={photoDesc} onChange={(e) => setPhotoDesc(e.target.value)} />

              <fieldset className="radio-group">
                <legend>Visibility</legend>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Public
                </label>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Private
                </label>
              </fieldset>
            </>
          )}
          {/* Reel */}
          {selectedPostType === 'Reel' && (
            <>
              <label htmlFor="video-upload" className="file-label">
                Upload Video
              </label>
              <input type="file" id="video-upload" accept="video/*" className="file-input" onChange={(e) => setReel(e.target.files[0])} />

              <label htmlFor="caption" className="text-label">
                Caption
              </label>
              <textarea id="caption" name="caption" className="text-inputdescription" value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} />
              <fieldset className="radio-group">
                <legend>Visibility</legend>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Public
                </label>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Private
                </label>
              </fieldset>
            </>
          )}
          {/* Live */}
          {selectedPostType === 'Live' && (
            <>
              <label htmlFor="live-title" className="text-label">
                Live Title
              </label>
              <input
                type="text"
                id="live-title"
                className="text-input"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
              />
              <fieldset className="radio-group">
                <legend>Visibility</legend>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Public
                </label>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Private
                </label>
              </fieldset>
            </>
          )}
          {/* Poll */}
          {selectedPostType === 'Poll' && (
            <>
              <label htmlFor="poll-question" className="text-label">
                Poll Question
              </label>
              <textarea
                id="poll-question"
                name="poll-question"
                className="text-input-question"
                value={pollData.question}
                onChange={handlePollQuestionChange}
              />
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx}>
                  <label htmlFor={`option${idx + 1}`} className="text-label">
                    Option {idx + 1}
                  </label>
                  <input
                    type="text"
                    id={`option${idx + 1}`}
                    name={`option${idx + 1}`}
                    className="text-input-option"
                    value={pollData.options[idx]}
                    onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                  />
                </div>
              ))}
              <label htmlFor='answer' className="text-label">
                Correct Answer
              </label>
              <select
                id="answer"
                name="answer"
                className="text-input-option"
                value={pollData.correctAnswer}
                onChange={handlePollCorrectAnswerChange}
              >
                <option value="">Select correct option</option>
                {pollData.options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt || `Option ${idx + 1}`}</option>
                ))}
              </select>
              <fieldset className="radio-group">
                <legend>Visibility</legend>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Public
                </label>
                <label className="radio-label">
                  <input type="radio" name="visibility" value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value)} />
                  Private
                </label>
              </fieldset>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{
            backgroundColor: '#0ef',
            color: '#081b29',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            marginRight: '10px'
          }}>Cancel</Button>
          <Button onClick={handleSubmit} style={{
            backgroundColor: '#0ef',
            color: '#081b29',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
          }} >Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
