
let playing = false;
// set seconds to play the game
let sixtySec = 60;
let reset = document.querySelector("button.reset");
let score = document.querySelector("span.score");
let buttonAnswers = document.querySelectorAll("div.answers button");
let tryAgain = document.querySelector("div.try-again");
let correct = document.querySelector("div.correct");
let attempted = document.querySelector("span.attempted");


reset.textContent = "Start Game";
    //if click on start/reset button
    reset.addEventListener("click", function(e) {
        e.stopPropagation();
        //if playing
        // reload the page
        if(playing) {
            location.reload();
        } else {
            //if not playing
            reset.textContent = "Reset Game";
            playing = true;
            // set score to 0
            score.textContent = 0;

            // reduce time by 1 sec in loops
            // time left?
            // show countdown
            showTimer(sixtySec);
            let clearTimer = setInterval(function() {
                // yes -> continue
                // console.log(sixtySec);
                sixtySec--;
                showTimer(sixtySec);
                // No -> gameover
                if(sixtySec === 0) {
                    clearInterval(clearTimer);
                    showGameover(score.textContent);
                }
            }, 1000);
            // generate new Q&A
            generateQuestions();

        }
    });
const generateQuestions = () => {
    let A = document.querySelector("span.unitA");
    let B = document.querySelector("span.unitB");
    let buttonAnswers = document.querySelectorAll("div.answers button");
    let unitA;
    let unitB;
    // Math.round(Math.random() * 9) + 1
    unitA = A.textContent = Math.floor(Math.random() * 10);
    unitB = B.textContent = Math.floor(Math.random() * 10);
    let answersArray = [];
    buttonAnswers.forEach((but, i) => {
        answersArray.push((unitA+i)*(unitB+i));
    });
    shuffle(answersArray);
    buttonAnswers.forEach((but, i) => {
        but.textContent = answersArray[i];
    });

};
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
const showTimer = (sec) => {
    let timer = document.querySelector("div.timer");
    let timeRemaining = document.querySelector("span.time-remaining");
    timer.classList.remove("hidden");
    timeRemaining.textContent = sec;

};
const showGameover = (score) => {
    let gameover = document.querySelector("div.gameover");
    let buttonAnswers = document.querySelectorAll("div.answers button");
    let gameoverScore = document.querySelector("span.your-score");
    gameoverScore.textContent = score;
    gameover.classList.remove("hidden");
    document.querySelector("div.attempted").classList.remove("hidden");
    buttonAnswers.forEach((but) => {
        but.classList.remove("grow");
        but.setAttribute("disabled", "disabled");
    });
};

// if click on answer button
buttonAnswers.forEach((but) => {

    but.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        // if we playing
        if (playing) {
            let question = Number(document.querySelector("span.unitA").textContent) * Number(document.querySelector("span.unitB").textContent);
            // correct
            // yes
            if (but.textContent == question) {
                // increase score by 1
                score.textContent = Number(score.textContent) + 1;
                // console.log(score.textContent);
                // show correct message for 1 sec
                correct.classList.remove("hidden");
                setTimeout(()=> {
                    correct.classList.add("hidden");
                }, 1000);
                // generate new Q&A
                generateQuestions();
            } else {
                tryAgain.classList.remove("hidden");
                setTimeout(() => {
                    tryAgain.classList.add("hidden");
                }, 1000);
                attempted.textContent = Number(attempted.textContent) + 1;
                // console.log("try again");
            }

        }

    });
            // no
                // show try again message for 1 sec

});



