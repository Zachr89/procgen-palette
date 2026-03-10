'use client'

import { useWFCStore } from '@/lib/store'
import { useEffect, useRef } from 'react'

export function OutputCanvas() {
  const { output, tiles } = useWFCStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !output.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gridHeight = output.length
    const gridWidth = output[0].length
    const cellSize = Math.min(
      canvas.width / gridWidth,
      canvas.height / gridHeight
    )

    // Clear canvas
    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw tiles
    output.forEach((row, y) => {
      row.forEach((tileId, x) => {
        if (!tileId) {
          // Uncollapsed cell
          ctx.fillStyle = '#1f2937'
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          ctx.strokeStyle = '#374151'
          ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
        } else {
          const tile = tiles.find(t => t.id === tileId)
          if (tile) {
            // Draw tile pixels
            const pixelSize = cellSize / tile.size
            tile.pixels.forEach((pixelRow, py) => {
              pixelRow.forEach((color, px) => {
                ctx.fillStyle = color || tile.color
                ctx.fillRect(
                  x * cellSize + px * pixelSize,
                  y * cellSize + py * pixelSize,
                  pixelSize,
                  pixelSize
                )
              })
            })
          }
        }
      })
    })

    // Draw grid
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    for (let i = 0; i <= gridWidth; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, gridHeight * cellSize)
      ctx.stroke()
    }
    for (let i = 0; i <= gridHeight; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(gridWidth * cellSize, i * cellSize)
      ctx.stroke()
    }
  }, [output, tiles])

  if (!output.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No output yet</p>
          <p className="text-sm">Configure settings and click Generate</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-full">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="border-2 border-gray-700 rounded-lg shadow-2xl"
      />
    </div>
  )
}
