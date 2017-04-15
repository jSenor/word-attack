window.onload = function(){

	var currentWord = "";
	var words = [];
	var score = 0;
	var timeCount = 0;
	var timeLimit = null;
	var timer = null;
	var defaultTime = 60;

	registerEvents();
	loadWord();
	setUpTimer(defaultTime);

	function registerEvents(){

		registerKeyEvents();
		makeInputFieldSmart();
		listenToPowerButton();
		registerModalEvents();

		function registerKeyEvents(){

			var onFocus = false;

			var inputField = document.querySelector("input");
			
			inputField.addEventListener("focus", function(event){

				onFocus = true;

			});

			inputField.addEventListener("blur", function(event){

				onFocus = false;

			});

			window.addEventListener("keyup", function(event){

				if(event.key === "Enter" && onFocus){
					processInput(event.srcElement.value);
					event.srcElement.value = "";
				}

			});

		}

		function makeInputFieldSmart(){

			var inputField = document.querySelector("input");

			inputField.addEventListener("input", function(event){

				var url = "/checker/" + currentWord + "/" + event.srcElement.value;
				sendRequest("GET", url, function(){

					if(this.readyState === 4 && this.status === 200){
						var response = JSON.parse(this.responseText);

						if(response.correct)
							showSuccess();

						else
							showFailure();

					}

				});

			});

			function showSuccess(){
				inputField.style.color = "green";
			}

			function showFailure(){
				inputField.style.color = "red";
			}

		}

		function listenToPowerButton(){

			var powerButton = document.querySelector(".power");

			powerButton.addEventListener("click", function(){

				endGame();

			});

		}

		function registerModalEvents(){

			var againButton = document.querySelector(".againButton");

			againButton.addEventListener("click", () => {

				hideEndModal();
				startMain();

			});

		}

	}

	function loadWord(){

		sendRequest("GET", "/random", function(){

			if(this.readyState === 4 && this.status === 200){

				changeWord(this.responseText.toLowerCase());
				currentWord = this.responseText.toLowerCase();

			}

		});
	}

	function setUpTimer(seconds){

		timeCount = 0;		
		timeLimit = +seconds;

		if(timeLimit)
			timer = setInterval(updateClock, 1000);

		else
			throw Error("Invalid time option");

	}

	/*
	 *
	 *
	 *  Helper Functions
	 *
	 *
	 */

	function processInput(word){

		if(word){

			word = word.toLowerCase();

			if(word.length === 1)
				return;

			else if(word === currentWord.toLowerCase())
				return;

			var url = "/checker/" + currentWord + "/" + word;
			sendRequest("GET", url, function(){

				if(this.readyState === 4 && this.status === 200){

					var result = JSON.parse(this.responseText);
					if(result.correct === true && words.indexOf(word) === -1){
						words.push(word);
						addToResults(word);
						score++;
						updateScore(score);
					}

				}

			});

		}

	}

	function addToResults(word){

		var span = document.createElement("span");
		span.className = "user-word";

		span.appendChild(document.createTextNode(word));

		var results = document.querySelector(".results");
		results.appendChild(span);

	}

	function changeWord(newWord){

		var wordContainer = document.querySelector(".word");

		wordContainer.innerText = newWord;

	}

	function sendRequest(requestType, url, callback){

		var XMLHttp = new XMLHttpRequest();
		XMLHttp.open(requestType, url, true);

		XMLHttp.onreadystatechange = callback;

		XMLHttp.send();


	}

	function updateScore(score){

		var scoreBoard = document.querySelector(".score");
		scoreBoard.textContent = "" + score;

	}

	function updateClock(){

		writeToClock(timeCount);

		timeCount++;

		// writeToClock(timeCount);

		if(timeCount >= timeLimit + 1){
			clearTimer();
			endGame();
		}

	}

	function writeToClock(timeInSeconds){

		var clock = document.querySelector(".timer");

		var time = formatTime(timeInSeconds);

		clock.innerText = time;

	}

	function formatTime(timeInSeconds){

		var hour = digitalize(Math.floor((timeInSeconds / 3600) % 60));
		var minute = digitalize(Math.floor((timeInSeconds / 60) % 60));
		var second = digitalize(timeInSeconds % 60);

		return "" + hour + " : " + minute + " : "  + second;

	}

	function digitalize(number){

		var number = "" + number;

		return number.length === 1 ? "0" + number : number;

	}

	function clearTimer(){

		clearInterval(timer);

	}

	function endGame(){

		disableInput();
		showEndModal();
		clearTimer();

		function disableInput(){

			var input = document.querySelector("input");
			input.readOnly = true;
			input.style.cursor = "not-allowed";

			var pointer = document.querySelector(".pointer");
			pointer.style.color = "gray";

		}

		showEndModal();

	}

	function showEndModal(){

		var modal = document.querySelector(".end-modal");
		modal.style.opacity = 1;
		modal.style.zIndex = 2;

		changeScore(score);

		function changeScore(score){

			var scoreSpan = document.querySelector(".end-modal .score");
			scoreSpan.innerText = score;
			
		}

	}

	function hideEndModal(){

		var modal = document.querySelector(".end-modal");
		modal.style.opacity = 0;
		modal.style.zIndex = -1;

	}

	function startMain(){
		
		clearResults();
		clearScore();
		enableInput();
		loadWord();
		setUpTimer(defaultTime);

		function clearResults(){

			var results = document.querySelector(".results");

			while(results.childElementCount != 0){

				results.removeChild(results.firstElementChild);
				console.log(results.childElementCount);

			}

		}

		function clearScore(){

			score = 0;
			updateScore(score);

		}

		function enableInput(){

			var input = document.querySelector("input");
			input.readOnly = false;
			input.style.cursor = "pointer";

			var pointer = document.querySelector(".pointer");
			pointer.style.color = "green";

		}

	}

}

function chunk(array, size){
	var multiArray = [];
	var currentSubArray = [];

	for(var i = 0; i < array.length; i++){

		if(currentSubArray.length === size){
			multiArray.push(currentSubArray);
			currentSubArray = [];
		}

		currentSubArray.push(array[i]);

		if(i === array.length - 1){
			multiArray.push(currentSubArray);
		}
	}

	return multiArray;
}

chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);