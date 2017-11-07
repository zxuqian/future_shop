const uuidv4 = require('uuid/v4')
const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users

module.exports = {
    // CRUD methods
    addOrder: async function(userId, order) {
        // If invalid order object passed in
        if(!userId) throw "You must supply the user id"
        if(!order) throw "You must supply the order data"
        try {
            // set an id to the new order
            order._id = uuidv4()

            // wait to get the order collection
            const userCollection = await users()

            // insert the order and get the insertion result
            const insertInfo = await userCollection.updateOne({_id: userId}, {
                $addToSet: {
                    orders: order
                }
            })

            // if inserted count equals 0, there must be something wrong, throw an exception
            if(insertInfo.insertCount === 0) throw "Could not add the order"

            // return the newly added order
            const newId = insertInfo.insertedId
            return await this.getOrderById(order._id)
        } catch (e) {
            throw e
        }
    },
    getOrderById: async function(id, columns = {}) {
        if(!id) throw "You must supply a order id"
        try {
            const userCollection = await users()
            const order = await userCollection.findOne({"orders._id": id}, {
                "orders.$": 1
            })
            if(order === null) throw 'OrderNotFoundException'
            return order
        } catch (e) {
            throw e
        }
    },
    getAllOrders: async function(userId) {
        try {
            const userCollection = await users()
            const allOrders = await userCollection.find({_id: userId}, {"orders": 1}).toArray()
            if(!allOrders) throw `No order found`
            return allOrders
        } catch (e) {
            throw e
        }
    },
    updateOrder: async function(userId, orderId, order) {
        if(!userId) throw "You must supply a user id"
        if(!orderId) throw "You must supply a order id"
        if(!order) throw "You must supply the order data"
        try {
            const userCollection = await users()
            const updateInfo = await userCollection.updateOne({_id: id, "orders._id": orderId}, {
                $set: {"orders.$": order}
            })
            if(updateInfo.modifiedCount === 0) throw `Update the order of id ${id} failed`
            return await this.getOrderById(id)
        } catch (e) {
            throw e
        }
    },
    removeOrder: async function(userId, orderId) {
        if(!userId) throw "You must supply a user id"
        if(!orderId) throw "You must supply a order id"
        try {
            const userCollection = await users()
            const deleteInfo = await userCollection.updateOne({_id: userId}, {
                $pull: {
                    orders: {
                        _id: orderId
                    }
                }
            })
            if(deleteInfo.deletedCount === 0) throw `Remove the order of id ${id} failed`
        } catch (e) {
            throw e
        }
    }
}