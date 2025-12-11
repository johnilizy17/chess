'use client'

import { useEffect, useState } from 'react'
import ChessPage from './ChessPage'

export default function ChessPageWrapper() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return null

  return <ChessPage />
}
