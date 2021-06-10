const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 클라이언트에서 이메일 & 상호명을 받는다. 
    // 테이블에서 찾아 없앤다. 
    // ok res를 보낸다. 
    const { email } = req.body
    if (email) {
        const userInfo = await user.findOne({ where: { email: req.body.email }})
        const storeId = userInfo.dataValues.store_id
        await store.destroy({ where: { id: storeId }})
        await user.destroy({ where: { email }})
        res.status(205).send({ "message": '재가입은 유료입니다.' })
    }
    else {
        res.status(500).send({ "message": "Internal Server Error" })
    }

}