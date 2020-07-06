const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scenarioSchema = new Schema({
  text: {
    type: String,
  },
  background: {
    type: String,
  }
});

module.exports = mongoose.model('Scenario',scenarioSchema,'Scenarios');