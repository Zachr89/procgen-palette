'use client'

import { useWFCStore } from '@/lib/store'
import { HexColorPicker } from 'react-colorful'
import { useEffect, useRef, useState } from 'react'

export function TileEditor() {
  const { tiles, selectedTileId, updateTile } = useWFCStore()
  const selectedTile = tiles.find(t => t.id === selectedTileId)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState('#3b82f6')

  // Draw tile pixels on canvas
  useEffect(() => {
    if (!canvasRef.current || !selectedTile) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = selectedTile.size
    const pixelSize = canvas.width / size

    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    selectedTile.pixels.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          ctx.fillStyle = color
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
        }
      })
    })

    // Grid lines
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    for (let i = 0; i <= size; i++) {
      ctx.beginPath()
      ctx.moveTo(i * pixelSize, 0)
      ctx.lineTo(i * pixelSize, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * pixelSize)
      ctx.lineTo(canvas.width, i * pixelSize)
      ctx.stroke()
    }
  }, [selectedTile])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !selectedTile) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / (canvas.width / selectedTile.size))
    const y = Math.floor((e.clientY - rect.top) / (canvas.height / selectedTile.size))

    const newPixels = selectedTile.pixels.map(row => [...row])
    newPixels[y][x] = newPixels[y][x] ? null : brushColor

    updateTile(selectedTile.id, { pixels: newPixels })
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !selectedTile) return
    handleCanvasClick(e)
  }

  if (!selectedTile) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No tile selected</p>
          <p className="text-sm">Select or create a tile to start editing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tile Name
        </label>
        <input
          type="text"
          value={selectedTile.name}
          onChange={(e) => updateTile(selectedTile.id, { name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Base Color
        </label>
        <HexColorPicker
          color={selectedTile.color}
          onChange={(color) => updateTile(selectedTile.id, { color })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Weight (spawn probability)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={selectedTile.weight}
          onChange={(e) => updateTile(selectedTile.id, { weight: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="text-sm text-gray-400 mt-1">Current: {selectedTile.weight}</div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-300">
            Pixel Art ({selectedTile.size}x{selectedTile.size})
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Brush:</span>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-gray-700 rounded cursor-crosshair"
          onClick={handleCanvasClick}
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={handleCanvasMouseMove}
        />
        <p className="text-xs text-gray-500 mt-2">Click to toggle pixels. Hold and drag to draw.</p>
      </div>
    </div>
  )
}
