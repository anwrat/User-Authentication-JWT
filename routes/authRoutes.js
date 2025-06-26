const express=require('express')
const router=express.Router()

const User = require('../model/usermodel')
const jwt = require('jsonwebtoken')

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
    else{
        res.status(201).json({message: 'Login Successful'})
    }
})

//Endpoint for logout
router.get('/logout',(req,res)=>{
    res.json({message: 'Logout successful'})
})

module.exports=router //Exporting router as module file