function c(x) {
    console.log(x);
}

// Shuffling array function
function shuffle(arr) {
    for(let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
}

function createGrid(size){
    for (let i = 0; i < size; i++) {

        a = document.createElement("div"); // create a DIV element
        a.setAttribute('class', 'card'); // set DIV class to "card"
        let cardID = 'card' + i;
        a.setAttribute('id', cardID); // set DIV ID to "card" + i iterator
        // a.setAttribute('onclick', 'cardPicked()');
        document.querySelector('#gameBoard').appendChild(a); // put DIV into #gameBoard

        let b = document.createElement("p");
        b.setAttribute('class', 'cardP');
        let cardPID = 'card' + i + 'P';
        b.setAttribute('id', cardPID);
        a.appendChild(b);

        let secondDiv = document.createElement("div");
        secondDiv.setAttribute('class', 'cardFront');
        let cardFID = 'card' + i + 'F';
        secondDiv.setAttribute('id', cardFID);
        secondDiv.setAttribute('onclick', 'cardPicked()');
        a.appendChild(secondDiv);    
    }
}

const headerInfo = {
    name: playerName,
    difficulty: 'notSelected',
};

function playGame() {   // this shouldn't be named playGame

    headerInfo.difficulty = window.event.target.id;

    function setSize(){
        let difficulty = window.event.target.id;
        let size = 0;
        if (difficulty === 'easy') {
            size = 16;
            points = 16;
            headerInfo.difficulty = 'easy';
        } 
        else if (difficulty === 'medium'){
            size = 24;
            points = 24;
            diff = 'medium';
        } 
        else {
            size = 36;
            points = 36;
            diff='hard';
        }

        return size;
    }

    c(headerInfo.difficulty);
    setHeader();
    let size = setSize();
    
    // Create emojis array
    emojis = "😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 🙄 🖤 💯 💢 💥 💫 💦 💨 🕳 💣 💬 ⚽ ⚾ 🥎 🏀 🏐 🔌 💻 🖥 🖨 ⌨ 🖱 🖲 🐇 🐿 🦔" // string
    smallSet = emojis.split(" "); // array

    // Hide difficulty buttons and show GRID
    const CD = document.querySelector('#chooseDifficulty');
    const GB = document.querySelector('#gameBoard');
    CD.style.display = 'none';
    GB.style.display = 'flex';

    createGrid(setSize());
    shuffle(smallSet);

    var numbersArray = [];
    for (let i = 0; i < size; i++) { 
        numbersArray[i] = i;
    }
    shuffle(numbersArray);

    for (let i = 0; i < size; i+=2){
        let textnode = document.createTextNode(smallSet[i]); // put pickedEmoji to textNode
        let temp = numbersArray[i];
        let temp2 = numbersArray[i+1];
        document.getElementsByClassName("cardP")[temp].innerHTML = textnode.nodeValue;
        document.getElementsByClassName("cardP")[temp].setAttribute('value', textnode.nodeValue); 
        document.getElementsByClassName("cardP")[temp2].innerHTML = textnode.nodeValue;
        document.getElementsByClassName("cardP")[temp2].setAttribute('value', textnode.nodeValue); 
    }

    if (size === 24) {
        for (let i = 0; i < size; i++) {
            let el = document.getElementsByClassName("card")[i];
            el.style.width = "16%";
        }
    }
    else if (size === 36) {
        for (let i = 0; i < size; i++) {
            let el = document.getElementsByClassName("card")[i];
            let el2 = document.getElementsByClassName("cardFront")[i];
            el.style.width = "16%";
            el.style.minHeight = "80px";
            el2.style.minHeight = "85px";
        }
    }
}

// TIMER
var seconds = 0;
var minutes = 0;
var timerOn = false;
var t;
function timerGo() {
    timerOn = true;
    showTime = document.querySelector('#headerTimer');

    function add() {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
    showTime.innerHTML = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
        (seconds > 9 ? seconds : "0" + seconds);

    plus();
    }

    function plus(){
        t = setTimeout(add, 1000);
    }
    plus();
}

function timerStart() {
    if (timerOn === false) timerGo();
}
// TIMER


var c1, c2; //innerHTML of card (emoji to compare)
var cid1, cid2; //card ID
var fid1, fid2; //front ID
var counter = 0;

function hideBoth() {
    $('.cardFront').css( {'pointer-events': 'auto'} );
    cid1.style.visibility = "hidden";
    $( fid1 ).toggle( "puff" );
    cid2.style.visibility = "hidden";
    $( fid2 ).toggle( "puff" );
}

function cardPicked(){
    timerStart();
    c(points);
    if (counter < 2) {
        let whichCard = window.event.target.id;
        c(whichCard);
        let whichCardP = whichCard.replace('F', 'P');
        c(whichCardP);

        $( "#" + whichCard ).toggle( "puff" );
        document.querySelector('#' + whichCardP).style.visibility = "visible";

        if (counter === 0) {
            c1 = document.querySelector('#' + whichCardP).innerHTML;
            cid1 = document.querySelector('#' + whichCardP);
            fid1 = document.querySelector('#' + whichCard);
            counter++;
        } else {
            c2 = document.querySelector('#' + whichCardP).innerHTML
            cid2 = document.querySelector('#' + whichCardP);
            fid2 = document.querySelector('#' + whichCard);
            counter--;

            if (c1 != c2) {
                c(cid1);
                $('.cardFront').css( {'pointer-events': 'none'} );
                setTimeout(function() { hideBoth(); }, 1000);      
            } else {
                points -= 2;
                if (points === 0) endGame();
                c(points);
            }
        }   
    }
}

function endGame() {
    clearTimeout(t);
    let currentTime = minutes + '.' + seconds;
    localStorage.setItem(playerName, currentTime);
    document.querySelector('#gameMenu').style.display = 'flex';
    document.querySelector('#gameBoard').style.display = 'none';
    // localStorage.setItem(name, time)
    // time should be converted to "1.23" format
}

function setHeader() {
    document.querySelector('#gameHeader').style.display = 'flex';
    // document.querySelector('#headerPlayerName').textContent = headerInfo.name;
    // document.querySelector('#headerDifficulty').textContent = headerInfo.difficulty;
}
