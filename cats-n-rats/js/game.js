const boardDimensions = 5;
const maxCats = 1;
const maxRats = 1;

let board = [];
let boardElm = [];

let cats = 0;
let rats = 0;

generateBoard();

function generateBoard() {
    board = new Array(boardDimensions);
    boardElm = new Array(boardDimensions);

    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(boardDimensions);
        boardElm[i] = new Array(boardDimensions);
    }

    for (let i = 0; i < board.length; i++) {
        const lineElm = document.createElement('div');
        lineElm.classList.add('line');

        document.querySelector('#board').appendChild(lineElm);

        for (let j = 0; j < board[i].length; j++) {
            const cellElm = document.createElement('div');
            cellElm.classList.add('cell');

            lineElm.appendChild(cellElm);

            boardElm[i][j] = {
                x: i,
                y: j,
                elm: cellElm,
            };
            addCellsListeners(boardElm[i][j]);
        }
    }
}

function addCellsListeners(cell) {
    cell.elm.addEventListener('click', () => {
        setCell([cell.x, cell.y]);
        checkBoard();
    });
}

function setCell(choords) {
    let value = null;

    let valueToSet = null;
    if (document.querySelector('#set-value input:checked')) {
        valueToSet = document.querySelector('#set-value input:checked').value;
    }


    if (board[choords[0]][choords[1]] === valueToSet) {
        value = null;
    } else if ((valueToSet === 'C' && cats < maxCats) || (valueToSet === 'R' && rats < maxRats)) {
        value = valueToSet;
    }

    if (!value || board[choords[0]][choords[1]] === value) {
        boardElm[choords[0]][choords[1]].elm.innerHTML = '';
        board[choords[0]][choords[1]] = null;

        return;
    }

    if (value === 'C') {
        boardElm[choords[0]][choords[1]].elm.innerHTML = '<img src="https://www.pngkey.com/png/full/32-326087_black-cat-images-black-cat-icon.png" />';
    } else {
        boardElm[choords[0]][choords[1]].elm.innerHTML = '<img src="https://www.pikpng.com/pngl/b/572-5722319_partnering-with-rats-to-save-human-lives-rat.png" />';
    }

    board[choords[0]][choords[1]] = value;
}

function checkBoard() {
    const invalidLines = getInvalidLines();
    const invalidColumns = getInvalidColumns();
    const invalidDiagonals = getInvalidDiagonals();

    let catsCount = 0;
    let ratsCount = 0;

    for (let i = 0; i < boardDimensions; i++) {
        for (let j = 0; j < boardDimensions; j++) {
            const cell = boardElm[i][j].elm;
            cell.classList.remove('invalid');

            if (board[i][j] === 'C') {
                catsCount++;
            } else if (board[i][j] === 'R') {
                ratsCount++;
            }

            if (invalidLines.indexOf(i) !== -1 || invalidColumns.indexOf(j) !== -1) {
                cell.classList.add('invalid');
            }
        }
    }

    for (let i = 0; i < invalidDiagonals.length; i++) {
        const cell = boardElm[invalidDiagonals[i].x][invalidDiagonals[i].y].elm;
        cell.classList.add('invalid');
    }


    rats = ratsCount;
    cats = catsCount;

    if (invalidDiagonals.length === 0 &&
        invalidColumns.length === 0 &&
        invalidLines.length === 0 &&
        rats === maxRats &&
        cats === maxCats) {
        setTimeout(function() {
            alert('PARABÉEEENS, você ganhou!!!');
        }, 300);
    }
}

function getInvalidDiagonals() {
    const diagonals = getDiagonals();
    const invalid = [];

    for (let i = 0; i < diagonals.length; i++) {
        let hasCat = false;
        let hasRat = false;

        for (let j = 0; j < diagonals[i].length; j++) {
            const choords = diagonals[i][j];
            if (hasCat && hasRat) {
                invalid.push(...diagonals[i]);
            } else if (board[choords.x][choords.y] === 'C') {
                hasCat = true;
            } else if (board[choords.x][choords.y] === 'R') {
                hasRat = true;
            }

            if (hasCat && hasRat) {
                invalid.push(...diagonals[i]);
            }
        }
    }

    return invalid;
}

function getDiagonals() {
    let diagonals = [];

    for (let k = 0; k < boardDimensions*2; k++) {
        let x = boardDimensions - 1 - k;
        let y = 0;

        let diagonal = [];

        do {
            if (x >= 0 && y >= 0 && x < boardDimensions && y < boardDimensions) {
                diagonal.push({ x, y });
            }

            x++;
            y++;
        } while (x < boardDimensions);

        if (diagonal.length > 1) {
            diagonals.push(diagonal);
        }
    }


    for (let k = 0; k <= boardDimensions*2; k++) {
        let x = boardDimensions - k;
        let y = boardDimensions;

        let diagonal = [];

        do {
            if (x >= 0 && y >= 0 && x < boardDimensions && y < boardDimensions) {
                diagonal.push({ x, y });
            }

            x++;
            y--;
        } while (x < boardDimensions);

        if (diagonal.length > 1) {
            diagonals.push(diagonal);
        }
    }

    return diagonals;
};


function getInvalidLines() {
    let invalid = [];

    for (let i = 0; i < boardDimensions; i++) {
        let hasCat = false;
        let hasRat = false;

        for (let j = 0; j < boardDimensions; j++) {
            if (hasCat && hasRat && invalid.indexOf(i) === -1) {
                invalid.push(i);
            } else if (board[i][j] === 'C') {
                hasCat = true;
            } else if (board[i][j] === 'R') {
                hasRat = true;
            }

            if (hasCat && hasRat && invalid.indexOf(i) === -1) {
                invalid.push(i);
            }
        }
    }

    return invalid;
}

function getInvalidColumns() {
    let invalid = [];

    for (let i = 0; i < boardDimensions; i++) {
        let hasCat = false;
        let hasRat = false;

        for (let j = 0; j < boardDimensions; j++) {
            if (hasCat && hasRat && invalid.indexOf(i) === -1) {
                invalid.push(i);
            } else if (board[j][i] === 'C') {
                hasCat = true;
            } else if (board[j][i] === 'R') {
                hasRat = true;
            }

            if (hasCat && hasRat && invalid.indexOf(i) === -1) {
                invalid.push(i);
            }
        }
    }

    return invalid;
}
