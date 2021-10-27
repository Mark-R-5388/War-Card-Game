const newDeckButton = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");

let deckId = "";

newDeckButton.addEventListener("click", getNewDeck);
drawCardsBtn.addEventListener("click", drawCards);

function getNewDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => console.log(data.cards));
}
