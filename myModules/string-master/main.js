module.exports = {

	hasSubstring: canBeFormedFrom

}

function canBeFormedFrom(original, sub){

	if(sub.length > original.length){
		return false;
	}

	else if(sub.length === original.length){
		return sub.toLowerCase().split("").sort().join("") === original.toLowerCase().split("").sort().join("");
	}

	else if(sub.length < original.length){	

		var temp = original;

		for(var i = 0; i < sub.length; i++){

			var char = sub.charAt(i);

			if(temp.indexOf(char) === -1)
				return false;

			temp = removeCharacter(char, temp);

		}

		return true;
	}
}


function removeCharacter(char, string){

	var index = string.indexOf(char);
	string = string.split("");
	string.splice(index, 1);
	string = string.join("");

	return string;

}
