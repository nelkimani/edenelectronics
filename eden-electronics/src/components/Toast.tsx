import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        background: 'var(--gold)',
        color: '#fff',
        padding: '14px 24px',
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        zIndex: 9999,
        transform: visible ? 'translateX(0)' : 'translateX(140%)',
        transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
        boxShadow: '0 8px 32px rgba(255,120,0,.4)',
        pointerEvents: 'none',
      }}
    >
      {message}
    </div>
  )
}

// Hook for toast management
export function useToast() {
  const [toast, setToast] = useState({ message: '', visible: false })
  const timeoutRef = { current: 0 }

  const showToast = (message: string) => {
    clearTimeout(timeoutRef.current)
    setToast({ message, visible: true })
    timeoutRef.current = window.setTimeout(() => {
      setToast(t => ({ ...t, visible: false }))
    }, 3000)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return { toast, showToast }
}
