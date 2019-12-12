const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
//Jdcf14ofNP2Cwlml
const app = express();
mongoose.connect("mongodb+srv://luc:j8TUYo7UzQaUTeaq@cluster0-wqaks.mongodb.net/test?retryWrites=true&w=majority", () => {}, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected :)");
    })
    .catch(() => {
        console.log("Connection failed :(");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/posts' , (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save();
    res.status(201).json({
        message: 'Post added succesfully'
    });
});

app.get('/api/posts' , (req, res, next) => {
    Post.find().then(documents => {
        console.log("batata:" + documents);
        res.status(200).json({
            message: 'Posts fetched succesfully',
            posts: documents
        });
    });
});

module.exports = app;