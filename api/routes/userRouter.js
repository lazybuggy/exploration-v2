const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const userRouter = express.Router();

const saltRounds = 10;

userRouter.get('/',(req, res) => {
  User.find({}, (err, users) => {
    if(err)
      res.status(400).send("Something went wrong getting users. ", err);
    else
      res.status(200).json(users);
  });
})
.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err,user) => {
    if(err)
      res.status(400).send("An Error Occured ", err);
    
    if(user)
      res.send(["A user with this username already exists. Please use another."]);  
    else{
      bcrypt.hash(req.body.password, saltRounds, function(err,hash) {
        req.body.password = hash;
        const newUser = new User(req.body);
    
        newUser.save()
        .then(newUser => {
          res.status(201).json(newUser);
        })
        .catch(error => {
          res.send(["Something went wrong creating the user. ", error]);
        });
      });
    }
  });
});

userRouter.use('/:username', (req, res, next) => {
  User.findOne({username: req.params.username}, (err,user) => {
    if(err)
      res.send(["Something went wrong processing the request for this user.", err]);
    else if(user === null)
      res.send(["A user with this username doesn't exist. Please try another username."])
    else
      req.user = user;
      next();
  });
});

userRouter.post('/:username', (req, res) => {
  bcrypt.compare(req.body.password, req.user.password).then(function(authenticated) {
    if(authenticated){
      return res.status(200).json(req.user);
    }else{
      return res.send(["You've entered in an incorrect password"]);
    }
  });
})
.put('/:username', (req, res) =>{
  Object.keys(req.body).map(key => {
      req.user[key] = req.body[key];
  });
  req.user.save();
  res.json(req.user);
});

module.exports = userRouter;