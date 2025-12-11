import { EducationalFact, PieceType } from '../../types/chess'

class EducationalFactsManager {
  private facts: EducationalFact[] = [
    // King Facts
    {
      id: 'king-1',
      piece: 'k',
      difficulty: 'beginner',
      title: 'The Most Important Piece',
      content: 'The king is the most valuable piece in chess. If you lose your king (checkmate), you lose the entire game. The king can move one square in any direction - horizontally, vertically, or diagonally.',
      category: 'rules'
    },
    {
      id: 'king-2',
      piece: 'k',
      difficulty: 'intermediate',
      title: 'Castling Protection',
      content: 'Castling is the only move where the king moves more than one square. It helps protect the king by moving it to a safer position and also brings your rook into the game. Remember: you cannot castle if the king is in check or if it passes through an attacked square.',
      category: 'rules'
    },
    {
      id: 'king-3',
      piece: 'k',
      difficulty: 'advanced',
      title: 'King Activity in the Endgame',
      content: 'In the endgame, the king becomes a very active piece. Unlike the opening and middlegame where it stays safe, in the endgame the king should actively participate in the battle for central squares and help promote pawns.',
      category: 'strategy'
    },

    // Queen Facts
    {
      id: 'queen-1',
      piece: 'q',
      difficulty: 'beginner',
      title: 'The Most Powerful Piece',
      content: 'The queen is the most powerful piece on the board. She can move any number of squares in any direction - just like the rook and bishop combined. Her value is 9 points, making her worth more than a rook, bishop, and knight combined!',
      category: 'rules'
    },
    {
      id: 'queen-2',
      piece: 'q',
      difficulty: 'intermediate',
      title: 'Queen Development Strategy',
      content: 'In the opening, avoid moving the queen too early unless it serves a clear purpose. Early queen moves can lead to the queen being attacked by minor pieces, forcing it to move again and wasting time.',
      category: 'strategy'
    },
    {
      id: 'queen-3',
      piece: 'q',
      difficulty: 'advanced',
      title: 'Queen Trade Decisions',
      content: 'When deciding whether to trade queens, consider the position. In open positions with lots of tactics, keeping the queen is often better. In closed positions with strategic themes, trading queens might simplify the game in your favor.',
      category: 'strategy'
    },

    // Rook Facts
    {
      id: 'rook-1',
      piece: 'r',
      difficulty: 'beginner',
      title: 'The Castle Tower',
      content: 'Rooks look like castle towers, which is why they are sometimes called "castles." They move horizontally or vertically any number of squares. Rooks are most powerful on open files and ranks where they can control many squares.',
      category: 'history'
    },
    {
      id: 'rook-2',
      piece: 'r',
      difficulty: 'intermediate',
      title: 'Rook Placement Strategy',
      content: 'Place your rooks on open files (columns without pawns) or semi-open files where you can potentially open them. Connected rooks (protecting each other) are much stronger than isolated rooks.',
      category: 'strategy'
    },
    {
      id: 'rook-3',
      piece: 'r',
      difficulty: 'advanced',
      title: 'Rook Endgame Concepts',
      content: 'In rook endgames, the main themes are: 1) King activity, 2) Pawn structure, 3) Rook placement behind passed pawns, and 4) Creating and stopping passed pawns. The rook should stay active and behind passed pawns.',
      category: 'strategy'
    },

    // Bishop Facts
    {
      id: 'bishop-1',
      piece: 'b',
      difficulty: 'beginner',
      title: 'The Diagonal Master',
      content: 'Bishops move diagonally any number of squares. Each player has one light-squared bishop and one dark-squared bishop. These bishops will stay on their respective colored squares for the entire game!',
      category: 'rules'
    },
    {
      id: 'bishop-2',
      piece: 'b',
      difficulty: 'intermediate',
      title: 'Bishop Pair Advantage',
      content: 'Having both bishops (the "bishop pair") is usually an advantage because they cover each other\'s weaknesses and can control squares of opposite colors. This advantage is stronger in open positions with many diagonals available.',
      category: 'strategy'
    },
    {
      id: 'bishop-3',
      piece: 'b',
      difficulty: 'advanced',
      title: 'Bishop Endgame Technique',
      content: 'In bishop endgames, remember that bishops cannot control squares of the opposite color. Sometimes the key winning technique is to force the opponent\'s king to the wrong colored square where your bishop cannot give checkmate.',
      category: 'strategy'
    },

    // Knight Facts
    {
      id: 'knight-1',
      piece: 'n',
      difficulty: 'beginner',
      title: 'The L-Shaped Wonder',
      content: 'Knights move in an L-shape: two squares in one direction, then one square perpendicular. They are the only pieces that can jump over other pieces! Knights are excellent at surprise attacks and forking multiple pieces.',
      category: 'rules'
    },
    {
      id: 'knight-2',
      piece: 'n',
      difficulty: 'intermediate',
      title: 'Knight vs Bishop',
      content: 'Knights and bishops are roughly equal in value (3 points each), but their usefulness depends on the position. Knights are better in closed positions with many pawns blocking diagonals. Bishops are better in open positions with clear diagonals.',
      category: 'strategy'
    },
    {
      id: 'knight-3',
      piece: 'n',
      difficulty: 'advanced',
      title: 'Knight Outposts',
      content: 'Establish knights on advanced squares that cannot be attacked by enemy pawns. These "outpost" knights are very strong because they control important central squares and cannot be easily driven away.',
      category: 'strategy'
    },

    // Pawn Facts
    {
      id: 'pawn-1',
      piece: 'p',
      difficulty: 'beginner',
      title: 'The Foot Soldiers',
      content: 'Pawns are the most numerous but least valuable pieces (1 point each). They move forward one square, but capture diagonally. On their first move, they can move two squares forward. They are the only pieces that move differently when capturing!',
      category: 'rules'
    },
    {
      id: 'pawn-2',
      piece: 'p',
      difficulty: 'intermediate',
      title: 'Pawn Structure',
      content: 'Pawn structure (the arrangement of pawns) is crucial in chess. Isolated pawns, doubled pawns, and pawn chains all have strategic implications. A good pawn structure provides a solid foundation for your pieces.',
      category: 'strategy'
    },
    {
      id: 'pawn-3',
      piece: 'p',
      difficulty: 'advanced',
      title: 'Pawn Promotion Tactics',
      content: 'Pawns that reach the eighth rank must promote to a piece (usually a queen). The timing of pawn promotion is crucial - sometimes better to delay promotion to create threats or force better positions first.',
      category: 'strategy'
    },

    // General Chess History
    {
      id: 'general-1',
      piece: 'all',
      difficulty: 'beginner',
      title: 'Chess Origins',
      content: 'Chess originated in India around the 6th century as "Chaturanga" (four divisions of the military). It spread to Persia, then the Arab world, and eventually to Europe where the modern rules evolved.',
      category: 'history'
    },
    {
      id: 'general-2',
      piece: 'all',
      difficulty: 'intermediate',
      title: 'Famous Chess Games',
      content: 'Some of the most famous games in chess history include "The Immortal Game" (Anderssen vs Kieseritzky, 1851), "The Game of the Century" (Donald Byrne vs Bobby Fischer, 1956), and Kasparov vs Topalov (1999).',
      category: 'history'
    },
    {
      id: 'general-3',
      piece: 'all',
      difficulty: 'advanced',
      title: 'Chess Complexity',
      content: 'The number of possible chess games is estimated to be around 10^120 - more than the number of atoms in the observable universe! The longest recorded chess game lasted 269 moves over 20 hours.',
      category: 'history'
    },

    // General Tips
    {
      id: 'tip-1',
      piece: 'all',
      difficulty: 'beginner',
      title: 'Control the Center',
      content: 'In the opening, focus on controlling the four central squares: e4, e5, d4, and d5. Controlling the center gives your pieces more mobility and restricts your opponent\'s development.',
      category: 'tips'
    },
    {
      id: 'tip-2',
      piece: 'all',
      difficulty: 'intermediate',
      title: 'Develop Knights Before Bishops',
      content: 'A common opening principle is to develop knights before bishops. Knights are more effective from their starting squares, while bishops are better developed when more squares become available.',
      category: 'tips'
    },
    {
      id: 'tip-3',
      piece: 'all',
      difficulty: 'advanced',
      title: 'Positional Thinking',
      content: 'Beyond tactics, chess involves positional understanding: weak squares, strong squares, piece placement, pawn structure, king safety, and space. Great players combine tactical skill with deep positional understanding.',
      category: 'tips'
    }
  ]

  private currentFactsUsed: string[] = []

  getRandomFact(piece?: PieceType, difficulty = 'beginner'): string | null {
    const availableFacts = this.facts.filter(fact =>
      fact.piece === 'all' || fact.piece === piece
    )

    const unusedFacts = availableFacts.filter(fact =>
      !this.currentFactsUsed.includes(fact.id)
    )

    // If all facts used, reset and start over
    if (unusedFacts.length === 0) {
      this.currentFactsUsed = []
      return this.getRandomFact(piece, difficulty)
    }

    // Randomly select from available facts
    const randomIndex = Math.floor(Math.random() * unusedFacts.length)
    const selectedFact = unusedFacts[randomIndex]

    this.currentFactsUsed.push(selectedFact.id)

    return `**${selectedFact.title}**\n\n${selectedFact.content}`
  }

  getFactsByPiece(piece: PieceType): EducationalFact[] {
    return this.facts.filter(fact =>
      fact.piece === piece || fact.piece === 'all'
    )
  }

  getFactsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): EducationalFact[] {
    return this.facts.filter(fact => fact.difficulty === difficulty)
  }

  getFactsByCategory(category: 'history' | 'strategy' | 'rules' | 'tips'): EducationalFact[] {
    return this.facts.filter(fact => fact.category === category)
  }

  getAllFacts(): EducationalFact[] {
    return this.facts
  }

  resetUsedFacts(): void {
    this.currentFactsUsed = []
  }
}

export const educationalFacts = new EducationalFactsManager()