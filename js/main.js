function moveToGameMenu() {
    document.getElementsByClassName("game-menu")[0].scrollIntoView({block: "center", behavior: "smooth"});
};

function openGamePane(game_id) {
    document.getElementsByClassName("game-html")[0].style.display = "block";
    document.getElementsByClassName("game-html")[0].innerHTML = `<object type="text/html" data="html/${game_id}.html" style="width:100%;height:100vh;"></object>`;
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
    let word_one = document.getElementById("input-one").value.toUpperCase();
    let word_two = document.getElementById("input-two").value.toUpperCase();
    word_one = word_one.split("").sort().join("");
    word_two = word_two.split("").sort().join("");

    let result = ""
    if (word_one === "" || word_two === "") {
        result = "INPUTS ARE EMPTY. <b>ENTER WORDS</b>";
    } else if (word_one.match(/\d+/g) != null || word_two.match(/\d+/g) != null) {
        result = "ONE OF THE <b>INPUT CONTAINS DIGIT</b>"
    } else {
        result = word_one === word_two ? "WORDS ARE <b>ANAGRAM</b>" : "WORDS ARE <b>NOT ANAGRAM</b>";
    }

    document.getElementsByClassName("game-result")[0].style.display = "block";
    document.getElementsByClassName("game-result")[0].innerHTML = result;
};

// Rock-Paper-Scissors
function runRockPaperScissorsGame() {
    const computer_choice_variants = {
        0: 'Камень',
        1: 'Ножницы',
        2: 'Бумага',
    };

    let player_choice_text = document.getElementById("rps-select").value;
    let player_choice_id = Object.keys(computer_choice_variants).find(key => computer_choice_variants[key] === player_choice_text)
    let computer_choice_id = Math.floor(Math.random() * 3);
    let computer_choice_text = computer_choice_variants[computer_choice_id];

    let delta = player_choice_id - computer_choice_id;

    // let result = ""
    // switch (player_choice_id - computer_choice_id) {
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

    document.getElementById("rps-computer-choice").value = computer_choice_text;
    document.getElementsByClassName("game-result")[0].style.display = "block";
    document.getElementsByClassName("game-result")[0].innerHTML = result;
};

// Riddles
function runRiddlesGame() {
    riddles_json = `
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


};