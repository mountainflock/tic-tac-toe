const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  const addMark = (mark) => {};
  const win = () => {};

  return { getName, getMark, addMark, win };
};

const gameboard = ["X", "X", "O", "O", "X", "X", "O", "O", "X"];

(function GameController() {
  const isGameOver = () => {};
  const switchPlayerTurn = () => {};

  return { isGameOver, switchPlayerTurn };
})();

const ScreenController = (() => {
  const div = document.querySelectorAll(".div");
  const displayField = (gameboard) => {
    for (let i = 0; i < gameboard.length; i++) {
      {
        div[i].textContent = gameboard[i];
      }
    }
  };
  const isValidCell = () => {};
  const updateScreen = () => {};
  const displayGameInfo = () => {};

  return { displayField, isValidCell, updateScreen, displayGameInfo };
})();

ScreenController.displayField(gameboard);
