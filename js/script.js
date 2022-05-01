const guessedLettersElement = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again hide");
const word = "magnolia";
const guessedLetters = [];



const updateWordInProgress  = function(word){
    const placeholderLetters = [];
    for (let letter of word){
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

updateWordInProgress(word);

buttonGuess.addEventListener("click", function(e){
    e.preventDefault();
    const input = letterInput.value;
    console.log(input);
    letterInput.value = "";
    message.innerHTML = "";
    const check = checkPlayerInput(input);
    makeGuess(check);
})

const checkPlayerInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input === ""){
        message.innerText = "Please input a letter silly!";
    } else if (input.length > 1){
        message.innerText = "Please only input 1 letter at a time!";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Only input a letter A-Z!";
    } else {
        return input;
    }
};

const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){
        message.innerText = "Sorry you've already guessed this letter!";
    } else {
        guessedLetters.push(letter);
        displayGuessedLetter(letter);
        updateGuessedWord(guessedLetters);
    }
    console.log(guessedLetters);
};

const showGuesses = function(){
    guessedLettersElement.innerHTML = "";
}

const displayGuessedLetter = function(letter){
    guessedLettersElement.innerHTML = "";
    for (let letter of guessedLetters){
        let li = document.createElement("li");
        li.innerHTML = letter
        guessedLettersElement.append(li);
    }
}

const updateGuessedWord = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWordArray = [];
    for (let letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWordArray.push(letter);
        } else {
            revealWordArray.push("●")
        };
    }
    wordInProgress.innerHTML = revealWordArray.join("");
    checkWin(word);
}

const checkWin = function(word){
  if (word.toUpperCase() === wordInProgress.innerHTML){
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
}








