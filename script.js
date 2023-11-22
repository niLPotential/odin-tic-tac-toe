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
    if (board[row][column] === 0) {
      board[row][column] = player;
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

  function playRound(row, column) {
    console.log(
      `Adding ${
        getActivePlayer().name
      }'s token into row ${row} and column ${column}`
    );
    board.addToken(row, column, getActivePlayer().token);
  }

  // win logic

  switchPlayerTurn();
  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
