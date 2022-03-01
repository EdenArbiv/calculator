const { connect } = require('mongoose')

const connectToMongoDB = async () => {
    try {
        await connect('mongodb://localhost/calculator')
        console.log("connected to mongo database")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { connectToMongoDB }