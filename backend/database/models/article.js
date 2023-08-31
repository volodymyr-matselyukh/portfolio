const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	name: String,
	content: String,
	keywords: [{type: String}],
	description: String,
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	date: Date
});

module.exports = mongoose.model('Article', articleSchema);