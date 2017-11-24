const uuidv4 = require('uuid/v4')
const mongoCollections = require('../config/mongoCollections')
const bcrypt = require("bcrypt")
const users = mongoCollections.users

const saltRounds = 10

module.exports = {
    // CRUD methods
    addUser: async function(user) {
        // If invalid user object passed in
        if(!user) throw "You must supply the user data"
        try {
            // set an id to the new user
            user._id = uuidv4()

            user.password = await bcrypt.hash(user.password, saltRounds)

            // wait to get the user collection
            const userCollection = await users()

            // insert the user and get the insertion result
            const insertInfo = await userCollection.insertOne(user)

            // if inserted count equals 0, there must be something wrong, throw an exception
            if(insertInfo.insertCount === 0) throw "Could not add the user"

            // return the newly added user
            const newId = insertInfo.insertedId
            return await this.getUserById(user._id)
        } catch (e) {
            throw e
        }
    },
    getUserById: async function(id, columns = {}) {
        if(!id) throw "You must supply a user id"
        try {
            const userCollection = await users()
            const user = await userCollection.findOne({_id: id}, columns)
            if(user === null) throw 'UserNotFoundException'
            return user
        } catch (e) {
            throw e
        }
    },
    getUserByUserName: async function(username, columns = {}) {
        if(!username) throw "You must supply the username"
        try {
            const userCollection = await users()
            const user = await userCollection.findOne({username}, columns)
            if(user === null) throw 'UserNotFoundException'
            return user
        } catch (e) {
            throw e
        }
    },
    getAllUsers: async function() {
        try {
            const userCollection = await users()
            const allUsers = await userCollection.find({}).toArray()
            if(!allUsers) throw `No user found`
            return allUsers
        } catch (e) {
            throw e
        }
    },
    updateUser: async function(id, user) {
        if(!id) throw "You must supply a user id"
        if(!user) throw "You must supply the user data"
        try {
            const userCollection = await users()
            const updateInfo = await userCollection.updateOne({_id: id}, {
                $set: user
            })
            //if(updateInfo.modifiedCount === 0) throw `Update the user of id ${id} failed`
            return await this.getUserById(id)
        } catch (e) {
            throw e
        }
    },
    removeUser: async function(id) {
        if(!id) throw "You must supply a user id"
        try {
            const userCollection = await users()
            const deleteInfo = await userCollection.removeOne({_id: id})
            if(deleteInfo.deletedCount === 0) throw `Remove the user of id ${id} failed`
        } catch (e) {
            throw e
        }
    }
}