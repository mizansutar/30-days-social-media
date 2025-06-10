const Video = require('../models/video'); // Make sure this is the correct model
const Url="http://localhost:5000";

const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    // Debug: log the video document
    console.log('Fetched video:', video);

    // Use the correct field name for the base64 data
    if (!video.videoBase64) {
      return res.status(500).json({ message: 'Video data is missing in the database.' });
    }

    res.set('Content-Type', video.contentType);
    res.send(Buffer.from(video.videoBase64, 'base64'));
  } catch (err) {
    console.error('Error retrieving video:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getVideo };

