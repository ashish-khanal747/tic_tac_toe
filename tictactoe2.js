var count = 0;
let board = Array(9).fill(null); // Track moves in an array

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function forcross(idname) {
    let container = document.getElementById(idname);
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    let line1 = document.createElement("div");
    line1.classList.add("cross1");

    let line2 = document.createElement("div");
    line2.classList.add("cross2");

    container.appendChild(line1);
    container.appendChild(line2);
}

function forcircle(idname) {
    let container = document.getElementById(idname);
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    let circle = document.createElement("div");
    circle.classList.add("circlejs");

    container.appendChild(circle);
}

function timer(idname) {
    let index = parseInt(idname.replace("c", "")) - 1; // Get index from ID (c1 -> 0, c2 -> 1, etc.)

    if (board[index] !== null) return; // Ignore clicks on occupied cells

    count++;
    let player = count % 2 === 0 ? "cross" : "circle";
    board[index] = player;

    if (player === "circle") {
        forcircle(idname);
    } else {
        forcross(idname);
    }

    if (iswin(player)) {
        setTimeout(() => alert(`${player} wins!`), 100);
        resetBoard();
    } else if (count === 9) {
        setTimeout(() => alert("It's a draw!"), 100);
        resetBoard();
    }
}

function iswin(player) {
    return winningPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function resetBoard() {
    board.fill(null);
    count = 0;
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`c${i}`).innerHTML = ""; // Clear all cells
    }
}
