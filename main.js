
//constants -------------------------------------------------------
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
//let values = [2, 2, 2, 2, 2, 2, 2 ,2 , 2, 2, 2, 2, 3];
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
let player1 = document.getElementById('player1');

//event listeners-----------------------------------------------------------------
startButton.addEventListener("click", startGame);

player2.addEventListener("click", playGame);

resetButton.addEventListener("click", reset);

//functions--------------------------------------------------------------------------

function createDeck() {
    var deck = new Array();
    for(var i = 0; i < suits.length; i++) {
        for(var x = 0; x < values.length; x++) {
            var card = {Value: values[x], Suit: suits[i], img:`assets/images/${suits[i]}-${values[x]}`};
            // `assets/images/blue.svg`};
            // `assets/images/${suits}-${values}`
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

function startGame(){
    createDeck();
    splitDeck();
    player1CurrentCard.push(pickRandomCard(player1Stack));
    player2CurrentCard.push(pickRandomCard(player2Stack));
    flipCard();

    console.log('player1hand', player1CurrentCard[0][0]);
    console.log('player2hand', player2CurrentCard[0][0]);
    checkGreaterCard();
    document.getElementById("startButton").removeEventListener("click", startGame);
}



function checkGreaterCard(){
    if (player1CurrentCard[player1CurrentCard.length -1][0].Value === player2CurrentCard[player2CurrentCard.length -1][0].Value){
        player1CurrentCard.push(pickRandomCard(player1Stack));
        player2CurrentCard.push(pickRandomCard(player2Stack));
        player1CurrentCard.push(pickRandomCard(player1Stack));
        player2CurrentCard.push(pickRandomCard(player2Stack));
      
        //splice new random card out of stack and into currentCard twice, once for each player
        // player1CurrentCard.splice(pickRandomCard(player1Stack))
        // player2CurrentCard.splice(pickRandomCard(player2Stack))
        console.log("it's a tie! now it's war, draw new cards!");
        checkGreaterCard();
        //append child/dom to display tie message on screen 
    }
    else if (player1CurrentCard[player1CurrentCard.length -1][0].Value > player2CurrentCard[player2CurrentCard.length -1][0].Value) {
        //pushes both cards into p1 stack
        for (i = 0; i < player1CurrentCard.length; i++){
            player2Stack.splice(player2CurrentCard[i][1], 1);
            player1Stack.push(player2CurrentCard[i][0])
        }
        console.log('player 1 wins this hand');
        let para = document.createElement("p");
        const node = document.createTextNode('player 1 wins this hand! draw another card');
        para.appendChild(node);
        const element = document.getElementById("div2");
        element.appendChild(para);
            while (div2.firstChild){
            div2.removeChild(div2.firstChild);
        };
        para(element.appendChild(para));
            checkWin();
    } else{
    //pushes player2Currentcard && player1CurrentCard in player2Stack
    for (i = 0; i < player1CurrentCard.length; i++){
        player1Stack.splice(player1CurrentCard[i][1], 1);
        player2Stack.push(player1CurrentCard[i][0])
    }
        console.log('player 2 wins this hand');
        let para = document.createElement("p");
        const node = document.createTextNode('player 2 wins this hand! draw another card');
        para.appendChild(node);
        const element = document.getElementById("div2");
        element.appendChild(para);
            while (div2.firstChild) {
            div2.removeChild(div2.firstChild);
        };
        para(element.appendChild(para));
        //para.appendChild(node);
        checkWin();
        
    }
}


function checkWin(){ //invoke every time cards are pushed to a stack
    //how to check the contents of an array?
    if (player1Stack.length === 52) {
        //template literals to use winning players name 
        console.log('p1 wins game!');
        const para = document.createElement("p");
        const node = document.createTextNode('player 1 wins game!');
        para.appendChild(node);
        const element = document.getElementById("div1");
        element.appendChild(para);
        // while (div2.firstChild){
        //     div2.removeChild(div2.firstChild);
        // };
        // div2.forEach(element.appendChild(para));

        document.getElementById("player2").removeEventListener("click", playGame)
        //element.removeChild(element.childNodes[0]);
     }
    else if (player2Stack.length === 52) {
        console.log('p2 wins game!');
        const para = document.createElement("p");
        const node = document.createTextNode('player 2 wins game!');
        para.appendChild(node);
        const element = document.getElementById("div1");
        element.appendChild(para);
        // while (div2.firstChild){
        //     div2.removeChild(div2.firstChild);
        //     div2.forEach(element.appendChild(para));
        // };
        
        document.getElementById("player2").removeEventListener("click", playGame)
        //element.removeChild(element.childNodes[0]);
    } 
    else if (player1Stack.length !== 52 && player2Stack.length !== 52 ){
        console.log('draw another card');
        // const para = document.createElement("p");
        // const node = document.createTextNode('draw another card');
        // para.appendChild(node);
        // const element = document.getElementById("div1");
        // element.appendChild(para);
        //     while (div2.firstChild){
        //     div2.removeChild(div2.firstChild);
        // };
        // para.appendChild(node);
        // para(element.appendChild(para));
        // element.removeChild(element.childNodes[0]);
     }
    }

function render() {
//use render to flip cards over 
//use to initialize game? 
}
render();

function flipCard(){ 

//console log whats in my current card, assign a path to whatever that happens to be through set attribute in my flipcard function

//invoke flipcard at every instance of a random card being selected

// console.log('player1hand', player1CurrentCard[0][0]);
// console.log('player2hand', player2CurrentCard[0][0]);

    document.getElementById('player1').setAttribute('src', player1CurrentCard[0][0].img);
    document.getElementById('player1').setAttribute('src', player1CurrentCard[0][0].img);
    // document.getElementById('player1').setAttribute('src', 'assets/images/backs/blue.svg');

// player2CurrentCard.setAttribute('src', player2CurrentCard[0][0].img);


}

function playGame(){
    //createDeck();
    //console.log(globalDeck);
    //splitDeck();
    //these 2 lines take a random card twice and push it from the stack to the currentCard
    player1CurrentCard = [];
    player2CurrentCard = [];
    player1CurrentCard.push(pickRandomCard(player1Stack));
    player2CurrentCard.push(pickRandomCard(player2Stack));
    console.log("player1hand", player1CurrentCard[0][0]);
    console.log('player2hand', player2CurrentCard[0][0]);
    //checkGreaterCard(player1CurrentCard, player2CurrentCard);
    checkGreaterCard();
    checkWin();
}

function reset() {
location.reload();
}