import { Tile, Direction } from './store'

type Cell = {
  collapsed: boolean
  options: Set<string>
}

class SeededRandom {
  private seed: number

  constructor(seed: string | undefined) {
    this.seed = seed ? this.hashCode(seed) : Date.now()
  }

  private hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  choice<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)]
  }

  weightedChoice(options: string[], weights: Map<string, number>): string {
    const totalWeight = options.reduce((sum, id) => sum + (weights.get(id) || 1), 0)
    let random = this.next() * totalWeight
    
    for (const id of options) {
      random -= weights.get(id) || 1
      if (random <= 0) return id
    }
    
    return options[0]
  }
}

export function runWFC(
  tiles: Tile[],
  constraints: Record<string, Record<Direction, string[]>>,
  width: number,
  height: number,
  seed?: string
): (string | null)[][] {
  if (tiles.length === 0) return []

  const rng = new SeededRandom(seed)
  const weights = new Map(tiles.map(t => [t.id, t.weight]))
  
  // Initialize grid
  const grid: Cell[][] = Array(height).fill(null).map(() =>
    Array(width).fill(null).map(() => ({
      collapsed: false,
      options: new Set(tiles.map(t => t.id)),
    }))
  )

  // Helper to get neighbors
  const getNeighbor = (x: number, y: number, dir: Direction): Cell | null => {
    const offsets = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    }
    const [dx, dy] = offsets[dir]
    const nx = x + dx
    const ny = y + dy
    
    if (nx < 0 || nx >= width || ny < 0 || ny >= height) return null
    return grid[ny][nx]
  }

  // Propagate constraints
  const propagate = (x: number, y: number) => {
    const queue: [number, number][] = [[x, y]]
    
    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!
      const cell = grid[cy][cx]
      
      // Check each direction
      const directions: Direction[] = ['up', 'down', 'left', 'right']
      for (const dir of directions) {
        const neighbor = getNeighbor(cx, cy, dir)
        if (!neighbor || neighbor.collapsed) continue
        
        // Find valid options for neighbor
        const validOptions = new Set<string>()
        for (const tileId of cell.options) {
          const allowed = constraints[tileId]?.[dir] || []
          allowed.forEach(id => validOptions.add(id))
        }
        
        // If we have constraints, use them; otherwise allow all tiles
        if (validOptions.size === 0) {
          tiles.forEach(t => validOptions.add(t.id))
        }
        
        // Remove invalid options from neighbor
        const oldSize = neighbor.options.size
        neighbor.options = new Set(
          [...neighbor.options].filter(id => validOptions.has(id))
        )
        
        // If options changed, add neighbor to queue
        if (neighbor.options.size !== oldSize && neighbor.options.size > 0) {
          const oppositeDir: Record<Direction, Direction> = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
          }
          const [nx, ny] = getNeighborCoords(cx, cy, dir)
          if (nx !== -1 && ny !== -1) {
            queue.push([nx, ny])
          }
        }
      }
    }
  }

  const getNeighborCoords = (x: number, y: number, dir: Direction): [number, number] => {
    const offsets = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    }
    const [dx, dy] = offsets[dir]
    const nx = x + dx
    const ny = y + dy
    if (nx < 0 || nx >= width || ny < 0 || ny >= height) return [-1, -1]
    return [nx, ny]
  }

  // Main WFC loop
  let iterations = 0
  const maxIterations = width * height * 10
  
  while (iterations < maxIterations) {
    iterations++
    
    // Find cell with minimum entropy (fewest options)
    let minEntropy = Infinity
    let minCell: [number, number] | null = null
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = grid[y][x]
        if (!cell.collapsed && cell.options.size > 0) {
          // Add small random noise to break ties
          const entropy = cell.options.size + rng.next() * 0.1
          if (entropy < minEntropy) {
            minEntropy = entropy
            minCell = [x, y]
          }
        }
      }
    }
    
    // All cells collapsed or contradiction found
    if (!minCell) break
    
    // Collapse the minimum entropy cell
    const [x, y] = minCell
    const cell = grid[y][x]
    const options = [...cell.options]
    
    if (options.length === 0) {
      // Contradiction - reset this cell
      cell.options = new Set(tiles.map(t => t.id))
      continue
    }
    
    const chosen = rng.weightedChoice(options, weights)
    cell.collapsed = true
    cell.options = new Set([chosen])
    
    // Propagate constraints
    propagate(x, y)
  }
  
  // Convert grid to output format
  return grid.map(row =>
    row.map(cell => {
      if (cell.collapsed && cell.options.size === 1) {
        return [...cell.options][0]
      }
      return null
    })
  )
}
