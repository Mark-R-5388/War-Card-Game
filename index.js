const newDeckButton = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardTable = document.getElementById("card-table");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
let player1ScoreText = document.querySelector(".player1-score");
let player2ScoreText = document.querySelector(".player2-score");
const title = document.getElementById("title");
let cardsReaminingContainer = document.getElementById(
  "cards-remaining-container"
);
let cardsRemaining = document.getElementById("cards-remaining");

let newDeck = false;
let deckId = "";
let player1Score = 0;
let player2Score = 0;

player1ScoreText.textContent = 0;
player2ScoreText.textContent = 0;

newDeckButton.addEventListener("click", getNewDeck);
drawCardsBtn.addEventListener("click", drawCards);

function getNewDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      newDeck = data.success;
      deckId = data.deck_id;
      cardsReaminingContainer.style.visibility = "visible";
      cardsRemaining.textContent = data.remaining;
      showDrawButton(newDeck);
    });
  player1.innerHTML = "";
  player2.innerHTML = "";

  player1Score = 0;
  player2Score = 0;
  player1ScoreText.textContent = 0;
  player2ScoreText.textContent = 0;
  document.querySelector(".player1-name").textContent = `Player 1`;
  document.querySelector(".player2-name").textContent = `Player 2`;
  title.textContent = "The Game of War!";
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cardsRemaining.textContent = data.remaining;
      player1.innerHTML = `<img src=${data.cards[0].image} alt=${data.cards[0].code} />`;
      player2.innerHTML = `<img src=${data.cards[1].image} alt=${data.cards[1].code} />`;
      findHighestCard(data.cards[0].value, data.cards[1].value);
      if (data.remaining === 0) {
        emptyDeck();
      }
    });
}

function showDrawButton(deck) {
  if (deck) {
    drawCardsBtn.style.visibility = "visible";
  }
}

function findHighestCard(card1, card2) {
  document.querySelector(".player1-name").textContent = `Player 1`;
  document.querySelector(".player2-name").textContent = `Player 2`;

  if (card1 > card2) {
    document.querySelector(".player1-name").textContent = `Winner!`;
    player1Score++;
    player1ScoreText.textContent = player1Score;
  } else if (card2 > card1) {
    document.querySelector(".player2-name").textContent = `Winner!`;
    player2Score++;
    player2ScoreText.textContent = player2Score;
  } else {
    document.querySelector(".player1-name").textContent = `It's a Tie`;
    document.querySelector(".player2-name").textContent = `It's a Tie`;
  }
}

function emptyDeck() {
  drawCardsBtn.style.visibility = "hidden";
  gameWinner(player1Score, player1Score);
}

function gameWinner(player1, player2) {
  if (player1 > player2) {
    title.textContent = "Congrats Player 1 Wins War";
  } else if (player2 > player1) {
    title.textContent = "Congrats Player 2 Wins War";
  } else {
    title.textContent = "It`s A Tie!  Play Again!";
  }
}
