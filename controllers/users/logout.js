const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    res.status(200).cookie('refreshToken', '').send({ message: "logout successed" });
}


// const { user, store, item, tag, tag_store } = require('../../models');
// const jwt = require('jsonwebtoken');
// const dotenv = require("dotenv");
// dotenv.config();

// module.exports = (req, res) => {
//     const authorization = req.headers['authorization'];
//     if (!authorization) { 
//         return res.status(401).send({ "message": 'invalid access token'})
//     }
//     else {
//         return res.status(200).cookie('refreshToken', '').send({ message: "logout successed" });
//     }
// }