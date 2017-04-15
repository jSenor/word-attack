var express = require("express");
var checker = require("../myModules/checker");
var wordBank = require("../myModules/word-bank");

var router = express.Router();

router.get("/", function(req, res){

	res.render("home");

});

router.get("/checker", function(req, res){

	res.write("Welcome to the checker page\n");
	res.write("Sample: checker/{original word}/{user word}\n");
	res.write("Then you read the json response to see if true or false\n");
	res.end();


});

router.get("/checker/:originalWord/:userWord", function(req, res){

	var originalWord = req.params.originalWord;
	var userWord = req.params.userWord;

	var result = checker.isCorrect(originalWord, userWord);
	var resultObject = { "correct": result};
	
	res.json(resultObject);
	res.end();

});

router.get("/random", function(req, res){

	var word = wordBank.randomWord();

	res.end("" + word);

});

module.exports = router;