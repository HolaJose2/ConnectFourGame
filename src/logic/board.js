export const checkWinner = (newBoard) => {
  //Check columns
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6 - 3; j++) {
      if (
        newBoard[i][j] != null &&
        newBoard[i][j] == newBoard[i][j + 1] &&
        newBoard[i][j + 1] == newBoard[i][j + 2] &&
        newBoard[i][j + 2] == newBoard[i][j + 3]
      ) {
        return newBoard[i][j];
      }
    }
  }

  //Check rows
  for (let i = 0; i < 7 - 3; i++) {
    for (let j = 0; j < 6; j++) {
      if (
        newBoard[i][j] != null &&
        newBoard[i][j] == newBoard[i + 1][j] &&
        newBoard[i + 1][j] == newBoard[i + 2][j] &&
        newBoard[i + 2][j] == newBoard[i + 3][j]
      ) {
        return newBoard[i][j];
      }
    }
  }

  //Check diagonal from left to right
  for (let i = 0; i < 7 - 3; i++) {
    for (let j = 0; j < 6 - 3; j++) {
      if (
        newBoard[i][j] != null &&
        newBoard[i][j] == newBoard[i + 1][j + 1] &&
        newBoard[i][j] == newBoard[i + 2][j + 2] &&
        newBoard[i][j] == newBoard[i + 3][j + 3]
      ) {
        return newBoard[i][j];
      }
    }
  }

  //Check diagonal from right to left
  for (let i = 3; i < 7; i++) {
    for (let j = 0; j < 6 - 3; j++) {
      if (
        newBoard[i][j] != null &&
        newBoard[i][j] == newBoard[i - 1][j + 1] &&
        newBoard[i][j] == newBoard[i - 2][j + 2] &&
        newBoard[i][j] == newBoard[i - 3][j + 3]
      ) {
        return newBoard[i][j];
      }
    }
  }
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((column) => column.every((cell) => cell !== null));
};
