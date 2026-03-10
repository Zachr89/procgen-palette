'use client'

import { useWFCStore } from '@/lib/store'
import { Plus, Trash2 } from 'lucide-react'
import { TileEditor } from './TileEditor'

export function TilesetPanel() {
  const { tiles, selectedTileId, addTile, removeTile, selectTile } = useWFCStore()

  return (
    <div className="flex-1 flex">
      {/* Tile List */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Tiles</h2>
          <button
            onClick={addTile}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
            title="Add Tile"
          >
            <Plus size={18} />
          </button>
        </div>
        
        <div className="space-y-2">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={`group flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                selectedTileId === tile.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-750'
              }`}
              onClick={() => selectTile(tile.id)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded border-2"
                  style={{ 
                    backgroundColor: tile.color,
                    borderColor: selectedTileId === tile.id ? '#fff' : '#4b5563'
                  }}
                />
                <span className="font-medium">{tile.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeTile(tile.id)
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {tiles.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">No tiles yet</p>
            <p className="text-sm">Click + to add your first tile</p>
          </div>
        )}
      </div>

      {/* Tile Editor */}
      <div className="flex-1">
        <TileEditor />
      </div>
    </div>
  )
}
