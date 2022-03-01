const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name:String,
    username:String,
    password:String,
    money:Number
})

const User = model("user", userSchema)

const actionsSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    name:String,
    type:{
        type:Boolean
    },
    price:Number
})

const Action = model("action", actionsSchema)

module.exports = {User, Action}