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