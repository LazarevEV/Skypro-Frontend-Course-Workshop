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