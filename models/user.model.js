const bcrypt = require('bcryptjs')
const db = require('../data/database')
const mongodb = require('mongodb')
class User {
    constructor(email,password,fullname,sterrt,postal,city){
        this.email = email
        this.password = password
        this.name = fullname
        this.address = {
            sterrt : sterrt,
            postalCode : postal,
            city : city
        }
    }

    static findByID(userId){

        const uid = new mongodb.ObjectId(userId)
        return db.getDB().collection('users').findOne({_id :uid},{projection:{password: 0}})

    }



    getUserWithSameEmail(){
    return db.getDB().collection('users').findOne({email : this.email})       
    }
    async existaAlready(){
        const existaUser = await this.getUserWithSameEmail()
        if(existaUser){
            return true
        }
        return false
        
    }
    
    async signup(){
        const newpass = await bcrypt.hash(this.password,12)

        await db.getDB().collection('users').insertOne({
            email:this.email,
            password:newpass,
            name:this.name,
            address:this.address
        })
    }
    hasMatchingPassword(hasedPassword){
        return bcrypt.compare(this.password,hasedPassword)
    }
}
module.exports = User