# procgen-palette

**A browser-based Wave Function Collapse editor that bridges the gap between procgen theory and practical game development.**

## What is this?

procgen-palette is a visual editor for designing procedurally generated content using the Wave Function Collapse algorithm. It provides real-time tileset design, constraint painting, and instant export to game engines—no research papers required. Built for indie game developers who want accessible algorithm tooling without the complexity of traditional WFC implementations.

## Features

- **Visual Tileset Editor** – Design tiles directly in the browser with instant preview
- **Constraint Painting** – Paint adjacency rules visually instead of coding them manually
- **Real-time Generation** – See WFC output update as you modify constraints
- **Unity Integration** – Export directly to Unity with included runtime package
- **Sample Presets** – Cyberpunk, Desert, Forest, and Ocean tilesets included
- **Zero Setup** – Runs entirely in the browser, no installation needed
- **Demo Scene** – Complete Unity scene with camera controls and palette transitions

## Quick Start

### Web Editor

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start designing tilesets.

### Unity Integration

1. Copy the `unity-package` folder into your Unity project's `Packages` directory
2. Open the Palette Editor: `Tools > ProcGen Palette > Palette Editor`
3. Import sample presets from `Packages/ProcGenPalette/Samples~/Presets/`
4. Generate levels with `PaletteGenerator.Generate(paletteSO)`

See [unity-package/INSTALL.md](unity-package/INSTALL.md) for detailed instructions.

## Usage Examples

### Creating a New Tileset

1. Click "Add Tile" in the Tileset Panel
2. Draw your tile in the Tile Editor
3. Switch to the Constraints Panel
4. Paint adjacency rules by selecting tiles that can connect
5. Watch the Output Canvas generate levels in real-time

### Exporting to Unity

1. Click "Export" in the Control Panel
2. Choose "Unity ScriptableObject"
3. Save the `.asset` file to your Unity project
4. Attach `PaletteGenerator` to a GameObject
5. Assign your palette and call `Generate()`

### Using Sample Presets

```csharp
using ProcGenPalette;

public class LevelGenerator : MonoBehaviour
{
    public PaletteSO cyberpunkPalette;
    
    void Start()
    {
        var tiles = PaletteGenerator.Generate(cyberpunkPalette, 32, 32);
        // Instantiate your tile prefabs based on the output
    }
}
```

See [docs/DEMO_VIDEO_GUIDE.md](docs/DEMO_VIDEO_GUIDE.md) for video walkthroughs.

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Zustand (state management)

**WFC Implementation:**
- Custom TypeScript WFC solver ([lib/wfc.ts](lib/wfc.ts))
- Canvas API for tile rendering

**Unity Package:**
- C# Runtime + Editor scripts
- ScriptableObject-based configuration
- Sample scenes and presets included

## Project Structure

```
procgen-palette/
├── app/                    # Next.js app routes
├── components/             # React components
│   ├── WFCEditor.tsx      # Main editor orchestrator
│   ├── TileEditor.tsx     # Tile drawing canvas
│   ├── ConstraintsPanel.tsx
│   └── OutputCanvas.tsx   # WFC visualization
├── lib/
│   ├── wfc.ts             # Core WFC algorithm
│   └── store.ts           # Zustand state management
├── unity-package/
│   ├── Runtime/           # Unity runtime scripts
│   ├── Editor/            # Unity editor tools
│   └── Samples~/          # Demo scene + presets
└── docs/                  # Documentation
```

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Made for indie game devs who want powerful procgen tools without the PhD.**