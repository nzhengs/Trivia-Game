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
      question: "What is the height of Mt. Everest?",
      options: ["8838 meters", "8848 meters ", "8888 meteres", "8898 meters"],
      answer: "8848 meters"
    },
    {
      question: "How",
      options: ["a", "b", "c", "w"],
      answer: "b"
    }
  ];

  startGame();
  var i = 0;
  var correctAnswer = 0;
  var incorrectAnswer = 0;

  var timer;
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

  // var interval = setInterval(function() {
  //   displayAQuestionaire(questionaires[i]);
  //   i++;
  //   if (i > questionaires.length - 1) {
  //     clearInterval(interval);
  //     showResult();
  //   }
  // }, 2000);

  $("input[name=options]").click(function() {
    var clicked = this.value;
    var answer = questionaires[i - 1].answer;
    if (clicked == answer) {
      correctAnswer = correctAnswer + 1;
    } else {
      incorrectAnswer = incorrectAnswer + 1;
    }
  });

  function showResult() {
    $("#gameResult").modal("show");
    $("#questions").text("Total Questions: " + questionaires.length);
    $("#correct").text("Correct Answers: " + correctAnswer);
    $("#incorrect").text("Incorrect Answers: " + incorrectAnswer);

    console.log(correctAnswer);
    console.log(incorrectAnswer);
  }
});
