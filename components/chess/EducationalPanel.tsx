'use client'

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Badge,
  Icon,
  Progress,
  Divider,
  useColorModeValue,
  Collapse
} from '@chakra-ui/react'
import {
  FaLightbulb,
  FaHistory,
  FaTrophy,
  FaClock,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa'
import { useState } from 'react'
import { MoveHistory } from '../../types/chess'

interface EducationalPanelProps {
  educationalFact: string | null
  moveHistory: MoveHistory[]
  currentMove: number
  piece?: string
}

interface MoveAnalysis {
  totalMoves: number
  whiteMoves: number
  blackMoves: number
  averageMoveTime: number
  mistakes: number
  goodMoves: number
}

export default function EducationalPanel({
  educationalFact,
  moveHistory,
  currentMove
}: EducationalPanelProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    facts: true,
    history: true,
    analysis: false
  })

  const panelBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Calculate move analysis
  const analysis: MoveAnalysis = {
    totalMoves: moveHistory.length,
    whiteMoves: moveHistory.filter((_, index) => index % 2 === 0).length,
    blackMoves: moveHistory.filter((_, index) => index % 2 === 1).length,
    averageMoveTime: 45, // Simulated
    mistakes: 0, // Would need engine analysis
    goodMoves: moveHistory.length * 0.8 // Simulated
  }

  const getMoveEfficiency = () => {
    if (moveHistory.length === 0) return 0
    const blackMoveCount = Math.floor(currentMove / 2)
    const whiteMoveCount = Math.ceil(currentMove / 2)
    return Math.min((blackMoveCount / whiteMoveCount) * 100, 100)
  }

  return (
    <VStack spacing={4} w="full">
      {/* Educational Fact */}
      <Card bg={panelBg} shadow="lg" borderRadius="xl" w="full">
        <CardBody p={6}>
          <VStack spacing={4} align="start">
            <HStack justify="space-between" w="full">
              <HStack>
                <Icon as={FaLightbulb} boxSize={6} color="yellow.500" />
                <Text fontSize="lg" fontWeight="bold">
                  Educational Insight
                </Text>
              </HStack>
              <Button
                size="sm"
                variant="ghost"
                rightIcon={
                  <Icon 
                    as={expandedSections.facts ? FaChevronUp : FaChevronDown} 
                  />
                }
                onClick={() => toggleSection('facts')}
              >
                {expandedSections.facts ? 'Hide' : 'Show'}
              </Button>
            </HStack>
            
            <Collapse in={expandedSections.facts}>
              {educationalFact ? (
                <Box 
                  p={4} 
                  bgGradient="linear(to-r, yellow.50, orange.50)" 
                  borderRadius="lg"
                  borderLeft="4px solid"
                  borderColor="yellow.400"
                  w="full"
                >
                  <Text 
                    fontSize="md" 
                    lineHeight="tall"
                    sx={{
                      '& strong': {
                        color: 'orange.700',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {educationalFact.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < educationalFact.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </Text>
                </Box>
              ) : (
                <Box 
                  p={4} 
                  bg={useColorModeValue('gray.50', 'gray.700')} 
                  borderRadius="lg"
                  textAlign="center"
                >
                  <Text color="gray.500" fontStyle="italic">
                    Make a move to receive educational insights about chess strategy and history!
                  </Text>
                </Box>
              )}
            </Collapse>
          </VStack>
        </CardBody>
      </Card>

      {/* Game Statistics */}
      <Card bg={panelBg} shadow="lg" borderRadius="xl" w="full">
        <CardBody p={6}>
          <VStack spacing={4} align="start">
            <HStack justify="space-between" w="full">
              <HStack>
                <Icon as={FaTrophy} boxSize={6} color="blue.500" />
                <Text fontSize="lg" fontWeight="bold">
                  Game Progress
                </Text>
              </HStack>
              <Button
                size="sm"
                variant="ghost"
                rightIcon={
                  <Icon 
                    as={expandedSections.analysis ? FaChevronUp : FaChevronDown} 
                  />
                }
                onClick={() => toggleSection('analysis')}
              >
                {expandedSections.analysis ? 'Hide' : 'Show'}
              </Button>
            </HStack>

            <Collapse in={expandedSections.analysis}>
              <VStack spacing={3} w="full">
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">Moves Played:</Text>
                  <Text fontWeight="bold">{moveHistory.length}</Text>
                </HStack>
                
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">White Moves:</Text>
                  <HStack>
                    <Badge colorScheme="white" variant="outline">
                      {analysis.whiteMoves}
                    </Badge>
                  </HStack>
                </HStack>
                
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">Black Moves (AI):</Text>
                  <HStack>
                    <Badge colorScheme="blackAlpha" variant="outline">
                      {analysis.blackMoves}
                    </Badge>
                  </HStack>
                </HStack>

                <Divider />

                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600">Game Progress</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {Math.round((moveHistory.length / 40) * 100)}%
                    </Text>
                  </HStack>
                  <Progress 
                    value={(moveHistory.length / 40) * 100} 
                    colorScheme="blue" 
                    size="md" 
                    borderRadius="full"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Average game length: 40 moves
                  </Text>
                </Box>

                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600">Move Efficiency</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {getMoveEfficiency().toFixed(0)}%
                    </Text>
                  </HStack>
                  <Progress 
                    value={getMoveEfficiency()} 
                    colorScheme="green" 
                    size="md" 
                    borderRadius="full"
                  />
                </Box>
              </VStack>
            </Collapse>
          </VStack>
        </CardBody>
      </Card>

      {/* Move History */}
      <Card bg={panelBg} shadow="lg" borderRadius="xl" w="full">
        <CardBody p={6}>
          <VStack spacing={4} align="start">
            <HStack justify="space-between" w="full">
              <HStack>
                <Icon as={FaHistory} boxSize={6} color="purple.500" />
                <Text fontSize="lg" fontWeight="bold">
                  Move History
                </Text>
              </HStack>
              <Button
                size="sm"
                variant="ghost"
                rightIcon={
                  <Icon 
                    as={expandedSections.history ? FaChevronUp : FaChevronDown} 
                  />
                }
                onClick={() => toggleSection('history')}
              >
                {expandedSections.history ? 'Hide' : 'Show'}
              </Button>
            </HStack>

            <Collapse in={expandedSections.history}>
              {moveHistory.length === 0 ? (
                <Box 
                  p={4} 
                  bg={useColorModeValue('gray.50', 'gray.700')} 
                  borderRadius="lg"
                  textAlign="center"
                  w="full"
                >
                  <Text color="gray.500" fontStyle="italic">
                    No moves have been played yet. Start the game to see your move history!
                  </Text>
                </Box>
              ) : (
                <VStack spacing={2} w="full" maxH="300px" overflowY="auto">
                  {moveHistory.map((move, index) => (
                    <Box
                      key={index}
                      p={3}
                      bg={index % 2 === 0 ? useColorModeValue('gray.50', 'gray.700') : 'transparent'}
                      borderRadius="md"
                      w="full"
                    >
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={1}>
                          <HStack>
                            <Badge 
                              colorScheme={move.isAI ? 'red' : 'blue'} 
                              size="sm"
                            >
                              {Math.floor(index / 2) + 1}.
                            </Badge>
                            {move.isCheck && (
                              <Badge colorScheme="yellow" size="sm">
                                +
                              </Badge>
                            )}
                            {move.isCheckmate && (
                              <Badge colorScheme="purple" size="sm">
                                #
                              </Badge>
                            )}
                          </HStack>
                          <Text fontSize="sm" fontFamily="mono">
                            {move.from} → {move.to}
                          </Text>
                          {move.captured && (
                            <Text fontSize="xs" color="gray.500">
                              Captured: {move.captured}
                            </Text>
                          )}
                        </VStack>
                        
                        <VStack align="end" spacing={1}>
                          <Text fontSize="xs" color="gray.500">
                            {move.timestamp.toLocaleTimeString()}
                          </Text>
                          <Badge 
                            colorScheme={move.piece === move.piece.toUpperCase() ? 'white' : 'blackAlpha'}
                            variant="outline"
                            size="sm"
                          >
                            {move.piece.toUpperCase()}
                          </Badge>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
            </Collapse>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  )
}