import './home.css';

export default function Home ({darkMode}) {

    const onPlayButtonClick = () => {
      window.location.href="/game"
    }

    return (
      <div className="home">
        <h1>Welcome</h1>
        <button className={`play-button ${darkMode ? "dark-background" : "light-background"}`} onClick={onPlayButtonClick}>Play a game</button>
      </div>
    )

}
