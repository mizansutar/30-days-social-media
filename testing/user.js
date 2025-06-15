const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:5000/api/users/register';
const responses = [];

(async () => {
  for (let i = 1; i <= 100; i++) {
    const userData = {
      username: `testuser${i}`,
      password: 'pass',
      email: `testuser${i}@mail.com`
    };

    try {
      const res = await axios.post(API_URL, userData);
      responses.push(res.data);
      console.log(`Registered: ${userData.username}`);
    } catch (err) {
      responses.push({ error: err.message, user: userData });
      console.error(` Failed: ${userData.username}`);
    }
  }

  fs.writeFileSync('registration_responses.json', JSON.stringify(responses, null, 2));
  console.log(' All responses saved to registration_responses.json');
})();
