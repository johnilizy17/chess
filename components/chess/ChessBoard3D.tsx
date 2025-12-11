'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Cylinder } from '@react-three/drei'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Mesh } from 'three'
import { GameState, MoveHistory } from '../../types/chess'

interface ChessBoard3DProps {
  gameState: GameState
  isPlayerTurn: boolean
  selectedSquare: string | null
  onSquareClick: (square: string) => void
  onMakeMove: (from: string, to: string) => Promise<boolean>
  moveHistory: MoveHistory[]
  isAIMoving: boolean
}

interface SquareProps {
  position: [number, number, number]
  square: string
  isSelected: boolean
  isLastMove: boolean
  onClick: () => void
  piece?: string
}

// Chess piece component (same as before)
function ChessPiece({
  position,
  piece,
  color,
  isHighlighted = false,
  isDragging = false
}: {
  position: [number, number, number]
  piece: string
  color: 'w' | 'b'
  isHighlighted?: boolean
  isDragging?: boolean
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (isDragging) {
      meshRef.current!.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 5) * 0.1
    }
  })

  const pieceColor = color === 'w' ? '#ffffff' : '#2d2d2d'
  const highlightColor = isHighlighted ? '#ffff00' : pieceColor

  const renderPiece = () => {
    switch (piece) {
      case 'p': return <Cylinder args={[0.3, 0.4, 1]} position={[0, 0.5, 0]}><meshStandardMaterial color={highlightColor} /></Cylinder>
      case 'r': return <Box args={[0.6, 1.2, 0.6]} position={[0, 0.6, 0]}><meshStandardMaterial color={highlightColor} /></Box>
      case 'n': return <Box args={[0.6, 1.4, 0.8]} position={[0, 0.7, 0]}><meshStandardMaterial color={highlightColor} /></Box>
      case 'b': return <Cylinder args={[0.3, 0.5, 1.2]} position={[0, 0.6, 0]}><meshStandardMaterial color={highlightColor} /></Cylinder>
      case 'q': return <Cylinder args={[0.4, 0.6, 1.5]} position={[0, 0.75, 0]}><meshStandardMaterial color={highlightColor} /></Cylinder>
      case 'k':
        return (
          <group>
            <Cylinder args={[0.4, 0.6, 1.3]} position={[0, 0.65, 0]}><meshStandardMaterial color={highlightColor} /></Cylinder>
            <Box args={[0.15, 0.2, 0.6]} position={[0, 1.2, 0]}><meshStandardMaterial color={highlightColor} /></Box>
          </group>
        )
      default: return null
    }
  }

  return <mesh ref={meshRef} position={position} castShadow receiveShadow>{renderPiece()}</mesh>
}

// Individual square component (same as before)
function Square({ position, square, isSelected, isLastMove, onClick, piece }: SquareProps) {
  const meshRef = useRef<Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const file = square.charCodeAt(0) - 97
  const rank = parseInt(square[1]) - 1
  const isLight = (file + rank) % 2 === 0
  const baseColor = isLight ? '#f0d9b5' : '#b58863'
  const highlightColor = isSelected ? '#ffff00' : isLastMove ? '#90EE90' : isHovered ? '#87CEEB' : baseColor

  return (
    <group>
      <Box
        ref={meshRef}
        position={position}
        args={[1, 0.1, 1]}
        onClick={onClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshStandardMaterial color={highlightColor} transparent opacity={0.8} />
      </Box>
      <Text position={[position[0] - 0.45, position[1] + 0.1, position[2] - 0.45]} fontSize={0.15} color={isLight ? '#000' : '#fff'} anchorX="left" anchorY="bottom">{square}</Text>
      {piece && <ChessPiece position={[position[0], position[1] + 0.5, position[2]]} piece={piece.toLowerCase()} color={piece === piece.toUpperCase() ? 'w' : 'b'} />}
    </group>
  )
}

// Helper function to get piece at square (same as before)
function getPieceAtSquare(square: string, moveHistory: MoveHistory[]): string | null {
  const initialPosition: { [key: string]: string } = {
    'a1': 'r','b1': 'n','c1': 'b','d1': 'q','e1': 'k','f1': 'b','g1': 'n','h1': 'r',
    'a2': 'p','b2': 'p','c2': 'p','d2': 'p','e2': 'p','f2': 'p','g2': 'p','h2': 'p',
    'a7': 'P','b7': 'P','c7': 'P','d7': 'P','e7': 'P','f7': 'P','g7': 'P','h7': 'P',
    'a8': 'R','b8': 'N','c8': 'B','d8': 'Q','e8': 'K','f8': 'B','g8': 'N','h8': 'R',
  }
  let position = { ...initialPosition }
  if (moveHistory.length > 0) {
    const lastMove = moveHistory[moveHistory.length - 1]
    position[lastMove.to] = position[lastMove.from] || null
    delete position[lastMove.from]
    if (lastMove.captured) delete position[lastMove.to]
  }
  return position[square] || null
}

// ChessBoard component
function ChessBoard({ gameState, isPlayerTurn, selectedSquare, onSquareClick, onMakeMove, moveHistory, isAIMoving }: ChessBoard3DProps) {
  const squares = useMemo(() => {
    const result = []
    for (let rank = 1; rank <= 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const square = `${String.fromCharCode(97 + file)}${rank}`
        const position: [number, number, number] = [file - 3.5, 0, rank - 4.5]
        result.push({ square, position, piece: getPieceAtSquare(square, moveHistory) })
      }
    }
    return result
  }, [moveHistory])

  const lastMoveSquares = useMemo(() => {
    if (moveHistory.length === 0) return { from: null, to: null }
    const lastMove = moveHistory[moveHistory.length - 1]
    return { from: lastMove.from, to: lastMove.to }
  }, [moveHistory])

  const handleSquareClick = (square: string) => {
    if (gameState !== 'playing' || !isPlayerTurn || isAIMoving) return
    if (!selectedSquare) {
      const piece = getPieceAtSquare(square, moveHistory)
      if (piece) onSquareClick(square)
    } else {
      onMakeMove(selectedSquare, square)
      onSquareClick(null)
    }
  }

  return (
    <group>
      <Box position={[0, -0.05, 0]} args={[9, 0.1, 9]}><meshStandardMaterial color="#8B4513" /></Box>
      {squares.map(({ square, position, piece }) => (
        <Square key={square} position={position} square={square} piece={piece} isSelected={selectedSquare === square} isLastMove={lastMoveSquares.from === square || lastMoveSquares.to === square} onClick={() => handleSquareClick(square)} />
      ))}
    </group>
  )
}

// Main 3D Chess Board with responsive height
export default function ChessBoard3D(props: ChessBoard3DProps) {
  const [windowHeight, setWindowHeight] = useState(600)
  const [windowWidth, setWindowWidth] = useState(800)

  useEffect(() => {
    const updateSize = () => {
      setWindowHeight(window.innerHeight * 0.6) // 60% of viewport height
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const cameraPosition: [number, number, number] = windowWidth < 768 ? [10, 12, 10] : [8, 8, 8]

  return (
    <div style={{ width: '100%', height: windowHeight }}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} castShadow intensity={1} shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <ChessBoard {...props} />
        <OrbitControls
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          minDistance={8}
          maxDistance={20}
        />
      </Canvas>
    </div>
  )
}
