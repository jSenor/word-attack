module.exports = (function(){

	//Internal Modules
	var fs = require("fs");
	var path = require("path");

	var currentFile = null;
	var dataSet = null;

	function generateWordCategory(word){

		return  "" + word.toUpperCase().charAt(0) + word.length;

	}

	function generateFileName(wordCategory){

		fileName = path.join(__dirname, "res", wordCategory);
	
		return fileName;

	}

	function loadFile(fileName){

		currentFile = fileName;
		dataSet = fs.readFileSync(fileName, "utf-8").split("\n");

	}

	function isValid(word){

		var fileName = generateFileName(generateWordCategory(word));

		if(fileName == currentFile)
			return checkIfValid(word);

		else{
			loadFile(fileName);
			return checkIfValid(word);
		}

	}

	function checkIfValid(word){

		if(dataSet.indexOf(word) != -1)
			return true;

		return false;

	}

	function produce(wordCategory){

		var fileName = generateFileName(wordCategory.toUpperCase());
		loadFile(fileName);

		return dataSet;

	}

	function randomWord(){

		var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
		var randomLetter = letters[Math.floor(Math.random() * letters.length)];

		var category = randomLetter + randomNumber;
		var fileName = generateFileName(category);

		try{

			loadFile(fileName);		

		}

		catch(error){

			randomWord();

		}

		if(dataSet){
			var index = (Math.floor(Math.random() * dataSet.length));

			if(index === (dataSet.length - 1))
				index = index + 1;

			return dataSet[index];
		}

		else
			randomWord();

	}

	return {

		isValid: isValid,

		produce: produce,

		randomWord: randomWord,

	}

})();