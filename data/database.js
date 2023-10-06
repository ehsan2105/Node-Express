const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let database
async function connectToDatabase(){

    const client= await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('online-shop');
}
function getDB(){
    if (!database){
        throw new Error('database dont connect')
    }
    return database
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDB : getDB
}