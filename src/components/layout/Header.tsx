import React from 'react'
import { Bell, Settings, LogOut } from 'lucide-react'
import Button from '../ui/Button'

export interface HeaderProps {
  onLogout?: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-surface border-b border-gray-700 px-6 py-4 sticky top-0 z-20">
      <div className="ml-64 md:ml-0 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">LifeOS</h2>
          <p className="text-sm text-gray-400">Event-Centric Operating System</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-panel rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-panel rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          {onLogout && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
