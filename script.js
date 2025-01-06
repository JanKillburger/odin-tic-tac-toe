function Gameboard(size = 3) {

    const gameBoardSize = size;

    let gameboard = [];

    for (let rowIndex = 0; rowIndex < gameBoardSize; rowIndex++) {
        gameboard[rowIndex] = [];
        for (let colIndex = 0; colIndex < gameBoardSize; colIndex++) {
            gameboard[rowIndex].push(null);
        }
    }

    function getGameboard() {
        return gameboard;
    }

    function printGameboard() {
        gameboard.forEach(console.log);
    }

    function markCell(row, col, marker) {
        if (isIndexInvalid(row) || isIndexInvalid(col)) {
            console.error(`Invalid indices (${row}, ${col}). Indices must be >= 0 and < ${gameBoardSize}.`);
        } else if (gameboard[row][col] !== null) {
            console.error(`Selected field (${row}, ${col}) is already taken. Invalid move!`);
        } else {
            gameboard[row][col] = marker;
        }
    }

    function isIndexInvalid(index) {
        return index < 0 || gameBoardSize <= index;
    }

    function isTie(marker1, marker2) {
        const hasTieRows = gameboard.every(row => row.includes(marker1) && row.includes(marker2));

        const hasTieCols = getGameboardByColumns().every(col => col.includes(marker1) && col.includes(marker2));

        const hasTieDiagonals = getGameboardDiagonals().every(diagonal => diagonal.includes(marker1) && diagonal.includes(marker2));

        return hasTieRows && hasTieCols && hasTieDiagonals;
    }

    function hasWinningCondition(marker) {
        const hasWinningRow = gameboard.some(row => row.every(cell => cell === marker));

        const hasWinningCol = getGameboardByColumns().some(col => col.every(cell => cell === marker));

        const hasWinningDiagonal = getGameboardDiagonals().some(diagonal => diagonal.every(cell => cell === marker));

        return hasWinningRow || hasWinningCol || hasWinningDiagonal;
    }

    function getGameboardByColumns() {
        let gameboardByColumns = [];
        for (let colIndex = 0; colIndex < gameBoardSize; colIndex++) {
            gameboardByColumns[colIndex] = [];
            for (let rowIndex = 0; rowIndex < gameBoardSize; rowIndex++) {
                gameboardByColumns[colIndex].push(gameboard[rowIndex][colIndex]);
            }
        }

        return gameboardByColumns;
    }

    function getGameboardDiagonals() {
        let diagonal1 = [];
        for (let rowColIndex = 0; rowColIndex < gameBoardSize; rowColIndex++) {
            diagonal1.push(gameboard[rowColIndex][rowColIndex]);
        }
        let diagonal2 = [];
        for (let rowIndex = 0; rowIndex < gameBoardSize; rowIndex++) {
            let colIndex = gameBoardSize - 1 - rowIndex;
            diagonal2.push(gameboard[rowIndex][colIndex]);
        }

        return [diagonal1, diagonal2];
    }

    return { markCell, hasWinningCondition, isTie, getGameboard, printGameboard }
}

function Player(id, name, marker) {
    function setPlayer(newName, newMarker) {
        name = newName;
        marker = newMarker;
    }

    return { id, name, marker, setPlayer }
}

function GameController(playerOneName = "Player1", playerTwoName = "Player2") {
    let board = Gameboard();

    let players = [];

    players.push(Player(1, playerOneName, "X"));
    players.push(Player(2, playerTwoName, "O"));

    let activePlayer = players[0];

    function getActivePlayer() {
        return activePlayer;
    }

    function switchActivePlayer() {
        activePlayer = getActivePlayer().id === 1 ? players[1] : players[0];
    }

    function playRound(row, col) {
        board.markCell(row, col, getActivePlayer().marker);
        if (board.hasWinningCondition(getActivePlayer().marker)) {
            console.log(`${getActivePlayer().name} wins the game! Congratulations!`)
        } else if (board.isTie(players[0].marker, players[1].marker)) {
            board.printGameboard();
            console.log("Game ends with a tie. Good play!");
        } else {
            board.printGameboard();
            switchActivePlayer();
            console.log(`It's ${getActivePlayer().name}'s turn now!`);
        }
    }

    return { playRound }
}

let game = GameController();