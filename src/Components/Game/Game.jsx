import React from "react";
import { useState, useEffect, useMemo, useCallback } from 'react';
import './game.css';
import backgroundMusic from '../../assets/sounds/background.mp3'
import rollSound from '../../assets/sounds/roll.wav'

export default function Game({darkMode}) {

    const piecesImg = ["circle.png","square.png",'triangle.png'];

    const players = useMemo(() => {
      return ["blue", "green", "red"];
    }, []);

    const [ emptyPiece, setEmptyPiece ] = useState("white.png");
    const [ validMove, setValidMove ] = useState("black.png");

    useEffect( () => {
      setEmptyPiece( darkMode ? "black.png" : "white.png" )
      setValidMove( darkMode ? "white.png" : "black.png" )
    }, [darkMode])

    const [board, setBoard] = useState(Array.from({length: 10},()=> Array.from({length: 10}, () => 0)));

    const [gamePhase, setGamePhase] = useState(0);

    const [rolledNumber, setRolledNumber] = useState(0);

    const [pieceSelected, setPieceSelected] = useState([]);

    const [validMoves, setValidMoves] = useState(true);

    const [cnt, setCnt] = useState(0);

    const [log, setLog] = useState("");

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
            for(var k = 0; k < 8; k++){
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

      if(gamePhase === 0) {
        setLog("CLICK START BUTTON FIRST");
        return;
      }

      var td = e.target.closest('td');
      var row   = td.id.split("-")[1]
      var col   = td.id.split("-")[2]

      if(gamePhase===1){
        if(board[row][col]!==0) return;
        let remainder = cnt % 3;

        setBoard( (prevBoard) => {
          let newBoard = [...prevBoard];
          newBoard[row][col] = remainder + 1;
          return newBoard;
        })
 
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

      var audio = document.getElementById("background-music");
      audio.volume = 0.5;
      if (audio.paused) {
        audio.play();
      }else{
          audio.currentTime = 0
      }
    }

    const handleRollButtonOnClick = () => {

      document.getElementById("roll-sound").play();

      let randomNumber = Math.floor(Math.random() * 6) + 1

      setRolledNumber(randomNumber);

      var remainder = cnt % 3;
      var player = remainder + 1;

      let validMovesPossible = checkForValidMoves(player, randomNumber, board)
      setValidMoves(validMovesPossible);

      if(validMovesPossible) setLog("");
      else setLog("NO VALID MOVIE AVAILABLE");

    }

    const handleSkipButtonOnClick = () => {
      
      setRolledNumber(0);
      setValidMoves(true);
      setCnt((prevCnt) => (prevCnt + 1));

    }

    return (
      <div>
        <audio id="background-music" loop>
          <source src={backgroundMusic} type="audio/mp3" />
        </audio>
        <audio id="roll-sound">
          <source src={rollSound} type="audio/wav" />
        </audio>
        <div className="game">
          <div className="game-left">
            <button className={`btn ${darkMode ? "dark-background" : "light-background"}`}
              onClick={e => handlePlayButtonOnClick()}>{gamePhase > 0 ? (gamePhase === 3 ? "Play again" : "Restart") : "Start"}
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
                <span style={{color: (gamePhase === 3) ? players[(cnt - 1) % 3]: players[cnt  % 3]}}>
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
          <table className={`game-table " ${darkMode ? "dark-background" : "light-background"}`}>
            <tbody>
              {board.map((row, rowIndex) => {
                return(
                  <tr key={"row"+rowIndex}>
                    {row.map((col, colIndex) => {
                        let pieceSrc = "../images/" + emptyPiece;
                        if(col!==0) pieceSrc = "../images/" + piecesImg[col-1];
                        if(col===10) pieceSrc = "../images/" + validMove;
                      return(
                        <td key={"cell" + rowIndex + colIndex} id={"cell-" + rowIndex + "-" + colIndex}>
                          <div className="cell-content" onClick={e => handleCellOnCLick(e)}>
                          <img className="piece" src={pieceSrc} alt={pieceSrc.split(".")[0]}/>
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