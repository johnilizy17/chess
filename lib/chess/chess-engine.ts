import { Chess } from 'chess.js'
import { MoveResult, Square, BoardPosition, PositionEvaluation } from '../../types/chess'

export class ChessEngine {
  private game: Chess
  private depth: number

  constructor(depth: number = 3) {
    this.game = new Chess()
    this.depth = depth
  }

  reset(): void {
    this.game = new Chess()
  }

  getGameState(): string {
    return this.game.fen()
  }

  getLegalMoves(from?: Square): string[] {
    if (from) {
      return this.game.moves({ square: from, verbose: true }).map((m: any) => m.to)
    }
    return this.game.moves().map((m: any) => {
      if (typeof m === 'string') return m
      return `${m.from}-${m.to}`
    })
  }

  makeMove(from: Square, to: Square): MoveResult {
    try {
      const move = this.game.move({ from, to, promotion: 'q' })

      if (move) {
        return {
          success: true,
          piece: this.getPieceType(move.piece),
          captured: move.captured ? this.getPieceType(move.captured) : undefined,
          isCheck: this.game.isCheck(),
          isCheckmate: this.game.isCheckmate(),
          moveType: this.getMoveType(move),
          promotion: move.promotion
        }
      }

      return {
        success: false,
        message: 'Illegal move'
      }
    } catch (error) {
      return {
        success: false,
        message: 'Invalid move format'
      }
    }
  }

  undoMove(): any {
    return this.game.undo()
  }

  getBestMove(): {
    from: Square
    to: Square
    piece: any
    captured?: any
    isCheck?: boolean
    isCheckmate?: boolean
  } | null {
    const moves = this.game.moves({ verbose: true })

    if (moves.length === 0) return null

    let bestMove = moves[0]
    let bestScore = -Infinity

    for (const move of moves) {
      this.game.move(move)
      const score = this.evaluatePosition()
      this.game.undo()

      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    return {
      from: bestMove.from,
      to: bestMove.to,
      piece: this.getPieceType(bestMove.piece),
      captured: bestMove.captured ? this.getPieceType(bestMove.captured) : undefined,
      isCheck: bestMove.san?.includes('+') || false,
      isCheckmate: this.game.isCheckmate()
    }
  }

  private evaluatePosition(): number {
    // Simple evaluation function
    const board = this.game.board()
    let score = 0

    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = board[rank][file]
        if (piece) {
          const value = this.getPieceValue(piece.type)
          const positionValue = this.getPositionValue(piece, rank, file)
          const total = value + positionValue

          if (piece.color === 'w') {
            score += total
          } else {
            score -= total
          }
        }
      }
    }

    return score
  }

  private getPieceValue(type: string): number {
    const values: { [key: string]: number } = {
      'p': 100,
      'n': 320,
      'b': 330,
      'r': 500,
      'q': 900,
      'k': 20000
    }
    return values[type] || 0
  }

  private getPositionValue(piece: any, rank: number, file: number): number {
    // Position tables for piece-square evaluation
    const whiteTables: { [key: string]: number[][] } = {
      'p': [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 10, 10, -20, -20, 10, 10, 5],
        [5, -5, -10, 0, 0, -10, -5, 5],
        [0, 0, 0, 20, 20, 0, 0, 0],
        [5, 5, 10, 25, 25, 10, 5, 5],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
      // Add tables for other pieces...
    }

    const table = whiteTables[piece.type]
    if (!table) return 0

    const tableRank = piece.color === 'w' ? rank : 7 - rank
    return table[tableRank][file]
  }

  private getPieceType(piece: string): any {
    const types: { [key: string]: any } = {
      'p': { name: 'Pawn', symbol: '♟' },
      'r': { name: 'Rook', symbol: '♜' },
      'n': { name: 'Knight', symbol: '♞' },
      'b': { name: 'Bishop', symbol: '♝' },
      'q': { name: 'Queen', symbol: '♛' },
      'k': { name: 'King', symbol: '♚' }
    }
    return types[piece] || piece
  }

  private getMoveType(move: any): 'normal' | 'castling' | 'enPassant' | 'promotion' {
    if (move.promotion) return 'promotion'
    if (move.san && move.san.includes('O-O')) return 'castling'
    if (move.flags && move.flags.includes('e')) return 'enPassant'
    return 'normal'
  }

  isGameOver(): boolean {
    return this.game.isGameOver()
  }

  getResult(): string | null {
    return this.game.pgn() ? this.game.pgn() : null
  }

  getCurrentPlayer(): 'w' | 'b' {
    return this.game.turn()
  }

  isCheck(): boolean {
    return this.game.isCheck()
  }

  isCheckmate(): boolean {
    return this.game.isCheckmate()
  }

  isDraw(): boolean {
    return this.game.isDraw() || this.game.isStalemate() || this.game.isThreefoldRepetition()
  }

  getBoard(): BoardPosition {
    const position: BoardPosition = {}
    const board = this.game.board()

    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = board[rank][file]
        if (piece) {
          const square = `${String.fromCharCode(97 + file)}${8 - rank}`
          position[square] = {
            type: piece.type as any,
            color: piece.color as any,
            square
          }
        }
      }
    }

    return position
  }
}