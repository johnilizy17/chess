import { ChakraProvider } from '@chakra-ui/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Educational 3D Chess',
  description: 'Learn chess with AI-powered 3D educational game',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}