const { user, store, tag, tag_store, item} = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const path = require('path')
dotenv.config();
const fs = require("fs") 


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
    else {

        const allitemsInfo = await item.findAll({ where: { storeId: data.storeId } })
        
        const items = allitemsInfo.map(el => {
            let result = fs.readFileSync(`.${el.dataValues.itemphoto}`)
            let b = imageDataUri.encode(result, "jpg")
            return {
              ...el.dataValues,
              itemphoto: b
            }
        })

        const storeInfo = await store.findOne({ where: { id: data.storeId } })
        const stores = storeInfo.dataValues

        const alltagIdinfo = await tag_store.findAll({ where: { storeId: data.storeId } })
        const tagsId = alltagIdinfo.map(el => el.dataValues.tagId)
        
        const tags = [];
        for (let el of tagsId) {
            let taginfo = await tag.findOne({ where: { id: el } })
            tags.push(taginfo.dataValues)
        }

        return res
        .status(200)
        .send({ 
            "message": '내 스토어 정보 여깃어 !', 
            "data": { tags, stores, items }  
        })
    }
    res.status(500).send({ "message": "Internal Server Error" })
}
