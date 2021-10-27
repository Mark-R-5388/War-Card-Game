const newDeckButton = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cardTable = document.getElementById("card-table");

let newDeck = false;
let deckId = "";

newDeckButton.addEventListener("click", getNewDeck);
drawCardsBtn.addEventListener("click", drawCards);

function getNewDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      newDeck = data.success;
      deckId = data.deck_id;
      showDrawButton(newDeck);
    });
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      cardTable.innerHTML = `
          <img src=${data.cards[0].image} alt=${data.cards[0].code} />
          <img src=${data.cards[1].image} alt=${data.cards[1].code} />

          `;
    });
}

function showDrawButton(deck) {
  if (deck) {
    drawCardsBtn.style.visibility = "visible";
  }
}
