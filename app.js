let choices = ['Rock', 'Papers', 'Scissors'];
let choicesindex = [0, 1, 2];
let roundsrange = [1, 2, 3, 4, 5];
let yourwinsets = ['02', '10', '21']; // PLAYER vs. COMP combos where the player wins
let yourtotalwins = 0;
let yourtotallosses = 0;

function computerPlay() {
    let indexrange = 10;
    let playindex = Math.floor(Math.random() * indexrange);
    playindex = playindex % choices.length;
    return playindex;
}

function playRound(yourindex, compindex) {
    let winner;
    if (yourindex == compindex) {
        return "None!";
    } else {
        yourplayset = yourindex.toString() + compindex.toString();
        if (yourwinsets.includes(yourplayset)) {
            yourtotalwins++;
            return "You!" 
        } else {
            yourtotallosses++;
            return  "Computer!";
        }
    }
}
function game(roundname) {
    let yourindex;
    console.log('Round ' + roundname);
    while (!(Number.isInteger(yourindex) && choicesindex.includes(yourindex))) {
        yourindex = parseInt(prompt("What is your move, player? 1 = Rock, 2 = Papers, 3 = Scissors")) - 1;
        if (!(Number.isInteger(yourindex) && choicesindex.includes(yourindex))) {
            console.log("Invalid submission! Asking again!");
        }
    }
    let compindex = computerPlay();
    console.log('You chose: ' + choices[yourindex]);
    console.log('Computer chose: ' + choices[compindex]);
    console.log('So, who won? ' + playRound(yourindex, compindex));
}

/* main */
console.log('BEGINNING MATCH');
let numrounds = parseInt(prompt("How many rounds?"));
if (!(Number.isInteger(numrounds) && roundsrange.includes(numrounds))) {
    throw new Error("Fuck off!")
}
for (round = 1; round <= numrounds; round++) {
    game(round);
}
console.log("Your total wins: " + yourtotalwins);
console.log("Your total losses: " + yourtotallosses);
console.log('ENDING MATCH');