const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const userinfo = require('./userinfo');
const crypto = require('crypto');
dotenv.config();


module.exports = async (req, res) => {
    const { email, password } = req.body
    const userInfo = await user.findOne({
        where: { email }
    })

    if (!userInfo) {
        return res.status(404).send({ message: "invalid user" });
    } 
    const hash = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
    if (hash !== userInfo.dataValues.password) {

      return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' })
    }
    else {
      delete userInfo.dataValues.password
      const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
        expiresIn: '1h'
      });
      const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, {
        expiresIn: '2h'
      });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true
      })
      .send({ 
        message: "login successed",
        data: { accessToken, refreshToken }
      })
  }
}
