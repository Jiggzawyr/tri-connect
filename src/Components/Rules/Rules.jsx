import './rules.css';

export default function Rules () {

    return (
      <div className="rules">
        <h1>Rules</h1>
        <ul className="rules-list">
            <li>Game is played by three player</li>
            <li>In first phase players take turns and place pieces on empty fields on the board</li>
            <li>In second phase players take turns, roll a number (1-6) and move one of their pieces in any direction for exactly that number of fields</li>
            <li>Piece cannot be moved in a direction that is blocked by another piece</li>
            <li>If players cannot make a valid move they skip their turn</li>
            <li>First player to connect his pieces in a horizontal, vertical or diagonal line is the winner</li>
        </ul>
      </div>
    )

}