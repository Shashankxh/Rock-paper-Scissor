// Retrieve score from localStorage or initialize if not present
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// Function to play the game
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    // Determine game result
    if (playerMove === computerMove) {
        result = 'Tie.';
        score.ties++;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You win.';
        score.wins++;
    }else {
        result = 'You lose.';
        score.losses++;
    }

    // Update score and display results
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.result').innerHTML = result;
    document.querySelector('.move').innerHTML = `
        You <img src="${playerMove}-emoji.png" class="move-icon" alt="${playerMove}">
        <img src="${computerMove}-emoji.png" class="move-icon" alt="${computerMove}"> Computer
    `;
}

// Update score display
function updateScoreElement() {
    document.querySelector('.score').innerHTML = `
        Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
}

// Reset the score
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
}

// Function to pick a random move for the computer
function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        return 'rock';
    } else if (randomNumber < 2 / 3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Initialize score display on page load
updateScoreElement();
