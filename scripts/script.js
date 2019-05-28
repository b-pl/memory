// ~BEGIN **PAGE LOADED INSTRUCTIONS**
var playerName = "Adolf";
var emojisSet = "EASY";
let idNo = 0;
let x = 0;
if(localStorage.getItem('ID') === null) {
  localStorage.setItem('ID', idNo);
  console.log(x);
} else {
  x = parseInt(localStorage['ID']);
  x++;
  localStorage['ID'] = x;
}


// Display welcome msg
document.querySelector('#welcomeMsg').innerHTML = "Welcome, " + playerName + "!";
// ĘND **PAGE LOADED INSTRUCTIONS**

// ~BEGIN **INSTRUCTIONS FOR CHANGE_NAME FUNCTION**
// Get the modal
var modal = document.querySelector('#changeNameContainer');

// Get the button that opens the modal
var openButton = document.querySelector('#changePlayerButton');

// Get the button that closes the modal
var closeButton = document.querySelector('#cancelButton');

// When the user clicks on "Change Player", opens the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function changePlayerName() {
    playerName = document.querySelector('#newPlayerName').value;
    document.querySelector('#welcomeMsg').innerHTML = "Welcome, " + playerName + "!";
    modal.style.display = "none";
}

function oneClickSelect() {
  document.querySelector('#newPlayerName').select();
}

// Keyboard event, change name by ENTER
function keyboardChangePlayerName(){
  const node = document.querySelector('#newPlayerName');
  node.addEventListener("keydown", function(keyPressed) {
    if (keyPressed.key === 'Enter') return changePlayerName();
  })
}
// ~END **INSTRUCTIONS FOR CHANGE_NAME FUNCTION**

// ~BEGIN **DISPLAY HIGH-SCORES INSTRUCTIONS**

const HS = document.querySelector('#highScoresContainer');
const GM = document.querySelector('#gameMenu');

function goToScores() {
  GM.style.display = "none";
  HS.style.display = "block";
  return sortHighScores();
}

function goToMenu() {
  GM.style.display = "flex";
  HS.style.display = "none";
}

// ~END **DISPLAY HIGH-SCORES INSTRUCTIONS**

function startGame() {
  let GC = document.querySelector('#gameContainer');
  let GM = document.querySelector('#gameMenu');
  let CD = document.querySelector('#chooseDifficulty');
  GM.style.display = "none";
  GC.style.display = "block";
  CD.style.display = "block";

  document.querySelector('#currentSet').innerHTML = "Change emojis set (current set: " + emojisSet + ")";
}

function goBack() {
  let GC = document.querySelector('#gameContainer');
  let GM = document.querySelector('#gameMenu');
  GM.style.display = "flex";
  GC.style.display = "none";
}

function changeEmojisSet(){
  let eSet = document.querySelector('#selectEmojisSet')
  emojisSet = eSet.options[eSet.selectedIndex].text;
  document.querySelector('#currentSet').innerHTML = "Change emojis set (current set: " + emojisSet + ")";
}
