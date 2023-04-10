function Gameboard() {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }

  const getBoard = () => [...board];

  const addSymbol = (cell, player) => {
    board[cell].addMark(player);
  };

  const isCellFree = (cell) => board[cell].getValue() === "";

  const isEmptyCells = () => board.some((cell) => cell.getValue() === "");

  const resetBoard = () => {
    board = [];
    for (let i = 0; i < 9; i++) {
      board.push(Cell());
    }
  };

  return {
    getBoard,
    addSymbol,
    isCellFree,
    resetBoard,
    isEmptyCells,
  };
}

function Cell() {
  let value = "";

  const addMark = (playerMark) => {
    value = playerMark;
  };
  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
}

function GameController(playerOneName, playerTwoName) {
  const board = Gameboard();
  const players = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const cellValue = (cell) => {
    if (board.getBoard()[cell] !== "") {
      return board.getBoard()[cell].getValue();
    }
  };

  const isWin = (cell1, cell2, cell3) => {
    const newMark = activePlayer.mark;
    return (
      cellValue(cell1) === newMark &&
      cellValue(cell2) === newMark &&
      cellValue(cell3) === newMark
    );
  };

  const getWinner = () => {
    if (
      isWin(0, 4, 8) ||
      isWin(0, 1, 2) ||
      isWin(0, 3, 6) ||
      isWin(1, 4, 7) ||
      isWin(2, 4, 6) ||
      isWin(2, 5, 8) ||
      isWin(3, 4, 5) ||
      isWin(6, 7, 8)
    ) {
      return activePlayer;
    }
  };

  const playRound = (cell) => {
    if (board.isCellFree(cell)) {
      board.addSymbol(cell, getActivePlayer().mark);
      const winner = getWinner();
      if (!board.isEmptyCells() && !winner) {
        document.querySelector(".game-over").classList.add("game-over-visible");
        document.querySelector(".game").classList.add("game-inactive");
        document.querySelector(".winner-info").textContent = "It's a tie!";
      }
      if (winner) {
        document.querySelector(".game").classList.add("game-inactive");
        document.querySelector(".game-over").classList.add("game-over-visible");
        document.querySelector(
          ".winner-info"
        ).textContent = `${winner.name} is the winner!`;
      }
      switchPlayerTurn();
    }
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    resetBoard: board.resetBoard,
    switchPlayerTurn,
  };
}

(function ScreenController() {
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const form = document.querySelector(".names-form");
  const newGameButton = document.querySelector(".new-game-button");
  let playerOneName, playerTwoName, game;

  newGameButton.addEventListener("click", () => {
    if (game != null) {
      game.resetBoard();
    }
    document.querySelector(".game").classList.remove("game-inactive");
    game.switchPlayerTurn();
    document.querySelector(".game-over").classList.remove("game-over-visible");
    updateScreen();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    playerOneName = document.querySelector("#player1").value;
    playerTwoName = document.querySelector("#player2").value;
    game = GameController(playerOneName, playerTwoName);
    updateScreen();
    document
      .querySelector(".form-section")
      .classList.add("form-section-invisible");
  });

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((cell, index) => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.cell = index;
      cellButton.textContent = cell.getValue();
      cellButton.addEventListener("click", handleCellClick);
      boardDiv.appendChild(cellButton);
    });
  };

  function handleCellClick(e) {
    const selectedCell = e.target.dataset.cell;
    game.playRound(selectedCell);
    updateScreen();
  }
})();
