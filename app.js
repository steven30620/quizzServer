const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

mongoose
	.connect(
		'mongodb+srv://steven:testtest@clustertest.4yuc7.mongodb.net/clusterTest'
	)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/book', bookRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
