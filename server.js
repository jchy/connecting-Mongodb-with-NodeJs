const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {User} = require('./app/model/user.model');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/mydb");
}

app.get("/users", async(req, res) => {
    try {
        const user = await User.find({}).exec();
        console.log(user);
        res.status(200).json({data: user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

const start = async () => {
    await connect();
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    });
}
start();