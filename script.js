let Gameboard = (function createGame() {
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
        players[playerIndex] = {name, marker}
    }

    function playRound(row, col) {
        if (gameboard[row][col] === null) {
            gameboard[row][col] = players[game.currentPlayerIndex].marker;
            //check if current player wins, otherwise switch to other player
            game.currentPlayerIndex = game.currentPlayerIndex === 0 ? 1 : 0;
            console.log(gameboard);
            console.log(`It's ${players[game.currentPlayerIndex].name}'s turn now!`)
        } else {
            console.error(`Selected field (${row + 1}, ${col + 1}) is already taken. Invalid move!`);
        }
    }

    return { playRound, setPlayer }
})()