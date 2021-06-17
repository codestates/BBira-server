const axios = require("axios");
const { user } = require("../../models");

module.exports = (req, res) => {
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
    const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const AUTHORIZATION_CODE = req.body.authorizationCode;
    const KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${AUTHORIZATION_CODE}`;

    let kakaoUserInfo = {};

    axios
      .post(
        KAKAO_TOKEN_URL,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        const { access_token, token_type, refresh_token } = response.data;
        const KAKAO_USERINFO_URL = `https://kapi.kakao.com/v2/user/me`;
        return axios
        .get(KAKAO_USERINFO_URL, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            accept: "application/json",
          },
        })
        .then(async (response) => {
          if (response.data.kakao_account) {
            kakaoUserInfo.email = response.data.kakao_account.email;
            kakaoUserInfo.nickname = response.data.kakao_account.profile.nickname;
          }
          const userInfo = await user.findOne({
            where: { email: response.data.kakao_account.email },
          });
          return res.
          status(200)
          .cookie("refreshToken", refresh_token, {
            httpOnly: true
          })
          .send({ user: kakaoUserInfo, accessToken: access_token })
        })
    })
    .catch((e) => console.log(e));
};
