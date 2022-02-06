const guessedLetters = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again hide");
const word = "magnolia";

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

buttonGuess.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letter.value;
    console.log(guess);
    letter.value = "";
});