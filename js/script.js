const guessedLettersElement = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again hide");
const word = "magnolia";
const guessedLetters = [];

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
    message.innerText = "";
    const guess = letter.value;
    console.log(guess);
    letter.value = "";
    const goodGuess = checkInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
});

const checkInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = `Please enter a letter`;
    } else if (input.length > 1) {
        message.innerText = `Please only enter one letter at a time`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `Please enter only a letter from A-Z`;
    } else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You've already guessed that letter silly goose. Try again`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}