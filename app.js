const express = require('express');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const controllers = require("./controllers");
require('dotenv').config()
const session = require('express-session');

const app = express();

app.use(express.json())
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

const port = 3000; //배포환경시 80

app.use(
  session({
    secret: '@BBira',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 1000000000, // 나중에 줄여야함
      // sameSite: 'None',
      httpOnly: true,
      // secure: true,
    },
  })
);

// users //
app.post("/fixuserinfo", controllers.fixuserinfo); // email, nickname, address, storename, phone
app.post("/signup", controllers.signup); // email, nickname, address, storename, phone, password
app.post("/login", controllers.login); // email, password
app.get("/logout", controllers.logout);
app.post("/dropuser", controllers.dropuser); // email
app.get("/userinfo", controllers.userinfo);

// stores //
app.post("/fixiteminfo", controllers.fixiteminfo);
app.post("/dropitem", controllers.dropitem);
app.post("/allstore", controllers.allstore);
app.post("/itemregister", controllers.itemregister);
app.post("/mystore", controllers.mystore);


let server;
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(port, () => console.log(`https 서버가 ${port}번에서 작동중입니다.`));
// } else {
  server = app.listen(port,() => {
    console.log(`http 서버가 ${port}번에서 작동중입니다.`);
  })

// }