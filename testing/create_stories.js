const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:5000/api/text-stories/create';
const users = JSON.parse(fs.readFileSync('registration_responses.json'));
const storyResponses = [];

const generateRandomStory = () => {
  const words = [];
  const sampleWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");
  for (let i = 0; i < 100; i++) {
    words.push(sampleWords[Math.floor(Math.random() * sampleWords.length)]);
  }
  return words.join(' ');
};

(async () => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (!user.token || !user.user) continue;

    const storyData = {
      description: generateRandomStory(),
      privacy: "public"
    };

    try {
      const res = await axios.post(API_URL, storyData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const storyId = res.data.story?._id || null;
      if (storyId) {
        user.user.posts = user.user.posts || [];
        user.user.posts.push(storyId);
      }

      storyResponses.push(res.data);
      console.log(` Story created for: ${user.user.username}`);
    } catch (err) {
      storyResponses.push({ error: err.message, user: user.user.username });
      console.error(` Story failed for: ${user.user.username}`);
    }
  }

  fs.writeFileSync('registration_responses.json', JSON.stringify(users, null, 2)); // Overwrite with updated posts
  fs.writeFileSync('text_story_responses.json', JSON.stringify(storyResponses, null, 2));

  console.log(' Updated users and saved story responses.');
})();
