const dbConnection = require("./mongoConnection")

const getCollectionFn = collection => {
    let _col = undefined

    return async() => {
        if(!_col) {
            try {
                const db = await dbConnection()
                _col = await db.collection(collection)
            } catch(e) {
                throw "Could not establish a connection to mongodb"
            }
            
        }

        return _col
    }
}

module.exports = {
    users: getCollectionFn("users"),
    products: getCollectionFn("products")
}