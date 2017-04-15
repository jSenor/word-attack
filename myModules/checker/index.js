module.exports = (function(){

	var stringMaster = require("../string-master");
	var wordBank = require("../word-bank");

	return {

		isCorrect: function(startString, userWord){

			if(!wordBank.isValid(userWord))
				return false;

			if(!stringMaster.hasSubstring(startString, userWord))
				return false;

			return true;

		},

	}

})();