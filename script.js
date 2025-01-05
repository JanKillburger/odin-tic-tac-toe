let Gameboard = (function createGame() {
    const gameBoardSize = 3;

    let gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    let players = [
        {
            name: "Player1",
            marker: "X"
        },
        {
            name: "Player2",
            marker: "O"
        }
    ];

    let game = {
        gameStatus: "active", //set to "finished" when done
        currentPlayerIndex: 0,
        winner: "" //set to winning player's name
    }

    function setPlayer(playerIndex, name, marker) {
        players[playerIndex] = { name, marker }
    }

    function playRound(row, col) {
        if (gameboard[row][col] === null) {
            gameboard[row][col] = players[game.currentPlayerIndex].marker;
            //check if current player wins, otherwise switch to other player
            if (isPlayerWinning(players[game.currentPlayerIndex].marker)) {
                console.log(`${players[game.currentPlayerIndex].name} wins the game! Congratulations!`)
            } else {
                game.currentPlayerIndex = game.currentPlayerIndex === 0 ? 1 : 0;
                console.log(gameboard);
                console.log(`It's ${players[game.currentPlayerIndex].name}'s turn now!`);
            }

        } else {
            console.error(`Selected field (${row + 1}, ${col + 1}) is already taken. Invalid move!`);
        }
    }

    function isPlayerWinning(marker) {
        //check rows
        const hasWinningRow = gameboard.some(row => row.every(cell => cell === marker));
        //check columns
        let hasWinningCol = false;
        for (let colIndex = 0; colIndex < gameBoardSize; colIndex++) {
            let currentCol = [];
            for (let rowIndex = 0; rowIndex < gameBoardSize; rowIndex++) {
                currentCol.push(gameboard[rowIndex][colIndex]);
            }
            hasWinningCol = currentCol.every(cell => cell === marker);
            if (hasWinningCol) break;
        }
        //check diagonals
        let diagonal1 = [];
        for (let rowColIndex = 0; rowColIndex < gameBoardSize; rowColIndex++) {
            diagonal1.push(gameboard[rowColIndex][rowColIndex]);
        }
        let diagonal2 = [];
        for (let rowIndex = 0; rowIndex < gameBoardSize; rowIndex++) {
            let colIndex = gameBoardSize - 1 - rowIndex;
            diagonal2.push(gameboard[rowIndex][colIndex]);
        }
        const hasWinningDiagonal = [diagonal1, diagonal2].some(diagonal => diagonal.every(cell => cell === marker));

        return hasWinningRow || hasWinningCol || hasWinningDiagonal;
    }

    return { playRound, setPlayer }
})()