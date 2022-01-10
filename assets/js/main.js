function moveToGameMenu() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        document.getElementsByClassName("game-menu")[0].scrollIntoView({block: "start", behavior: "smooth"});
    } else {
        document.getElementsByClassName("game-menu")[0].scrollIntoView({block: "center", behavior: "smooth"});
    }
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
};