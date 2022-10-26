const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

exports.createUser = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const newUser = new userSchema({
				name: req.body.name,
				email: req.body.email,
				password: hash,
				premium: req.body.premium,
			});
			newUser
				.save()
				.then((infoUser) => {
					res.status(201).json({
						message: `Bienvenue ${infoUser.name}`,
						ancienPass: req.body.password,
						passwordHash: hash,
					});
				})
				.catch((error) => res.status(401).json(`messages : ${error}`));
		})
		.catch(() => res.status(401).json({ message: 'champs incomplet' }));
};

exports.userLogin = (req, res, next) => {
	const userEmail = req.body.email;
	const userPassword = req.body.password;

	userSchema
		.findOne({ email: userEmail })
		.then((userFound) => {
			if (!userFound) {
				return res
					.status(400)
					.json({ message: 'Paire login/mot de passe incorrecte' });
			}
			bcrypt
				.compare(userPassword, userFound.password)
				.then((isValid) => {
					if (!isValid) {
						return res.status(401).json({
							message: 'mot de passe incorrecte',
						});
					}
					res.status(200).json({
						message: 'vous êtes connecté',
						info_Utilisateur: userFound,
						token: jwt.sign(
							{ userId: userFound._id },
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '24h' }
						),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json(error));
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
