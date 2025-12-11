'use client'

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import {
  FaPlay,
  FaPause,
  FaUndo,
  FaCog,
  FaRobot,
  FaCrown,
  FaBrain,
  FaRocketchat
} from 'react-icons/fa'
import { GameState, DifficultyLevel } from '../../types/chess'

interface GameControlsProps {
  gameState: GameState
  currentDifficulty: DifficultyLevel
  onStartGame: () => void
  onResetGame: () => void
  onUndoMove: () => void
  canUndo: boolean
}

const difficultySettings = {
  easy: { 
    name: 'Easy', 
    icon: FaRobot,
    color: 'green',
    description: 'Perfect for learning',
    aiDepth: 2
  },
  normal: { 
    name: 'Normal', 
    icon: FaBrain,
    color: 'yellow',
    description: 'Balanced challenge',
    aiDepth: 4
  },
  hard: { 
    name: 'Advanced', 
    icon: FaCrown,
    color: 'red',
    description: 'Master level',
    aiDepth: 6
  }
}

export default function GameControls({
  gameState,
  currentDifficulty,
  onStartGame,
  onResetGame,
  onUndoMove,
  canUndo
}: GameControlsProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  
  const currentDifficultySettings = difficultySettings[currentDifficulty]
  const DifficultyIcon = currentDifficultySettings.icon

  const getStatusMessage = () => {
    switch (gameState) {
      case 'waiting':
        return 'Ready to start'
      case 'ready':
        return 'Game ready to begin'
      case 'playing':
        return 'Game in progress'
      case 'checkmate':
        return 'Game over - Checkmate!'
      case 'stalemate':
        return 'Game over - Stalemate'
      case 'draw':
        return 'Game over - Draw'
      default:
        return 'Unknown state'
    }
  }

  const getStatusColor = () => {
    switch (gameState) {
      case 'waiting':
      case 'ready':
        return 'blue'
      case 'playing':
        return 'green'
      case 'checkmate':
        return 'purple'
      case 'stalemate':
      case 'draw':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* Game Status */}
      <Box
        bg={bgColor}
        p={4}
        borderRadius="lg"
        borderWidth={2}
        borderColor={borderColor}
        shadow="sm"
      >
        <VStack spacing={3}>
          <HStack>
            <Icon as={DifficultyIcon} color={`${currentDifficultySettings.color}.500`} boxSize={6} />
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold">
                {currentDifficultySettings.name} Mode
              </Text>
              <Text fontSize="sm" color="gray.500">
                {currentDifficultySettings.description}
              </Text>
            </VStack>
          </HStack>
          
          <Badge colorScheme={getStatusColor()} size="lg" px={3} py={1}>
            {getStatusMessage()}
          </Badge>
        </VStack>
      </Box>

      {/* Game Actions */}
      <Box
        bg={bgColor}
        p={4}
        borderRadius="lg"
        borderWidth={2}
        borderColor={borderColor}
        shadow="sm"
      >
        <VStack spacing={3}>
          {gameState === 'waiting' || gameState === 'ready' ? (
            <Button
              leftIcon={<Icon as={FaPlay} />}
              colorScheme="green"
              size="lg"
              w="full"
              onClick={onStartGame}
            >
              Start Game
            </Button>
          ) : (
            <HStack spacing={2} w="full">
              <Button
                leftIcon={<Icon as={FaUndo} />}
                variant="outline"
                size="sm"
                onClick={onUndoMove}
                isDisabled={!canUndo}
                flex="1"
              >
                Undo
              </Button>
              <Button
                leftIcon={<Icon as={FaRocketchat} />}
                variant="outline"
                size="sm"
                onClick={onResetGame}
                flex="1"
              >
                Reset
              </Button>
            </HStack>
          )}

          {/* Game Over Message */}
          {(gameState === 'checkmate' || gameState === 'stalemate' || gameState === 'draw') && (
            <Alert status={gameState === 'checkmate' ? 'success' : 'info'} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>
                  {gameState === 'checkmate' ? 'Checkmate!' : 
                   gameState === 'stalemate' ? 'Stalemate!' : 'Draw!'}
                </AlertTitle>
                <AlertDescription>
                  {gameState === 'checkmate' ? 
                    'Congratulations on your victory!' :
                    gameState === 'stalemate' ?
                    'A stalemate occurs when a player has no legal moves.' :
                    'The game has ended in a draw.'}
                </AlertDescription>
              </Box>
            </Alert>
          )}
        </VStack>
      </Box>

      {/* Quick Settings */}
      <Box
        bg={bgColor}
        p={4}
        borderRadius="lg"
        borderWidth={2}
        borderColor={borderColor}
        shadow="sm"
      >
        <VStack spacing={3} align="start">
          <Text fontSize="md" fontWeight="bold">
            Quick Settings
          </Text>
          
          <Menu>
            <MenuButton as={Button} w="full" variant="outline" size="sm">
              <HStack>
                <Icon as={FaCog} />
                <Text>Difficulty: {currentDifficultySettings.name}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              {Object.entries(difficultySettings).map(([key, settings]) => {
                const IconComponent = settings.icon
                return (
                  <MenuItem
                    key={key}
                    icon={<Icon as={IconComponent} />}
                    onClick={() => {
                      // This would be handled by the parent component
                      console.log(`Change difficulty to ${key}`)
                    }}
                    bg={currentDifficulty === key ? `${settings.color}.50` : 'transparent'}
                  >
                    <VStack align="start" spacing={0}>
                      <Text fontWeight={currentDifficulty === key ? 'bold' : 'normal'}>
                        {settings.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {settings.description}
                      </Text>
                    </VStack>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        </VStack>
      </Box>

      {/* Tips for current difficulty */}
      <Box
        bg={bgColor}
        p={4}
        borderRadius="lg"
        borderWidth={2}
        borderColor={borderColor}
        shadow="sm"
      >
        <VStack spacing={3} align="start">
          <HStack>
            <Icon as={FaCrown} color={`${currentDifficultySettings.color}.500`} />
            <Text fontSize="md" fontWeight="bold">
              {currentDifficultySettings.name} Tips
            </Text>
          </HStack>
          
          <VStack align="start" spacing={2}>
            {currentDifficulty === 'easy' && (
              <>
                <Text fontSize="sm">• Take your time to think</Text>
                <Text fontSize="sm">• Focus on basic piece development</Text>
                <Text fontSize="sm">• Don't be afraid to experiment</Text>
              </>
            )}
            {currentDifficulty === 'normal' && (
              <>
                <Text fontSize="sm">• Plan 2-3 moves ahead</Text>
                <Text fontSize="sm">• Watch for tactical opportunities</Text>
                <Text fontSize="sm">• Control the center squares</Text>
              </>
            )}
            {currentDifficulty === 'hard' && (
              <>
                <Text fontSize="sm">• Think about positional themes</Text>
                <Text fontSize="sm">• Calculate multiple variations</Text>
                <Text fontSize="sm">• Focus on long-term planning</Text>
              </>
            )}
          </VStack>
        </VStack>
      </Box>
    </VStack>
  )
}