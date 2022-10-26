const bookSchema = require('../models/book');
const Book = require('../models/book');
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
	Book.find()
		.then((books) => res.status(201).json(books))
		.catch((error) => res.status(400).json(error));
};
exports.test = (req, res, next) => {
	res.status(201).json({ message: 'serveur on' });
};

exports.addBook = (req, res, next) => {
	const book = new bookSchema({
		title: req.body.bookTitle,
		theme: req.body.bookTheme,
		resume: req.body.bookResume,
		price: req.body.bookPrice,
		image: `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`,
	});
	console.log(book);
	book.save()
		.then(() => {
			res.status(200).json({ message: 'livre créée' });
		})
		.catch((error) => res.status(400).json(error));
};

exports.getOneBook = (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((bookInfo) => res.status(201).json(bookInfo))
		.catch((error) => res.status(400).json(error));
};

exports.modifyBook = (req, res, next) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res.status(201).json({ 'livre modifié avec succée': req.body })
		)
		.catch((error) => res.status(400).json(error));
};

exports.deleteBook = (req, res, next) => {
	Book.deleteOne({ _id: req.params.id })
		.then(() => res.status(201).json({ message: 'objet suprimé' }))
		.catch((error) => res.status(401).json(error));
};
