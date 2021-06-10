const { user, store, tag, item } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    // "/allstoredata" 최초 모든 데이터베이스 데이터 전달
    // 모든 정보를 순서대로 배열에 담아서 합쳐서 
// [
//   {
//     "message": 'ok', 
//     "data": 
//    {
//       tagname: "cat"
//       storename: "Doraemon shop"
//       itemname: "Doraemon doll"
//       itemphoto: "Doraemon.jpg"
//       itemdesc: "Doraemon shop beat seller"
//       itemprice: "20,000"
//       phone: "010-1234-5678"    
//     } 
//   }
// ]
//  findAll 상호명이 같은 store 테이블에서 phone을 가져오고
//           store 테이블의 id와 item 테이블의 store_id가 같은 item 테이블에서
//           정보 4개를 가져오고, 
//           store(id)와 tag_store의 store_id가 같은 행을 모두 찾고
//           
}