'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'

export default function Home() {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [session, router])

  return null
}
