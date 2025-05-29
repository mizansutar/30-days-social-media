const video = require('../models/video');
const Url="http://localhost:5000"
const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const vid = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      videoBase64: req.file.buffer.toString('base64')
    };

    const newVideo = new Video(vid);
    await newVideo.save();
    const videoUrl = `${Url}/video/${newVideo._id}`;
    return res.status(200).json( videoUrl);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.set('Content-Type', video.contentType);
    res.send(Buffer.from(video.videoBase64, 'base64'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadVideo, getVideo };

