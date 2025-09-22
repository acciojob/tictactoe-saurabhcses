//your JS code here. If required.
  const submitBtn = document.getElementById("submit");
    const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const gameDiv = document.getElementById("game");
    const messageDiv = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    const winningCombos = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diagonals
    ];

    submitBtn.addEventListener("click", () => {
      player1 = player1Input.value || "Player 1";
      player2 = player2Input.value || "Player 2";
      currentPlayer = player1;
      currentSymbol = "X";
      document.getElementById("player-form").classList.add("hidden");
      gameDiv.classList.remove("hidden");
      messageDiv.textContent = `${currentPlayer}, you're up`;
    });

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameOver || board[index] !== "") return;

        board[index] = currentSymbol;
        cell.textContent = currentSymbol;
        cell.classList.add("taken");

        if (checkWin()) {
          messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
          gameOver = true;
          return;
        }

        if (board.every(cell => cell !== "")) {
          messageDiv.textContent = "It's a draw!";
          gameOver = true;
          return;
        }

       
        if (currentPlayer === player1) {
          currentPlayer = player2;
          currentSymbol = "O";
        } else {
          currentPlayer = player1;
          currentSymbol = "X";
        }
        messageDiv.textContent = `${currentPlayer}, you're up`;
      });
    });

    function checkWin() {
      return winningCombos.some(combo => {
        const [a,b,c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }