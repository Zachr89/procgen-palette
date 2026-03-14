# Unity Package Installation Guide

## Step 1: Download

Get `ProcGenPalette.unitypackage` from:
- [GitHub Releases](https://github.com/yourusername/procgen-palette/releases)
- Or build it yourself (see Building section below)

## Step 2: Import

1. Open your Unity project
2. Go to **Assets > Import Package > Custom Package**
3. Navigate to and select `ProcGenPalette.unitypackage`
4. Click **Open**
5. In the Import dialog, ensure all items are checked
6. Click **Import**

## Step 3: Verify Installation

After import, you should see:
```
Assets/
  ProcGenPalette/
    Runtime/
      PaletteGenerator.cs
      PaletteSO.cs
      ProcGenPalette.Runtime.asmdef
    Editor/
      PaletteEditorWindow.cs
      ProcGenPalette.Editor.asmdef
```

## Step 4: Import Samples (Optional)

1. Open **Window > Package Manager**
2. Find "ProcGen Palette" in the list
3. Expand the **Samples** section
4. Click **Import** next to "Example Palettes"

Sample palettes will appear in:
```
Assets/Samples/ProcGen Palette/1.0.0/Example Palettes/
```

## Step 5: Test Installation

### Test 1: Open Editor Window

1. Go to **Window > ProcGen Palette > Palette Preview**
2. Window should open without errors
3. Try generating a preview palette

### Test 2: Create Palette Asset

1. Right-click in Project window
2. Select **Create > ProcGen Palette > Palette**
3. Name it "TestPalette"
4. Verify it appears with default colors

### Test 3: Add Component

1. Create an empty GameObject
2. Add **PaletteGenerator** component
3. Set color count to 5
4. Enter Play mode
5. Check the component's Generated Colors array

## Troubleshooting

### "Namespace ProcGenPalette could not be found"

**Solution:** Delete `Library/ScriptAssemblies` folder and restart Unity

### Editor Window won't open

**Solution:** Check Console for errors. Ensure `ProcGenPalette.Editor.asmdef` exists in Editor folder

### Cannot create Palette asset

**Solution:** Verify `PaletteSO.cs` has `[CreateAssetMenu]` attribute and is in Runtime folder

### Samples won't import

**Solution:** Samples must be in `Samples~` folder (with tilde). Check folder name and restart Unity

## Building the Package (Advanced)

To create your own `.unitypackage`:

1. Copy `unity-package/` contents to `Assets/ProcGenPalette` in a clean Unity project
2. Select the entire `ProcGenPalette` folder in Project window
3. Go to **Assets > Export Package**
4. Ensure "Include dependencies" is checked
5. Click **Export**
6. Save as `ProcGenPalette.unitypackage`

## Requirements

- Unity 2020.3 or newer
- No additional dependencies

## Support

Having issues? Check:
- [GitHub Issues](https://github.com/yourusername/procgen-palette/issues)
- [Full Documentation](../README.md)
- Video tutorial (coming soon)
