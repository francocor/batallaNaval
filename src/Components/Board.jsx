import Cell from "./Cell"

const Board = ({board, onCellClick}) => {
  return (
    <div className="board">
        {board.map((row, i) => (
            <div key = {i} className="row">
                {row.map((cel, j)=>(
                    <Cell key={j} status={cell} onClick={()=> onCellClick (i,j)} />
                ))}
            </div>
        ))}
    </div>
  )
}

export default Board