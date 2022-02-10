// *********************************************************************
// ***************************  app.js  ********************************
// *********************************************************************
"use strict";

(function () {
  console.log("Game Loaded");

  // *********************************************************************
  // *********************************************************************
  // *******************  UI Event handling  *****************************
  // *********************************************************************
  // *********************************************************************

  // UI element binding variables
  var stopTimerButton = document.querySelector("#btnStopTimer");
  var nextQuestionButton = document.querySelector("#btnNextQuestion");
  var tickerElement = document.querySelector("#ticker");
  var gameQuestionElement = document.querySelector("#gameQuestion");
  var gamePersonElement = document.querySelector("#gamePerson");
  var stopGameButton = document.querySelector("#btnStopGame");

  // get next question on button click
  nextQuestionButton.addEventListener("click", () => {
    stopTimer(); // stop the tickerTimer
    let question = getNextQuestion(); // get the next question
    let participantName = getNextParticipantName(); // get the next participant
    gameQuestionElement.innerHTML = question; // send the question to the UI
    gamePersonElement.innerHTML = participantName; // send the participant name to the UI
    startTimer(); // start the timer for this next question
  });

  // stop the game on button click
  stopGameButton.addEventListener("click", () => {
    if (confirm("Stop the Game ?")) {
      location.reload(); // reload the page
    }
  });

  // stop the tickerTimer on button click
  stopTimerButton.addEventListener("click", () => {
    stopTimer();
  });

  // *********************************************************************
  // *********************************************************************
  // *******************  utility functions  *****************************
  // *********************************************************************
  // *********************************************************************

  // variables declaration
  var tickerTimer = null;
  const timeForQuestion = 30;
  const interval = 1000;

  // function to stop the tickerTimer
  function stopTimer() {
    if (tickerTimer === null) return;
    clearInterval(tickerTimer); // clear the tickerTimer
    tickerTimer = null; // set tickerTimer to null
  } // function stopTimer ends

  // function to start the tickerTimer
  function startTimer() {
    if (tickerTimer === null) {
      let timeLeft = timeForQuestion; // initalize timeLeft for each question
      tickerTimer = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(tickerTimer);
          tickerElement.innerHTML = "00";
        } else {
          tickerElement.innerHTML = timeLeft;
        }
        timeLeft -= 1;
      }, interval);
    }
  } // function startTimer ends

  // function to generate random Index from [0 - limitForRandom]
  function getRandomIndex(limitForRandom) {
    return Math.floor(Math.random() * limitForRandom + 1);
  } // function getRandomIndex ends

  // function to return next question from questionsArray
  function getNextQuestion() {
    let numberOfQuestions = questionsArray.length - 1; // to match with the index in array
    let questionIndex = getRandomIndex(numberOfQuestions); // get random index
    return questionsArray[questionIndex];
  } // function getNextQuestion ends

  // function to return next unplayed participant name from participantsArray
  function getNextParticipantName() {
    // check if playedParticipantArray contains all items from participantsArray
    if (participantsArray.length === playedParticipantArray.length) {
      if (confirm("Participants played atleast once. Restart the Game ?")) {
        location.reload();
      }
    }
    // find the next participant
    const numberOfParticipants = participantsArray.length - 1; // to match with the index in array
    let participantIndex = -1;

    do {
      participantIndex = getRandomIndex(numberOfParticipants); // get random index
    } while (playedParticipantArray.includes(participantIndex));

    playedParticipantArray.push(participantIndex); // add into playedParticipantArray
    return participantsArray[participantIndex].getName();
  } // function getNextParticipantName ends

  // *********************************************************************
  // *********************************************************************
  // *******************  Participant class  *****************************
  // *********************************************************************
  // *********************************************************************

  class Participant {
    constructor(email, name) {
      this.email = email;
      this.name = name;
    }

    getName() {
      // getter for name
      return this.name;
    }
  } // class Participant ends

  // *********************************************************************
  // *********************************************************************
  // *********************  static data sources  *************************
  // *********************************************************************
  // *********************************************************************

  // array to hold played participants index from participantsArray
  const playedParticipantArray = new Array();

  // array to hold participants
  // only name is sufficient for participants but email is also added to ensure uniqueness
  // populate this array with email and name of participants
  const participantsArray = new Array(
    new Participant("abc1@abc.com", "Abc1 Abc1"),
    new Participant("abc2@abc.com", "Abc2 Abc2"),
    new Participant("abc3@abc.com", "Abc3 Abc3")
  );

  // array to hold questions
  // add more questions if required
  const questionsArray = new Array(
    "What is your funniest memory with your best friend?",
    "What is the craziest dare you have ever taken?",
    "If you could be eating any food in the world right now, what would it be?",
    "If you were a store at the mall, which would you be?",
    "What is your worst date story?",
    "Do you have any guilty pleasure shows that you watch?",
    "What is the strangest item near you?",
    "What commercial jingles or theme songs get stuck in your head?",
    "If you could choose your own nickname, what would it be and why?",
    "If you had a ridiculous amount of money, what unnecessary thing or experience would you indulge in?",
    "If you could eliminate one food from the world, what would it be?",
    "Share a good or bad impression!",
    "If you could only listen to one song for the rest of your life, what would the song be and why?",
    "If you were sponsored by a brand, which one would you want it to be?",
    "What topic do you know a lot of random trivia about?",
    "If your life became an action movie, which fictional character would you want to be?",
    "What is a common thing that you have never done? Fly, change a tire, etc.",
    "If you could live in any sitcom universe, which would it be?",
    "What is the scariest thing you have done for fun?",
    "If you had to wear a shirt with one word on it for an entire year, which word would you choose?",
    "If you were in the wrestling ring, who would be your opponent?",
    "What is the most unique thing on your bucket list?",
    "You have two minutes to give a speech on anything! What would your topic be?",
    "What is your favorite website or blog to visit in your free time?",
    "Pick up something nearby and tell a story about its significance or how you got it.",
    "If you could live the life of any historical figure, who would you choose?",
    "If you were an article of clothing, which would you be?",
    "If you could learn any one skill right now, what would it be?",
    "What is your favorite movie and how many times have you seen it?",
    "What was your favorite thing about your last job?",
    "What is something that you feel proud of this week?",
    "What do you feel is something that everyone is missing out on because they simply do not know about it?",
    "What is your go-to self-improvement activity that you think would help others?",
    "Who is the most interesting person you have met and had a conversation with?",
    "What does your favorite breakfast look like?",
    "What is your morning routine like?",
    "How do you like to relax and de-stress?",
    "Who in your life inspires you the most?",
    "What is something you want to focus on this week?",
    "What motivates you?",
    "What weird thing do you feel nostalgic for?",
    "If you were a vegetable, which one would you be and why?",
    "What is the scariest movie you have ever seen?",
    "If you were featured on the news, what would the reason most likely be?",
    "What is your favorite international food?",
    "What is your favorite physical activity?",
    "What animal are you amazed by?",
    "What smell do you hate that others seem to like?",
    "What would you want to do if you retired?",
    "What is a trait that you have picked up from your parents?",
    "What food do you love that others typically do not?",
    "What are some of your favorite games to play?",
    "What is something that takes a lot of time, but is definitely worth it?",
    "What do you wish someone taught you a long time ago?",
    "What popular song drives you crazy?",
    "What do you find yourself recommending to people you first meet?",
    "Tell the group about something funny you witnessed this week?",
    "Do you have any exciting plans coming up?",
    "What book had the most significance on you?",
    "What is your favorite obscure belonging?",
    "What is in your junk drawer?",
    "Describe your setup for the perfect nap.",
    "What is your favorite food combination?"
  );
})();
