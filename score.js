// Function to calculate the score based on time passed
function calculateScore() {
  // In this example, we'll use a simple counter to represent time
  let timePassed = 0;
  setInterval(() => {
    // Increment the timePassed and update the score
    timePassed++;
    updateScore(timePassed);
  }, 1000); // Update score every second (1000 milliseconds)
}

// Function to update the score in the scoreboard bar
function updateScore(score) {
  // Get the score element and update its innerHTML with the current score
  const scoreElement = document.getElementById("scoreValue");
  scoreElement.innerHTML = score;
}

// Call the calculateScore function to start updating the score
calculateScore();
