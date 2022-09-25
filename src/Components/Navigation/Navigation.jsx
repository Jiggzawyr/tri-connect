import './navigation.css';

export default function Navigation({darkModeChange, darkMode}) {

    const onMenuClick = () => {
        var x = document.getElementById("links");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    return (
        <div>
            <div className="navigation-header">
                <div className="navigation-header-left">
                    <div className="icon" onClick={onMenuClick}>
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
                <div className="navigation-header-center">
                    <h1>Tri-Connect</h1>
                </div>
                <div className="navigation-header-right">
                    <div className="icon" onClick={darkModeChange}>
                        <i className="fa fa-moon-o" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <nav className={`links ${darkMode ? "dark-background" : "light-background"}`} id="links">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/game">Game</a>
                    </li>
                    <li>
                        <a href="/rules">Rules</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </nav>
        </div>
    )

}
