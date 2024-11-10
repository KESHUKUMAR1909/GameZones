document.addEventListener("DOMContentLoaded", function () {
    let userSymbol;
    let computerSymbol;
    let isGameOver = false;

    function selectSymbol() {
        const symbolImage = document.createElement("img");
        const computerImage = document.createElement("img");

        const crossBtn = document.getElementById("crossBtn");
        const circleBtn = document.getElementById("circleBtn");

        crossBtn.addEventListener("click", () => {
            if (!userSymbol) {
                symbolImage.src = "cross.png";
                userSymbol = symbolImage.cloneNode();
                computerImage.src = "circle.png";
                computerSymbol = computerImage.cloneNode();
                console.log("Cross symbol selected");
            }
        });

        circleBtn.addEventListener("click", () => {
            if (!userSymbol) {
                symbolImage.src = "circle.png";
                userSymbol = symbolImage.cloneNode();
                computerImage.src = "cross.png";
                computerSymbol = computerImage.cloneNode();
                console.log("Circle symbol selected");
            }
        });
    }

    function appendSymbolOnClickedDiv() {
        const gameBoxes = document.getElementsByClassName("sign-container");

        for (let box of gameBoxes) {
            box.addEventListener("click", () => {
                if (box.innerHTML === "" && !isGameOver) {
                    box.appendChild(userSymbol.cloneNode());

                    setTimeout(() => {
                        if (checkWin(userSymbol.src)) {
                            alert("You Win!");
                            isGameOver = true;
                            return;
                        } else if (isBoardFull()) {
                            alert("It's a Draw!");
                            isGameOver = true;
                            return;
                        }
                    }, 0);
                    
                    setTimeout(() => {
                        if (!isGameOver) {
                            computerTurn();
                        }
                    }, 500);
                }
            });
        }
    }

    function computerTurn() {
        const gameBoxes = document.getElementsByClassName("sign-container");
        let placed = false;

        while (!placed && !isGameOver) {
            const randomIndex = Math.floor(Math.random() * gameBoxes.length);
            if (gameBoxes[randomIndex].innerHTML === "") {
                gameBoxes[randomIndex].appendChild(computerSymbol.cloneNode());
                placed = true;
              setTimeout(() => {
                if (checkWin(computerSymbol.src)) {
                    alert("Computer Wins!");
                    isGameOver = true;
                } else if (isBoardFull()) {
                    alert("It's a Draw!");
                    isGameOver = true;
                }
              },0 );
            }
        }
    }

    function checkWin(symbolSrc) {
        const gameBoxes = document.getElementsByClassName("sign-container");
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;

            const imgA = gameBoxes[a].querySelector("img");
            const imgB = gameBoxes[b].querySelector("img");
            const imgC = gameBoxes[c].querySelector("img");

            if (
                imgA && imgA.src === symbolSrc &&
                imgB && imgB.src === symbolSrc &&
                imgC && imgC.src === symbolSrc
            ) {
                return true;
            }
        }
        return false;
    }

    function isBoardFull() {
        const gameBoxes = document.getElementsByClassName("sign-container");
        for (let i = 0; i < gameBoxes.length; i++) {
            if (gameBoxes[i].innerHTML === "") {
                return false; // There's an empty box
            }
        }
        return true; // No empty boxes
    }

    function runGame() {
        const crossBtn = document.createElement("button");
        crossBtn.classList.add("symbolbtns");
        crossBtn.id = "crossBtn";
        crossBtn.textContent = "Cross";

        const circleBtn = document.createElement("button");
        circleBtn.classList.add("symbolbtns");
        circleBtn.id = "circleBtn";
        circleBtn.textContent = "Circle";

        const symbolHolderBtn = document.createElement("div");
        symbolHolderBtn.classList.add("symbol-Container");
        symbolHolderBtn.appendChild(crossBtn);
        symbolHolderBtn.appendChild(circleBtn);

        const startBtn = document.getElementById("start-game");
        startBtn.addEventListener("click", () => {
            document.body.appendChild(symbolHolderBtn);
            selectSymbol();
            appendSymbolOnClickedDiv(); // Move this here after symbol is selected
        });
    }

    runGame();
});
