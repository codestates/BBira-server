const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 입력값 email & storename 을 받는다. 
    // 출력값 nickname email storename phone address
    // 유저 인포를 찾기 위해 이메일 & 상호명 클라이언트 쪽에서 받아야 한다. 
    // 받아온 이메일과 데이터베이스의 유저 테이블 & 스토어 테이블에서 이메일이 같은 유저를 찾아온다. 
    console.log(req.session)
    if (!req.session.userId) { // 세션 구현하면서 확인할것
        res.status(401).send({ "message": "Not found SessionId" })
    }
    else {
        const userInfo = await user.findOne({ where: { id: req.session.userId }})
        const storeId = userInfo.dataValues.store_id
        const storeInfo = await store.findOne({ where: { id: storeId }})
        const { nickname, email } = userInfo.dataValues
        const { storename, phone, address } = storeInfo.dataValues
        
        return res.status(200).send({ 
            "message": "여 !", 
            "data": { nickname, email, storename, phone, address }
        });
    }
    res.status(500).send({ "message": "Internal Server Error" })
}