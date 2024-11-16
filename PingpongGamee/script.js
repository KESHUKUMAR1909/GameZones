document.addEventListener("DOMContentLoaded", () => {
    let rightSide = false;
    let leftSide = false;
    let GameOver = false;
    const ball = document.getElementById("floating-ball");
    ball.style.display = "none";
    const gameArea = document.getElementById("game-area");
    console.log(gameArea);
    const backgroundSound = document.getElementById("background-music")

    // Initial positions
    let positionX = 20;
    let positionY = 2;
    let ballSpeedX = 5;  // Speed of the ball horizontally
    let ballSpeedY = 6;  // Speed of the ball vertically

    let ballX = positionX;
    let ballY = positionY;

    function startGameLogic() {
        const ball = document.getElementById("floating-ball");

        // Logics to append the ball to the Game Area
        if (rightSide === true) {
            ball.style.position = "absolute";
            ball.style.top = "40%";
            ball.style.right = "10px";
            ball.style.display = "block";
        }
        if (leftSide === true) {
            ball.style.position = "absolute";
            ball.style.top = "40%";
            ball.style.left = "10px";
            ball.style.display = "block";
        }
        backgroundSound.play();

        function keyControls() {
            const ballHitWall = document.getElementsByClassName("ballHitWall")[0];
            ballHitWall.setAttribute("tabindex", "0");
            ballHitWall.focus();
        
            // Correct event listener addition
            ballHitWall.addEventListener("keydown", (event) => moveWall(event));
        }

        // Set interval for regular ball movement
        setInterval(moveBall, 20); // Update the ball position every 20 milliseconds
        keyControls();
    }

    function moveWall(e) {
        const ballHitWall = document.getElementsByClassName("ballHitWall")[0];
        const containerHeight = gameArea.clientHeight;
        const currentTop = parseInt(window.getComputedStyle(ballHitWall).top, 10) || 0;
        // console.log(currentTop);
        const ballHeight = ballHitWall.offsetHeight;
        const step = 10;
    
        if (e.key === "ArrowUp" && currentTop > 0) {
            ballHitWall.style.top = (currentTop - step) + "px";
        }
        if (e.key === "ArrowDown" && currentTop + ballHeight < containerHeight) {
            ballHitWall.style.top = (currentTop + step) + "px";
        }
    }

    function moveBall() {
        if (gameOver()) {
           
            return true; // Stop the movement if the game is over
        }
    
        // Ball movement logic
        ballX += ballSpeedX;  // Update horizontal position
        ballY += ballSpeedY;  // Update vertical position
    
        // Get game area dimensions
        const containerWidth = gameArea.clientWidth;
        const containerHeight = gameArea.clientHeight;
        const ballWidth = ball.offsetWidth;
        const ballHeight = ball.offsetHeight;
    
        // Ball hitting left or right wall (game over side)
        if (ballX <= 0 || ballX + ballWidth >= containerWidth) {
            // If the ball hits the side where the wall is, game over
            if (rightSide) {
                if (ballX <= 0) {
                    backgroundSound.pause();
                    alert("Game Over! Ball hit the left wall.");
                    return true;
                }
            } else if (leftSide) {
                if (ballX + ballWidth >= containerWidth) {
                    backgroundSound.pause();
                    alert("Game Over! Ball hit the right wall.");
                    return true;
                }
            }
        }
    
        // Ball bouncing off top and bottom boundaries
        if (ballY <= 0 || ballY + ballHeight >= containerHeight) {
            ballSpeedY = -ballSpeedY;  // Reverse vertical direction (bounce)
        }
    
        // Ball bouncing off the opposite wall (the one that's not the game-over wall)
        if (ballX <= 0 || ballX + ballWidth >= containerWidth) {
            ballSpeedX = -ballSpeedX;  // Reverse horizontal direction (bounce)
        }
    
        // Ball bouncing off the wall (ballHitWall)
        const ballHitWall = document.getElementsByClassName("ballHitWall")[0];
        const wallLeft = ballHitWall.offsetLeft;
        const wallTop = ballHitWall.offsetTop;
        const wallWidth = ballHitWall.offsetWidth;
        const wallHeight = ballHitWall.offsetHeight;
    
        if (
            ballX + ballWidth >= wallLeft &&
            ballX <= wallLeft + wallWidth &&
            ballY + ballHeight >= wallTop &&
            ballY <= wallTop + wallHeight
        ) {
            // Bounce the ball when it hits the wall
            ballSpeedX = -ballSpeedX; // Reverse horizontal direction
            ballSpeedY = -ballSpeedY; // Reverse vertical direction
        }
    
        // Update the ball's position on screen
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";  // Use pixels to set the position
    
        // Optional: Log the ball's position for debugging
        // console.log(`Ball Position: X=${ballX} Y=${ballY}`);
    }
    

    function gameOver() {
        // Check if the ball has gone out of bounds (only game over when hitting wall boundary)
        const containerWidth = gameArea.clientWidth;
        const ballWidth = ball.offsetWidth;

        // Ball hit the left wall (rightSide = true)
        if (rightSide && ballX <= 0) {
            return true;
        }

        // Ball hit the right wall (leftSide = true)
        if (leftSide && ballX + ballWidth >= containerWidth) {
            return true;
        }

        // If no game over condition, return false
        return false;
    }

    function createTheBallHitWall() {
        // creating the Wall to hit the ball
        const ballHitWall = document.createElement("div");
        ballHitWall.classList.add("ballHitWall");
        // Adding functionalities to append the child to the game-Area logically as per the userSidechosen=====
        if (rightSide === false) {
            gameArea.appendChild(ballHitWall);
            ballHitWall.style.position = "absolute";
            ballHitWall.style.right = "0px";
            ballHitWall.style.top = "25%";
            leftSide = true;
            setTimeout(() => {
                alert("Click on Play Button to start the Game");
            }, 400);
        }
        if (leftSide === false) {
            gameArea.appendChild(ballHitWall);
            ballHitWall.style.position = "absolute";
            ballHitWall.style.left = "0px";
            ballHitWall.style.top = "25%";
            rightSide = true;
            setTimeout(() => {
                alert("Click on Play Button to start the Game");
            }, 400);
        }
    }

    function leftButtonOperation() {
        // work todo after the leftButton clicking
        rightSide = true;
        createTheBallHitWall();
    }

    function rightButtonOperation() {
        // work todo after the rightButton clicking
        leftSide = true;
        createTheBallHitWall();
    }

    function getUserSide() {
        // Making the Wrapper Div for the Side Choosing buttons
        const Wrapper = document.createElement("div");
        Wrapper.classList.add("userSideBtnHolder");
        // Creating the buttons for the side choosing of the user--
        const rightBtn = document.createElement("button");
        rightBtn.classList.add("btns");
        rightBtn.textContent = "Right Side";
        const leftBtn = document.createElement("button");
        leftBtn.classList.add("btns");
        leftBtn.textContent = "Left Side";
        const playBtn = document.createElement("button");
        playBtn.textContent = "Play";
        playBtn.classList.add("btns");
        // Appending the side Chossing buttons to the Wrapper div
        Wrapper.appendChild(rightBtn);
        Wrapper.appendChild(playBtn);
        Wrapper.appendChild(leftBtn);
        document.body.appendChild(Wrapper);
        // Adding Event listeners to left and Right Buttons
        leftBtn.addEventListener("click", leftButtonOperation);
        rightBtn.addEventListener("click", rightButtonOperation);
        playBtn.addEventListener("click", startGameLogic, { once: true });
    }

    function runGame() {
        // Creating the Start Game Button dynmically using the js
        const runGamebtn = document.createElement("button");
        runGamebtn.classList.add('button');
        runGamebtn.classList.add('start-Btn');
        runGamebtn.textContent = "Start the Game";
        // Adding event listeners to the startGameButton----
        runGamebtn.addEventListener("click", () => {
            // Calling the getUserSideFunctions to get the user Playing side --------
            getUserSide();
        }, { once: true });
        // Appending the start Button to the UI of the game
        const topHeading = document.getElementById("heading");
        topHeading.parentNode.insertBefore(runGamebtn, topHeading.nextSibling);
    }

    runGame();
});
