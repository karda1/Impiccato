const words = ['javascript', 'programmazione', 'impiccato'];
const maxErrors = 10;
const errorCounter = document.getElementById('error-counter');

let selectedWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = Array(selectedWord.length).fill('_');
let errors = 0;

const hangmanImage = document.getElementById('hangman-image');
const wordDisplay = document.getElementById('word-display');
const letterButtons = document.getElementById('letter-buttons');
const restartButton = document.getElementById('restart-button');
const message = document.getElementById('message');

hangmanImage.style.width = "200px";
hangmanImage.style.height = "auto";

wordDisplay.textContent = displayedWord.join(' ');

// Crea i bottoni per le lettere
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', () => handleGuess(letter, button));
    letterButtons.appendChild(button);
});

let gameOver = false;

function handleGuess(letter, button) {
    if (gameOver) return;

    button.disabled = true;
    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                displayedWord[index] = letter;
            }
        });
        wordDisplay.textContent = displayedWord.join(' ');
        if (!displayedWord.includes('_')) {
            message.textContent = 'Hai vinto!';
            hangmanImage.src = 'img/win.gif';
            gameOver = true;
            endGame();
        }
    } else {
        errors++;
        console.log("Errori: ", errors);
        hangmanImage.src = `img/${errors}.gif`;
        errorCounter.textContent = `Errori: ${errors} / ${maxErrors}`;
        if (errors === maxErrors) {
            message.textContent = 'Hai perso! La parola era ' + selectedWord;
            hangmanImage.src = 'img/lose.gif';
            gameOver = true;
            endGame();
        }
    }
    
}

function restartGame() {
    // Reimposta le variabili
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.length).fill('_');
    errors = 0;
    gameOver = false;

    // Aggiorna gli elementi della UI
    wordDisplay.textContent = displayedWord.join(' ');
    hangmanImage.src = 'img/0.gif';
    message.textContent = '';
    errorCounter.textContent = `Errori: 0 / ${maxErrors}`;

    // Riattiva i bottoni delle lettere
    Array.from(letterButtons.children).forEach(button => {
        button.disabled = false;
    });

    restartButton.style.display = 'none'; // Nascondi il pulsante "Rigioca"
}

restartButton.addEventListener('click', restartGame);

function endGame() {
    gameOver = true;
    restartButton.style.display = 'inline'; 
}

