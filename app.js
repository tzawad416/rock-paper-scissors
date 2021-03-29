let choices = ['Rock', 'Papers', 'Scissors'];           // respective names of available choices
let yourwinsets = ['02', '10', '21'];                   // PLAYER vs. COMP combos where the player wins
let yourtotalwins;                                      // initialize variable for your total wins
let yourtotallosses;                                    // initialize variable for your total losses
let maxrounds = 100;                                    // max number of rounds allowed
let roundnum;                                           // initialize variable for round number
let roundNumberPrompt = "How many rounds?";             // initial game begin prompt
let errorMsg = '';                                      // initial game begin error message
let numrounds;                                          // initialize variable for number of rounds to be played
let winsneeded;                                         // number of wins needed for either side
let endgameMsg;                                         // end game prompt message (who won?)
let playAgain;                                          // value of play again prompt (1 = yes, else = no)
let playAgainPrompt = "Play again? (1 = Yes, else No)"  // prompt asking if game should be played again

let muskygifurl = "https://media.tenor.com/images/a061350e5c5db9d25638bbeb5e4a6778/tenor.gif" // gift for non-replaying cucks

window.addEventListener('DOMContentLoaded', beginGame);

rockbutton = document.getElementById('rps-rocksimg-btn');
papersbutton = document.getElementById('rps-papersimg-btn');
scissorsbutton = document.getElementById('rps-scissorsimg-btn');

rockbutton.addEventListener('click', (e) => {
    playRound(rockbutton.value - 1, computerPlay());
});

papersbutton.addEventListener('click', (e) => {
    playRound(papersbutton.value - 1, computerPlay());
});

scissorsbutton.addEventListener('click', (e) => {
    playRound(scissorsbutton.value - 1, computerPlay());
});

function computerPlay() {
    let indexrange = 10;
    let playindex = Math.floor(Math.random() * indexrange);
    playindex = playindex % choices.length;
    return playindex;
}

function playRound(yourindex, compindex) {
    eventlog('[Round #' + roundnum.toString() + '] ', true, true);
    eventlog('You picked ' + choices[yourindex] + '.');
    eventlog('Computer picked ' + choices[compindex] + '.');
    if (!(yourindex == compindex)) {
        yourplayset = yourindex.toString() + compindex.toString();
        if (yourwinsets.includes(yourplayset)) {
            yourtotalwins++;
            eventlog('You won this round!');
        } else {
            yourtotallosses++;
            eventlog('Computer won this round!'); 
        }
        roundnum += 1;
    } else {
        eventlog('Neither won this round! Redoing!')
    }
    if (roundnum > numrounds || yourtotallosses >= winsneeded || yourtotalwins >= winsneeded) {
        endGame();
    } else {
        updateRound(roundnum, numrounds);
    }
}

function beginGame() {
    roundnum = 1;
    yourtotalwins = 0;
    yourtotallosses = 0;
    nukeeventlog();
    roundNumberPrompt = "How many rounds?";
    numrounds = parseInt(prompt(errorMsg + roundNumberPrompt));
    if (!(Number.isInteger(numrounds) && numrounds <= maxrounds)) {
        errorMsg = 'Please pick a value between 1 and ' + maxrounds.toString() + '. ';
        beginGame();
    } else {
        errorMsg = '';
        winsneeded = Math.floor(numrounds / 2) + 1;
        eventlog("Number of wins needed: " + winsneeded.toString(), false, true);
        updatePlayerWinCount(yourtotalwins);
        updateComputerWinCount(yourtotallosses);
        updateRound(roundnum, numrounds);
    }
}

function endGame() {
    updatePlayerWinCount(yourtotalwins);
    updateComputerWinCount(yourtotallosses);     
    if (yourtotalwins > yourtotallosses) {
        endgameMsg = 'YOU have WON!';
    } else if (yourtotallosses > yourtotalwins) {
        endgameMsg = 'COMPUTER has WON!';
    } else {
        endgameMsg = 'NEITHER have won!';
    }
    playAgain = parseInt(prompt(endgameMsg + ' ' + playAgainPrompt));
    if (playAgain == 1) {
        beginGame();
    } else {
        window.location.href = muskygifurl;
    }
}

function updatePlayerWinCount(value) {
    document.getElementById('rps-playerscore').innerHTML = value.toString();
}

function updateComputerWinCount(value) {
    document.getElementById('rps-computerscore').innerHTML = value.toString();   
}

function updateRound(roundnum, numrounds) {
    updatePlayerWinCount(yourtotalwins);
    updateComputerWinCount(yourtotallosses);     
    document.getElementById('rps-gamemessage-text-rounds').innerHTML =  roundnum.toString() + ' / ' + numrounds.toString();
}

function eventlog(text, isbold = false, isbreak = false) {
    if (isbreak) {
        let breakelem = document.createElement("br");    
        document.getElementById('rps-eventlog-text').append(breakelem);
    }
    let eventpara = document.createElement("span");
    eventpara.textContent = text + " ";
    if (isbold) eventpara.style.cssText = 'font-weight:bold;';
    document.getElementById('rps-eventlog-text').append(eventpara);
}

function nukeeventlog() {
    document.getElementById('rps-eventlog-text').innerHTML = "";
}