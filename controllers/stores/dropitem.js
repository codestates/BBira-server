const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const authorization = req.headers['authorization'];

    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!data) {
        return res.status(404).send({ message: "데이터에 없는 유저입니다." })
    }
    const { id } = req.body
    await item.destroy({ where: { id }})
    return res.status(205).send({ "message": "아이템 삭제 완료" })

    res.status(500).send({ "message": "Internal Server Error" })
}