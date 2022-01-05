function moveToGameMenu() {
    document.getElementsByClassName("game-menu")[0].scrollIntoView({block: "center", behavior: "smooth"});
};

function openGamePane(game_id) {
    document.getElementsByClassName("game-html")[0].style.display = "block";
    document.getElementsByClassName("game-html")[0].innerHTML = `<object type="text/html" data="assets/html/${game_id}.html" style="width:100%;height:100vh;"></object>`;
    document.getElementsByClassName("game-html")[0].scrollIntoView({block: "start", behavior: "smooth"});
};

function resetResultField() {
    document.getElementsByClassName("game-result")[0].style.display = "none";
    // Clear field for certain game
    try {
        document.getElementById("rps-computer-choice").value = "";
    } catch (error) {

    };
}

// DOESN'T WORK - HAVE TO ESTABLISH WEB SERVER
function readJSON(file_path) {
    // --> REQUIRE METHOD
    // let json_string = require(file_path);
    // alert(json_string);

    // --> FETCH METHOD
    fetch(file_path).then(response => {
        return response.json();
    }).then(data => alert(data));
};

// --> GAMES <--
// Anagram
function runAnagramGame() {
    let wordOne = document.getElementById("input-one").value.toUpperCase();
    let wordTwo = document.getElementById("input-two").value.toUpperCase();
    wordOne = wordOne.split("").sort().join("");
    wordTwo = wordTwo.split("").sort().join("");

    let result = ""
    if (wordOne === "" || wordTwo === "") {
        result = "INPUTS ARE EMPTY. <b>ENTER WORDS</b>";
    } else if (wordOne.match(/\d+/g) != null || wordTwo.match(/\d+/g) != null) {
        result = "ONE OF THE <b>INPUT CONTAINS DIGIT</b>"
    } else {
        result = wordOne === wordTwo ? "WORDS ARE <b>ANAGRAM</b>" : "WORDS ARE <b>NOT ANAGRAM</b>";
    }

    document.getElementsByClassName("game-result")[0].style.display = "block";
    document.getElementsByClassName("game-result")[0].innerHTML = result;
};

// Rock-Paper-Scissors
let playerChoiceText = "";

function resetActiveChoice() {
    playerChoiceText = "";  
    if (document.getElementsByClassName("rps-choice-button active")[0]) {
        document.getElementsByClassName("rps-choice-button active")[0].classList.remove("active");
    }
};

function setPlayerChoice(buttonId) {
    resetActiveChoice();

    playerChoiceText = buttonId;    
    document.getElementById(buttonId).classList.add("active");
};

function computeRockPaperScissorsGame() {
    const computerChoiceVariants = {
        0: 'rock',
        1: 'scissors',
        2: 'paper',
    };

    let playerChoiceId = Object.keys(computerChoiceVariants).find(key => computerChoiceVariants[key] === playerChoiceText)
    let computerChoiceId = Math.floor(Math.random() * 3);
    let computerChoiceIconUrl = `../img/rock-paper-scissors/${computerChoiceVariants[computerChoiceId]}_icon.png`;

    let delta = playerChoiceId - computerChoiceId;

    // let result = ""
    // switch (playerChoiceId - computerChoiceId) {
    //     case 0:
    //         result = "НИЧЬЯ!";
    //         break;
    //     case -1:
    //         result = "ВЫ ВЫИГРАЛИ!";
    //         break;
    //     case 2:
    //         result = "ВЫ ВЫИГРАЛИ!";
    //         break;
    //     default:
    //         result = "ВЫ ПРОИГРАЛИ!";
    // };
    let result = (delta === -1) || (delta === 2) ? "ВЫ ВЫИГРАЛИ!" : (delta === 0) ? "НИЧЬЯ!" : "ВЫ ПРОИГРАЛИ!";

    document.getElementsByClassName("rps-choice-opponent")[0].src = computerChoiceIconUrl;
    document.getElementsByClassName("game-result")[0].style.display = "block";
    document.getElementsByClassName("game-result")[0].innerHTML = result;
}

function runRockPaperScissorsGame() {
    if (playerChoiceText === "") {
        document.getElementsByClassName("game-result")[0].style.display = "block";
        document.getElementsByClassName("game-result")[0].innerHTML = "ВЫБЕРИТЕ ОТВЕТ!"; 
    } else {
        computeRockPaperScissorsGame();
    }
};

// Riddles
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
    document.getElementsByClassName("game-pane riddles")[0].style.display = "block";
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