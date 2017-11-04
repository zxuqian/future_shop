const uuidv4 = require('uuid/v4')
const mongoCollections = require('../config/mongoCollections')
const categories = mongoCollections.categories

module.exports = {
    // CRUD methods
    addRootCategory: async function(category) {
        // If invalid category object passed in
        if(!category.name) throw "You must supply the category data"
        try {
            // set an id to the new category
            category._id = uuidv4()

            // wait to get the category collection
            const categoryCollection = await categories()

            // insert the category and get the insertion result
            const insertInfo = await categoryCollection.insertOne(category)

            // if inserted count equals 0, there must be something wrong, throw an exception
            if(insertInfo.insertCount === 0) throw "Could not add the category"

            // return the newly added category
            const newId = insertInfo.insertedId
            return await this.getCategoryById(category._id)
        } catch (e) {
            throw e
        }
    },
    addSubCategory: async function(parentId, category) {
        // If invalid category object passed in
        if(!parentId) throw "You must supply the parent category id"
        if(!category) throw "You must supply the category data"
        try {
            // set an id to the new category
            category._id = uuidv4()

            // wait to get the category collection
            const categoryCollection = await categories()

            // insert the category and get the insertion result
            const updateInfo = await categoryCollection.updateOne({_id: parentId}, {
                $addToSet: {
                    subCategories: category
                }
            })
            // if modified count equals 0, there must be something wrong, throw an exception
            if(updateInfo.modifiedCount === 0) throw "Could not add the category"

            // return the newly added category
            return await this.getSubCategoryById(category._id)
        } catch (e) {
            throw e
        }
    },
    getCategoryById: async function(id, columns = {}) {
        if(!id) throw "You must supply a category id"
        try {
            const categoryCollection = await categories()
            const category = await categoryCollection.findOne({_id: id}, columns)
            if(category === null) throw `No category found with id of ${id}`
            return category
        } catch (e) {
            throw e
        }
    },
    getSubCategoryById: async function(id) {
        if(!id) throw "You must supply a category id"
        try {
            const categoryCollection = await categories()
            const category = await categoryCollection.findOne({"subCategories._id": id}, {"subCategories.$": 1})
            if(category === null) throw `No sub-category found with id of ${id}`
            return category
        } catch (e) {
            throw e
        }
    },
    getAllCategories: async function() {
        try {
            const categoryCollection = await categories()
            const allCategories = await categoryCollection.find({}).toArray()
            if(!allCategories) throw `No category found`
            return allCategories
        } catch (e) {
            throw e
        }
    },
    updateCategory: async function(id, category) {
        if(!id) throw "You must supply a category id"
        if(!category) throw "You must supply the category data"
        try {
            const categoryCollection = await categories()
            const updateInfo = await categoryCollection.updateOne({_id: id}, {
                $set: category
            })
            if(updateInfo.modifiedCount === 0) throw `Update the category of id ${id} failed`
            return await this.getCategoryById(id)
        } catch (e) {
            throw e
        }
    },
    updateSubCategory: async function(parentId, subId, category) {
        if(!parentId) throw "You must supply a parent category id"
        if(!subId) throw "You must supply a sub-category id"
        if(!category) throw "You must supply the category data"
        try {
            const categoryCollection = await categories()
            const updateInfo = await categoryCollection.updateOne({_id: parentId, "subCategories._id": subId}, {
                $set: {"subCategories.$": category}
            })
            if(updateInfo.modifiedCount === 0) throw `Update the sub-category of id ${subId} failed`
            return await this.getCategoryById(subId)
        } catch (e) {
            throw e
        }
    },
    removeCategory: async function(id) {
        if(!id) throw "You must supply a category id"
        try {
            const categoryCollection = await categories()
            const deleteInfo = await categoryCollection.removeOne({_id: id})
            if(deleteInfo.deletedCount === 0) throw `Remove the category of id ${id} failed`
        } catch (e) {
            throw e
        }
    },
    removeSubCategory: async function(parentId, subId) {
        if(!parentId) throw "You must supply a parent category id"
        if(!subId) throw "You must supply a sub-category id"
        try {
            const categoryCollection = await categories()
            const deleteInfo = await categoryCollection.update({_id: parentId}, {
                $pull: {
                    subCategories: {
                        _id: subId
                    }
                }
            })
            if(deleteInfo.deletedCount === 0) throw `Remove the category of id ${subId} failed`
        } catch (e) {
            throw e
        }
    }
}