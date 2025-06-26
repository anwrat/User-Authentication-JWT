const express = require("express");

const app = express();
const port = 3000;

app.use(express.json())

//Importing dotenv
require('dotenv').config()

const authRouter = require('./routes/authRoutes')
app.use('/auth', authRouter)

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to database"))
.catch((error)=>console.log(error))

app.listen(port, () => console.log(`Server running on port ${port}`))