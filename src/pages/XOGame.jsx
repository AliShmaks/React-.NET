import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Footer } from '../components/Layout'
import toast from 'react-hot-toast'
import '../styles/XOGame.css'

const XOGame = () => {
  // ===== STATE =====
  const [board, setBoard] = useState(Array(9).fill(''))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [gameOver, setGameOver] = useState(false)
  const [gameMode, setGameMode] = useState('vsBot')
  const [scores, setScores] = useState({ X: 0, O: 0, D: 0 })
  const [status, setStatus] = useState('Your Turn 👆')
  const [winningCells, setWinningCells] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isBotThinking, setIsBotThinking] = useState(false)
  const botTimeoutRef = useRef(null)
  const boardRef = useRef(board) // ← ADD THIS to track latest board state

  // Update ref when board changes
  useEffect(() => {
    boardRef.current = board
  }, [board])

  // ===== WIN PATTERNS =====
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  // ===== SCROLL PROGRESS =====
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? (scrollY / height) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===== CHECK WINNER =====
  const checkWinner = useCallback((boardState) => {
    for (const [a, b, c] of winPatterns) {
      if (boardState[a] && boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
        return { winner: boardState[a], cells: [a, b, c] }
      }
    }
    return null
  }, [winPatterns])

  // ===== CHECK DRAW =====
  const isDraw = useCallback((boardState) => {
    return boardState.every(cell => cell !== '')
  }, [])

  // ===== MINIMAX AI =====
  const minimax = useCallback((boardState, depth, isMaximizing) => {
    const result = checkWinner(boardState)
    if (result) {
      if (result.winner === 'O') return 10 - depth
      if (result.winner === 'X') return depth - 10
    }
    if (isDraw(boardState)) return 0

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
          boardState[i] = 'O'
          let score = minimax(boardState, depth + 1, false)
          boardState[i] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
          boardState[i] = 'X'
          let score = minimax(boardState, depth + 1, true)
          boardState[i] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }, [checkWinner, isDraw])

  // ===== GET BEST MOVE =====
  const getBestMove = useCallback((boardState) => {
    let bestScore = -Infinity
    let bestMove = -1

    for (let i = 0; i < 9; i++) {
      if (boardState[i] === '') {
        boardState[i] = 'O'
        let score = minimax(boardState, 0, false)
        boardState[i] = ''
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    return bestMove
  }, [minimax])

  // ===== UPDATE STATUS =====
  const updateStatus = useCallback((message = null) => {
    if (message) {
      setStatus(message)
    } else if (gameMode === 'vsBot') {
      setStatus(currentPlayer === 'X' ? 'Your Turn 👆' : 'Bot is thinking... 🤖')
    } else {
      setStatus(`${currentPlayer}'s Turn`)
    }
  }, [currentPlayer, gameMode])

  // ===== PLACE MOVE =====
  const placeMove = useCallback((position, player, currentBoard) => {
    // Use the provided board or the current state
    const boardToUse = currentBoard || board
    const newBoard = [...boardToUse]
    
    // Check if position is already taken
    if (newBoard[position] !== '') return null
    
    newBoard[position] = player

    // Check winner
    const result = checkWinner(newBoard)
    if (result) {
      const newScores = { ...scores }
      newScores[result.winner]++
      return { board: newBoard, winner: result, scores: newScores }
    }

    // Check draw
    if (isDraw(newBoard)) {
      const newScores = { ...scores }
      newScores.D++
      return { board: newBoard, draw: true, scores: newScores }
    }

    return { board: newBoard, nextPlayer: player === 'X' ? 'O' : 'X' }
  }, [board, scores, checkWinner, isDraw])

  // ===== MAKE MOVE =====
  const makeMove = useCallback((position) => {
    if (gameOver) return
    if (gameMode === 'vsBot' && currentPlayer !== 'X') return
    if (board[position]) return
    if (isBotThinking) return

    // Get the current board state
    const currentBoard = boardRef.current
    
    // Place player's move
    const result = placeMove(position, currentPlayer, currentBoard)
    if (!result) return
    
    // Update board
    setBoard(result.board)

    // Check if game ended
    if (result.winner) {
      setGameOver(true)
      setWinningCells(result.winner.cells)
      setScores(result.scores)
      if (result.winner.winner === 'X') {
        setStatus('You Win! 🎉')
        toast.success('You Win! 🎉')
      } else {
        setStatus('Bot Wins! 🤖')
        toast.error('Bot Wins! 🤖')
      }
      return
    }

    if (result.draw) {
      setGameOver(true)
      setScores(result.scores)
      setStatus("Draw! 🤝")
      toast("Draw! 🤝")
      return
    }

    // Switch to next player
    const nextPlayer = result.nextPlayer
    setCurrentPlayer(nextPlayer)

    // Bot move
    if (gameMode === 'vsBot' && nextPlayer === 'O' && !gameOver) {
      setIsBotThinking(true)
      setStatus('Bot is thinking... 🤖')
      
      // Clear any existing timeout
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current)
      }

      // Use the updated board for bot move
      const boardForBot = result.board

      botTimeoutRef.current = setTimeout(() => {
        const bestMove = getBestMove([...boardForBot])
        if (bestMove !== -1 && !gameOver) {
          // Place bot move using the current board
          const botResult = placeMove(bestMove, 'O', boardForBot)
          if (botResult) {
            setBoard(botResult.board)
            
            if (botResult.winner) {
              setGameOver(true)
              setWinningCells(botResult.winner.cells)
              setScores(botResult.scores)
              if (botResult.winner.winner === 'X') {
                setStatus('You Win! 🎉')
                toast.success('You Win! 🎉')
              } else {
                setStatus('Bot Wins! 🤖')
                toast.error('Bot Wins! 🤖')
              }
              setIsBotThinking(false)
              return
            }

            if (botResult.draw) {
              setGameOver(true)
              setScores(botResult.scores)
              setStatus("Draw! 🤝")
              toast("Draw! 🤝")
              setIsBotThinking(false)
              return
            }

            setCurrentPlayer('X')
            setStatus('Your Turn 👆')
          }
        }
        setIsBotThinking(false)
        botTimeoutRef.current = null
      }, 350)
    } else {
      updateStatus()
    }
  }, [board, currentPlayer, gameOver, gameMode, isBotThinking, placeMove, updateStatus, getBestMove])

  // ===== RESET GAME =====
  const resetGame = useCallback(() => {
    if (botTimeoutRef.current) {
      clearTimeout(botTimeoutRef.current)
      botTimeoutRef.current = null
    }
    setBoard(Array(9).fill(''))
    setCurrentPlayer('X')
    setGameOver(false)
    setWinningCells([])
    setIsBotThinking(false)
    setStatus('Your Turn 👆')
  }, [])

  // ===== RESET SCORES =====
  const resetScores = useCallback(() => {
    setScores({ X: 0, O: 0, D: 0 })
    resetGame()
    toast('Scores reset!')
  }, [resetGame])

  // ===== TOGGLE MODE =====
  const toggleMode = useCallback(() => {
    const newMode = gameMode === 'vsBot' ? 'vsPlayer' : 'vsBot'
    setGameMode(newMode)
    resetGame()
    toast(newMode === 'vsBot' ? 'Switched to VS Bot mode' : 'Switched to 2 Player mode')
  }, [gameMode, resetGame])

  // ===== INIT GAME =====
  useEffect(() => {
    resetGame()
    return () => {
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current)
      }
    }
  }, [resetGame])

  return (
    <>

      <div 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <section className="page-section">
        <div className="game-container">
          <div className="game-header">
            <span className="game-badge">🎮 Play Now</span>
            <h1 className="game-title">XO Game</h1>
            <p className="game-subtitle">Challenge yourself or a friend!</p>
          </div>

          <div className="game-mode">
            <button onClick={toggleMode} className="mode-btn">
              {gameMode === 'vsBot' ? '🤖 vs Bot' : '👥 2 Players'}
            </button>
          </div>

          <div className="game-scores">
            <div className="score-card">
              <p className="score-label">X (You)</p>
              <p className="score-value" style={{ color: '#8B1A1A' }}>{scores.X}</p>
            </div>
            <div className="score-card">
              <p className="score-label">Draws</p>
              <p className="score-value" style={{ color: '#ffffff' }}>{scores.D}</p>
            </div>
            <div className="score-card">
              <p className="score-label">O (Bot)</p>
              <p className="score-value" style={{ color: '#8B1A1A' }}>{scores.O}</p>
            </div>
          </div>

          <p className="game-status">{status}</p>

          <div className="game-board">
            {board.map((value, index) => {
              let cellClass = 'xo-cell'
              if (value === 'X') cellClass += ' x-mark taken'
              if (value === 'O') cellClass += ' o-mark taken'
              if (winningCells.includes(index)) cellClass += ' win-cell'
              return (
                <div 
                  key={index}
                  className={cellClass}
                  onClick={() => makeMove(index)}
                >
                  {value}
                </div>
              )
            })}
          </div>

          <div className="game-buttons">
            <button onClick={resetGame} className="game-btn secondary">New Round</button>
            <button onClick={resetScores} className="game-btn secondary">Reset Scores</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default XOGame