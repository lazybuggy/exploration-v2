const express = require('express');
const Scenario = require('../models/scenarioModel');
const scenarioRouter = express.Router();

scenarioRouter.use('/:id',(req, res, next) => {
  Scenario.findById(req.params.id, (err, scenario) => {
    if(err)
      res.send(err);
    else 
      req.scenario = scenario;
      next();
  });
});

scenarioRouter.get('/:id', (req,res) => {
  return res.json(req.scenario);
});

module.exports = scenarioRouter;