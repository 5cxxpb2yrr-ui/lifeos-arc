import React from 'react'
import { Search } from 'lucide-react'
import Input from '../ui/Input'

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSelect?: (item: string) => void
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = React.useState('')

  const commands = [
    { id: '1', label: 'Go to Dashboard', group: 'Navigation' },
    { id: '2', label: 'Create Event', group: 'Actions' },
    { id: '3', label: 'Create Goal', group: 'Actions' },
    { id: '4', label: 'Add Person', group: 'Actions' },
    { id: '5', label: 'Open Loop', group: 'Actions' },
    { id: '6', label: 'Weekly Review', group: 'Navigation' },
  ]

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-16 z-50">
      <div className="bg-panel rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-gray-400" />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose()
              }}
              placeholder="Type a command..."
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No commands found</div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  onSelect?.(cmd.label)
                  onClose()
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-0"
              >
                <div className="font-medium text-white">{cmd.label}</div>
                <div className="text-xs text-gray-400">{cmd.group}</div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
