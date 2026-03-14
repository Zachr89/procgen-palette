# ProcGen Palette - Unity Package

Procedural color palette generation for Unity. Generate harmonious color schemes and use them directly in your projects.

## Installation

### Method 1: Unity Package Manager (Recommended)

1. Download `ProcGenPalette.unitypackage` from the [Releases](https://github.com/yourusername/procgen-palette/releases) page
2. In Unity, go to **Assets > Import Package > Custom Package**
3. Select the downloaded `.unitypackage` file
4. Click **Import** to add all files to your project

### Method 2: Manual Installation

1. Copy the `unity-package` folder contents into your Unity project's `Assets/ProcGenPalette` directory
2. Unity will automatically compile the scripts

## Quick Start

### Using Pre-made Palettes

1. Navigate to **Window > ProcGen Palette > Palette Preview**
2. In the Samples folder, find example palettes: Ocean, Forest, Sunset, Cyberpunk, Desert
3. Drag a palette asset into any `PaletteGenerator` component

### Generating Runtime Palettes

```csharp
using ProcGenPalette;
using UnityEngine;

public class Example : MonoBehaviour
{
    private PaletteGenerator generator;

    void Start()
    {
        generator = gameObject.AddComponent<PaletteGenerator>();
        generator.colorCount = 6;
        generator.baseHue = 200f; // Blue-ish
        generator.paletteType = PaletteGenerator.PaletteType.Analogous;
        generator.GeneratePalette();

        // Use generated colors
        Color firstColor = generator.GetColor(0);
        Color randomColor = generator.GetRandomColor();
    }
}
```

### Creating Custom Palette Assets

1. Right-click in Project window
2. Select **Create > ProcGen Palette > Palette**
3. Configure colors in the Inspector
4. Use in `PaletteGenerator` components or reference directly

## Components

### PaletteGenerator (MonoBehaviour)

Attach to any GameObject to generate or use color palettes.

**Properties:**
- `paletteAsset` - Optional pre-configured palette
- `generateOnStart` - Auto-generate on Start()
- `colorCount` - Number of colors (2-16)
- `baseHue` - Starting hue angle (0-360°)
- `paletteType` - Generation algorithm

**Methods:**
- `GeneratePalette()` - Generate new colors
- `GetColor(int index)` - Get color by index
- `GetRandomColor()` - Get random color from palette

### PaletteSO (ScriptableObject)

Reusable palette asset that can be shared across scenes.

**Properties:**
- `paletteName` - Display name
- `description` - Usage notes
- `colors` - List of colors

## Palette Types

- **Analogous** - Colors adjacent on the color wheel (harmonious)
- **Complementary** - Opposite colors (high contrast)
- **Triadic** - Three colors evenly spaced (balanced)
- **Tetradic** - Four colors in two complementary pairs (rich)
- **Monochromatic** - Single hue with varying saturation/brightness (unified)

## Editor Window

Access via **Window > ProcGen Palette > Palette Preview**

Features:
- Preview palette assets
- Generate new palettes interactively
- See RGB/Hex values
- Export previews as new assets

## Example Use Cases

```csharp
// Randomly color procedural terrain tiles
foreach (var tile in terrainTiles)
{
    tile.GetComponent<Renderer>().material.color = paletteGen.GetRandomColor();
}

// Create color gradient for particle system
var gradient = new Gradient();
var colorKeys = new GradientColorKey[paletteGen.GeneratedColors.Length];
for (int i = 0; i < colorKeys.Length; i++)
{
    colorKeys[i] = new GradientColorKey(paletteGen.GetColor(i), i / (float)colorKeys.Length);
}
gradient.colorKeys = colorKeys;
```

## Video Tutorial

🎥 **[Watch the Installation & Setup Video](https://youtu.be/PLACEHOLDER)** *(Coming Soon)*

Learn how to:
- Import the package
- Use the Editor window
- Generate palettes at runtime
- Create custom palette assets

## Support

- **Documentation**: [Full docs](https://github.com/yourusername/procgen-palette)
- **Issues**: [GitHub Issues](https://github.com/yourusername/procgen-palette/issues)
- **Discord**: [Join our community](https://discord.gg/PLACEHOLDER)

## License

MIT License - Free for commercial and personal use
