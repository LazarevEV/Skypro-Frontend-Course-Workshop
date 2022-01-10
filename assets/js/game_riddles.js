let riddlesJson = `
  [
    {
      "id": 0,
      "text": "Летает без крыльев, плачет без глаз",
      "answer": "ТУЧА"
    },
    {
      "id": 1,
      "text": "Из какого слова из семи букв можно убрать одну 'букву', чтобы осталось две буквы?",
      "answer": "БУКВАРЬ"
    },
    {
      "id": 2,
      "text": "Идет то в гору, то с горы, но остается на месте.",
      "answer": "ДОРОГА"
    },
    {
      "id": 3,
      "text": "Где встречается такое, что конь через коня перепрыгивает?",
      "answer": "ШАХМАТЫ"
    },
    {
      "id": 4,
      "text": "Какой знак нужно поставить между 6 и 7, чтобы результат оказался меньше 7 и больше 6?",
      "answer": "ЗАПЯТАЯ"
    }
  ]
`;
const riddles = JSON.parse(riddlesJson);
let chosenRiddleId = 0;
let lifeCount = 3;

function resetParams() {
    chosenRiddleId = 0;
    lifeCount = 3;

    for (let i = 0; i < lifeCount; i++) {
        updateLifeBar(i, 'filled');
    }

    document.getElementById("riddle-answer-button").disabled = false;
}

function runRiddlesGame() {
    resetParams();

    chosenRiddleId = Math.floor(Math.random() * 5);
    document.getElementsByClassName("riddle-text")[0].innerHTML = riddles.find(riddle => riddle.id === chosenRiddleId)['text'];

    document.getElementsByClassName("game-description intro-paragraph")[0].style.display = "none";
    if (window.matchMedia(" (max-width: 767px)")) {
		document.getElementsByClassName("riddles-wrapper")[0].style.display = "flex";
    } else {
        document.getElementsByClassName("riddles-wrapper")[0].style.display = "block";
    }
    
    document.getElementById("riddle-answer-button").style.display = "block";
};

function updateLifeBar(lifeCount, status) {
    document.getElementsByClassName("life-icon")[lifeCount].src = `../img/heart_icon_${status}.png`;
};

function submitAnswer() {
    let playerAnswer = document.getElementsByClassName("game-input")[0].value.toUpperCase();
    
    let result = ""
    if (playerAnswer === riddles.find(riddle => riddle.id === chosenRiddleId)['answer']) {
        document.getElementById("riddle-answer-button").disabled = true;
        result = "ПРАВИЛЬНО!"
    } else if (lifeCount !== 1) {
        lifeCount -= 1;
        updateLifeBar(lifeCount, 'empty');
        result = "ПОПРОБУЙТЕ ЕЩЕ РАЗ!";

    } else {
        lifeCount -= 1;
        updateLifeBar(lifeCount, 'empty');
        document.getElementById("riddle-answer-button").disabled = true;
        result = "ВЫ ПРОИГРАЛИ!";
    }

    document.getElementsByClassName("game-result")[0].style.display = "block";
    document.getElementsByClassName("game-result")[0].innerHTML = result;
};