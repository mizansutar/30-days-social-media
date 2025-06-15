const axios = require('axios');
const fs = require('fs');
const { faker } = require('@faker-js/faker');

const POLL_API = 'http://localhost:5000/api/polls/create';
const users = JSON.parse(fs.readFileSync('registration_responses.json'));
const pollResponses = [];

const generatePollData = () => {
  const optionCount = 4;
  const optionTexts = Array.from({ length: optionCount }, () => faker.word.noun());

  const options = optionTexts.map(text => ({
    text,
    votes: 0
  }));

  const correctOptionIndex = Math.floor(Math.random() * optionCount);

  return {
    question: faker.lorem.sentence().replace(/\.$/, '?'),
    options,
    correctOptionIndex,
    privacy: "public"
  };
};

(async () => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (!user.token || !user.user) continue;

    const pollData = generatePollData();

    try {
      const res = await axios.post(POLL_API, pollData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const pollId = res.data.poll?._id || null;
      if (pollId) {
        user.user.posts = user.user.posts || [];
        user.user.posts.push(pollId);
      }

      pollResponses.push(res.data);
      console.log(`✅Poll created for: ${user.user.username}`);
    } catch (err) {
      pollResponses.push({ error: err.message, user: user.user.username });
      console.error(` Poll failed for: ${user.user.username}`);
    }
  }

  fs.writeFileSync('registration_responses.json', JSON.stringify(users, null, 2));
  fs.writeFileSync('poll_responses.json', JSON.stringify(pollResponses, null, 2));

  console.log('Polls created and user data updated.');
})();
