import React from "react";
import { useState, useMemo, useCallback } from 'react';
import './game.css';
import rollSound from '../../assets/sounds/roll.wav'
import stompSound from '../../assets/sounds/stomp.wav'

export default function Game({darkMode}) {

    const piecesImg = useMemo(() => {
      return ["circle.svg","square.svg",'triangle.svg'];
    }, []);;

    const players = useMemo(() => {
      return ["blue", "green", "red"];
    }, []);

    const colors = useMemo(() => {
      return ["#7FDBFF", "#2ECC40", "#FF4136"];
    }, []);

    const [board, setBoard] = useState(Array.from({length: 10},()=> Array.from({length: 10}, () => 0)));

    const [gamePhase, setGamePhase] = useState(1);

    const [rolledNumber, setRolledNumber] = useState(0);

    const [pieceSelected, setPieceSelected] = useState([]);

    const [validMoves, setValidMoves] = useState(true);

    const [cnt, setCnt] = useState(0);

    const [log, setLog] = useState("");

    React.useEffect( () => {
      piecesImg.forEach((image) => {
        const newImage = new Image();
        newImage.src = "../images/" + image;
        window[image] = newImage;
      });
    }, [piecesImg])

    const deselectPiece = useCallback((board) => {
      for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(board[i][j] === 10) board[i][j] = 0;
        }
      }
      return board;
    }, []);

    const checkForValidMoves = useCallback((player,rolledNumber, board) => {

      let res = false;

      for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){

          if(board[i][j] !== player) continue;
          let row = i;
          let col = j;

          //check all 8 directions
          for(let k = 0; k < 8; k++){
            let cnt = rolledNumber;
            let r = row;
            let c = col;
            switch(k){
              case 0: c++; break;
              case 1: c++; r++; break;
              case 2: r++; break;
              case 3: r++; c--; break;
              case 4: c--; break;
              case 5: c--; r--; break;
              case 6: r--; break;
              case 7: r--; c++; break;
              default: new Error("Error in: checkForValidMoves - switch case"); break;
            }
            let valid = true;
            while(cnt > 0){
              if(r < 0 || r >= 10 || c < 0 || c >= 10){
                valid = false;
                break;
              }
              if(board[r][c] !== 0){
                valid = false;
                break;
              }
              if(cnt > 1) {
                switch(k){
                  case 0: c++; break;
                  case 1: c++; r++; break;
                  case 2: r++; break;
                  case 3: r++; c--; break;
                  case 4: c--; break;
                  case 5: c--; r--; break;
                  case 6: r--; break;
                  case 7: r--; c++; break;
                  default: new Error("Error in: checkForValidMoves - switch case"); break;
                }
              }
              cnt--;
            }
            if(valid){
              res = true;
            }
          }
        }
      }
      return res;
    }, []);

    const showValidMoves = useCallback((pieceSelected, rolledNumber, board) => {

      let row = pieceSelected[0];
      let col = pieceSelected[1];
  
      let res = false;
  
      //check all 8 directions
      for(let i = 0; i < 8; i++){
        let cnt = rolledNumber;
        let r = row;
        let c = col;
        switch(i){
            case 0: c++; break;
            case 1: c++; r++; break;
            case 2: r++; break;
            case 3: r++; c--; break;
            case 4: c--; break;
            case 5: c--; r--; break;
            case 6: r--; break;
            case 7: r--; c++; break;
            default: new Error("Error in: showValidMoves - switch case"); break;
        }
        let valid = true;
        while(cnt > 0){
          if(r < 0 || r >= 10 || c < 0 || c >= 10){
            valid = false;
            break;
          }
          if(board[r][c] !== 0 && board[r][c] !== 10){
            valid = false;
            break;
          }
          if(cnt > 1) {
            switch(i){
              case 0: c++; break;
              case 1: c++; r++; break;
              case 2: r++; break;
              case 3: r++; c--; break;
              case 4: c--; break;
              case 5: c--; r--; break;
              case 6: r--; break;
              case 7: r--; c++; break;
              default: new Error("Error in: showValidMoves - switch case"); break;
            }
          }
          cnt--;
        }
        if(valid){
          setBoard( (prevBoard) => {
            let newBoard = [...prevBoard];
            newBoard[r][c] = 10;
            return newBoard
          })
          res = true;
        }
      }

      return res;

    }, []);

    const checkForWinner = useCallback((board) => {  

      for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
          if(board[i][j]===0) continue;
          let piece = board[i][j];
            //check all 8 directions
            for(let k = 0; k < 8; k++){
              let counter = 4;
              let r = i;
              let c = j;
              switch(k){
                  case 0: c++; break;
                  case 1: c++; r++; break;
                  case 2: r++; break;
                  case 3: r++; c--; break;
                  case 4: c--; break;
                  case 5: c--; r--; break;
                  case 6: r--; break;
                  case 7: r--; c++; break;
                  default: new Error("Error in: checkForWinner - switch case"); break;
              }
              let valid = true;
              while(counter > 0){
                if(r < 0 || r >= 10 || c < 0 || c >= 10){
                    valid = false;
                    break;
                }
                if(board[r][c]!==piece){
                    valid = false;
                    break;
                }
                if(counter > 1) {
                  switch(k){
                    case 0: c++; break;
                    case 1: c++; r++; break;
                    case 2: r++; break;
                    case 3: r++; c--; break;
                    case 4: c--; break;
                    case 5: c--; r--; break;
                    case 6: r--; break;
                    case 7: r--; c++; break;
                    default: new Error("Error in: checkForWinner - switch case"); break;
                  }
                }
                counter--;
              }
    
              if(valid){
                setGamePhase(3);
                return true;

              }
            }
        }
      }
      return false;
    }, [])

    React.useEffect( () => {

      if(cnt===15) { 
        setGamePhase(2);
      }

      checkForWinner(board);

    }, [cnt, players, gamePhase, board, checkForWinner])

    const handleCellOnCLick = (e) => {

      let td = e.target.closest('td');
      let row   = td.id.split("-")[1]
      let col   = td.id.split("-")[2]

      if(gamePhase===1){
        if(board[row][col]!==0) return;
        let remainder = cnt % 3;

        setBoard( (prevBoard) => {
          let newBoard = [...prevBoard];
          newBoard[row][col] = remainder + 1;
          return newBoard;
        })
 
        let audio = document.getElementById("stomp-sound");
        audio.volume = 0.2;
        if (audio.paused) {
            audio.play();
        }else{
            audio.currentTime = 0
        }

        setCnt((prevCnt) => (prevCnt + 1))
        
      }

      if(gamePhase===2){

        if(rolledNumber===0) { // roll number first
          setLog("ROLL NUMBER FIRST");
          return;
        }

        if(pieceSelected.length === 0) { //select piece

          if(board[row][col] === 0) {
            setLog("SELECT YOUR PIECE");
            return;
          }
          let remainder = cnt % 3;
          if(board[row][col] !== remainder+1) {
            setLog("SELECT YOUR PIECE");
            return;
          }
          let piece = [row,col]
          let valid = showValidMoves(piece, rolledNumber, board);
          if(valid) {
            setPieceSelected(piece);
            setLog("");
          }
          else setLog("PIECE NOT MOVEABLE"); 

        } else {
          if(pieceSelected[0] === row && pieceSelected[1] === col){ //deselect piece
            setBoard(deselectPiece(board));
            setPieceSelected([]);
            setLog(""); 
            return;
          }
          if(board[row][col] !== 10){
            setLog("FIELD NOT VALID");
            return;
          }
          // move piece to new field
          let r = pieceSelected[0];
          let c = pieceSelected[1];
          let remainder = cnt % 3;
          setBoard( (prevBoard) => {
            let newBoard = deselectPiece([...prevBoard]); 
            newBoard[r][c] = 0;
            newBoard[row][col] = remainder + 1;
            return newBoard;
          })

          let audio = document.getElementById("stomp-sound");
          audio.volume = 0.2;
          if (audio.paused) {
              audio.play();
          }else{
              audio.currentTime = 0
          }

          setPieceSelected([]);
          setRolledNumber(0);
          setLog("");

          setCnt((prevCnt) => (prevCnt + 1));
          
        }
      }
    }

    const handlePlayButtonOnClick = () => {
      setBoard (Array.from({length: 10},()=> Array.from({length: 10}, () => 0)));
      setCnt(0);
      setRolledNumber(0);
      setPieceSelected([]);
      setLog("");
      setGamePhase(1);
      setValidMoves(true);
    }

    const handleRollButtonOnClick = () => {

      document.getElementById("roll-sound").play();

      let randomNumber = Math.floor(Math.random() * 6) + 1

      setRolledNumber(randomNumber);

      let remainder = cnt % 3;
      let player = remainder + 1;

      let validMovesPossible = checkForValidMoves(player, randomNumber, board)
      setValidMoves(validMovesPossible);

      if(validMovesPossible) setLog("");
      else setLog("NO VALID MOVES AVAILABLE");

    }

    const handleSkipButtonOnClick = () => {
      
      setRolledNumber(0);
      setValidMoves(true);
      setLog("");
      setCnt((prevCnt) => (prevCnt + 1));

    }

    return (
      <div>
        <audio id="stomp-sound">
          <source src={stompSound} type="audio/wav" />
        </audio>
        <audio id="roll-sound">
          <source src={rollSound} type="audio/wav" />
        </audio>
        <div className="game">
          <div className="game-left">
            <button className={`btn ${darkMode ? "dark-background" : "light-background"} ${cnt===0 ? "hide" : "" }`}
              onClick={e => handlePlayButtonOnClick()}>
              {gamePhase === 3 ? "Play again" : "Restart"}
            </button>
            <div className="text-block">
              <div className="info">
                <span>
                  { gamePhase === 3 
                    ? "Winner is: "
                    : gamePhase === 1 || gamePhase === 2 
                      ? "Now playing: "
                      : '\u00A0'
                  }
                </span>
                <span style={{color: (gamePhase === 3) ? colors[(cnt - 1) % 3]: colors[cnt  % 3]}}>
                  { gamePhase === 3 
                    ? players[(cnt - 1) % 3].toUpperCase()
                    : gamePhase === 1 || gamePhase === 2 
                      ? players[cnt  % 3].toUpperCase()
                      : '\u00A0'
                  }
                </span>
              </div>
              <div id="log" className="info">
                {log !== "" ? log : '\u00A0' }
              </div>
            </div>
          </div>
          <table className={`game-table " ${darkMode ? "dark-background" : "light-background"} ${gamePhase === 3 ? "hide" : ""}`}>
            <tbody>
              {board.map((row, rowIndex) => {
                return(
                  <tr key={"row"+rowIndex}>
                    {row.map((col, colIndex) => {
                        let pieceSrc = "../images/";
                        if(col!==0) pieceSrc += piecesImg[col-1];
                      return(
                        <td key={"cell" + rowIndex + colIndex} 
                            id={"cell-" + rowIndex + "-" + colIndex}
                            className={`${col === 10 ? (darkMode ? "light-background" : "dark-background" ) : ""}`}>
                          <div className="cell-content" onClick={e => handleCellOnCLick(e)}>
                            {col === 1 || col === 2 || col === 3 
                            ? <img className="piece" src={pieceSrc} alt={pieceSrc.split(".")[0]}/>
                            : <div></div>                            
                            }
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="game-right">
            <div className="block">
              { (gamePhase === 2 && rolledNumber === 0)
                ? <button className={`btn ${darkMode ? "dark-background" : "light-background"}`} onClick={ e => handleRollButtonOnClick()} >Roll</button>
                : <button className="btn" hidden>Roll</button>
              }
              <div className="rolled-number-container">
              {rolledNumber > 0 
                ? <div className="rolled-number">{rolledNumber}</div>
                : <div></div>
              }
              {validMoves === false 
                ? <button className={`btn ${darkMode ? "dark-background" : "light-background"}`} onClick={ e => handleSkipButtonOnClick()} >Skip</button>
                : <button className="btn" hidden>Skip</button>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
