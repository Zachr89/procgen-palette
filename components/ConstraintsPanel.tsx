'use client'

import { useWFCStore } from '@/lib/store'
import { ArrowRight, ArrowDown, ArrowLeft, ArrowUp } from 'lucide-react'

const DIRECTIONS = [
  { id: 'right', label: 'Right', icon: ArrowRight },
  { id: 'down', label: 'Down', icon: ArrowDown },
  { id: 'left', label: 'Left', icon: ArrowLeft },
  { id: 'up', label: 'Up', icon: ArrowUp },
] as const

export function ConstraintsPanel() {
  const { tiles, selectedTileId, constraints, toggleConstraint, selectTile } = useWFCStore()
  const selectedTile = tiles.find(t => t.id === selectedTileId)

  if (!selectedTile) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No tile selected</p>
          <p className="text-sm">Select a tile to define its adjacency rules</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      {/* Tile Selector */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Setting constraints for:
        </label>
        <select
          value={selectedTile.id}
          onChange={(e) => selectTile(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {tiles.map(tile => (
            <option key={tile.id} value={tile.id}>{tile.name}</option>
          ))}
        </select>
      </div>

      {/* Constraints Grid */}
      <div className="p-6 space-y-8">
        <div className="text-center">
          <div 
            className="inline-block w-16 h-16 rounded-lg border-4 border-blue-500"
            style={{ backgroundColor: selectedTile.color }}
          />
          <p className="mt-2 text-sm text-gray-400">
            Which tiles can appear in each direction?
          </p>
        </div>

        {DIRECTIONS.map(direction => {
          const Icon = direction.icon
          const dirConstraints = constraints[selectedTile.id]?.[direction.id] || []

          return (
            <div key={direction.id} className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Icon size={20} />
                <h3 className="font-semibold">{direction.label}</h3>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {tiles.map(tile => {
                  const isAllowed = dirConstraints.includes(tile.id)
                  
                  return (
                    <button
                      key={tile.id}
                      onClick={() => toggleConstraint(selectedTile.id, direction.id, tile.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isAllowed
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-gray-700 bg-gray-800 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <div 
                        className="w-full h-12 rounded mb-2"
                        style={{ backgroundColor: tile.color }}
                      />
                      <p className="text-xs text-center text-gray-300 truncate">
                        {tile.name}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
