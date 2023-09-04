const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	name: { type: String, unique: true},
	content: String,
	keywords: [{type: String}],
	description: String,
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	date: Date,
	updateDate: Date,
	isActive: {type: Boolean, default: true},
	isPublished: {type: Boolean, default: false}
});

module.exports = mongoose.model('Article', articleSchema);