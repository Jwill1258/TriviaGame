$(document).ready(function () {
    // ----------------------------TRIVIA GAME----------------------------

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "When is it safe to remove the radiator cap ?",
        answer: ["When its cool enough to touch", "When cold outside", "As soon as you stop", "Anytime as long as engine isn't overheated"],
        correct: "0",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "When you first approach your vehicle, which should you lookout for?",
        answer: ["Low wires", "People in the vicinity", "Broken windows", "All the above"],
        correct: "3",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "Which of these is NOT an essential feature of a spare tire?",
        answer: ["At same pressure as the rest of the tires", "In as good condition as the tires on the truck", "Same size as rest of truck tires", "Same manufacturer as rest of truck tires"],
        correct: "3",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "When using tiedowns, what weight should they be able to lift?",
        answer: ["One in a half times the weight of your cargo", "Twice the weight of your cargo", "Half times the weight of your cargo", "The same weight as your cargo"],
        correct: "0",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "Approaching a gang working on a highway, you should...?",
        answer: ["Honk your horn", "Cut your speed", "Flash your light", "Speed through the construction zone quickly"],
        correct: "1",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "When beginning a long downgrade, which of these is the only thing which should NOT be a factor in choosing your speed?",
        answer: ["The steepness of the gradient", "How far you are ahead or behind your schedule", "The road and weather conditions", "The weight of your vehicle plus cargo"],
        correct: "1",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "If you smell exhaust fumes in the cab, what should you do?",
        answer: ["Open the window", "Stop immediately", "Check at the next stop", "Make a note on the post trip report"],
        correct: "1",
        image: ("assets/images/traffic-light.gif")
    }, {
        question: "When checking your vehicles load, you must make sure it conforms to...?",
        answer: ["All federal regulations only", "The state regulations of your destination", "All local, state, and federal regulations that will aplly to your journey", "Local regulations of the jurisdication your starting from"],
        correct: "2",
        image: ("assets/images/traffic-light.gif")
    }];

    // ------------- FUNCTION DECLARATIONS ----------------------------


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("Correct! Keep it up!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("Wrong this time! Get'em next time!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});