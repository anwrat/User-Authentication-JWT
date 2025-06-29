const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productname:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
})

const product=mongoose.model('products',productSchema);
module.exports=product;