const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },

  });

DataSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Data', DataSchema);
