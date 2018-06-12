$(document).ready(function () {

    var questionAsked = [

        {
            question: "In Ocarina of Time, who is the Sage of Light?",
            choice: ["Zelda", "Rauru", "Sheik", "Link"],
            answer: 1,
            photo: "assets/images/rauru.png",
        },

        {
            question: "What is the name of the King of Hyrule that assists Link in The Wind Waker?",
            choice: ["Daltus Gustaf Hyrule", "Harkinian Hyrule", "Nohansen Daltus Hyrule", "Daphnes Nohansen Hyrule"],
            answer: 3,
            photo: "assets/images/Nohansen_Hyrule.png",
        },

        {
            question: "In the original Zelda for NES, where is Level 6 located during the Second Quest?",
            choice: ["In the Graveyard when you play the recorder", "Under an empty fairy's fountain when you play the recorder", "In the middle of a lake you reach by raft", "In the desert behind a wall you must bomb"],
            answer: 0,
            photo: "assets/images/level6.png",
        },

        {
            question: "Who is Princess Zelda named after?",
            choice: ["Zelda Williams", "Zelda Fitzgerald", "Zelda Spellman", "Zelda Wynn Valdes"],
            answer: 1,
            photo: "assets/images/fitzgerald.png"
        },

        {
            question: "In what town does Link find the man named Error in The Adventure of Link?",
            choice: ["Ruto", "Kakariko", "Mido", "Saria"],
            answer: 0,
            photo: "assets/images/error.png",
        },

        {
            question: "In A Link to the Past, which of the following places will the flute NOT take Link?",
            choice: ["Death Mountain", "Link's House", "The Lost Woods", "The Pyramid of Power"],
            answer: 3,
            photo: "assets/images/linktothepast.png"
        },
    ]

    var correct = 0;
    var incorrect = 0;
    var noguess = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = questionAsked.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < questionAsked.length; i++) {
            holder.push(questionAsked[i]);
        }
    })
    //timer goes down by 1 second every second.
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0 and add 1 to no guess
        if (timer === 0) {
            noguess++;
            stop();
            $("#correctAnswer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }
    // stops game
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //will pick question at random
    function displayQuestion() {
        index = Math.floor(Math.random() * questionAsked.length);
        pick = questionAsked[index];

       
        $("#questions").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#correctAnswer").append(userChoice);
            //		}
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correct++;
                userGuess = "";
                $("#correctAnswer").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                incorrect++;
                userGuess = "";
                $("#correctAnswer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#correctAnswer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        questionAsked.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#correctAnswer").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((incorrect + correct + noguess) === qCount) {
                $("#questions").empty();
                $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#correctAnswer").append("<h4> Correct: " + correct + "</h4>");
                $("#correctAnswer").append("<h4> Incorrect: " + incorrect + "</h4>");
                $("#correctAnswer").append("<h4> Unanswered: " + noguess + "</h4>");
                $("#reset").show();
                correct = 0;
                incorrect = 0;
                noguess = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#correctAnswer").empty();
        $("#questions").empty();
        for (var i = 0; i < holder.length; i++) {
            questionAsked.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})