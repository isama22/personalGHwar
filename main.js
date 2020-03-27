//constants -------------------------------------------------------
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const globalDeck = createDeck();
  
let playerOne = null;
let playerTwo = null;

let player1Stack = [];
let player2Stack = [];
let win = player1Stack === 52 || player2Stack === 52;

//variables -----------------------------------------------
let player1CurrentCard = [];
let player2CurrentCard = [];

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
            var card = {Value: values[x], Suit: suits[i], img: `assets/images/${suits[i]}-${values[x]}.svg`};
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

function startGame(){
    createDeck();
    splitDeck();
    player1CurrentCard.push(pickRandomCard(player1Stack));
    player2CurrentCard.push(pickRandomCard(player2Stack));
        console.log('player1hand', player1CurrentCard[0][0]);
        console.log('player2hand', player2CurrentCard[0][0]);
    flipCard();
    checkGreaterCard();
    document.getElementById("startButton").removeEventListener("click", startGame);
}

function checkGreaterCard(){
    if (player1CurrentCard[player1CurrentCard.length -1][0].Value === player2CurrentCard[player2CurrentCard.length -1][0].Value){
        player1CurrentCard.push(pickRandomCard(player1Stack));
        player2CurrentCard.push(pickRandomCard(player2Stack));
        player1CurrentCard.push(pickRandomCard(player1Stack));
        player2CurrentCard.push(pickRandomCard(player2Stack));
                console.log("it's a tie! now it's war, draw new cards!");
            var para = document.createElement("P");                       
            var t = document.createTextNode("it's a tie! now it's war, draw new cards!");    
            document.getElementById("div1").appendChild(para); 
            para.appendChild(t);    
            while (div2.firstChild){
                div2.removeChild(div2.firstChild);
            };
            document.getElementById("div2").appendChild(para); 
                scoreBoard1();
                scoreBoard2();
    }
    else if (player1CurrentCard[player1CurrentCard.length -1][0].Value > player2CurrentCard[player2CurrentCard.length -1][0].Value) {
        for (i = 0; i < player1CurrentCard.length; i++){
            player2Stack.splice(player2CurrentCard[i][1], 1);
            player1Stack.push(player2CurrentCard[i][0])
        }       console.log('player 1 wins this hand');
            var para = document.createElement("P");                       
            var t = document.createTextNode('player 1 wins this hand! draw another card');    
            para.appendChild(t);                                       
                while (div2.firstChild){
                    div2.removeChild(div2.firstChild);
                };
            document.getElementById("div2").appendChild(para); 
        checkWin();
        scoreBoard1();
        scoreBoard2();
    }       else{
        for (i = 0; i < player1CurrentCard.length; i++){
        player1Stack.splice(player1CurrentCard[i][1], 1);
        player2Stack.push(player1CurrentCard[i][0])
        }       console.log('player 2 wins this hand');
            var para = document.createElement("P");                       
            var t = document.createTextNode('player 2 wins this hand! draw another card');    
            para.appendChild(t);                                       
                while (div2.firstChild){
                div2.removeChild(div2.firstChild);
                };
            document.getElementById("div2").appendChild(para);
        checkWin();
        scoreBoard1();
        scoreBoard2();
}}

function checkWin(){
        if (player1Stack.length === 52) {
                console.log('p1 wins game!');
            const para = document.createElement("P");
            const node = document.createTextNode('player 1 wins game!');
            para.appendChild(node);
            const element = document.getElementById("div1");
            element.appendChild(para);

        document.getElementById("player2").removeEventListener("click", playGame)

        }
    else if (player2Stack.length === 52) {
                console.log('p2 wins game!');
        const para = document.createElement("P");
        const node = document.createTextNode('player 2 wins game!');
        para.appendChild(node);
        const element = document.getElementById("div1");
        element.appendChild(para);
        document.getElementById("player2").removeEventListener("click", playGame)
    } 
    else if (player1Stack.length !== 52 && player2Stack.length !== 52 ){
                console.log('draw another card');
}}

function render() {
}
render();

function scoreBoard1(){
    var para = document.createElement("P");   
    var p1Stack = document.createTextNode(player1Stack.length);
    para.appendChild(p1Stack);
        while (p1aside.firstChild){
        p1aside.removeChild(p1aside.firstChild);
    };
    document.getElementById("p1aside").appendChild(para);
}

function scoreBoard2(){
    var para = document.createElement("P");   
    var p2Stack = document.createTextNode(player2Stack.length);
    para.appendChild(p2Stack); 
        while (p2aside.firstChild){
        p2aside.removeChild(p2aside.firstChild);
    };
    document.getElementById("p2aside").appendChild(para);
}

function flipCard(){ 

    document.getElementById('player1').setAttribute('src', player1CurrentCard[0][0].svg);
    document.getElementById('player2').setAttribute('src', player2CurrentCard[0][0].svg);
}

function playGame(){
    player1CurrentCard = [];
    player2CurrentCard = [];
    player1CurrentCard.push(pickRandomCard(player1Stack));
    player2CurrentCard.push(pickRandomCard(player2Stack));
    console.log("player1hand", player1CurrentCard[0][0]);
    console.log('player2hand', player2CurrentCard[0][0]);
    flipCard();
    checkGreaterCard();
    checkWin();
}

function reset() {
location.reload();
}