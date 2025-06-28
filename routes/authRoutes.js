const express=require('express')
const router=express.Router()

const User = require('../model/usermodel')
const jwt = require('jsonwebtoken')
const requireAuth = require('../middlewares/authmiddleware')

//Endpoint for register
router.post('/register',async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const user = new User({username, email ,password})
        await user.save()
        res.status(201).json({message: 'User registered successfully'})
    } catch(err){
        res.status(400).json({error: 'User registration failed'})
    }
})

//Endpoint for Login
router.post('/login',async(req,res)=>{
    const {username,email,password} = req.body
    const user = await User.findOne({username})
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error: 'Invalid credentials'})
    }
    //Creating a token using JWT
    //jwt.sign has three parameters, first payload which is the data that will be embedded, second the secret key used to sign the token and third options
    const token = jwt.sign(
        //Payload, _id is the id mongodb automatically assigns to every document
        {userId: user._id, username: user.username},
        //Secret key
        process.env.JWT_SECRET,
        //Options
        {expiresIn: '1h'}
    )
    res.status(200).json({
        message: 'Login successful',
        token
    })
})

//Endpoint for logout
router.post('/logout',(req,res)=>{
    res.json({message: 'Logout successful'})
})

//Endpoint for displaying all users (requires auth)
router.post('/view',requireAuth,async (req,res)=>{
    try{
        const users = await User.find({},'-password')
        res.status(200).json(users)

    } catch(err){
        res.status(400).json({error:'Error while finding users',details:err})
    }
})

module.exports=router //Exporting router as module file