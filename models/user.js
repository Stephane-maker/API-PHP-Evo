const mongoose = require('mongoose');

const schemaUser = mongoose.Schema({
    message : {type: String, require: true}
});

module.exports = mongoose.model('User', schemaUser);