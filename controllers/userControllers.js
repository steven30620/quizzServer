const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

exports.userScore = (req, res, next) => {
	const newUser = new userSchema({
		name: req.body.name,
		score: req.body.score,
		try: req.body.try,
	});
	newUser
		.save()
		.then((infoUser) => {
			res.status(201).json({
				message: `Bienvenue ${infoUser.name}`,
			});
		})
		.catch((error) => res.status(401).json(`messages : ${error}`));
};

exports.getScore = (req, res, next) => {
	userSchema
		.find()
		.then((score) => {
			res.status(200).json(score);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
	const userId = req.params.id;
	const tokenUserId = req.auth.userId;
	console.log('je passe ici ' + '  token décodé ' + tokenUserId);
	if (userId == tokenUserId) {
		userSchema
			.deleteOne({ _id: tokenUserId })
			.then((deleteInfo) => {
				if (deleteInfo.deletedCount == 0) {
					res.status(400).json({ message: 'aucun compte suprimé' });
				} else {
					res.status(201).json({
						message: 'utilisateur ' + tokenUserId + ' suprimé',
					});
				}
			})
			.catch((error) => res.status(400).json(error));
	} else {
		res.status(400).json({ message: 'Erreur auth' });
	}
};
