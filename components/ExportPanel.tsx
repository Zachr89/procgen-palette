'use client'

import { useWFCStore } from '@/lib/store'
import { Download } from 'lucide-react'
import { useState } from 'react'

export function ExportPanel() {
  const { output, tiles, exportToJSON, exportToPNG } = useWFCStore()
  const [showExport, setShowExport] = useState(false)

  const handleExportJSON = (format: 'unity' | 'godot' | 'raw') => {
    const data = exportToJSON(format)
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `procgen-${format}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShowExport(false)
  }

  const handleExportPNG = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `procgen-output-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
    setShowExport(false)
  }

  if (output.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => setShowExport(!showExport)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
      >
        <Download size={18} />
        Export
      </button>

      {showExport && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowExport(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-2">
            <div className="space-y-1">
              <button
                onClick={handleExportPNG}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors"
              >
                PNG Image
              </button>
              <button
                onClick={() => handleExportJSON('unity')}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors"
              >
                Unity Tilemap JSON
              </button>
              <button
                onClick={() => handleExportJSON('godot')}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors"
              >
                Godot TileMap JSON
              </button>
              <button
                onClick={() => handleExportJSON('raw')}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors"
              >
                Raw Data Array
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
