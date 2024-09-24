'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Button } from '../components/ui/button'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>Uh oh... Something went wrong</h1>
      <Button
        type='button'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
