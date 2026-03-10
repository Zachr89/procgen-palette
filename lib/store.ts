import { create } from 'zustand'
import { runWFC } from './wfc'

export interface Tile {
  id: string
  name: string
  color: string
  weight: number
  size: number
  pixels: (string | null)[][] // pixel art grid
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface WFCState {
  tiles: Tile[]
  selectedTileId: string | null
  constraints: Record<string, Record<Direction, string[]>>
  output: (string | null)[][]
  isGenerating: boolean

  // Tile management
  addTile: () => void
  removeTile: (id: string) => void
  updateTile: (id: string, updates: Partial<Tile>) => void
  selectTile: (id: string) => void

  // Constraint management
  toggleConstraint: (tileId: string, direction: Direction, allowedTileId: string) => void

  // Generation
  generate: (width: number, height: number, seed?: string) => void
  step: (width: number, height: number) => void
  reset: () => void

  // Export
  exportToJSON: (format: 'unity' | 'godot' | 'raw') => any
  exportToPNG: () => void
}

const createEmptyPixels = (size: number): (string | null)[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(null))
}

export const useWFCStore = create<WFCState>((set, get) => ({
  tiles: [],
  selectedTileId: null,
  constraints: {},
  output: [],
  isGenerating: false,

  addTile: () => {
    const id = `tile-${Date.now()}`
    const tile: Tile = {
      id,
      name: `Tile ${get().tiles.length + 1}`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      weight: 5,
      size: 8,
      pixels: createEmptyPixels(8),
    }
    set(state => ({
      tiles: [...state.tiles, tile],
      selectedTileId: id,
    }))
  },

  removeTile: (id) => {
    set(state => ({
      tiles: state.tiles.filter(t => t.id !== id),
      selectedTileId: state.selectedTileId === id ? null : state.selectedTileId,
      constraints: Object.fromEntries(
        Object.entries(state.constraints).filter(([key]) => key !== id)
      ),
    }))
  },

  updateTile: (id, updates) => {
    set(state => ({
      tiles: state.tiles.map(t => t.id === id ? { ...t, ...updates } : t),
    }))
  },

  selectTile: (id) => {
    set({ selectedTileId: id })
  },

  toggleConstraint: (tileId, direction, allowedTileId) => {
    set(state => {
      const current = state.constraints[tileId]?.[direction] || []
      const newConstraints = { ...state.constraints }
      
      if (!newConstraints[tileId]) {
        newConstraints[tileId] = { up: [], down: [], left: [], right: [] }
      }

      const isAllowed = current.includes(allowedTileId)
      newConstraints[tileId][direction] = isAllowed
        ? current.filter(id => id !== allowedTileId)
        : [...current, allowedTileId]

      return { constraints: newConstraints }
    })
  },

  generate: async (width, height, seed) => {
    set({ isGenerating: true })
    const { tiles, constraints } = get()
    
    // Run WFC algorithm
    const result = runWFC(tiles, constraints, width, height, seed)
    
    set({ 
      output: result,
      isGenerating: false 
    })
  },

  step: (width, height) => {
    // For now, just run full generation
    // In a real implementation, this would do one WFC iteration
    get().generate(width, height)
  },

  reset: () => {
    set({ output: [] })
  },

  exportToJSON: (format) => {
    const { output, tiles } = get()
    
    if (format === 'unity') {
      return {
        format: 'Unity Tilemap',
        version: '1.0',
        grid: {
          width: output[0]?.length || 0,
          height: output.length,
          cellSize: 1,
        },
        tiles: output.map(row => 
          row.map(tileId => {
            const tile = tiles.find(t => t.id === tileId)
            return tile ? { id: tile.id, name: tile.name, color: tile.color } : null
          })
        ),
      }
    }

    if (format === 'godot') {
      return {
        format: 'Godot TileMap',
        version: '4.0',
        data: output.map(row =>
          row.map(tileId => {
            const tile = tiles.find(t => t.id === tileId)
            return tile ? tiles.indexOf(tile) : -1
          })
        ),
        tileset: tiles.map(t => ({
          name: t.name,
          color: t.color,
        })),
      }
    }

    // Raw format
    return {
      format: 'raw',
      width: output[0]?.length || 0,
      height: output.length,
      data: output,
      tiles: tiles,
    }
  },

  exportToPNG: () => {
    // Handled in ExportPanel component
  },
}))
