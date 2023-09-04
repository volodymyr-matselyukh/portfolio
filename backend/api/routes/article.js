const express = require('express');

const router = express.Router();
const { validateToken } = require('../middleware/jwtValidator');
const Article = require('../../database/models/article');

router.get("/", async (req, res, next) => {
	const articles = await Article.find({
		isActive: true,
		isPublished: true
	})
	.populate('author', '_id name')
	.select('name date description _id').lean();

	res.status(200).json({
		articles: articles.map(article => {

			return {
				...article,
				id: article._id
			};
		})
	});
});

router.get("/my", validateToken, async (req, res, next) => {
	const articles = await Article.find({
		isActive: true,
		author:{
			'_id': req.tokenData.id
		}
	})
	.populate('author', '_id')
	.select('name date description _id isPublished').lean();

	res.status(200).json({
		articles: articles.map(article => {

			return {
				...article,
				id: article._id
			};
		})
	});
});

router.get("/:id", async (req, res, next) => {

	const articleId = req.params.id;

	try {
		const article = await Article.findOne({ _id: articleId, isActive: true })
			.lean();

		article.id = article._id;

		res.status(200).json(article);
	}
	catch (error) {
		console.error("Error during get", error);
	}
});

router.get("/getbyname/:name", async (req, res, next) => {

	const articleName = req.params.name;

	console.log("article name", articleName);

	const article = await Article.findOne({ name: articleName, isActive: true })
		.lean();

	if(!article)
	{
		return res.status(404).json({"message":"Article not found"});
	}

	article.id = article._id;

	res.status(200).json(article);
});

router.post("/", validateToken, async (req, res, next) => {
	const params = req.body;

	let keywords = params.keywords.split(',').map(x => x.trim());

	if (!params.id) {
		await createNewArticle(params, keywords, req.tokenData, res);
	} else {
		updateArticle(params, keywords, res);
	}
});

const createNewArticle = async (params, keywords, tokenData, res) => {
	const currentDate = new Date().toUTCString();

	const newArticle = new Article({
		name: params.name,
		content: params.content,
		keywords: keywords,
		description: params.description,
		author: tokenData.id,
		date: currentDate,
		updateDate: currentDate,
		published: params.published
	});

	try {
		await newArticle.save();
		res.status(201).json({
			"message": "Success",
			"data": {
				"id": newArticle._id
			}
		});
	}
	catch (err) {
		console.error("Error adding new article", err);
		return res.status(500).json({ "message": "Error during creation of new article" });
	}
}

const updateArticle = async (params, keywords, res) => {
	const id = params.id;
	const currentDate = new Date().toUTCString();

	await Article.findOneAndUpdate({ _id: id }, {
		name: params.name,
		content: params.content,
		keywords: keywords,
		description: params.description,
		updateDate: currentDate,
		isPublished: params.published
	}, {
		new: true
	});

	try {
		res.status(201).json({
			"message": "Success",
			"data": {
				"id": id
			}
		});
	}
	catch (err) {
		console.error("Error adding new article", err);
		return res.status(500).json({ "message": "Error during creation of new article" });
	}
}

router.post("/edit", validateToken, async (req, res, next) => {
	res.status(200).json({ "message": "Success" });
});

module.exports = router;