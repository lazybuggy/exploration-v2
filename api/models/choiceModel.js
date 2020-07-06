const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
  scenarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Scenarios' //or Scenario
  },
  nextScenarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Scenarios' //or Scenario
  },
  text: {
    type: String,
  }
});

module.exports = mongoose.model('Choice',choiceSchema,'Choices');