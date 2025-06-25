const express = require("express");

const app = express();
const port = 3000;

const authRouter = require('./routes/authRoutes')
app.use('/auth', authRouter)

const mongoose = require('mongoose');

mongodbServer='mongodb+srv://'
username='dbUser'
password='dbPassword123'
clustername='cluster0.noxusbn.mongodb.net'
databasename='JWTAuthTest'
mongoose.connect('mongodb+srv://dbUser:dbPassword123@cluster0.noxusbn.mongodb.net/MongoLearning?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log("Connected to database"))
.catch((error)=>console.log(error))

app.listen(port, () => console.log(`Server running on port ${port}`))