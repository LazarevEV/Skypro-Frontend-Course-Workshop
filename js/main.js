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
}

// GAMES
function runAnagramGame() {
    let word_one = document.getElementById("input-one").value;
    let word_two = document.getElementById("input-two").value;
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

function runGame(game_id) {
    runAnagramGame()
};