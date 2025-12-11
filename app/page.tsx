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
  SimpleGrid,
  Icon,
  useColorModeValue,
  Badge
} from '@chakra-ui/react'
import { 
  FaGraduationCap, 
  FaRobot, 
  FaBrain, 
  FaPlay,
  FaCrown,
  FaChessBoard,
  FaBookOpen
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function HomePage() {
  const router = useRouter()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const gameModes = [
    {
      id: 'tutorial',
      title: 'Learn Chess',
      description: 'Interactive tutorial for beginners',
      icon: FaGraduationCap,
      color: 'blue',
      difficulty: 'Beginner',
      features: ['Step-by-step lessons', 'Visual explanations', 'Practice exercises']
    },
    {
      id: 'easy',
      title: 'Easy AI',
      description: 'Play against friendly AI',
      icon: FaRobot,
      color: 'green',
      difficulty: 'Beginner',
      features: ['Gentle mistakes', 'Teaching hints', 'Patience']
    },
    {
      id: 'normal',
      title: 'Normal AI',
      description: 'Balanced challenge',
      icon: FaBrain,
      color: 'yellow',
      difficulty: 'Intermediate',
      features: ['Strategic thinking', 'Balanced play', 'Learning opportunities']
    },
    {
      id: 'hard',
      title: 'Advanced AI',
      description: 'Master-level challenge',
      icon: FaCrown,
      color: 'red',
      difficulty: 'Advanced',
      features: ['High skill level', 'Complex strategies', 'Challenge mode']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <Box minH="100vh" bgGradient="linear(to-br, blue.50, purple.50)" py={10}>
      <Container maxW="7xl">
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          textAlign="center"
          mb={12}
        >
          <VStack spacing={4}>
            <MotionBox variants={itemVariants}>
              <Icon as={FaChessBoard} boxSize={16} color="blue.500" />
            </MotionBox>
            <MotionBox variants={itemVariants}>
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, blue.600, purple.600)" 
                bgClip="text"
                fontWeight="bold"
              >
                Techxplora 3D Chess
              </Heading>
            </MotionBox>
            <MotionBox variants={itemVariants}>
              <Text fontSize="xl" color="gray.600" maxW="2xl">
                Master the royal game with our AI-powered educational chess platform. 
                Learn, practice, and challenge yourself in an immersive 3D environment.
              </Text>
            </MotionBox>
          </VStack>
        </MotionBox>

        <MotionBox
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {gameModes.map((mode) => {
              const IconComponent = mode.icon
              return (
                <MotionBox key={mode.id} variants={itemVariants}>
                  <Card
                    bg={cardBg}
                    shadow="lg"
                    borderRadius="xl"
                    overflow="hidden"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-8px)',
                      shadow: '2xl',
                      border: `2px solid ${mode.color}.400`
                    }}
                    onClick={() => {
                      if (mode.id === 'tutorial') {
                        router.push('/tutorial')
                      } else {
                        router.push(`/chess?difficulty=${mode.id}`)
                      }
                    }}
                  >
                    <CardBody p={6}>
                      <VStack spacing={4} align="start">
                        <HStack justify="space-between" w="full">
                          <Icon 
                            as={IconComponent} 
                            boxSize={8} 
                            color={`${mode.color}.500`} 
                          />
                          <Badge 
                            colorScheme={mode.color} 
                            variant="solid"
                            borderRadius="full"
                            px={3}
                            py={1}
                          >
                            {mode.difficulty}
                          </Badge>
                        </HStack>
                        
                        <Box>
                          <Heading size="md" mb={2}>
                            {mode.title}
                          </Heading>
                          <Text color="gray.600" mb={4}>
                            {mode.description}
                          </Text>
                        </Box>

                        <VStack align="start" spacing={2} flex="1">
                          {mode.features.map((feature, index) => (
                            <HStack key={index} spacing={2}>
                              <Icon as={FaPlay} size="sm" color={`${mode.color}.400`} />
                              <Text fontSize="sm" color="gray.500">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>

                        <Button
                          colorScheme={mode.color}
                          size="lg"
                          width="full"
                          leftIcon={<Icon as={mode.id === 'tutorial' ? FaBookOpen : FaPlay} />}
                        >
                          {mode.id === 'tutorial' ? 'Start Learning' : 'Start Game'}
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              )
            })}
          </SimpleGrid>
        </MotionBox>

        <MotionBox
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          mt={16}
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.500">
            Educational Chess • Powered by AI • Interactive Learning
          </Text>
        </MotionBox>
      </Container>
    </Box>
  )
}