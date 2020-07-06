const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true, 
  },
  lastName: {
    type: String,
    required: true, 
  },
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  savedPoint: {
    type: Schema.Types.ObjectId,
    ref: 'Scenarios',
    default: "5d88d9091c9d4400003c6bce",
  },
});

module.exports = mongoose.model('User', userSchema,'Users');