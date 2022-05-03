const guessedLettersElement = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 9;



const getWord = async function (){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    // console.log(data);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();
    console.log(randomWord);
    word = randomWord;
    updateWordInProgress(word);
}

getWord();


const updateWordInProgress  = function(word){
    const placeholderLetters = [];
    for (let letter of word){
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};



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
        countGuessesRemaining(letter);
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


const countGuessesRemaining = function(letter){
    const uppercaseWord = word.toUpperCase();
    if (!uppercaseWord.includes(letter)){
        message.innerText = `Sorry, wrong guess!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess!`;
    }
    if (remainingGuesses === 0){
        message.innerHTML = `Sorry game over!`;
        remainingSpan.innerHTML = `${remainingGuesses} guess`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerHTML = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerHTML = `${remainingGuesses} guess`;
    }
};


const checkWin = function(word){
  if (word.toUpperCase() === wordInProgress.innerHTML){
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
      startOver();
  }
  
};

const startOver = function(){
    buttonGuess.classList.add("hide");
    buttonPlayAgain.classList.remove("hide");
    remainingGuess.classList.add("hide");
    guessedLettersElement.classList.add("hide");
};


buttonPlayAgain.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText="";
    guessedLettersElement.innerText="";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingSpan.innerText = remainingGuesses;
    buttonPlayAgain.classList.add("hide");
    buttonGuess.classList.remove("hide");
    remainingGuess.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    getWord();
})





