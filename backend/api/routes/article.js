const express = require('express');
const { extractTokenDataFromRequest } = require("../../services/JwtDataExtractor");
const { validateAndRefreshTokens } = require("../middleware/jwtValidator");

const router = express.Router();
const {validateToken} = require('../middleware/jwtValidator');
const Article = require('../../database/models/article');

router.get("/", async (req, res, next) => {
	const articles = await Article.find({})
		.populate('author', '_id')
		.select('name date _id').lean();

	try{
		await validateAndRefreshTokens(req, res);
	} catch(err) {
		console.error(err);
	}

	const tokenData = extractTokenDataFromRequest(req, "jwt");

	res.status(200).json({
		articles: articles.map(article => {

			return {
				...article,
				isModifyable: article.author._id.toString() === tokenData?.id,
				id: article._id
			};
		})
	});
});

router.post("/", validateToken, async (req, res, next) => {
	const params = req.body;

	let keywords = params.keywords.split(',').map(x => x.trim());
	console.log("author id", req.tokenData.id)

	const newArticle = new Article({
		name: params.name,
		content: params.content,
		keywords: keywords,
		description: params.description,
		author: req.tokenData.id,
		date: new Date().toUTCString()
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
});

router.post("/edit", validateToken, async (req, res, next) => {
	res.status(200).json({ "message": "Success" });
});

module.exports = router;