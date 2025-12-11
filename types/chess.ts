export type GameState = 'waiting' | 'ready' | 'playing' | 'checkmate' | 'stalemate' | 'draw'
export type DifficultyLevel = 'easy' | 'normal' | 'hard'
export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k'
export type PieceColor = 'w' | 'b'
export type Square = any // e.g., 'a1', 'e4', etc.

export interface ChessPiece {
  type: PieceType
  color: PieceColor
  square: Square
  hasMoved?: boolean
  enPassant?: boolean
}

export interface MoveHistory {
  from: Square
  to: Square
  piece: PieceType
  captured?: PieceType
  moveNumber: number
  timestamp: Date
  isCheck?: boolean
  isCheckmate?: boolean
  isAI?: boolean
  promotion?: PieceType
  moveType?: 'normal' | 'castling' | 'enPassant' | 'promotion'
}

export interface MoveResult {
  success: boolean
  piece?: PieceType
  captured?: PieceType
  isCheck?: boolean
  isCheckmate?: boolean
  message?: string
  promotion?: PieceType
  moveType?: 'normal' | 'castling' | 'enPassant' | 'promotion'
}

export interface BoardPosition {
  [square: string]: ChessPiece
}

export interface EducationalFact {
  id: string
  piece: PieceType | 'all'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  title: string
  content: string
  category: 'history' | 'strategy' | 'rules' | 'tips'
}

export interface GameSettings {
  difficulty: DifficultyLevel
  showHints: boolean
  showLastMove: boolean
  autoQueenPromotion: boolean
  soundEnabled: boolean
}

export interface PositionEvaluation {
  evaluation: number // centipawns, positive for white
  bestMove?: {
    from: Square
    to: Square
  }
  depth: number
  nodes: number
  time: number
}