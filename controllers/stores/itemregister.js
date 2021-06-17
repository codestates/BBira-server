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
        return res.status(404).send({ data: null, message: "데이터에 없는 유저입니다." })
    }
    
    const { itemname, itemdesc, itemprice } = req.body;

    await item.create({ itemname, itemphoto: "/uploads/" + req.file.filename, itemdesc, itemprice, storeId: data.storeId });
    return res.status(201).send({ "message": "item register successed" });

    return res.status(500).send({ message: "Internal Server Error" });
}