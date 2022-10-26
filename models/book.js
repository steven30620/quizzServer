const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title: { type: String, require: true },
	theme: { type: String, require: true },
	resume: { type: String, require: true },
	price: { type: Number, require: true },
	image: { type: String, require: true },
});

module.exports = mongoose.model('Book', bookSchema);
