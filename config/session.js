const expressSession = require('express-session')

const mongodbStore = require('connect-mongodb-session')

function createSessionStore(){
    const mongoDBStore = mongodbStore(expressSession)

    const store = new mongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName:'online-shop',
        collection : 'sessions'
    })
    return store  
} 
 
function createSessionConfig(){
    return{
        secret : 'super-secret',
        resave : false,
        saveUninitialized :false,
        store:createSessionStore(),
        cookin:{
            maxAge: 2* 24*60*60*1000
        }
    }
}
module.exports = createSessionConfig