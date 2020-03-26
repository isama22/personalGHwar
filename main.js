//constants
//--each player has 26 cards every time the game begins

//--array of cards, 52 cards holding value and name (value: 10, face 'd07;)
    //ok have to use a compare cards function to compare card values instead of storing them in the array

// const cards = ["dA", "hA", "cA", "sA", "dK", "hK", "cK", "sK", "dQ", "hQ", "cQ", "sQ", "dJ", "hJ", "cJ", "sJ", "d10", "h10", "c10", "s10", "d09", "h09", "c09", "s09", "d08", "h08", "c08", "s08", "d07", "h07", "c07", "s07", "d06", "h06", "c06", "s06", "d05", "h05", "c05", "s05", "d04", "h04", "c04", "s04", "d03", "h03", "c03", "s03", "d02", "h02", "c02", "s02"];
// const cardValues = {
// 	14: ["dA", "hA", "cA", "sA"],
// 	13: ["dK", "hK", "cK", "sK"], 
// 	12: ["dQ", "hQ", "cQ", "sQ"], 
// 	11: ["dJ", "hJ", "cJ", "sJ"], 
// 	10: ["d10", "h10", "c10", "s10"],
// 	9: ["d09", "h09", "c09", "s09"],
// 	8: ["d08", "h08", "c08", "s08"],
// 	7: ["d07", "h07", "c07", "s07"],
// 	6: ["d06", "h06", "c06", "s06"],
// 	5: ["d05", "h05", "c05", "s05"],
// 	4: ["d04", "h04", "c04", "s04"],
// 	3: ["d03", "h03", "c03", "s03"],
// 	2: ["d02", "h02", "c02", "s02"]
// };
//push key to v
// let shuffledCardDeck = [];
//randomizer to pick ^

//constants -------------------------------------------------------
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const globalDeck = createDeck();
  
let playerOne = null;
let playerTwo = null;


let player1Stack = [];
let player2Stack = [];
//console.log(player2Stack);
let win = player1Stack === 52 || player2Stack === 52;

//variables -----------------------------------------------
let player1CurrentCard = [];
let player2CurrentCard = [];
// console.log('player1CurrentCard');


//cached------------------------------------------------------------------------
let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');
let player2 = document.getElementById('player2');

//event listeners-----------------------------------------------------------------
startButton.addEventListener("click", startGame);
    

player2.addEventListener("click", pickRandomCard);
    

resetButton.addEventListener("click", reset);

//functions--------------------------------------------------------------------------

function createDeck() {
    var deck = new Array();
    for(var i = 0; i < suits.length; i++) {
        for(var x = 0; x < values.length; x++) {
            var card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function splitDeck() {
    let i = 0;
    while (i < 26){
        player1Stack.push(globalDeck[i])
         i++
    } 
    while (i > 25 && i < 52) {
        player2Stack.push(globalDeck[i])
        i++
    }
    console.log(player1Stack);
    console.log(player2Stack);
}

function pickRandomCard(globalDeck) {
    var randomNumber = Math.floor(Math.random() * globalDeck.length);
    let array = [globalDeck[randomNumber], randomNumber];

    render();
    return array;
}
//console.log(pickRandomCard(globalDeck));


function flipCard(){
    //click event listeners trigger 2 random cards to be selected from player stacks which invoke a flipcard to show it in the html and the checkgreatercard acts on the selected cards

    //random generator to flip one card image over for each player at once
    //use getElementById to grab player 1 and player2's current card with a randomizer and flip an image from my cards.css folder 
    // }  

}

function checkGreaterCard(){
    // console.log(player1CurrentCard);
    // let player1Card = [0];
    // let player2Card = [0];

    //console.log(player1Card[0][0].Value, player2Card[0][0].Value);
    

    //first off is what happens in a tie/war
    // if (player1CurrentCard[0].Value === player2CurrentCard[0].Value){
    //     //gonna keep it simple by only having war pull two additional cards
    //     pickRandomCard();
    //     //splice new random card out of stack and into currentCard twice, once for each player
    //     player1CurrentCard.splice(pickRandomCard(player1Stack))
    //     player2CurrentCard.splice(pickRandomCard(player2Stack))
    // }
    // else 
    // console.log(player1CurrentCard[0][0].Value);
    if (player1CurrentCard[0][0].Value > player2CurrentCard[0][0].Value) {
        //console.log(player1Card[0][0].Value);
        
    //pushes player1CurrentCard && player2CurrentCard in player1Stack
        player2Stack.splice(player2CurrentCard[1], 1);
        let p1= player1Stack.push(player2CurrentCard[0])
        // console.log(p1);
        //checkWin();
        console.log('p1wins')
    } else {
    //pushes player2Currentcard && player1CurrentCard in player2Stack
        console.log('player 2 wins');
        player1Stack.splice(player1CurrentCard[1], 1);
        player2Stack.push(player1CurrentCard[0]);
        //checkWin();
    }
}

//checkGreaterCard();

function checkWin(){ //invoke every time cards are pushed to a stack
    //how to check the contents of an array?
    if (player1Stack === 52) {
        //template literals to use winning players name 
        console.log('p1 wins');
    } else if (player2Stack === 52) {
        console.log('p2 wins');
    } else if (player1Stack && player2Stack !== 52 ){
        console.log('draw another card');
    }
}
// checkWin();

// function checkWin() {
//     //checks to see if either stack has reached 52 cards yet, if it does use the dom to display who won
//     //if no win, nothing happens 
//     if (player1Stack === 52 || player2Stack === 52) {
//         console.log(`${ }` + "won! game over");
//     }
// }

function render() {
//use render to flip cards over 
//use to initialize game? 
}
render();


function reset() {
location.reload();
}

//seperate start game function/ disable start listener at end of this

function startGame(){
    createDeck();
    splitDeck();
    player1CurrentCard.push(pickRandomCard(player1Stack));
    player2CurrentCard.push(pickRandomCard(player2Stack));
    console.log('player1hand', player1CurrentCard[0][0]);
    console.log('player2hand', player2CurrentCard[0][0]);
    checkGreaterCard(player1CurrentCard, player2CurrentCard);
    //disable start button
    document.getElementById("startButton").removeEventListener("click", startGame);
}
//flipcard invokes play for rest of game  

function playGame(){
    //createDeck();
    //console.log(globalDeck);
    //splitDeck();
    //these 2 lines take a random card twice and push it from the stack to the currentCard
    player1CurrentCard.push(pickRandomCard(player1Stack));
    player2CurrentCard.push(pickRandomCard(player2Stack));
    console.log('player1hand', player1CurrentCard[0][0]);
    console.log('player2hand', player2CurrentCard[0][0]);
    checkGreaterCard(player1CurrentCard, player2CurrentCard);
    checkWin();
    //generate next turn function/ disable start button event listener at the end of the function. 

    //dom announces who won the hand, display goes away when card is clicked again
    //move onto next move below only when the user clicks the card again
    //(click event for click on card image here)
    //checkGreaterCard();
}

