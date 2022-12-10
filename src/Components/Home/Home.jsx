import './home.css';

export default function Home ({darkMode}) {

    const onPlayButtonClick = () => {
      window.location.href="/game"
    }

    return (
      <div className="home">
        <h2>Welcome</h2>
        <button className={`play-button ${darkMode ? "dark-background" : "light-background"}`} onClick={onPlayButtonClick}>Play a game</button>
        <h2>Rules</h2>
        <ul className="rules-list">
            <li>Game is played by three players</li>
            <li>In first phase players take turns and place pieces on empty fields on the board</li>
            <li>In second phase players take turns, roll a number (1-6) and move one of their pieces in any direction for exactly that number of fields</li>
            <li>Piece cannot be moved in a direction that is blocked by another piece</li>
            <li>If players cannot make a valid move they skip their turn</li>
            <li>First player to connect his pieces in a horizontal, vertical or diagonal line is the winner</li>
        </ul>
      </div>
    )

}
