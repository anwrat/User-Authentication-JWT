const express = require("express");

const app = express();
const port = 3000;

app.use(express.json())

//Importing dotenv
require('dotenv').config()

const authRouter = require('./routes/authRoutes')
app.use('/auth', authRouter)

const connectdb = require('./config/db')
connectdb()

app.listen(port, () => console.log(`Server running on port ${port}`))