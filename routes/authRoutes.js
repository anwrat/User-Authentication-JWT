const express=require('express')
const router=express.Router()

const User = require('../model/usermodel')

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
router.get('/login',(req,res)=>{
    res.send('Logging in')
})

//Endpoint for logout
router.get('/logout',(req,res)=>{
    res.json({message: 'Logout successful'})
})

module.exports=router //Exporting router as module file