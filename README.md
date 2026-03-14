# procgen-palette

A browser-based Wave Function Collapse editor that bridges the gap between algorithm theory and practical game development.

## What is this?

procgen-palette is a real-time tileset designer and constraint editor for the Wave Function Collapse algorithm. It lets indie game developers create procedurally generated levels visually—no research papers required. Design tiles, paint adjacency rules, and instantly export working implementations to Unity or other engines.

## Features

- **Visual Tile Editor** – Draw tiles pixel-by-pixel with a built-in sprite editor
- **Constraint Painting** – Intuitively define which tiles can connect by clicking, not coding
- **Real-time Preview** – Watch your ruleset generate levels as you edit constraints
- **Instant Export** – One-click export to Unity packages, JSON, or custom formats
- **Sample Palettes** – Pre-built tilesets (Ocean, Forest, Cyberpunk, Desert, Sunset) to learn from
- **Zero Config** – Runs entirely in the browser, no installation or build process

## Quick Start

### Web Editor

```bash
# Clone the repository
git clone https://github.com/yourusername/procgen-palette.git
cd procgen-palette

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start designing.

### Unity Integration

```bash
# Import the Unity package
1. Download the latest release from the Releases page
2. In Unity: Assets > Import Package > Custom Package
3. Select procgen-palette.unitypackage
4. Import all files
```

See `unity-package/INSTALL.md` for detailed integration instructions.

## Usage

### Creating a Tileset

1. **Design Tiles** – Use the tile editor to create your sprite atlas
2. **Paint Constraints** – Click tile pairs to mark valid adjacencies (up/down/left/right)
3. **Test Generation** – Watch the output canvas generate levels in real-time
4. **Refine Rules** – Adjust constraints until you get the variety/coherence you want
5. **Export** – Download as Unity ScriptableObject, JSON, or PNG tileset

### Using in Unity

```csharp
using ProcGenPalette;

public class LevelGenerator : MonoBehaviour
{
    [SerializeField] private PaletteSO palette;
    
    void Start()
    {
        var generator = new PaletteGenerator(palette);
        int[,] output = generator.Generate(width: 20, height: 20);
        
        // Use output array to instantiate prefabs
        RenderLevel(output);
    }
}
```

### Loading Sample Palettes

Sample palettes are included in `unity-package/Samples~/`:
- **Ocean.asset** – Isometric water/beach tiles
- **Forest.asset** – Top-down woodland paths
- **Cyberpunk.asset** – Neon city blocks
- **Desert.asset** – Sandy dunes and oasis
- **Sunset.asset** – Atmospheric sky gradients

Import samples via Unity Package Manager > procgen-palette > Samples.

## Tech Stack

**Web Editor:**
- Next.js 14 (App Router)
- TypeScript
- Zustand (state management)
- Tailwind CSS
- Canvas API (tile rendering)

**Unity Package:**
- C# (Unity 2021.3+)
- ScriptableObjects (data persistence)
- Custom Editor Windows

**Algorithm:**
- Wave Function Collapse (constraint propagation)
- Backtracking solver with entropy heuristics

## Export Formats

- **Unity Package** – Complete ScriptableObject with runtime generator
- **JSON** – Portable tileset + constraint data for any engine
- **PNG Spritesheet** – Combined tile atlas with metadata
- **Godot** *(coming soon)* – GDScript export format

## License

MIT License - see LICENSE file for details.

---

**Built for game developers who want accessible procedural generation tools.**  
Found this useful? Star the repo and share your generated levels! 🎮✨