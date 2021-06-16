module.exports = {
    signup: require('./users/signup'),

    login: require('./users/login'),

    userinfo: require('./users/userinfo'),

    fixuserinfo: require('./users/fixuserinfo'),
    
    logout: require('./users/logout'),

    dropuser: require('./users/dropuser'),

    itemregister: require('./stores/itemregister'),

    dropitem: require('./stores/dropitem'),

    fixiteminfo: require('./stores/fixiteminfo'),

    allstore: require('./stores/allstore'),

    mystore: require('./stores/mystore'), 
    
    kakaologin: require('./users/kakaologin'),

    githublogin: require('./users/githublogin'),

    refreshtokenrequest: require("./users/refreshTokenRequest")
}
