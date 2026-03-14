# procgen-palette

**Wave Function Collapse editor that actually ships to game engines.**

## What is this?

procgen-palette bridges the gap between WFC theory and practical game development. Design tilesets, paint adjacency constraints, and generate procedural levels in real-time—all in your browser. Export directly to Unity, Godot, or JSON with zero friction. Built for indie devs who want accessible procgen tooling without drowning in research papers.

## Features

- **Visual Tileset Editor** – Draw tiles pixel-by-pixel or import spritesheets
- **Constraint Painting** – Click to define which tiles can neighbor each other
- **Real-Time Preview** – See WFC generation results instantly as you edit
- **Multi-Engine Export** – One-click export to Unity package, Godot scenes, or raw JSON
- **Sample Palettes** – Ocean, Forest, Sunset, Cyberpunk, and Desert presets included
- **Unity Integration** – Full editor window with ScriptableObject workflow
- **Browser-Based** – No installation, works offline, runs everywhere

## Quick Start

### Web Editor

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start designing.

### Unity Package

1. Download the latest `.unitypackage` from [Releases](#)
2. Import into Unity (Assets → Import Package → Custom Package)
3. Open editor: `Tools → ProcGen Palette → Editor Window`
4. Load a sample palette or create your own
5. Hit **Generate** to spawn levels in your scene

Full Unity setup: [unity-package/INSTALL.md](unity-package/INSTALL.md)

## Usage

### Creating a Tileset

1. Click **Add Tile** in the Tileset Panel
2. Use the Tile Editor to draw your tile (or paste from clipboard)
3. Repeat for all tile variants (floor, wall, corners, etc.)

### Defining Constraints

1. Select a tile from the Tileset Panel
2. In the Constraints Panel, click neighbor slots to allow/disallow adjacent tiles
3. Use directional toggles (↑ ↓ ← →) to set per-edge rules

### Generating Levels

1. Set output dimensions in the Control Panel
2. Click **Generate** to run WFC algorithm
3. Adjust seed or constraints and regenerate instantly

### Exporting

**Unity:**
- Click **Export → Unity Package**
- Import `.unitypackage` into your project
- Use `PaletteGenerator.Generate()` at runtime

**Godot:**
- Export → Godot Scene (`.tscn`)
- Drag into your project and instantiate

**JSON:**
- Export → JSON for custom integrations

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)

**Algorithm:**
- Custom WFC implementation with entropy-based tile selection
- Backtracking for constraint resolution

**Unity Integration:**
- C# runtime + editor scripts
- ScriptableObject architecture
- Assembly definitions for clean dependency management

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Contributing:** Issues and PRs welcome. See [OVERVIEW.md](OVERVIEW.md) for architecture details.

**Support:** Star the repo if this saved you time. Share with devs who need better procgen tools.