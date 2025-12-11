'use client'

import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Button, 
  Container, 
  Heading,
  Card,
  CardBody,
  Progress,
  useColorModeValue,
  Icon,
  Badge,
  Flex
} from '@chakra-ui/react'
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheckCircle,
  FaChessKnight,
  FaChessKing,
  FaPlay
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface TutorialStep {
  id: number
  title: string
  content: string
  piece?: string
  educational?: string
  tip?: string
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Chess",
    content: "Chess is a strategic board game played between two players. The objective is to checkmate your opponent's king.",
    educational: "Chess originated in India around the 6th century as 'Chaturanga'. It spread throughout the world and became known as 'Shatranj' in Arabic, eventually evolving into modern chess.",
    tip: "Think of chess as a battlefield where each piece has its own role and abilities!"
  },
  {
    id: 2,
    title: "The Chess Board",
    content: "The chess board has 64 squares arranged in an 8x8 grid. Each square has a unique position identified by coordinates.",
    educational: "The chess board squares alternate between light and dark colors, starting with a dark square in the right corner for each player.",
    tip: "Remember: 'White on the right' - the rightmost square should always be dark."
  },
  {
    id: 3,
    title: "Understanding Pieces",
    content: "Each player has 6 types of pieces: King, Queen, Rook, Bishop, Knight, and Pawns.",
    educational: "The queen is the most powerful piece because she can move like both rook and bishop combined. In some historical variations, the queen was much weaker!",
    tip: "The queen and king should stay close together for protection."
  },
  {
    id: 4,
    title: "The King - Most Important Piece",
    content: "The king moves one square in any direction. It must be protected at all costs as losing it means losing the game.",
    educational: "The king can never be captured, only 'checkmated'. The word 'checkmate' comes from Persian 'shah mat' meaning 'the king is helpless'.",
    tip: "Your king's safety is always the top priority. Keep it protected with your pieces!"
  },
  {
    id: 5,
    title: "The Queen - The Powerhouse",
    content: "The queen can move any number of squares in any direction - horizontally, vertically, or diagonally.",
    educational: "The queen was originally the weakest piece, moving only one square diagonally. It became powerful in the 15th century when chess rules were modernized.",
    tip: "Use the queen wisely - it's powerful but important to protect it from being traded away carelessly."
  },
  {
    id: 6,
    title: "The Rook - The Castle",
    content: "The rook moves any number of squares horizontally or vertically. It's strong for controlling open files.",
    educational: "Rooks are shaped like castle towers, which is why they're sometimes called 'castles'. They represent the fortified towers of medieval castles.",
    tip: "Rooks are most effective when connected (protecting each other) and placed on open files."
  },
  {
    id: 7,
    title: "The Bishop - The Diagonal Master",
    content: "Bishops move diagonally any number of squares. Each player has one dark-squared and one light-squared bishop.",
    educational: "Bishops represent medieval war elephants, which explains their L-shaped movement in early chess. The modern diagonal movement was a later development.",
    tip: "Remember: bishops stay on their color forever! A dark-squared bishop can never reach a light square."
  },
  {
    id: 8,
    title: "The Knight - The L-Shaped Wonder",
    content: "Knights move in an L-shape: two squares in one direction, then one square perpendicular. They can jump over pieces.",
    educational: "The knight represents a cavalry unit, explaining its unique jumping ability. Unlike other pieces, knights can 'jump over' obstacles.",
    tip: "Knights are excellent for surprise attacks because they can move to squares that seem protected!"
  },
  {
    id: 9,
    title: "The Pawn - The Courageous Foot Soldier",
    content: "Pawns move forward one square, but capture diagonally. On their first move, they can move two squares forward.",
    educational: "Pawns are the only pieces that move differently when capturing versus moving. The two-square first move was introduced in the 15th century to speed up the game.",
    tip: "Don't underestimate pawns! They can become queens if they reach the end of the board."
  },
  {
    id: 10,
    title: "Special Moves - Castling",
    content: "Castling is a special move where the king and rook move simultaneously to protect the king.",
    educational: "Castling was introduced in the 16th century to speed up the game and protect the king. It's the only move where two pieces move at once.",
    tip: "Castle early in most games to get your king to safety and activate your rook!"
  },
  {
    id: 11,
    title: "Check and Checkmate",
    content: "When the king is under attack, it's 'in check'. If the king cannot escape, it's 'checkmate' and the game ends.",
    educational: "The fastest possible checkmate is called 'Fool's Mate' and happens in just 2 moves! The longest official game lasted 269 moves over 20 hours.",
    tip: "Always check if your move leaves your own king in check - it's illegal and you'll lose the game!"
  },
  {
    id: 12,
    title: "Ready to Play!",
    content: "Congratulations! You now know the basics of chess. You're ready to start playing and learning more advanced strategies.",
    educational: "There are over 400 different possible first moves in chess, and the total number of possible games is estimated to be around 10^120 - more than atoms in the observable universe!",
    tip: "Practice makes perfect! Start with easy opponents and gradually challenge yourself to improve."
  }
]

export default function TutorialPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100
  const currentStepData = tutorialSteps[currentStep]

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const startPlaying = () => {
    router.push('/chess?difficulty=easy')
  }

  return (
    <Box minH="100vh" bgGradient="linear(to-br, green.50, blue.50)" py={10}>
      <Container maxW="4xl">
        {/* Header */}
        <VStack spacing={6} mb={8}>
          <HStack w="full" justify="space-between">
            <Button
              leftIcon={<Icon as={FaArrowLeft} />}
              variant="ghost"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Badge colorScheme="blue" px={4} py={2} borderRadius="full">
              Tutorial {currentStep + 1} of {tutorialSteps.length}
            </Badge>
          </HStack>
          
          <Progress 
            value={progress} 
            w="full" 
            colorScheme="blue" 
            size="lg" 
            borderRadius="full"
          />
        </VStack>

        {/* Main Content */}
        <MotionBox
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card bg={cardBg} shadow="xl" borderRadius="2xl">
            <CardBody p={8}>
              <VStack spacing={6} align="start">
                {/* Title */}
                <Flex align="center" gap={4}>
                  <Icon as={FaChessKnight} boxSize={10} color="blue.500" />
                  <VStack align="start" spacing={1}>
                    <Heading size="xl">{currentStepData.title}</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Step {currentStep + 1}
                    </Text>
                  </VStack>
                </Flex>

                {/* Main Content */}
                <Box 
                  p={6} 
                  bgGradient="linear(to-r, blue.50, purple.50)" 
                  borderRadius="xl"
                  w="full"
                >
                  <Text fontSize="lg" lineHeight="tall">
                    {currentStepData.content}
                  </Text>
                </Box>

                {/* Educational Fact */}
                {currentStepData.educational && (
                  <Box 
                    p={6} 
                    bgGradient="linear(to-r, green.50, teal.50)" 
                    borderRadius="xl"
                    borderLeft="4px solid"
                    borderColor="green.400"
                    w="full"
                  >
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <Icon as={FaCheckCircle} color="green.500" />
                        <Text fontWeight="bold" color="green.700">
                          Educational Insight
                        </Text>
                      </HStack>
                      <Text color="green.800" lineHeight="tall">
                        {currentStepData.educational}
                      </Text>
                    </VStack>
                  </Box>
                )}

                {/* Pro Tip */}
                {currentStepData.tip && (
                  <Box 
                    p={6} 
                    bgGradient="linear(to-r, yellow.50, orange.50)" 
                    borderRadius="xl"
                    borderLeft="4px solid"
                    borderColor="yellow.400"
                    w="full"
                  >
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <Icon as={FaChessKing} color="orange.500" />
                        <Text fontWeight="bold" color="orange.700">
                          Pro Tip
                        </Text>
                      </HStack>
                      <Text color="orange.800" fontStyle="italic" lineHeight="tall">
                        {currentStepData.tip}
                      </Text>
                    </VStack>
                  </Box>
                )}

                {/* Navigation */}
                <HStack w="full" justify="space-between" pt={6}>
                  <Button
                    leftIcon={<Icon as={FaArrowLeft} />}
                    variant="outline"
                    onClick={prevStep}
                    isDisabled={currentStep === 0}
                  >
                    Previous
                  </Button>

                  {currentStep === tutorialSteps.length - 1 ? (
                    <Button
                      leftIcon={<Icon as={FaPlay} />}
                      colorScheme="green"
                      size="lg"
                      onClick={startPlaying}
                    >
                      Start Playing!
                    </Button>
                  ) : (
                    <Button
                      rightIcon={<Icon as={FaArrowRight} />}
                      colorScheme="blue"
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  )
}