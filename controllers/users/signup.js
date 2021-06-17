const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const crypto = require('crypto');
dotenv.config();

module.exports = async (req, res) => {
    const { email, password, nickname, storename, address, phone, tagname } = req.body

    if (!storename || !address || !phone || !tagname) { // 사용자 회원가입

        await user.findOne({
            where: { email }
        })
        .then(async (data) => {
            if (data) {
                return res.status(409).send({ message: "email exists" })
            }
            const storeInfo = await store.create({ storename, address, phone })
            const storeId = storeInfo.dataValues.id
            const hash = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
            await user.create({ email, password: hash, nickname, storeId })
            return res.status(201).send({ "message": "signup successed" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: "Internal Server Error" })
        })
    }
    else { // 사업자 회원가입
        await user.findOne({
            where: { email }
        })
        .then(async (data) => {
            if (data) {
                res.status(409).send({ message: "email exists" })
            }
            else {
                const tagnameArr = tagname.split(',')
                const storeInfo = await store.create({ storename, address, phone })
                const storeId = storeInfo.dataValues.id 
    
                for (let el of tagnameArr) {
                    await tag.create({ tagname: el })
                    const taginfo = await tag.findOne({ where: { tagname: el } })
                    await tag_store.create({ storeId, tagId: taginfo.dataValues.id })
                }
                const hash = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
                await user.create({ email, password: hash, nickname, storeId })
                res.status(201).send({ "message": "signup successed" })
            }
        })
    }
}