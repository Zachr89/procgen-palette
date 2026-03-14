# procgen-palette

A browser-based Wave Function Collapse editor for indie game developers who want accessible procedural generation without the research papers.

## What is this?

procgen-palette bridges the gap between WFC theory and practical implementation. Design tilesets, paint adjacency constraints visually, and export directly to game engines with real-time preview. No algorithm expertise required—just draw tiles and define rules.

Built after recognizing that recent WFC tutorials taught the "what" but left developers struggling with the "how" of actual implementation.

## Features

- **Visual Tile Editor** - Design tilesets directly in the browser with pixel-perfect editing
- **Constraint Painting** - Define adjacency rules by clicking, not coding
- **Real-time WFC Preview** - See procedural generation results instantly as you work
- **One-Click Export** - Generate ready-to-use code and assets for Unity, Godot, and custom engines
- **Unity Package Included** - Drop-in `.unitypackage` with editor window, runtime generator, and demo scenes
- **Preset Library** - Start from cyberpunk, desert, forest, and ocean tilesets
- **No Installation** - Runs entirely in the browser, no backend required

## Quick Start

### Web Editor

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and start designing. Your work saves to browser localStorage automatically.

### Unity Integration

1. Import `unity-package/ProcGenPalette.unitypackage` into your project
2. Open **Tools > ProcGen Palette > Editor Window**
3. Load a preset or design from scratch
4. Click **Generate** to create prefabs in your scene
5. See `unity-package/INSTALL.md` for advanced setup

## Usage Example

**Create a dungeon tileset:**

1. **Design tiles** - Draw floor, wall, corner, and door tiles in the Tile Editor
2. **Paint constraints** - Click pairs to define valid adjacencies (walls connect to walls, floors to doors)
3. **Generate** - Watch the algorithm create infinite dungeon variations in real-time
4. **Export** - Download as JSON, PNG spritesheet, or Unity ScriptableObject
5. **Integrate** - Use the Unity runtime to generate levels at game startup

**Demo video workflow:** See `docs/DEMO_VIDEO_GUIDE.md` for a complete walkthrough.

## Tech Stack

**Web Editor:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Custom WFC implementation (`lib/wfc.ts`)

**Unity Package:**
- C# runtime generator
- ScriptableObject-based tileset format
- Editor tooling with custom inspectors
- Sample scenes with camera orbit and palette transitions

## Project Structure

```
procgen-palette/
├── app/                    # Next.js pages and layouts
├── components/             # React components (TileEditor, ConstraintsPanel, etc.)
├── lib/
│   ├── store.ts           # Zustand state management
│   └── wfc.ts             # Wave Function Collapse algorithm
├── unity-package/
│   ├── Editor/            # Unity editor scripts
│   ├── Runtime/           # Game runtime scripts
│   └── Samples~/          # Demo scenes and presets
└── docs/                  # Integration guides
```

## Unity Demo Scene

The included demo scene showcases:
- Real-time palette switching (Cyberpunk → Desert → Ocean)
- Camera orbit controls
- Procedural generation with different constraint sets

Run the demo: `unity-package/Samples~/DemoScene/PaletteDemo.unity`

## License

MIT License - see LICENSE file for details.

---

**Built for indie devs tired of academic WFC implementations.** Ship procedural content today, not after reading 50 pages of constraint propagation theory.