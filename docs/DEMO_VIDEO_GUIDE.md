# Demo Video Recording Guide

## Overview
This guide explains how to record the 60-second demo video for Unity Asset Store submission and Reddit marketing. The video demonstrates palette generation and real-time scene recoloring.

## Video Requirements

- **Duration**: 60 seconds (strict)
- **Resolution**: 1920x1080 (1080p)
- **Format**: MP4 (H.264 codec)
- **Frame Rate**: 30 or 60 fps
- **File Size**: Under 50MB for README embedding

## Recording Setup

### Software Options

**Option 1: OBS Studio (Free, Recommended)**
```bash
# Install OBS Studio
# Windows: Download from obsproject.com
# Mac: brew install --cask obs
# Linux: sudo apt install obs-studio

# Settings:
- Output → Recording Quality → High Quality, Medium File Size
- Video → Base Resolution → 1920x1080
- Video → Output Resolution → 1920x1080
- Video → FPS → 60
```

**Option 2: Unity Recorder Package**
```csharp
// Install via Package Manager:
// Window → Package Manager → Unity Registry → Unity Recorder

// Settings in Recorder window:
- Format: MP4
- Resolution: 1920x1080
- Frame Rate: 60
- Quality: High
```

### Unity Scene Setup

1. **Create Demo Scene**
   ```
   Assets/
   └── Scenes/
       └── PaletteDemo.unity
   ```

2. **Add Sample GameObjects**
   - Create 3x3 grid of cubes/sprites
   - Apply default gray material
   - Position camera to frame all objects
   - Add directional light

3. **Prepare Palettes**
   - Ocean palette (blues, teals, white)
   - Cyberpunk palette (neon pink, purple, cyan, black)
   - Desert palette (sand, orange, brown, cream)

## Recording Script (60 seconds)

### Section 1: Title Card (0:00-0:05)
```
Screen: Title overlay "ProcGen Palette - Unity Integration"
Action: Fade in, hold for 5 seconds
Voiceover (optional): "Generate and apply color palettes instantly"
```

### Section 2: Palette Generation (0:05-0:20)
```
0:05 - Open Unity Editor with ProcGen Palette window
0:06 - Hover mouse over "Generate Palette" button
0:07 - Click "Generate Palette"
0:08 - Show palette colors appearing (Ocean theme)
0:09 - Highlight the generated colors in the palette SO
0:12 - Click "Generate Palette" again (show randomization)
0:15 - Switch to Cyberpunk preset dropdown
0:16 - Select "Cyberpunk" from dropdown
0:18 - Show cyberpunk colors appearing
0:20 - Pause on final palette
```

### Section 3: Scene Application - Ocean (0:20-0:35)
```
0:20 - Focus on the 3x3 scene objects (gray/default)
0:22 - Click "Apply to Scene" button
0:23 - Show smooth color transition (gray → ocean blues)
0:25 - Camera orbit around recolored scene
0:28 - Zoom in to show individual color variations
0:30 - Show before/after split screen (if possible)
0:35 - Return to palette window
```

### Section 4: Quick Preset Demo (0:35-0:50)
```
0:35 - Select "Desert" preset from dropdown
0:36 - Click "Apply to Scene"
0:37 - Watch transition (ocean → desert colors)
0:40 - Quick camera pan
0:42 - Select "Cyberpunk" preset
0:43 - Click "Apply to Scene"
0:44 - Watch transition (desert → cyberpunk neons)
0:47 - Final camera orbit showing neon scene
0:50 - Pause on final result
```

### Section 5: Closing (0:50-0:60)
```
0:50 - Fade to title card
0:52 - Show text: "ProcGen Palette"
0:54 - Show text: "Available on Unity Asset Store"
0:56 - Show GitHub URL and Asset Store badge
0:58 - Fade out
0:60 - End
```

## Camera Movements

### Recommended Shots
```csharp
// Smooth orbit script for demo
public class DemoCamera : MonoBehaviour {
    public Transform target;
    public float orbitSpeed = 20f;
    
    void Update() {
        transform.RotateAround(target.position, Vector3.up, orbitSpeed * Time.deltaTime);
        transform.LookAt(target);
    }
}
```

### Shot List
1. **Wide shot** - Shows entire palette window + scene
2. **Close-up** - Individual palette colors
3. **Scene orbit** - 360° rotation around recolored objects
4. **Before/After split** - Side-by-side comparison

## Post-Processing

### Video Editing (Optional)
```bash
# FFmpeg - Trim to exactly 60 seconds
ffmpeg -i raw_demo.mp4 -ss 00:00:00 -t 00:01:00 -c copy demo_60s.mp4

# Add title overlays
ffmpeg -i demo_60s.mp4 -vf "drawtext=text='ProcGen Palette':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=100:enable='between(t,0,5)'" demo_final.mp4

# Compress for web (target <20MB)
ffmpeg -i demo_final.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k demo_compressed.mp4
```

### Adding Captions
Use any subtitle editor to add:
- "Generating Ocean Palette..." (0:07)
- "Applying to Scene..." (0:22)
- "Switching to Desert..." (0:35)
- "Cyberpunk Preset" (0:42)

## Export Formats

### For README.md (GitHub)
```markdown
# Option 1: Embedded MP4 (GitHub supports this now)
https://user-images.githubusercontent.com/YOUR_USER_ID/demo.mp4

# Option 2: GIF (fallback, larger file)
ffmpeg -i demo_compressed.mp4 -vf "fps=15,scale=960:-1:flags=lanczos" -loop 0 demo.gif
```

### For Reddit
- Upload directly to Reddit's video player (preferred)
- Or upload to Streamable/Gfycat and link

### For Unity Asset Store
- Upload MP4 directly to Asset Store submission form
- Ensure file is under 50MB
- Title: "ProcGen Palette Demo - Palette Generation & Scene Recoloring"

## Checklist Before Recording

- [ ] Unity scene set up with 3x3 object grid
- [ ] Three palettes ready (Ocean, Cyberpunk, Desert)
- [ ] ProcGen Palette window open and visible
- [ ] Screen recording software configured (1080p, 60fps)
- [ ] Microphone muted (or prepared for voiceover)
- [ ] Desktop notifications disabled
- [ ] Practice run completed
- [ ] Timer ready for 60-second limit

## Tips for Best Results

1. **Rehearse the timing** - Practice 2-3 times before recording
2. **Smooth mouse movements** - No jerky cursor motions
3. **Clear visual hierarchy** - Keep palette window and scene both visible
4. **Disable Unity warnings** - Clear console before recording
5. **Use color contrast** - Ensure palettes are visually distinct
6. **Add subtle music** - Optional background track (royalty-free)

## Example Timeline Visualization

```
[0s────5s────10s───15s───20s───25s───30s───35s───40s───45s───50s───55s───60s]
[Title] [Generate] [Ocean] [Apply] [Orbit] [Desert] [Apply] [Cyber] [Apply] [End]
```

## Recording Workflow

1. **Prepare** (5 minutes)
   - Close unnecessary windows
   - Set up scene
   - Load palettes

2. **Record** (3-5 takes)
   - First take: Get familiar with timing
   - Second take: Fix any mistakes
   - Third take: Final polish

3. **Edit** (10 minutes)
   - Trim to 60 seconds
   - Add title cards
   - Compress for web

4. **Upload** (5 minutes)
   - GitHub: User content upload
   - Reddit: Direct post
   - Asset Store: Submission form

Total time budget: **30 minutes** for professional result

---

**Output files**:
- `demo_raw.mp4` - Initial recording
- `demo_60s.mp4` - Trimmed to 60 seconds
- `demo_final.mp4` - With titles and effects
- `demo_compressed.mp4` - Web-optimized (<20MB)
- `demo.gif` - Animated GIF fallback (if needed)
