const express=require('express')
const router=express.Router()

router.get('/register',(req,res)=>{
    res.send('Registering the User')
})
router.get('/login',(req,res)=>{
    res.send('Logging in')
})
router.get('/logout',(req,res)=>{
    res.send('Logging out')
})

module.exports=router //Exporting router as module file