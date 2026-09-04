import React from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    { label: 'Dashboard', href: '/', icon: '📊' },
    { label: 'Events', href: '/events', icon: '📅' },
    { label: 'People', href: '/people', icon: '👥' },
    { label: 'Assets', href: '/assets', icon: '💰' },
    { label: 'Open Loops', href: '/loops', icon: '🔄' },
    { label: 'Goals', href: '/goals', icon: '🎯' },
    { label: 'Decisions', href: '/decisions', icon: '⚖️' },
    { label: 'Weekly Review', href: '/review', icon: '📋' },
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden bg-panel p-2 rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-surface border-r border-gray-700 p-6 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">LifeOS</h1>
          <p className="text-xs text-gray-400 mt-1">Event-Centric OS</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-panel hover:text-white transition-colors"
              onClick={() => onToggle()}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
