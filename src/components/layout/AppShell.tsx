import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export interface AppShellProps {
  children: React.ReactNode
  onLogout?: () => void
}

const AppShell: React.FC<AppShellProps> = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AppShell
