const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 448;
canvas.height = 400;

const ballRadius = 4;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const paddleHeight = 5;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

const PADDLE_SENSITIVITY = 10;

function draWBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.fillText = "#09f";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}
function drawBricks() {}

function collisionDetection() {}

function ballMovement() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }

  const isBalllSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;

  const isBallTouchingPaddle = y + dy > paddleY;

  if (isBalllSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    console.log("Game Over");
    document.location.reload();
  }
  x += dx;
  y += dy;
}

function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SENSITIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSITIVITY;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(event) {
    const { key } = event;
    if (key === "Right" || key === "ArrowRight") {
      rightPressed = true;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    const { key } = event;
    if (key === "Rigth" || key === "ArrowRight") {
      rightPressed = false;
    } else if (key === "left" || key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

function draw() {
  cleanCanvas();
  draWBall();
  drawPaddle();
  drawBricks();

  collisionDetection();
  ballMovement();
  paddleMovement();
  window.requestAnimationFrame(draw);
}

draw();
