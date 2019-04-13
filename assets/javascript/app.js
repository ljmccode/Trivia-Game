$(document).ready(function () {

var quiz = [
    {
        question: "What was The Lion King originally going to be called?",
        options: ["King of the Jungle", "Pride Rock", "Circle of Life", "A Lion's Tale"],
        correct: 0
    },
    {
        question: "How old is Crush in Finding Nemo",
        options: ["35 years old", "85 years old", "150 years old", "175 years old"],
        correct: 2
    },
    {
        question: "In Snow White and the Seven Dwarfs, what does the wicked Queen ask the Huntsman to bring back to her to prove Snow White is dead?",
        options: ["Her finger", "Her necklace", "A lock of her hair", "Her heart"],
        correct: 3
    },
    {
        question: "The woman who voices Belle from Beauty and the Beast also voices what other lead Disney role?",
        options: ["Ariel from The Little Mermaid", "Esmeralda from The Hunchback of Norte Dame", "Merida from Brave", "Meg from Hercules"],
        correct: 3

    },
    {
        question: "What is a phrase Woody from Toy Story does NOT say when you pull his string? ",
        options: ["That's not my horse!", "Reach for the sky!", "Somebody's poisoned the water hole!", "There's a snake in my boot!"],
        correct: 0
    }];



// Create variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionsAsked = [];
var timerRunning = false;
var interval;
var timer = 15;
var randomQuestion;
var numberOfQuestions = quiz.length;

$("#reset").hide();
// On clicking start button, starts game, starts countdown
$("#start").on("click", function() {
    $("#start").hide();
    startCountdown();
    showQuestion();
})

// function that starts a timer, set interval so it decreases by one second and runs the game
function startCountdown() {
    if(timerRunning == false) {
        interval = setInterval(countdown, 1000);
        timerRunning = true;
    }
}

// display timer on screen
function countdown() {
    $("#quiz-timer").html("<h2> Time remaining: " + timer + "<h2>");
    timer--;
    console.log(timer)
    if (timer === -1) {
        console.log("stop timer")
        // if timer hits 0, display answer and stop timer
        $("#answer-results").html("<h3>You ran out of time! The correct answer is " + quiz[correct].options + "</h3>");
        stopTimer();
        unanswered++;
        determineFinish();
    }
}

function stopTimer() {
    timerRunning == false;
    clearInterval(interval);
}

function showQuestion() {
    // random question chosen from quiz array
    randomQuestion = quiz[Math.floor(Math.random() * numberOfQuestions)];
    console.log(randomQuestion.question);
    // displays question
    $("#question").html("<h3>" + randomQuestion.question + "<h3>");
    // creating buttons for each answer choice and adding classes
    for (var i = 0; i < randomQuestion.options.length; i++) {
        var answers = $("<button>")
        answers.addClass("answerOption");
        answers.html(randomQuestion.options[i]);
        console.log(randomQuestion.options[i]);
        // assigning different attribute to each answer option to distiguish
        answers.attr("data-value", i);
        // appending answer options to site
        $("#answer-options").append(answers);
    }

}

function determineFinish() {
    // add question asked into questionsAsked array
    questionsAsked.push(randomQuestion);

    var clearAnswers = setTimeout(function() {
        $("#answerOptions").empty();
        timer = 15;
    
    if (numberOfQuestions <= questionsAsked) {
        displayFinish();
    }   
    if (questionsAsked.indexOf(randomQuestion) !== -1){
        return showQuestion();
    }


    // waits 3 seconds
    }, 3000);
}

function displayFinish() {
    $("#question").empty();
    $("#question").html("<h3>All done, here's how you did!<h3>")
    $("#results").append("<h4>Correct: " + correct + "<h4>");
    $("#results").append("<h4>Incorrect: " + incorrect + "<h4>");
    $("#results").append("<h4>Unanswerd: "+ unanswered + "<h4>");
    $("#reset").show();
}

});
