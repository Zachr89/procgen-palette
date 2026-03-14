# procgen-palette

**Visual WFC editor for game developers—design tilesets, paint constraints, export instantly.**

## What is this?

procgen-palette is a browser-based Wave Function Collapse (WFC) editor that bridges the gap between procedural generation theory and practical implementation. It lets you visually design tilesets, define adjacency rules through intuitive constraint painting, and see results in real-time. No research papers required—just draw, configure, and export directly to Unity, Godot, or JSON.

Built for indie game developers who want powerful algorithm tooling without the academic overhead. The recent surge in WFC tutorials revealed a clear need: developers understand the theory but struggle with practical implementation. This tool solves that.

## Features

- **Visual Tile Editor** – Draw tiles directly in-browser with a built-in pixel editor
- **Constraint Painting** – Define adjacency rules by clicking tile edges (no manual JSON editing)
- **Real-time Preview** – Watch WFC generate outputs as you modify constraints
- **Instant Export** – One-click export to Unity packages, Godot scenes, or JSON data
- **Pre-built Sample Palettes** – Ocean, Forest, Desert, Cyberpunk, and Sunset themes included
- **Unity Integration** – Drop-in package with ScriptableObjects and editor windows
- **No Installation** – Runs entirely in your browser (or self-host with Docker)

## Quick Start

### Web Version (Fastest)

1. Open [procgen-palette.dev](#) in your browser
2. Click "New Tileset" or load a sample palette (Forest, Ocean, etc.)
3. Draw tiles in the Tile Editor
4. Click tile edges to define adjacency rules
5. Hit "Generate" to see WFC output
6. Export to your game engine

### Self-Hosted

```bash
git clone https://github.com/yourusername/procgen-palette.git
cd procgen-palette
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Unity Package

```bash
# Copy the unity-package folder into your Unity project's Packages directory
cp -r unity-package /path/to/YourProject/Packages/com.procgen.palette

# Or install via Package Manager:
# Window → Package Manager → + → Add package from disk
# Select unity-package/package.json
```

See [`unity-package/INSTALL.md`](unity-package/INSTALL.md) for detailed Unity setup instructions.

## Usage

### 1. Design Your Tileset

Use the Tile Editor to create individual tiles (grass, water, walls, etc.). Each tile is a small sprite (typically 16x16 or 32x32 pixels).

### 2. Define Constraints

Click the edges of tiles in the Constraints Panel to specify which tiles can appear adjacent to each other:

- **Green edge** = Compatible connection
- **Red edge** = Forbidden connection
- **Gray edge** = No rule defined (WFC treats as incompatible)

### 3. Generate Output

Adjust grid size, click "Generate," and watch WFC produce a tilemap that respects your constraints. Regenerate as many times as you want—each output is unique.

### 4. Export

**Unity**: Exports a `.unitypackage` with PaletteSO assets and generator scripts  
**Godot**: Exports a `.tscn` TileMap scene with configured tiles  
**JSON**: Raw tileset + constraints data for custom integrations

### Unity Runtime Example

```csharp
using ProcGenPalette;

public class MapGenerator : MonoBehaviour {
    public PaletteSO palette;
    
    void Start() {
        int[,] grid = PaletteGenerator.Generate(palette, width: 50, height: 50);
        
        // grid[x,y] contains tile IDs
        // Render with TilemapRenderer or instantiate prefabs
    }
}
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Canvas Rendering**: HTML5 Canvas API
- **WFC Algorithm**: Custom TypeScript implementation (`lib/wfc.ts`)
- **Unity Integration**: C# ScriptableObjects with custom Editor windows

## Why This Exists

After Wave Function Collapse tutorials went viral (again), dozens of developers asked: *"How do I actually use this in my game?"* Existing tools were either academic prototypes or buried in game engine plugins with poor UX.

procgen-palette makes WFC accessible: visual constraint definition, instant feedback, zero setup, and engine-ready exports. If you can draw tiles and click edges, you can generate infinite procedural levels.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Maintained by developers who ship games, not papers.**  
Contributions welcome · [Issues](https://github.com/yourusername/procgen-palette/issues) · [Discussions](https://github.com/yourusername/procgen-palette/discussions)