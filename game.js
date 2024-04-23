// Iteration 1: Declare variables required for this game
let gameBoard = document.getElementById("game-body");
let livesDisplay = document.getElementById("lives");
let gameTime = parseInt(document.getElementById("timer").textContent);
let zombieId = 0;
const imgs = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-3.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png"
];
let lives = 5;
// Iteration 1.2: Add shotgun sound
const shotgunAudio = new Audio("./assets/shotgun.wav");
shotgunAudio.volume = 0.5;
// Iteration 1.3: Add background sound
// Configure and create background sound
const backgroundSound = new Audio("./assets/bgm.mp3", {
  volume: 0.9,
  loop: true
});
// Iteration 1.4: Add lives
let maxLives = 5;
// Iteration 2: Write a function to make a zombie
function createZombie() {
  const zombie = document.createElement("img");
  zombie.src = `./assets/${imgs[Math.floor(Math.random() * imgs.length)]}`;
  zombie.classList.add("zombie-image");
  zombie.id = `zombie-${zombieId}`;
  zombie.style.left = `${Math.random() * (gameBoard.offsetWidth - zombie.offsetWidth)}px`;
  zombie.onclick = () => {
    shotgunAudio.currentTime = 0;
    shotgunAudio.play();
    zombieKill(zombie);
  };
  gameBoard.appendChild(zombie);
  zombieId++;
}
// Iteration 3: Write a function to check if the player missed a zombie
function zombieShoot(zombie) {
  const zombieRect = zombie.getBoundingClientRect();
  return zombieRect.top <= 0;
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieKill(zombie) {
  zombie.style.display = "none";
  const isMissedShot = zombieShoot(zombie);
  if (isMissedShot) {
    lives--;
    livesDisplay.textContent = lives;
  }
  const gameOver = lives <= 0;
  const win = gameTime <= 0;

  if (gameOver || win) {
    clearInterval(timer);
    location.href = gameOver ? "./game-over.html" : "./win.html";
  }
  createZombie();
}
// Iteration 5: Creating timer
function updateGame() {
  gameTime--;
  document.getElementById("timer").textContent = gameTime;
  const zombies = document.querySelectorAll(".zombie-image");
  zombies.forEach(zombie => {
    if (zombieShoot(zombie)) {
      zombieKill(zombie);
    }
  });
  if (gameTime <= 0 || lives <= 0) {
    clearInterval(timer);
    location.href = gameTime <= 0 ? "./win.html" : "./game-over.html";
  }
}
const timer = setInterval(updateGame, 1000);
// Iteration 6: Write a code to start the game by calling the first zombie
backgroundSound.play();
createZombie();
// Iteration 7: Write the helper function to get random integer
function randomInteger(min, max) {
  if (min > max) {
    throw new Error("Invalid range: minimum value cannot be greater than maximum value.");
  }
  const range = max - min + 1;
  const randomFloat = Math.random() * range;
  return Math.floor(randomFloat) + min;
}
