$(document).ready(function() {
  var questionaires = [
    {
      question: "Which one of following is the heighest peak in the world?",
      options: [
        "Mt. Machhapuhre",
        "Mt. Kilimanjaro",
        "Mt. Everest",
        "Mt. Ketu"
      ],
      answer: "Mt. Everest"
    },
    {
      question: "How high is Mount Everest?",
      options: [
        "7,571m above sea level",
        "8,848m above sea level ",
        "8,888m above sea level",
        "8,898m above sea level"
      ],
      answer: "8,848m above sea level"
    },
    {
      question:
        "Which of the following President's faces is NOT carved into Mount Rushmore?",
      options: [
        "George Washington",
        "Thomas Jefferson",
        "Franklin Roosevelt",
        "Theodore Roosevelt"
      ],
      answer: "Franklin Roosevelt"
    },
    {
      question:
        "Who were the first climbers known to reach the top of Mount Everest?",
      options: [
        "Edmund Hillary & Tenzing Norgay",
        "Raymond Lambert & Tenzing Norgay",
        "George Mallory & Andrew Irvine",
        "James Whittaker & Shambu Tamang"
      ],
      answer: "Edmund Hillary & Tenzing Norgay"
    },
    {
      question: "What is the world's longest mountain range on land?",
      options: [
        "Himalayan Mountains",
        "Rocky Mountains",
        "Andes Mountains",
        "Carpathian Mountains"
      ],
      answer: "Andes Mountains"
    },

    {
      question: "What is North America's highest mountain?",
      options: [
        "Mount McKinley",
        "Mount Rocky",
        "Mount Whitney",
        "Pico de Orizaba"
      ],
      answer: "Mount McKinley"
    }
  ];

  var i = 0;
  var timer;
  var result = [];

  startGame();
  function countDownTimer() {
    var time = 0;
    timer = setInterval(function() {
      time++;
      $("#timer").text("00:" + time.toString().padStart(2, "0"));
    }, 1000);
  }

  function startGame() {
    $("#gameStarter").modal("show");

    $(".exist").click(function() {
      countDownTimer();
      $(".hidden").show();
      displayAQuestionInInterval();
    });
  }

  function displayAQuestionInInterval() {
    i = 0;
    displayAQuestionaire(questionaires[i]);
    i++;
    var interval = setInterval(function() {
      if (i > questionaires.length - 1) {
        clearInterval(interval);
        clearInterval(timer);
        showResult();
        return;
      }
      displayAQuestionaire(questionaires[i]);
      i++;
    }, 10000);
  }

  function displayAQuestionaire(questionaire) {
    $(".question").text(questionaire.question);
    $("label[for=option1]").text(questionaire.options[0]);
    $("label[for=option2]").text(questionaire.options[1]);
    $("label[for=option3]").text(questionaire.options[2]);
    $("label[for=option4]").text(questionaire.options[3]);
    $("#option1").val(questionaire.options[0]);
    $("#option2").val(questionaire.options[1]);
    $("#option3").val(questionaire.options[2]);
    $("#option4").val(questionaire.options[3]);
    $('input[name="options"]').prop("checked", false);
  }

  $("input[name=options]").click(function() {
    var clicked = this.value;
    var answer = questionaires[i - 1].answer;
    var isCorrect = clicked === answer;
    result[i - 1] = isCorrect;
  });

  function showResult() {
    var correctAnswer = result.reduce(function(count, value) {
      if (value) {
        return count + 1;
      }
      return count;
    }, 0);

    var incorrectAnswer = result.reduce(function(count, value) {
      if (!value) {
        return count + 1;
      }
      return count;
    }, 0);

    var unattempt = questionaires.length - (correctAnswer + incorrectAnswer);
    console.log(unattempt);
    $("#gameResult").modal("show");
    $("#questions").text("Total Questions: " + questionaires.length);
    $("#correct").text("Correct Answers: " + correctAnswer);
    $("#incorrect").text("Incorrect Answers: " + incorrectAnswer);
    $("#unattempt").text("Missed questions: " + unattempt);
  }
});
