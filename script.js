function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  function getBoard() {
    return board;
  }

  function addToken(row, column, player) {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(player);
    }
  }

  function printBoard() {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  }

  return {
    getBoard,
    addToken,
    printBoard,
  };
}

function Cell() {
  let value = 0;

  function addToken(player) {
    value = player;
  }

  function getValue() {
    return value;
  }

  return {
    addToken,
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
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function printNewRound() {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  }

  function endGame(player) {
    if (player === 0) {
      console.log("Tie");
    } else {
      console.log(`${player} won`);
    }
  }

  function playRound(row, column) {
    console.log(
      `Adding ${
        getActivePlayer().name
      }'s token into row ${row} and column ${column}`
    );
    board.addToken(row, column, getActivePlayer().token);

    // win logic
    if (
      board
        .getBoard()
        [row].every((cell) => cell.getValue() === getActivePlayer().token)
    ) {
      console.log(`row ${row} is filled`);
      endGame(getActivePlayer().token);
    }

    if (
      board
        .getBoard()
        .every(
          (rowArr) => rowArr[column].getValue() === getActivePlayer().token
        )
    ) {
      console.log(`column ${column} is filled`);
      endGame(getActivePlayer().token);
    }

    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();

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

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if (!selectedRow || !selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.onclick = clickHandlerBoard;

  updateScreen();
}

ScreenController();
