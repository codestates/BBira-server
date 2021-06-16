require('dotenv').config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');

const githubUserInfo = {};

module.exports = async (req, res) => {
  await axios.post('https://github.com/login/oauth/access_token', 
    {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: req.body.authorizationCode
    },
    {
    headers: {
      Accept: "application/json"
    }
  })
  .then(data => {
    const access_token = data.data.access_token

    const GITHUB_USERINFO_URL = `https://api.github.com/user`;

    return axios
      .get(GITHUB_USERINFO_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          githubUserInfo.email = "";
          githubUserInfo.nickname = response.data.login;
        }
        return res.status(200).send({ user: githubUserInfo });
      })
  })
  .catch((e) => console.log(e));
}