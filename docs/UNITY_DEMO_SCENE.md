# Unity Demo Scene Setup

## Quick Setup (5 minutes)

### 1. Create New Scene
```
File → New Scene → Basic (Built-in Render Pipeline)
Save as: Assets/Scenes/PaletteDemo.unity
```

### 2. Add Demo Objects

#### Option A: Simple Cubes (Fastest)
```csharp
// Paste into Unity Editor Console (C# Interactive window)
for (int x = 0; x < 3; x++) {
    for (int z = 0; z < 3; z++) {
        var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
        cube.transform.position = new Vector3(x * 2, 0, z * 2);
        cube.name = $"DemoObject_{x}_{z}";
    }
}
```

#### Option B: Mixed Primitives (More Visual Interest)
```csharp
// Create variety of shapes
var shapes = new[] { 
    PrimitiveType.Cube, 
    PrimitiveType.Sphere, 
    PrimitiveType.Cylinder,
    PrimitiveType.Capsule 
};

int shapeIndex = 0;
for (int x = 0; x < 3; x++) {
    for (int z = 0; z < 3; z++) {
        var obj = GameObject.CreatePrimitive(shapes[shapeIndex % shapes.Length]);
        obj.transform.position = new Vector3(x * 2.5f, 0, z * 2.5f);
        obj.name = $"DemoObject_{x}_{z}";
        shapeIndex++;
    }
}
```

### 3. Setup Camera
```
Main Camera:
- Position: (3, 8, -6)
- Rotation: (40, 0, 0)
- Field of View: 60
- Clear Flags: Skybox or Solid Color
- Background: #1a1a1a (dark gray)
```

### 4. Add Lighting
```
Directional Light:
- Rotation: (50, -30, 0)
- Intensity: 1.0
- Color: White (#FFFFFF)

Optional - Add Fill Light:
- Type: Directional Light
- Rotation: (-20, 180, 0)
- Intensity: 0.3
- Color: Soft blue (#B0C4DE)
```

### 5. Apply Default Material
```csharp
// Create a neutral gray material
var defaultMat = new Material(Shader.Find("Standard"));
defaultMat.color = new Color(0.5f, 0.5f, 0.5f); // Medium gray
defaultMat.name = "DemoDefault";

// Apply to all objects
foreach (var obj in FindObjectsOfType<MeshRenderer>()) {
    obj.material = defaultMat;
}
```

## Preset Palette Configurations

### Ocean Palette
```csharp
// PaletteSO configuration
public static class OceanPalette {
    public static Color[] Colors = new Color[] {
        new Color(0.13f, 0.21f, 0.45f), // Deep ocean blue #21366B
        new Color(0.16f, 0.47f, 0.71f), // Ocean blue #2978B5
        new Color(0.35f, 0.74f, 0.87f), // Turquoise #59BDDE
        new Color(0.65f, 0.91f, 0.96f), // Light cyan #A6E8F5
        new Color(0.95f, 0.98f, 0.99f), // Foam white #F2F9FC
        new Color(0.08f, 0.35f, 0.55f), // Dark teal #14598C
        new Color(0.25f, 0.63f, 0.79f), // Sky blue #3FA1C9
        new Color(0.89f, 0.95f, 0.97f), // Pale blue #E3F2F7
    };
}
```

### Cyberpunk Palette
```csharp
public static class CyberpunkPalette {
    public static Color[] Colors = new Color[] {
        new Color(0.98f, 0.05f, 0.60f), // Neon pink #FA0E99
        new Color(0.58f, 0.00f, 0.83f), // Purple #9400D4
        new Color(0.00f, 0.94f, 1.00f), // Cyan #00F0FF
        new Color(0.12f, 0.12f, 0.16f), // Dark background #1E1E29
        new Color(0.85f, 0.44f, 0.84f), // Magenta #D970D6
        new Color(0.00f, 0.78f, 0.82f), // Electric blue #00C7D1
        new Color(0.25f, 0.07f, 0.38f), // Deep purple #3F1161
        new Color(1.00f, 0.27f, 0.00f), // Orange accent #FF4500
    };
}
```

### Desert Palette
```csharp
public static class DesertPalette {
    public static Color[] Colors = new Color[] {
        new Color(0.93f, 0.82f, 0.62f), // Sand #EDD19E
        new Color(0.85f, 0.65f, 0.38f), // Light brown #D9A561
        new Color(0.72f, 0.45f, 0.20f), // Rust #B87333
        new Color(0.96f, 0.87f, 0.70f), // Cream #F5DEB3
        new Color(0.55f, 0.27f, 0.07f), // Dark brown #8B4513
        new Color(0.98f, 0.93f, 0.84f), // Pale sand #FAE9D6
        new Color(0.80f, 0.52f, 0.25f), // Terracotta #CC853F
        new Color(0.64f, 0.58f, 0.50f), // Stone gray #A39480
    };
}
```

## Animation for Demo

### Smooth Color Transition Script
```csharp
using UnityEngine;
using System.Collections;

public class PaletteTransition : MonoBehaviour {
    private Material[] materials;
    private Color[] targetColors;
    private float transitionDuration = 1.5f;

    void Start() {
        // Cache all materials
        var renderers = FindObjectsOfType<MeshRenderer>();
        materials = new Material[renderers.Length];
        for (int i = 0; i < renderers.Length; i++) {
            materials[i] = renderers[i].material;
        }
    }

    public void ApplyPalette(Color[] palette) {
        targetColors = palette;
        StartCoroutine(TransitionToColors());
    }

    IEnumerator TransitionToColors() {
        Color[] startColors = new Color[materials.Length];
        for (int i = 0; i < materials.Length; i++) {
            startColors[i] = materials[i].color;
        }

        float elapsed = 0f;
        while (elapsed < transitionDuration) {
            elapsed += Time.deltaTime;
            float t = Mathf.SmoothStep(0, 1, elapsed / transitionDuration);

            for (int i = 0; i < materials.Length; i++) {
                Color targetColor = targetColors[i % targetColors.Length];
                materials[i].color = Color.Lerp(startColors[i], targetColor, t);
            }

            yield return null;
        }

        // Ensure final colors are exact
        for (int i = 0; i < materials.Length; i++) {
            materials[i].color = targetColors[i % targetColors.Length];
        }
    }
}
```

### Camera Orbit Script
```csharp
using UnityEngine;

public class DemoCameraOrbit : MonoBehaviour {
    public Transform target;
    public float orbitSpeed = 15f;
    public float distance = 10f;
    public float height = 6f;
    
    private float currentAngle = 0f;

    void Update() {
        currentAngle += orbitSpeed * Time.deltaTime;
        
        float x = target.position.x + Mathf.Cos(currentAngle * Mathf.Deg2Rad) * distance;
        float z = target.position.z + Mathf.Sin(currentAngle * Mathf.Deg2Rad) * distance;
        
        transform.position = new Vector3(x, height, z);
        transform.LookAt(target);
    }
}
```

## Pre-Record Checklist

### Scene Setup
- [ ] All demo objects created and positioned
- [ ] Default gray material applied
- [ ] Camera positioned correctly
- [ ] Lighting configured
- [ ] Skybox/background set

### Palette Assets
- [ ] Ocean PaletteSO created and populated
- [ ] Cyberpunk PaletteSO created and populated
- [ ] Desert PaletteSO created and populated
- [ ] All palettes tested individually

### Editor Configuration
- [ ] ProcGen Palette window opened and docked
- [ ] Scene view visible alongside window
- [ ] Console cleared of warnings
- [ ] Gizmos turned off (cleaner visual)
- [ ] Grid snapping disabled

### Performance
- [ ] Play mode tested (no lag)
- [ ] Color transitions smooth
- [ ] Camera orbit working
- [ ] Scene renders at 60fps

## Recording Window Layout

```
┌─────────────────────────────────────────────────────┐
│  Unity Editor - PaletteDemo.unity                   │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│  Scene View          │  ProcGen Palette Window      │
│  (Shows 3x3 grid)    │                              │
│                      │  [Generate Palette]          │
│  Camera: Orbiting    │                              │
│  around objects      │  Preset: [Ocean ▼]          │
│                      │                              │
│                      │  Colors:                     │
│                      │  ████ ████ ████ ████        │
│                      │                              │
│                      │  [Apply to Scene]            │
│                      │                              │
└──────────────────────┴──────────────────────────────┘
```

## Troubleshooting

### Objects not visible
- Check camera position/rotation
- Verify objects aren't at (0,0,0) overlapping
- Add lighting if scene is dark

### Colors not applying
- Ensure materials are not shared (instance each)
- Check PaletteSO has colors populated
- Verify ApplyToScene logic in PaletteGenerator.cs

### Transition too fast/slow
- Adjust `transitionDuration` in PaletteTransition script
- For demo: 1.5s is ideal (visible but not slow)

### Camera orbit jerky
- Increase Time.deltaTime smoothing
- Use Mathf.SmoothDamp instead of linear interpolation
- Record at 60fps for smoother playback

---

**Estimated setup time**: 5-10 minutes  
**Scene file**: Ready to record immediately after setup  
**Export**: Save scene as `PaletteDemo.unity` for reuse
