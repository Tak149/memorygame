
let cardList = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
				"fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt",
				"fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
				"fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle"];

let clickedCards = [];
let matches = [];
let moves = 0;
let startGame = true;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Populating the board and single click
const deckContainer = document.querySelector('.deck');

function start() {
	shuffle(cardList);
	for (let i = 0; i < cardList.length; i++) {
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="fa ${cardList[i]}"></i>`;
		deckContainer.appendChild(card);

		card.addEventListener("click", function(){

			const currentCard = this;
			const previousCard = clickedCards[0];

			if (clickedCards.length === 1) {

				card.classList.add("open", "show");
				clickedCards.push(this);
				compare(currentCard, previousCard);

			} else {
				currentCard.classList.add("open", "show");
				clickedCards.push(this);

				//checks if this is the first click
				if (startGame === true) {
					timerStart();
				startGame = false;
				}
			}
		});
	}
}

//Comparing two cards
function compare(currentCard, previousCard) {
	addMove();
	if(clickedCards[1].innerHTML === clickedCards[0].innerHTML) {
		currentCard.classList.remove("open","show");
		currentCard.classList.add("match");
		previousCard.classList.remove("open","show");
		previousCard.classList.add("match");
		matches.push(currentCard, previousCard);
		clickedCards = [];
		gameOver();

	} else {
		setTimeout(function(){
			currentCard.classList.remove("open", "show");
			previousCard.classList.remove("open", "show");
		}, 500);

	clickedCards = [];
	}
}

//Timer
const timerContainer = document.querySelector(".timer");
let totalSeconds = 0;
timerContainer.innerHTML = `time: ${totalSeconds}`;

let currentTime;

function timerStart() {
	currentTime = setInterval(function() {
		totalSeconds++;
		timerContainer.innerHTML = `time: ${totalSeconds}`;
	}, 1000);
}

function timerStop() {
    clearInterval(currentTime);
}

//Moves
const movesContainer = document.querySelector(".moves");
function addMove() {
	moves++;
	movesContainer.innerHTML = moves;
	starTracker();
}

//Stars
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
const emptyStar = `<li><i class="fa fa-star-o"></i></li>`;
starsContainer.innerHTML = star + star + star;
function starTracker() {
    if(moves < 14) {
        starsContainer.innerHTML = star + star + star;
    } else if(moves < 21) {
        starsContainer.innerHTML = emptyStar + star + star;
    } else {
        starsContainer.innerHTML = emptyStar + emptyStar + star;
    }
}

//Restart Button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
	restart();
});

function restart (){
	deckContainer.innerHTML = "";
	clickedCards =[];
	matches = [];
    starsContainer.innerHTML = star + star + star;
	moves = 0;
	movesContainer.innerHTML = moves;
	timerStop();
	startGame = true;
	totalSeconds = 0;
	timerContainer.innerHTML = `time: ${totalSeconds}`;
	start();
}

//End Game
function gameOver () {
	setTimeout(function(){
		if(matches.length === cardList.length){
			alert (`Game over. You Won!
				It took you ${totalSeconds} seconds and ${moves} moves to beat the game.
				Play again and try to beat your score!`);
			restart();
		}
	}, 100);
}

start();