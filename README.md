# Educational 3D Chess Game

An interactive 3D chess learning platform built with Next.js, React Three Fiber, and AI-powered opponents. This educational chess game provides engaging learning experiences with historical facts, strategic insights, and multiple difficulty levels.

## Features

### 🎓 Educational Content
- **Interactive Tutorial**: Step-by-step chess learning for beginners
- **Move-by-Move Facts**: Educational insights for every piece and move
- **Historical Context**: Learn about chess history and famous games
- **Strategic Tips**: Advanced strategies for different skill levels

### 🤖 AI Opponents
- **Three Difficulty Levels**:
  - **Easy**: Perfect for beginners, makes gentle mistakes
  - **Normal**: Balanced challenge for intermediate players
  - **Advanced**: Master-level AI for experienced players

### 🎮 3D Experience
- **Immersive 3D Board**: Explore chess from multiple angles
- **Interactive Pieces**: Drag, drop, and move pieces in 3D space
- **Visual Feedback**: Highlights, last move indicators, and selection states
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 📚 Learning Features
- **Move History**: Track every move with timestamps
- **Game Analysis**: Progress tracking and move efficiency metrics
- **Educational Panel**: Expandable sections for facts, history, and tips
- **No Registration**: Jump right into learning without creating accounts

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **3D Graphics**: React Three Fiber & Three.js
- **UI Components**: Chakra UI
- **Chess Engine**: chess.js library
- **State Management**: React hooks
- **Styling**: CSS-in-JS with Chakra UI
- **PWA Support**: Next.js PWA configuration

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd educational-3d-chess
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
educational-3d-chess/
├── app/                     # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── chess/              # Chess game pages
│   └── tutorial/           # Tutorial pages
├── components/             # React components
│   ├── chess/              # Chess-specific components
│   ├── ui/                 # UI components
│   └── 3d/                 # 3D components
├── lib/                    # Utility libraries
│   ├── chess/              # Chess logic and AI
│   ├── firebase/           # Firebase configuration
│   └── ai/                 # AI engine
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
└── public/                 # Static assets
```

## Key Components

### ChessBoard3D
The main 3D chess board component using React Three Fiber:
- 8x8 grid of interactive squares
- 3D chess pieces with different geometries
- Camera controls and lighting
- Drag and drop functionality

### EducationalPanel
Dynamic panel showing educational content:
- Move-specific facts and tips
- Game progress tracking
- Move history visualization
- Performance metrics

### ChessEngine
Core game logic engine:
- Move validation and execution
- AI move calculation
- Game state management
- Position evaluation

## Educational Content

The game includes comprehensive educational material:

### Tutorial Mode
- 12-step interactive tutorial
- Covers all piece types and rules
- Historical background for each piece
- Strategic tips and pro advice

### In-Game Learning
- 50+ educational facts about chess
- History, strategy, and rules content
- Context-aware suggestions
- Progressive difficulty scaling

## AI Opponent Features

### Difficulty Scaling
- **Easy Mode**: Basic evaluation with limited depth
- **Normal Mode**: Balanced evaluation with medium depth
- **Advanced Mode**: Deep calculation with complex evaluation

### Educational Integration
- AI mistakes are designed to be educational
- Move explanations provided for AI decisions
- Learning-focused AI behavior patterns

## Customization

### Adding Educational Facts
Edit `lib/chess/educational-facts.ts` to add new learning content:

```typescript
const newFact: EducationalFact = {
  id: 'unique-id',
  piece: 'q', // 'p', 'r', 'n', 'b', 'q', 'k', or 'all'
  difficulty: 'beginner', // 'beginner', 'intermediate', 'advanced'
  title: 'Your Fact Title',
  content: 'Detailed educational content...',
  category: 'strategy' // 'history', 'strategy', 'rules', 'tips'
}
```

### Modifying AI Behavior
Adjust AI parameters in `lib/chess/chess-engine.ts`:

```typescript
const engine = new ChessEngine(depth: 3) // Increase depth for stronger AI
```

### Customizing 3D Graphics
Modify piece geometries and board appearance in `components/chess/ChessBoard3D.tsx`.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with WebGL support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Three.js community for 3D graphics library
- chess.js for robust chess logic
- Chakra UI for excellent component library
- Educational chess content from various sources

---

**Note**: This is an educational project focused on learning and enjoyment. The AI opponents are designed for educational purposes and may not represent the full complexity of chess engines like Stockfish."# chess" 
