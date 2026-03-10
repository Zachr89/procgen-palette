'use client'

import { useWFCStore } from '@/lib/store'
import { Play, SkipForward, RotateCcw } from 'lucide-react'
import { useState } from 'react'

export function ControlPanel() {
  const { generate, step, reset, isGenerating, tiles, constraints } = useWFCStore()
  const [width, setWidth] = useState(16)
  const [height, setHeight] = useState(16)
  const [seed, setSeed] = useState('')

  const canGenerate = tiles.length > 0 && Object.keys(constraints).length > 0

  return (
    <div className="p-6 space-y-6 bg-gray-900 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Generation Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Width
            </label>
            <input
              type="number"
              min="4"
              max="64"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value) || 4)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Height
            </label>
            <input
              type="number"
              min="4"
              max="64"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 4)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seed (optional)
            </label>
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Leave empty for random"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <div className="space-y-3">
          <button
            onClick={() => generate(width, height, seed)}
            disabled={!canGenerate || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded transition-colors"
          >
            <Play size={18} />
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>

          <button
            onClick={() => step(width, height)}
            disabled={!canGenerate || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium rounded transition-colors"
          >
            <SkipForward size={18} />
            Step
          </button>

          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        {!canGenerate && (
          <p className="text-xs text-amber-500 mt-4">
            Add tiles and set constraints before generating
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-800">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Stats</h3>
        <div className="space-y-1 text-sm text-gray-400">
          <p>Tiles: {tiles.length}</p>
          <p>Constraints: {Object.keys(constraints).length} tiles configured</p>
        </div>
      </div>
    </div>
  )
}
