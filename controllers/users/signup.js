const { user, item, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

// 회원 가입 요청 //
module.exports = async (req, res) => {
    // console.log(req.body)
    // 입력 : email, password, nickname, storename, address, phone
    // 입력값이 옳바른지 확인한다. 
    // 옳바른 입력값이라면, user 테이블에서 email이 중복되는지 확인한다. 
    // 중복되지 않은 email이라면, user 테이블에 추가한다. 
    // 사업자인 경우 email, password, nickname, storename, address, phone 입력 
    // 사용자인 경우 email, password, nickname만 입력 -> advanced

    const { email, password, nickname, storename, address, phone } = req.body

    if (!email || !password || !nickname || !storename || !address || !phone) {
        res.status(422).send({ message: "Unprocessable Entity" })
    }

    await user.findOne({
        where: { email }
    })
    .then(data => {
        if (data) {
            res.status(409).send({ message: "email exists" })
        } 
        else {
            const userInfo = await user.create({ email, password, nickname })
            const storeInfo = await store.create({ storename, address, phone })
            delete userInfo.dataValues.password
            const newUser = { ...userInfo.dataValues, ...storeInfo.dataValues }
            res.status(201).send({ message: "ok", data: { newUser }})
        }
    })
}