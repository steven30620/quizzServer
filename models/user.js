const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	score: { type: Number, required: true },
	try: { type: Number, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
