const {
    checkRefeshToken,
    generateAccessToken,
    resendAccessToken,
  } = require('../tokenFunctions');
const { user, store, item, tag, tag_store } = require('../../models');

module.exports = (req, res) => {
console.log(req.cookies)
const refreshToken = req.cookies.refreshToken;

console.log(refreshToken)
if (!refreshToken) {
    return res.status(403).send({ message: 'refreshToken이 없습니다.' });
}
console.log(refreshToken)
const refreshTokenData = checkRefeshToken(refreshToken);
console.log(refreshTokenData)
  if (!refreshTokenData) {
    return res.status(400).json({
      message: 'invalid refresh token, please log in again',
  });
}

 const { id } = refreshTokenData;
    user.findOne({ where: { id } })
      .then((data) => {
        if (!data) {
          return res.json({
            data: null,
            message: 'refresh token has been tempered',
          });
        }
       delete data.dataValues.password;

        const newAccessToken = generateAccessToken(data.dataValues);
        resendAccessToken(res, newAccessToken, data.dataValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };