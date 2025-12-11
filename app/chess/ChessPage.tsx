'use client'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Container,
  Heading,
  useColorModeValue,
  Icon,
  Badge,
  Divider,
  useToast,
  Spinner
} from '@chakra-ui/react'
import {
  FaArrowLeft,
  FaLightbulb,
  FaRobot,
  FaUser,
  FaCheck
} from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import ChessBoard3D from '../../components/chess/ChessBoard3D'
import EducationalPanel from '../../components/chess/EducationalPanel'
import GameControls from '../../components/chess/GameControls'
import { GameState, MoveHistory, DifficultyLevel } from '../../types/chess'
import { ChessEngine } from '../../lib/chess/chess-engine'
import { educationalFacts } from '../../lib/chess/educational-facts'

const difficultySettings = {
  easy: {
    name: 'Easy',
    color: 'green',
    aiDepth: 2,
    description: 'Perfect for learning and practice'
  },
  normal: {
    name: 'Normal',
    color: 'yellow',
    aiDepth: 4,
    description: 'Balanced challenge'
  },
  hard: {
    name: 'Advanced',
    color: 'red',
    aiDepth: 6,
    description: 'Master-level AI'
  }
}

export default function ChessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toast = useToast()

  const [gameState, setGameState] = useState<GameState>('waiting')
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>([])
  const [currentMove, setCurrentMove] = useState(0)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [educationalFact, setEducationalFact] = useState<string | null>(null)
  const [chessEngine, setChessEngine] = useState<ChessEngine | null>(null)
  const [currentDifficulty] = useState<DifficultyLevel>(
    (searchParams.get('difficulty') as DifficultyLevel) || 'easy'
  )

  const difficulty = difficultySettings[currentDifficulty]
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const panelBg = useColorModeValue('white', 'gray.800')

  // Initialize chess engine
  useEffect(() => {
    const engine = new ChessEngine(difficulty.aiDepth)
    setChessEngine(engine)

    setGameState('ready')
    toast({
      title: `${difficulty.name} Mode`,
      description: difficulty.description,
      status: 'info',
      duration: 3000,
      isClosable: true
    })
  }, [difficulty.aiDepth, difficulty.name, difficulty.description, toast])

  const startGame = useCallback(() => {
    if (chessEngine) {
      chessEngine.reset()
      setGameState('playing')
      setIsPlayerTurn(true)
      setSelectedSquare(null)
      setMoveHistory([])
      setCurrentMove(0)
      setEducationalFact(null)

      toast({
        title: 'Game Started!',
        description: 'Your move - the white pieces go first',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }
  }, [chessEngine, toast])

  const makePlayerMove = useCallback(async (from: string, to: string) => {
    if (!chessEngine || !isPlayerTurn || gameState !== 'playing') return false

    try {
      const result = chessEngine.makeMove(from, to)

      if (result.success) {
        const newMove: MoveHistory = {
          from,
          to,
          piece: result.piece,
          captured: result.captured,
          moveNumber: (currentMove + 1),
          timestamp: new Date(),
          isCheck: result.isCheck || false,
          isCheckmate: result.isCheckmate || false
        }

        setMoveHistory(prev => [...prev, newMove])
        setCurrentMove(prev => prev + 1)
        setIsPlayerTurn(false)

        // Show educational fact
        const fact = educationalFacts.getRandomFact(result.piece, result.moveType || 'normal')
        setEducationalFact(fact)

        if (result.isCheckmate) {
          setGameState('checkmate')
          toast({
            title: 'Checkmate!',
            description: 'Congratulations! You won the game!',
            status: 'success',
            duration: 5000,
            isClosable: true
          })
        } else if (result.isCheck) {
          toast({
            title: 'Check!',
            description: 'You put the enemy king in check',
            status: 'info',
            duration: 2000,
            isClosable: true
          })
        }

        return true
      } else {
        toast({
          title: 'Invalid Move',
          description: result.message || 'That move is not legal',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
        return false
      }
    } catch (error) {
      console.error('Move error:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while making the move',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
      return false
    }
  }, [chessEngine, isPlayerTurn, gameState, currentMove, toast])

  // AI move handling
  useEffect(() => {
    if (!isPlayerTurn && gameState === 'playing' && chessEngine && !isAIThinking) {
      setIsAIThinking(true)

      const timer = setTimeout(() => {
        try {
          const aiMove = chessEngine.getBestMove()

          if (aiMove) {
            const aiMoveHistory: MoveHistory = {
              from: aiMove.from,
              to: aiMove.to,
              piece: aiMove.piece,
              captured: aiMove.captured,
              moveNumber: (currentMove + 1),
              timestamp: new Date(),
              isCheck: aiMove.isCheck || false,
              isCheckmate: aiMove.isCheckmate || false,
              isAI: true
            }

            setMoveHistory(prev => [...prev, aiMoveHistory])
            setCurrentMove(prev => prev + 1)
            setIsPlayerTurn(true)

            if (aiMove.isCheckmate) {
              setGameState('checkmate')
              toast({
                title: 'Checkmate!',
                description: 'The AI won the game. Better luck next time!',
                status: 'error',
                duration: 5000,
                isClosable: true
              })
            } else if (aiMove.isCheck) {
              toast({
                title: 'Check!',
                description: 'The AI put your king in check',
                status: 'warning',
                duration: 2000,
                isClosable: true
              })
            }
          }
        } catch (error) {
          console.error('AI move error:', error)
          toast({
            title: 'AI Error',
            description: 'There was an error with the AI move',
            status: 'error',
            duration: 2000,
            isClosable: true
          })
        }

        setIsAIThinking(false)
      }, 1500) // Delay for thinking effect

      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, gameState, chessEngine, currentMove, toast, isAIThinking])

  const resetGame = () => {
    if (chessEngine) {
      chessEngine.reset()
      setGameState('ready')
      setIsPlayerTurn(true)
      setSelectedSquare(null)
      setMoveHistory([])
      setCurrentMove(0)
      setEducationalFact(null)
      setIsAIThinking(false)
    }
  }

  const undoMove = () => {
    if (chessEngine && moveHistory.length > 0 && gameState === 'playing') {
      // Undo last two moves (player's move and AI's move)
      chessEngine.undoMove()
      if (moveHistory.length > 1) {
        chessEngine.undoMove()
      }

      const newHistory = moveHistory.slice(0, -1)
      if (newHistory.length > 0) {
        newHistory.pop() // Remove AI move as well
      }

      setMoveHistory(newHistory)
      setCurrentMove(newHistory.length)
      setIsPlayerTurn(true)
      setSelectedSquare(null)
      setEducationalFact(null)
    }
  }

  if (!chessEngine) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading chess engine...</Text>
        </VStack>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bgGradient="linear(to-br, purple.50, blue.50)" py={6}>
      <Container maxW="8xl">
        {/* Header */}
        <HStack justify="space-between" mb={6}>
          <HStack>
            <Button
              leftIcon={<Icon as={FaArrowLeft} />}
              variant="ghost"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Divider orientation="vertical" h={8} />
            <VStack align="start" spacing={0}>
              <Heading size="lg">3D Chess Game</Heading>
              <HStack>
                <Badge colorScheme={difficulty.color} size="lg">
                  <Icon as={FaRobot} mr={1} />
                  {difficulty.name} Mode
                </Badge>
                {isAIThinking && (
                  <Badge colorScheme="purple" variant="outline">
                    <Spinner size="xs" mr={1} />
                    AI Thinking...
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>

          <GameControls
            gameState={gameState}
            currentDifficulty={currentDifficulty}
            onStartGame={startGame}
            onResetGame={resetGame}
            onUndoMove={undoMove}
            canUndo={moveHistory.length > 0 && gameState === 'playing'}
          />
        </HStack>

        {/* Main Game Area */}
        <HStack spacing={8} align="start">
          {/* 3D Chess Board */}
          <Box flex="2">
            <ChessBoard3D
              gameState={gameState}
              isPlayerTurn={isPlayerTurn}
              selectedSquare={selectedSquare}
              onSquareClick={setSelectedSquare}
              onMakeMove={makePlayerMove}
              moveHistory={moveHistory}
              isAIMoving={isAIThinking}
            />
          </Box>

          {/* Side Panel */}
          <Box flex="1" minW="400px">
            <VStack spacing={6}>
              {/* Turn Indicator */}
              <Box
                bg={panelBg}
                p={6}
                borderRadius="xl"
                shadow="lg"
                w="full"
              >
                <VStack spacing={4}>
                  <HStack>
                    <Icon
                      as={isPlayerTurn ? FaUser : FaRobot}
                      boxSize={8}
                      color={isPlayerTurn ? 'blue.500' : 'red.500'}
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="lg" fontWeight="bold">
                        {isPlayerTurn ? 'Your Turn' : 'AI Turn'}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {isPlayerTurn ? 'Make your move' : 'The AI is thinking...'}
                      </Text>
                    </VStack>
                  </HStack>

                  {gameState === 'checkmate' && (
                    <Badge colorScheme="purple" size="lg" p={3} borderRadius="lg">
                      <Icon as={FaCheck} mr={2} />
                      Game Over
                    </Badge>
                  )}
                </VStack>
              </Box>

              {/* Educational Panel */}
              <EducationalPanel
                educationalFact={educationalFact}
                moveHistory={moveHistory}
                currentMove={currentMove}
                piece={selectedSquare ? 'unknown' : undefined}
              />
            </VStack>
          </Box>
        </HStack>
      </Container>
    </Box>
  )
}