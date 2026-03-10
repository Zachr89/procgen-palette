# procgen-palette

**Visual Wave Function Collapse editor for game developers**

## What is this?

procgen-palette is a browser-based tool that makes Wave Function Collapse accessible to indie game developers. Design tilesets, paint adjacency constraints visually, and watch your procedural patterns generate in real-time. Export directly to Unity, Godot, or PNG—no research papers required.

## Features

- **Visual Tileset Editor** – Draw tiles directly in the browser with an intuitive pixel editor
- **Constraint Painting** – Define which tiles can be adjacent by clicking, not coding
- **Real-Time Generation** – Watch WFC solve your patterns instantly with adjustable parameters
- **Multi-Format Export** – One-click export to Unity Tilemap JSON, Godot TileMap, or PNG spritesheets
- **Seed Control** – Reproducible generation for debugging and refinement
- **Responsive Canvas** – Adjustable output grid size for testing different map dimensions

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/procgen-palette.git
cd procgen-palette

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Create Tiles** – Use the tile editor to design your tileset (terrain, walls, floors, etc.)
2. **Set Constraints** – Click tile pairs in the constraints panel to define valid adjacencies
3. **Generate** – Hit "Generate" to run the WFC algorithm and see results on the output canvas
4. **Refine** – Adjust tile weights, tweak constraints, or change the seed until you're satisfied
5. **Export** – Choose your target engine and download ready-to-use game assets

### Example Workflow

```typescript
// The WFC solver runs automatically when you:
// - Modify constraints
// - Change tile weights
// - Click "Generate" with a new seed

// Export formats supported:
// - Unity: Tilemap JSON with tile references
// - Godot: TileMap resource format
// - PNG: Combined spritesheet with metadata
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Canvas Rendering**: HTML5 Canvas API
- **Algorithm**: Wave Function Collapse (custom implementation)

## Project Structure

```
procgen-palette/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── WFCEditor.tsx
│   ├── TilesetPanel.tsx
│   ├── TileEditor.tsx
│   ├── ConstraintsPanel.tsx
│   ├── OutputCanvas.tsx
│   ├── ControlPanel.tsx
│   └── ExportPanel.tsx
├── lib/
│   ├── store.ts      # Zustand state management
│   └── wfc.ts        # WFC algorithm implementation
└── public/           # Static assets
```

## License

MIT License - see LICENSE file for details.

---

**Built for indie devs who want procgen power without the PhD.**