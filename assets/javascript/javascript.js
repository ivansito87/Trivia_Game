
// Core JavaScript

let userName = prompt(`Welcome!
    Please Enter your name!`);
var uppercaseUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
$("#user").text(uppercaseUserName);


$(document).ready(function () {

    console.log("ready!");

    $("#btnR").hide();

    var allQuestions = [{
        question: "Before Mt. Everest was discovered, whaich mountain was considered to be the highest mountain in the world?",
        choices: ["Mt. Kilimanjaro", "Kanchenjunga", "Mount Everest"],
        correctAnswer: 1
    },

    {
        question: "Does England have a 4th of July?",
        choices: ["Yes", "No", "I don't know"],
        correctAnswer: 0
    },

    {
        question: "What is Rupert the bear's middle name?",
        choices: ["Bear", "He doesn't have one!", "The", "Rupert"],
        correctAnswer: 2
    },

    {
        question: " What can you never eat for breakfast? ",
        choices: ["Dinner", "Something sugary", "Lunch", "Supper"],
        correctAnswer: 0
    },

    {
        question: "If there are three apples and you took two away, how many do you have?",
        choices: ["One", "Two", "None"],
        correctAnswer: 1
    },

    {
        question: "Spell 'Silk' out loud, 3 times in a row. What do cows drink?",
        choices: ["Milk", "Water", "Juice", "Cows can't drink"],
        correctAnswer: 1
    },

    {
        question: "Which is heavier, 100 pounds of rocks or 100 pounds of gold? ",
        choices: ["100 pounds of rocks", "100 pounds of rocks", "They weigh the same"],
        correctAnswer: 2
    },

    {
        question: "Can you spell 80 in two letters?",
        choices: ["AI-TY", "It's not possible", "EIGH-TY", "A-T"],
        correctAnswer: 3
    },

    {
        question: "What question must always be answered ''Yes''?",
        choices: ["What does Y-E-S spell?", "Will everyone die someday?", "Does everyone have a biological mother?", "Are you a human?"],
        correctAnswer: 0
    },

    {
        question: "How many sides does a circle have?",
        choices: ["The back", "None. It's a circle", "Two", "Four"],
        correctAnswer: 2
    },

    {
        question: "What has a tail but no body?",
        choices: ["A human", "A coin", "A cloud"],
        correctAnswer: 1
    },

    {
        question: "What word in the English language is always spelled incorrectly?",
        choices: ["It's possible to spell anything right as long as you learn it", "Shakespeare", "Onomatopoeia", "Incorrectly"],
        correctAnswer: 3
    },

    {
        question: "When do you stop at green and go at red?",
        choices: ["Watermelon!", "Traffic light!", "Garden"],
        correctAnswer: 0
    },

    {
        question: "What rotates but still remains in the same place?",
        choices: ["Bottle (spin the bottle game)", "Clock", "Stairs"],
        correctAnswer: 2
    },

    {
        question: "How can you lift an elephant with one hand?",
        choices: ["Truck", "Use both hands!", "Use a lever", "There is no such thing"],
        correctAnswer: 3
    }
    ];

    var currentQuestion = 0;

    var countDown = 15;

    var intervalId;

    var rightQuestions = 0;

    var wrongQuestions = 0;

    var right = new Audio("assets/sounds/ding.mp3");

    var wrong = new Audio("assets/sounds/wrong.mp3");

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
        console.log('Taking a break...');

        await sleep(3000);
        console.log('Two seconds later');
        $("#time").text("");
        nextQuestion();
    }

    $(document).ready(function () {
        $(".btns").on("click", function () {

            console.log("Working!")
            gameStarts();

        });
    });

    function decrement() {
        $("#time").text(countDown);
        countDown--;

        if (countDown < 0) {
            userChoice(-1);
            countDown = 15;
        }
    }

    function setTime() {
        countDown = 15;
        intervalId = setInterval(decrement, 1000);
    }

    function gameStarts() {
        countDown = 15;
        rightQuestions = 0;
        wrongQuestions = 0;
        currentQuestion = 0;
        setTime();
        $("#question").text(allQuestions[currentQuestion].question);
        $(".btns").hide();
        $("#btnR").hide()
        renderChoices();
    }

    function renderChoices() {
        let count = 0;
        allQuestions[currentQuestion].choices.forEach(function (element) {
            console.log(element);
            $("#choice" + count).text(`\u21D2 ${element}`);
            count++;
        });
    }

    function userChoice(userPicked) {
        clearChoices();
        clearInterval(intervalId);
        console.log("testing user" + userPicked);
        console.log("testing machine" + allQuestions[currentQuestion].correctAnswer);
        allQuestions[currentQuestion].correctAnswer
        if (parseInt(userPicked) === allQuestions[currentQuestion].correctAnswer) {
            console.log("works!")
            rightQuestions++;
            right.play();
            $("#choice0").html('<img src ="assets/images/correct.png" width ="200px" heigth="200px" class="img-fluid">');
            $("#question").html(`<h2>Yup! you got it right. </h2>`);
        } else {
            wrongQuestions++;
            wrong.play()
            $("#choice0").html('<img src ="assets/images/wrong.png" width ="200px" heigth="200px" class="img-fluid">');
            $("#question").text(`Nope! the correct answer is: ` + allQuestions[currentQuestion].choices[allQuestions[currentQuestion].correctAnswer]);
        }
        demo();
    }

    $(".choices").on("click", function () {
        let userPicked = $(this).attr("data-answer");
        console.log(userPicked);
        userChoice(userPicked);

    });

    function clearChoices() {
        $(".choices").text("");
    }

    function gameEnds() {
        console.log("Game over!");
        clearChoices();
        let finalScore = rightQuestions + wrongQuestions;
        $("#question").html(`<h1>Game Over! <strong>You Got ${rightQuestions} out of ${finalScore}</strong></h1>`);
        $("#btnR").show();
    }

    $("#btnR").on("click", function () {
        gameStarts();
    });

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < allQuestions.length) {
            console.log(allQuestions.length)
            setTime();
            $("#question").text(allQuestions[currentQuestion].question);
            renderChoices();
        } else {
            gameEnds();
        }
    }

    $(document).scroll(function () {
        navbarScroll();
    });

    function navbarScroll() {
        var y = window.scrollY;
        if (y > 10) {
            $('.header').addClass('small');
        } else if (y < 10) {
            $('.header').removeClass('small');
        }
    }

});

$(".choices").mouseover(function () { $(this).animate({ marginLeft: '20px' }, 'fast') });
$(".choices").mouseout(function () { $(this).animate({ marginLeft: '0px'}, 0) });



////==========================================> Mouse Trail  º(^.^)º
//  Mouse Trail effect º(^.^)º   -------> 
$(document).ready(function () {
    var mousePos = {};
    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min + 1)) + min;
    }
    $(window).mousemove(function (e) {
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
    });
    $(window).mouseleave(function (e) {
        mousePos.x = -1;
        mousePos.y = -1;
    });
    var draw = setInterval(function () {
        if (mousePos.x > 0 && mousePos.y > 0) {
            var range = 15;
            var color = "background: rgb(" + getRandomInt(204, 205) + "," + getRandomInt(253, 254) + "," + getRandomInt(255, 255) + ");";
            var sizeInt = getRandomInt(1, 7);
            size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
            var left = "left: " + getRandomInt(mousePos.x - range - sizeInt, mousePos.x + range) + "px;";
            var top = "top: " + getRandomInt(mousePos.y - range - sizeInt, mousePos.y + range) + "px;";
            var style = left + top + color + size;
            $("<div class='ball' style='" + style + "'></div>").appendTo('#wrap').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { $(this).remove(); });
        }
    }, 1);
});

// ---------- >>>> Thank you! <<<<<------------------\\
