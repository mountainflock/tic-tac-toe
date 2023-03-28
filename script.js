function Gameboard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }

  const getBoard = () => [...board];

  const addSymbol = (cell, player) => {
    board[cell].addMark(player);
  };

  const isFree = (cell) => board[cell].getValue() === "";

  return { getBoard, addSymbol, isFree };
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

  // const form = document.querySelector("form");

  // form.addEventListener("submit", function (event) {
  //   const playerOneName = document.querySelector("#player1").value;
  //   const playerTwoName = document.querySelector("#player2").value;
  //   event.preventDefault();
  // });

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
    if (board.isFree(cell)) {
      board.addSymbol(cell, getActivePlayer().mark);
      switchPlayerTurn();
    }
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
    const selectedCell = e.target.dataset.cell;
    if (!selectedCell) return;
    game.playRound(selectedCell);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();
