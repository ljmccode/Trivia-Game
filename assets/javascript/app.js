$(document).ready(function () {

    var quiz = [
        {
            question: "What was The Lion King originally going to be called?",
            options: ["King of the Jungle", "Pride Rock", "Circle of Life", "A Lion's Tale"],
            correct: 0,
            image1: "assets/images/LionKingHappy.jpg",
            image2: "assets/images/LionKingSad.jpg"
        },
        {
            question: "How old is Crush in Finding Nemo",
            options: ["35 years old", "85 years old", "150 years old", "175 years old"],
            correct: 2,
            image1: "assets/images/NemoHappy.jpg",
            image2: "assets/images/NemoSad.jpg"
        },
        {
            question: "In Snow White and the Seven Dwarfs, what does the wicked Queen ask the Huntsman to bring back to her to prove Snow White is dead?",
            options: ["Her finger", "Her necklace", "A lock of her hair", "Her heart"],
            correct: 3,
            image1: "assets/images/SnowWhiteHappy.jpg",
            image2: "assets/images/SnowWhiteSad.jpg"
        },
        {
            question: "The woman who voices Belle from Beauty and the Beast also voices what other lead Disney role?",
            options: ["Ariel from The Little Mermaid", "Esmeralda from The Hunchback of Norte Dame", "Merida from Brave", "Meg from Hercules"],
            correct: 3,
            image1: "assets/images/BeautyHappy.jpg",
            image2: "assets/images/BeautySad.jpg"
        },
        {
            question: "What is a phrase Woody from Toy Story does NOT say when you pull his string? ",
            options: ["That's not my horse!", "Reach for the sky!", "Somebody's poisoned the water hole!", "There's a snake in my boot!"],
            correct: 0,
            image1: "assets/images/WoodyHappy.jpg",
            image2: "assets/images/WoodySad.jpg"
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
var userGuess = "";

$("#reset").hide();
// On clicking start button, hides start button,starts game, starts countdown
$("#start").on("click", function() {
    $("#start").hide();
    startCountdown();
    showQuestion();
})

// function that starts a timer, set interval so it decreases by one second
function startCountdown() {
    if(timerRunning == false) {
        interval = setInterval(countdown, 1000);
        timerRunning = true;
    }
}

// display timer on screen, decreases time
function countdown() {
    $("#quiz-timer").html("<h2> Time remaining: " + timer + "<h2>");
    timer--;
    console.log(timer);
    // if timer runs out, display out of time, stop timer, add to unanswered
    if (timer === -1) {
        $("#question").hide();
        $("#answersAndResults").html("<p>You ran out of time! The correct answer is: " + randomQuestion.options[randomQuestion.correct] + "</p>");
        $("#answersAndResults").append("<img src=" + randomQuestion.image2 + ">");
        stopTimer();
        unanswered++;
        scoreTracker();
        determineFinish();
    }
}

function stopTimer() {
    timerRunning = false;
    clearInterval(interval);
}

function showQuestion() {
    // random question chosen from quiz array, displays question
    randomQuestion = quiz[Math.floor(Math.random() * numberOfQuestions)];
    $("#question").show();
    // if question has been asked, pick another question
    if (questionsAsked.indexOf(randomQuestion.question) !== -1) {
        return showQuestion();
    } else {
    console.log(randomQuestion.question);
    console.log("Correct answer is " + randomQuestion.correct);
    // displays question
    $("#question").html("<h3>" + randomQuestion.question + "<h3>");
    // creating divs for each answer choice, adding classes, adding answer choices to divs
    for (var i = 0; i < randomQuestion.options.length; i++) {
        var answers = $("<div>")
        answers.addClass("answerOption");
        answers.html(randomQuestion.options[i]);
        console.log(randomQuestion.options[i]);
        // assigning different attribute to each answer option to distiguish
        answers.attr("data-value", i);
        // appending answer options
        $("#answersAndResults").append(answers);
    }
    }

    // upon user clicking one of the answer options
    $(".answerOption").on("click", function() {
        // store value of user's guess as integer to compare with correct answer
        userGuess = parseInt($(this).attr("data-value"));
        console.log("User guess answer is " + userGuess);
        $("#question").hide();

        if(userGuess === randomQuestion.correct) {
            correct++;
            userGuess = "";
            stopTimer()
            console.log("Is the timer running? " + timerRunning)
            $("#answersAndResults").html("<p>Correct!!</p>")
            // appending happy image
            $("#answersAndResults").append("<img src=" + randomQuestion.image1 + ">");
            scoreTracker();
            determineFinish();
        } else {
            incorrect++;
            userGuess = "";
            stopTimer();
            console.log("Is the timer running? " + timerRunning)
            $("#answersAndResults").html("<p>Sorry, the correct answer is: " + randomQuestion.options[randomQuestion.correct] + "</p>");
            // appending sad image
            $("#answersAndResults").append("<img src=" + randomQuestion.image2 + ">");
            scoreTracker();
            determineFinish();
        }
    
    })
}
function scoreTracker() {
    console.log("Number correct: " + correct);
    console.log("Number incorrect: " + incorrect);
    console.log("Number unaswered: " + unanswered);
}

function determineFinish() {
    // add question asked into questionsAsked array
    questionsAsked.push(randomQuestion.question);

    setTimeout(function() {
        $("#answersAndResults").empty();
        timer = 15;
        console.log(timer);
    
    if (correct + incorrect + unanswered === numberOfQuestions) {
        displayFinish();
    } else {
        console.log(questionsAsked);
        startCountdown();
        showQuestion();
    }

    // waits 3 seconds
    }, 3000);
}

function displayFinish() {
    $("#question").empty();
    $("#question").html("<h3>All done, here's how you did!<h3>")
    $("#answersAndResults").append("<p>Correct: " + correct + "<p>");
    $("#answersAndResults").append("<p>Incorrect: " + incorrect + "<p>");
    $("#answersAndResults").append("<p>Unanswerd: "+ unanswered + "<p>");
    $("#reset").show();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
}

$("#reset").on("click", function() {
    $("#reset").hide();
    $("#question").empty();
    $("#answersAndResults").empty();
    questionsAsked = [];
    startCountdown();
    showQuestion();
})

});
