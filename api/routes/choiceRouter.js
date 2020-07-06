const express = require('express');
const Choice = require('../models/choiceModel');
const choiceRouter = express.Router();

choiceRouter.get('/:scenarioId',(req,res) => {
  Choice.find({scenarioId: req.params.scenarioId}, (err,choices) => {
    if(err)
      res.send(err);

    res.send(choices);
  });
});

module.exports = choiceRouter;