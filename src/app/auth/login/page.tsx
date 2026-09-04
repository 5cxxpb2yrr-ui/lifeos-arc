'use client'

import React, { useState } from 'react'
import { Button, Card, Input } from '@/components/ui'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })
        if (signUpError) throw signUpError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
      }
      window.location.href = '/'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">LifeOS</h1>
          <p className="text-gray-400">Event-Centric Operating System</p>
        </div>

        <Card>
          <form onSubmit={handleAuth} className="space-y-4">
            <h2 className="text-xl font-bold text-white text-center">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>

            {error && (
              <div className="bg-danger/20 text-danger p-3 rounded text-sm">
                {error}
              </div>
            )}

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-400 hover:text-primary transition-colors text-sm"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : 'Need an account? Sign up'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
