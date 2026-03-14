using UnityEngine;
using System.Collections.Generic;

namespace ProcGenPalette
{
    /// <summary>
    /// MonoBehaviour component for generating procedural color palettes at runtime.
    /// Attach to any GameObject to generate palettes programmatically or via the Inspector.
    /// </summary>
    public class PaletteGenerator : MonoBehaviour
    {
        [Header("Palette Configuration")]
        [Tooltip("Optional pre-configured palette asset. If set, generates from this palette.")]
        public PaletteSO paletteAsset;

        [Tooltip("Generate palette automatically on Start()")]
        public bool generateOnStart = true;

        [Header("Runtime Configuration (if no asset set)")]
        [Tooltip("Number of colors to generate")]
        [Range(2, 16)]
        public int colorCount = 5;

        [Tooltip("Base hue for palette generation (0-360)")]
        [Range(0f, 360f)]
        public float baseHue = 180f;

        [Tooltip("Palette generation algorithm")]
        public PaletteType paletteType = PaletteType.Analogous;

        [Header("Output")]
        [Tooltip("Generated colors (read-only at runtime)")]
        [SerializeField]
        private Color[] generatedColors = new Color[0];

        public Color[] GeneratedColors => generatedColors;

        public enum PaletteType
        {
            Analogous,
            Complementary,
            Triadic,
            Tetradic,
            Monochromatic
        }

        private void Start()
        {
            if (generateOnStart)
            {
                GeneratePalette();
            }
        }

        /// <summary>
        /// Generates a new color palette based on current settings.
        /// </summary>
        public void GeneratePalette()
        {
            if (paletteAsset != null)
            {
                generatedColors = paletteAsset.colors.ToArray();
            }
            else
            {
                generatedColors = GenerateProceduralPalette(colorCount, baseHue, paletteType);
            }
        }

        /// <summary>
        /// Gets a color from the generated palette by index.
        /// </summary>
        public Color GetColor(int index)
        {
            if (generatedColors.Length == 0)
            {
                Debug.LogWarning("No palette generated yet. Call GeneratePalette() first.");
                return Color.magenta;
            }

            return generatedColors[Mathf.Clamp(index, 0, generatedColors.Length - 1)];
        }

        /// <summary>
        /// Gets a random color from the generated palette.
        /// </summary>
        public Color GetRandomColor()
        {
            if (generatedColors.Length == 0)
            {
                Debug.LogWarning("No palette generated yet. Call GeneratePalette() first.");
                return Color.magenta;
            }

            return generatedColors[Random.Range(0, generatedColors.Length)];
        }

        private Color[] GenerateProceduralPalette(int count, float hue, PaletteType type)
        {
            List<Color> colors = new List<Color>();

            switch (type)
            {
                case PaletteType.Analogous:
                    colors = GenerateAnalogous(count, hue);
                    break;
                case PaletteType.Complementary:
                    colors = GenerateComplementary(count, hue);
                    break;
                case PaletteType.Triadic:
                    colors = GenerateTriadic(count, hue);
                    break;
                case PaletteType.Tetradic:
                    colors = GenerateTetradic(count, hue);
                    break;
                case PaletteType.Monochromatic:
                    colors = GenerateMonochromatic(count, hue);
                    break;
            }

            return colors.ToArray();
        }

        private List<Color> GenerateAnalogous(int count, float baseHue)
        {
            List<Color> colors = new List<Color>();
            float step = 30f / (count - 1);

            for (int i = 0; i < count; i++)
            {
                float hue = (baseHue + (i - count / 2) * step) / 360f;
                float saturation = Random.Range(0.6f, 0.9f);
                float value = Random.Range(0.7f, 1f);
                colors.Add(Color.HSVToRGB(hue, saturation, value));
            }

            return colors;
        }

        private List<Color> GenerateComplementary(int count, float baseHue)
        {
            List<Color> colors = new List<Color>();

            for (int i = 0; i < count; i++)
            {
                float hue = (i % 2 == 0 ? baseHue : (baseHue + 180f) % 360f) / 360f;
                float saturation = Random.Range(0.6f, 0.9f);
                float value = Random.Range(0.7f, 1f);
                colors.Add(Color.HSVToRGB(hue, saturation, value));
            }

            return colors;
        }

        private List<Color> GenerateTriadic(int count, float baseHue)
        {
            List<Color> colors = new List<Color>();
            float[] hues = { baseHue, (baseHue + 120f) % 360f, (baseHue + 240f) % 360f };

            for (int i = 0; i < count; i++)
            {
                float hue = hues[i % 3] / 360f;
                float saturation = Random.Range(0.6f, 0.9f);
                float value = Random.Range(0.7f, 1f);
                colors.Add(Color.HSVToRGB(hue, saturation, value));
            }

            return colors;
        }

        private List<Color> GenerateTetradic(int count, float baseHue)
        {
            List<Color> colors = new List<Color>();
            float[] hues = { 
                baseHue, 
                (baseHue + 90f) % 360f, 
                (baseHue + 180f) % 360f, 
                (baseHue + 270f) % 360f 
            };

            for (int i = 0; i < count; i++)
            {
                float hue = hues[i % 4] / 360f;
                float saturation = Random.Range(0.6f, 0.9f);
                float value = Random.Range(0.7f, 1f);
                colors.Add(Color.HSVToRGB(hue, saturation, value));
            }

            return colors;
        }

        private List<Color> GenerateMonochromatic(int count, float baseHue)
        {
            List<Color> colors = new List<Color>();
            float hue = baseHue / 360f;

            for (int i = 0; i < count; i++)
            {
                float saturation = Mathf.Lerp(0.3f, 0.9f, (float)i / (count - 1));
                float value = Mathf.Lerp(0.4f, 1f, (float)i / (count - 1));
                colors.Add(Color.HSVToRGB(hue, saturation, value));
            }

            return colors;
        }
    }
}
