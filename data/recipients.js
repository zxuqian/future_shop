const uuidv4 = require('uuid/v4')
const mongoCollections = require('../config/mongoCollections')
const recipients = mongoCollections.recipients

module.exports = {
    // CRUD methods
    addRecipient: async function(recipient) {
        // If invalid recipient object passed in
        if(!recipient) throw "You must supply the recipient data"
        try {
            // set an id to the new recipient
            recipient._id = uuidv4()

            // wait to get the recipient collection
            const recipientCollection = await recipients()

            // insert the recipient and get the insertion result
            const insertInfo = await recipientCollection.insertOne(recipient)

            // if inserted count equals 0, there must be something wrong, throw an exception
            if(insertInfo.insertCount === 0) throw "Could not add the recipient"

            // return the newly added recipient
            const newId = insertInfo.insertedId
            return newId
        } catch (e) {
            throw e
        }
    },
    getRecipientById: async function(id, columns = {}) {
        if(!id) throw "You must supply a recipient id"
        try {
            const recipientCollection = await recipients()
            const recipient = await recipientCollection.findOne({_id: id}, columns)
            if(recipient === null) throw 'RecipientNotFoundException'
            return recipient
        } catch (e) {
            throw e
        }
    },
    getRecipientsByUserId: async function(userId, columns = {}) {
        if(!userId) throw "You must supply the user id"
        try {
            const recipientCollection = await recipients()
            const recipientsArr = await recipientCollection.find({userId: userId}, columns).toArray()
            if(recipientsArr === null) throw 'RecipientNotFoundException'
            return recipientsArr
        } catch (e) {
            throw e
        }
    },
    getAllRecipients: async function() {
        try {
            const recipientCollection = await recipients()
            const allRecipients = await recipientCollection.find({}).toArray()
            if(!allRecipients) throw `No recipient found`
            return allRecipients
        } catch (e) {
            throw e
        }
    },
    updateRecipient: async function(id, recipient) {
        if(!id) throw "You must supply a recipient id"
        if(!recipient) throw "You must supply the recipient data"
        try {
            const recipientCollection = await recipients()
            const updateInfo = await recipientCollection.updateOne({_id: id}, {
                $set: recipient
            })
            if(updateInfo.modifiedCount === 0) throw `Update the recipient of id ${id} failed`
            return await this.getRecipientById(id)
        } catch (e) {
            throw e
        }
    },
    removeRecipient: async function(id) {
        if(!id) throw "You must supply a recipient id"
        try {
            const recipientCollection = await recipients()
            const deleteInfo = await recipientCollection.removeOne({_id: id})
            if(deleteInfo.deletedCount === 0) throw `Remove the recipient of id ${id} failed`
        } catch (e) {
            throw e
        }
    }
}