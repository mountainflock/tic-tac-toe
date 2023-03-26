function Gameboard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < board.length; i++) {
    board[i] = Cell();
  }

  const getBoard = () => board;

  const addSymbol = (cell, player) => {
    board[cell].addMark(player);
  };

  return { getBoard, addSymbol };
}

function Cell() {
  let value = "";

  const addMark = (player) => {
    value = player;
  };
  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
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

  const playRound = (cell) => {
    board.addSymbol(cell, getActivePlayer().mark);

    /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
    switchPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

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
      boardDiv.appendChild(cellButton);
    });
  };

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.cell;
    if (!selectedColumn) return;
    game.playRound(selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();
