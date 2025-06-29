const express=require('express')
const router=express.Router()
const Products = require('../model/productmodel')
const requireAuth = require('../middlewares/authmiddleware')

//Create products (requires auth)
router.post('/create',requireAuth,async (req,res)=>{
    try{
        const {productname,category,price} = req.body
        const product = new Products({productname,category,price})
        await product.save()
        res.status(201).json({message: `${productname} created and saved in database`})
    } catch(err){
        res.status(400).json({error:'Product Creation failed', details:err})
    }
})

//Delete product
router.delete('/delete/:productname',requireAuth,async(req,res)=>{
    try{
        const {productname} = req.params
        const deletedProduct = await Products.findOneAndDelete({productname})
        if(!deletedProduct){
            return res.status(400).json({error:`The product ${productname} was not found`})
        }
        res.status(201).json({message:`The product ${productname} was deleted successfully.`})
    } catch (err){
        res.status(400).json({error:'Error in deleting product'})
    }
})

//Filter product by category
router.post('/category/:categoryName',requireAuth,async(req,res)=>{
    try{
        const {categoryName}= req.params
        const products = await Products.find({category:categoryName})
        if(products.length === 0){
            return res.status(400).json({error:`No products were found under ${categoryName} category!!`})
        }
        res.status(200).json(products)

    } catch(err){
        res.status(400).json({error:'Failed to fetch products',details:err.message})
    }
})

module.exports = router