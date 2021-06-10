const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const { email, password, nickname, storename, address, phone } = req.body

    if (!email || !password || !nickname) {
        res.status(422).send({ message: "fill in blank" })
    }
    
    await user.findOne({
        where: { email }
    })
    .then(async (data) => {
        if (data) {
            res.status(409).send({ message: "email exists" })
        } 
        else {
            const storeInfo = await store.create({ storename, address, phone })
            const storeId = storeInfo.dataValues.id
            await user.create({ email, password, nickname, store_id: storeId })
            res.status(201).send({ "message": "signup successed" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" })
    })
}