'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('ozt_auth')
    if (auth === 'true') {
      setIsAuthorized(true)
    } else {
      router.replace('/admin/login')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Chargement...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
