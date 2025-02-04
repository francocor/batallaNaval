export const aiAttack = (board, difficulty) => {
    if(difficulty === "easy"){
        return randomAttack(board);
    } else if(difficulty === "medium"){
        return mediumAttack(board)
    }else {
        return hardAttack(board)
    }
}

const randomAttack =(board) =>{
    let row, col;
    do {
        row = Math.floor(Math.random()*10)
        col = Math.floor(Math.random()*10)
    } while (board[row][col] !== null)
        return [row, col]
}

const mediumAttack = (board)=>{
    const previousHits = []
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            if(board[i][j]=== "hit"){
                previousHits.push([i,j])
            }
        }
    }
    if (previousHits.length > 0){
        const [lastHitRow, lastHitCol] = previousHits[previousHits.length - 1];
        const directions = [
            [lastHitRow - 1, lastHitCol],
            [lastHitRow + 1, lastHitCol],
            [lastHitRow, lastHitCol - 1],
            [lastHitRow, lastHitCol + 1],
        ]

        for(const [r, c] of directions ){
            if (r >= 0 && r < 10 && c >= 0 && c < 10 && board [r][c] == null){
                return[r, c]
            }
        }
    }
    return randomAttack(board)
}


const hardAttack = (board) => {

    const previousHits = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === "hit") {
          previousHits.push([i, j]);
        }
      }
    }
  
    if (previousHits.length > 0) {
      for (const [row, col] of previousHits) {
        const directions = [
          [row - 1, col], 
          [row + 1, col], 
          [row, col - 1], 
          [row, col + 1], 
        ];
  
        for (const [r, c] of directions) {
          if (r >= 0 && r < 10 && c >= 0 && c < 10 && board[r][c] === null) {
            return [r, c];
          }
        }
      }
  
      for (const [row, col] of previousHits) {
        // Buscar en la misma fila
        for (let i = col - 1; i >= 0; i--) {
          if (board[row][i] === null) return [row, i];
          if (board[row][i] !== "hit") break;
        }
        for (let i = col + 1; i < 10; i++) {
          if (board[row][i] === null) return [row, i];
          if (board[row][i] !== "hit") break;
        }
  
        
        for (let i = row - 1; i >= 0; i--) {
          if (board[i][col] === null) return [i, col];
          if (board[i][col] !== "hit") break;
        }
        for (let i = row + 1; i < 10; i++) {
          if (board[i][col] === null) return [i, col];
          if (board[i][col] !== "hit") break;
        }
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if ((i + j) % 2 === 0 && board[i][j] === null) {
          return [i, j];
        }
      }
    }
    return randomAttack(board);
  };