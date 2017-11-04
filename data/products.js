const uuidv4 = require('uuid/v4')
const mongoCollections = require('../config/mongoCollections')
const products = mongoCollections.products

module.exports = {
    // CRUD methods
    addProduct: async function(product) {
        // If invalid product object passed in
        if(!product.name) throw "You must supply the product name"
        try {
            // set an id to the new product
            product._id = uuidv4()

            // wait to get the product collection
            const productCollection = await products()

            // insert the product and get the insertion result
            const insertInfo = await productCollection.insertOne(product)

            // if inserted count equals 0, there must be something wrong, throw an exception
            if(insertInfo.insertCount === 0) throw "Could not add the product"

            // return the newly added product
            const newId = insertInfo.insertedId
            return await this.getProductById(product._id)
        } catch (e) {
            throw e
        }
    },
    getProductById: async function(id, columns = {}) {
        if(!id) throw "You must supply a product id"
        try {
            const productCollection = await products()
            const product = await productCollection.findOne({_id: id}, columns)
            if(product === null) throw `No product found with id of ${id}`
            return product
        } catch (e) {
            throw e
        }
    },
    getAllProducts: async function() {
        try {
            const productCollection = await products()
            const allProducts = await productCollection.find({}).toArray()
            if(!allProducts) throw `No product found`
            return allProducts
        } catch (e) {
            throw e
        }
    },
    updateProduct: async function(id, product) {
        if(!id) throw "You must supply a product id"
        if(!product) throw "You must supply the product data"
        try {
            const productCollection = await products()
            const updateInfo = await productCollection.updateOne({_id: id}, {
                $set: product
            })
            if(updateInfo.modifiedCount === 0) throw `Update the product of id ${id} failed`
            return await this.getProductById(id)
        } catch (e) {
            throw e
        }
    },
    removeProduct: async function(id) {
        if(!id) throw "You must supply a product id"
        try {
            const productCollection = await products()
            const deleteInfo = await productCollection.removeOne({_id: id})
            if(deleteInfo.deletedCount === 0) throw `Remove the product of id ${id} failed`
        } catch (e) {
            throw e
        }
    }
}