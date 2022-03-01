const express = require('express')
const session = require('express-session')
const { connectToMongoDB } = require('./db')
const cors = require('cors')
connectToMongoDB()
const { User, Action} = require('./data.models')

const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:4200",
    credentials: true
}))

app.use(session({
    secret: "123",
    name: "Eden",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

const onlyUsers = (req, res, next) => {
    if(req.session.username){
        next()
    }else{
        res.status(401).send({err:'you need to login'})
    }
}



app.post('/login',async (req,res)=> {
    try {
        const {username, password} = req.body
        if(!username || !password){
        return res.status(400).send({err:'Please fill in all the fields!'})
        }
        const user = await User.find({username: username})
        if(!user.length){
        return res.status(400).send({err:'wrong username'})   
        }
        const pass = await User.find({username:username, password: password})
        if(!pass.length){
        return res.status(400).send({err:'wrong password'})
        }
   
        req.session.username = username;
        res.send({msg:"seccessfull login", username: req.session.username  })
      
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})



app.delete('/logout',onlyUsers, (req,res)=> {
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                res.status(400).send('unable to log out')
            }else{
                res.send('Logout Successful')
            }
        })
    }
   
})  


app.post('/register',async (req,res)=> {
    try {
        const {name, username, password, money}= req.body
        if(!name || !username || !password || !money){
            return res.status(400).send({err:'Please fill in all the fields!'})
        }
        const finduser = await User.find({username:req.body.username})
        if(finduser.length){
            return res.status(400).send({err:'username already taken!'})
        }
        const saveduser =await new User(req.body)
        saveduser.save()
        return res.send({msg:'account created, please login'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.get('/',onlyUsers, async(req,res)=> {
    try {
        const user = await User.find({username: req.session.username}, {_id: 1})
        const datauser = await User.find({username: req.session.username})
        const detail =await Action.find({user_id: user},{name:1, type:1, price:1}).populate({path:'user_id',select:'-password -__v'})
        const today = new Date();
        const day = today.getDate();
        if(day == 10){
            await Action.deleteMany()
        }
        return res.send({datauser,detail})
       
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})


app.post('/',onlyUsers, async(req,res)=> {
    try {
        const {type, name, price} = req.body
        const user_id = await User.findOne({username: req.session.username}, {_id: 1})
        const newaction = new Action({type,name, price, user_id})
        newaction.save()
        if(type == "true"){
            await User.findOneAndUpdate(
                { username: req.session.username },
                { $inc: { money: price } }
            )
        }else{
            await User.findOneAndUpdate(
                { username: req.session.username },
                { $inc: { money: - price } }
            )
        }
        res.send({msg:'action accepted!'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.put('/:id',onlyUsers, async(req,res)=> {
    try {
        const {id} = req.params
        const findaction = await Action.find({_id:id},{type:1, price:1})
        if(findaction[0].type == true){
            await User.findOneAndUpdate(
                { username: req.session.username },
                { $inc: { money: -findaction[0].price } }
            )
        }else{
            await User.findOneAndUpdate(
                { username: req.session.username },
                { $inc: { money: findaction[0].price } }
            )
        }
        await Action.findOneAndRemove({_id:id})
        res.send({msg:'action deleted!'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})




app.listen(1000, () => { console.log("server up!")})