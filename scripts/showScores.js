// Create global array for high-scores
var scoresArray = [];
// This is counter for 'for' loop displaying high-scores
// var j = 0;

// import playerID  from './playGame.js';

// Putting scores in array and sorting it
function sortHighScores() {
    // Object constructor
    function Score(name, time) {
        this.player = name;
        this.time = parseFloat(time);
    }

    // Create new objects (scores)
    if(scoresArray === null) {
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(x));
        let combined = JSON.parse(localStorage.getItem(x));
        let disconnected = combined.split(" ");
        // scoresArray[i] = new Score(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        scoresArray[i] = new Score(disconnected[0], disconnected[1]);

        scoresArray[i].time = scoresArray[i].time;
    } 

    // Sort scoresArray by time
    function compare(a, b) {
        let timeA = a.time;
        let timeB = b.time;
      
        return timeA - timeB;
    }
    scoresArray.sort(compare);

    // Console output (only for debugging)
    for (let i = 0; i < 10; i++) {
        console.log(scoresArray[i]);
    }

    return showHighScores();
} else showHighScores();

}

// Clear High-Scores 
function clearScores() {
    let scoresList = document.querySelector('#highScoresList');
    return scoresList.innerHTML = "";
}

// Add scores as <li> elements in HTML
function showHighScores() {
    //clearScores(); // If this isn't executed TOP10 becomes TOP(entryNumber*10)

    for (let j = 0; j < 10; j++) {
        let node = document.createElement("li");
        let stringA = scoresArray[j].player;
        let stringB = scoresArray[j].time;
        let finalString = stringA + '\t' + stringB;
        let textnode = document.createTextNode(finalString);
        node.appendChild(textnode);
        document.querySelector('#highScoresList').appendChild(node);
    }

}
