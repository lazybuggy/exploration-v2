const express = require('express');
const {connect} = require('mongoose');
const db_pwd = process.env.EXPLORATION_PWD;

// const db = connect("mongodb+srv://luciaokeh:"+db_pwd+"@cluster0-2ri3z.mongodb.net/test?retryWrites=true&w=majority");

const app = express();

app.get('/', function (req, res) {
 return res.send('Hello world');
});

app.listen(8080);

module.exports = app;
