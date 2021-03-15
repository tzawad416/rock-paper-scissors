document.addEventListener('DOMContentLoaded', event => { 

    // When HTML/DOM elements are ready:
    let run = true;
    if (run) {

        let choices = ['Rock', 'Papers', 'Scissors']; // available choices
        let choicesindex = [0, 1, 2];                 // numerification of available choices
        let yourwinsets = ['02', '10', '21'];         // PLAYER vs. COMP combos where the player wins
        let yourtotalwins = 0;                        // global initial value for player wins
        let yourtotallosses = 0;                      // global initial value for player losses
        let maxrounds = 5;                        // list of accepted number of rounds
        let yourwincountpct = 0.00;                // percent of wins out of total wins+losses

        function computerPlay() {
            let indexrange = 10;
            let playindex = Math.floor(Math.random() * indexrange);
            playindex = playindex % choices.length;
            return playindex;
        }
        
        function playRound(yourindex, compindex) {
            let winner;
            if (yourindex == compindex) {
                winner = "None!";
            } else {
                yourplayset = yourindex.toString() + compindex.toString();
                if (yourwinsets.includes(yourplayset)) {
                    yourtotalwins++;
                    winner = "You!" 
                } else {
                    yourtotallosses++;
                    winner =  "Computer!";
                }
            }
            return winner;
        }
        
        function game(roundname) {
            let yourindex;
            const rockbutton = document.getElementById('rps-rocksimg-btn');
            const papersbutton = document.getElementById('rps-papersimg-btn');
            const scissorsbutton = document.getElementById('rps-scissorsimg-btn');
            console.log('[Round ' + roundname + ']');
            while (!(Number.isInteger(yourindex) && choicesindex.includes(yourindex))) {
                //yourindex = parseInt(prompt("What is your move, player? 1 = Rock, 2 = Papers, 3 = Scissors")) - 1;
                while (!(yourindex)) {
                    rockbutton.addEventListener('click', (e) => {
                        e.preventDefault(); // disable the refresh on the page when submit
                        yourindex = rockbutton.value - 1;
                    });
                    papersbutton.addEventListener('click', (e) => {
                        e.preventDefault(); // disable the refresh on the page when submit
                        yourindex = papersbutton.value - 1;
                    });
                    scissorsbutton.addEventListener('click', (e) => {
                        e.preventDefault(); // disable the refresh on the page when submit
                        yourindex = scissorsbutton.value - 1;
                    });
                }
                if (!(Number.isInteger(yourindex) && choicesindex.includes(yourindex))) {
                    console.log("Invalid submission! Asking again!");
                }
            }
            // yourindex = computerPlay(); // treating user as another 'computer' 
            let compindex = computerPlay();
            console.log('You chose: ' + choices[yourindex]);
            console.log('Computer chose: ' + choices[compindex]);
            console.log('So, who won? ' + playRound(yourindex, compindex));
        }
        
        /* main */
        console.log('--- BEGINNING MATCH ---');
        let numrounds = parseInt(prompt("How many rounds?"));
        if (!(Number.isInteger(numrounds) && numrounds <= maxrounds)) {
            console.log(`We do min 1 to max ${maxrounds} rounds. Fuck off!`);
        } else {
            for (round = 1; round <= numrounds; round++) {
                game(round);
            }
            /* See how long it takes for wins to dominate */
            /* let round = 1;
            while (yourwincountpct < 50.00) {
                game(round);
                round++;
                yourwincountpct = 100*(yourtotalwins / (yourtotalwins + yourtotallosses));
            } */
            console.log('[Match Summary]');
            console.log("Your total wins: " + yourtotalwins);
            console.log("Your total losses: " + yourtotallosses);
        }
        console.log('--- ENDING MATCH ---');
    }
});

/*-----------------------------------------------------------------------------------------*/