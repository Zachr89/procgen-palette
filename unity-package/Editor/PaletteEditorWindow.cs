using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

namespace ProcGenPalette.Editor
{
    /// <summary>
    /// Editor window for previewing and managing color palettes.
    /// Access via Window > ProcGen Palette > Palette Preview
    /// </summary>
    public class PaletteEditorWindow : EditorWindow
    {
        private PaletteSO selectedPalette;
        private PaletteGenerator.PaletteType previewType = PaletteGenerator.PaletteType.Analogous;
        private int previewColorCount = 5;
        private float previewHue = 180f;
        private Color[] previewColors = new Color[0];
        private Vector2 scrollPosition;

        [MenuItem("Window/ProcGen Palette/Palette Preview")]
        public static void ShowWindow()
        {
            PaletteEditorWindow window = GetWindow<PaletteEditorWindow>("Palette Preview");
            window.minSize = new Vector2(400, 500);
            window.Show();
        }

        private void OnGUI()
        {
            EditorGUILayout.Space(10);
            
            EditorGUILayout.LabelField("ProcGen Palette Preview", EditorStyles.boldLabel);
            EditorGUILayout.HelpBox(
                "Preview color palettes or generate new ones. Drag palette assets into the field below to preview them.",
                MessageType.Info
            );

            EditorGUILayout.Space(10);

            // Palette Asset Section
            EditorGUILayout.LabelField("Palette Asset", EditorStyles.boldLabel);
            
            PaletteSO newPalette = (PaletteSO)EditorGUILayout.ObjectField(
                "Palette", 
                selectedPalette, 
                typeof(PaletteSO), 
                false
            );

            if (newPalette != selectedPalette)
            {
                selectedPalette = newPalette;
                if (selectedPalette != null)
                {
                    previewColors = selectedPalette.colors.ToArray();
                }
            }

            if (selectedPalette != null)
            {
                EditorGUILayout.Space(5);
                EditorGUILayout.LabelField($"Name: {selectedPalette.paletteName}");
                EditorGUILayout.LabelField($"Colors: {selectedPalette.colors.Count}");
                
                if (!string.IsNullOrEmpty(selectedPalette.description))
                {
                    EditorGUILayout.LabelField("Description:", EditorStyles.miniLabel);
                    EditorGUILayout.LabelField(selectedPalette.description, EditorStyles.wordWrappedMiniLabel);
                }
            }

            EditorGUILayout.Space(20);

            // Procedural Generation Section
            EditorGUILayout.LabelField("Generate New Palette", EditorStyles.boldLabel);
            
            previewType = (PaletteGenerator.PaletteType)EditorGUILayout.EnumPopup("Type", previewType);
            previewColorCount = EditorGUILayout.IntSlider("Color Count", previewColorCount, 2, 16);
            previewHue = EditorGUILayout.Slider("Base Hue", previewHue, 0f, 360f);

            EditorGUILayout.Space(5);

            if (GUILayout.Button("Generate Preview", GUILayout.Height(30)))
            {
                GeneratePreview();
            }

            EditorGUILayout.Space(20);

            // Preview Section
            if (previewColors.Length > 0)
            {
                EditorGUILayout.LabelField("Color Preview", EditorStyles.boldLabel);
                
                scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);
                
                DrawColorGrid(previewColors);
                
                EditorGUILayout.Space(10);
                DrawColorList(previewColors);
                
                EditorGUILayout.EndScrollView();

                EditorGUILayout.Space(10);

                if (GUILayout.Button("Create Palette Asset from Preview", GUILayout.Height(30)))
                {
                    CreatePaletteAsset(previewColors);
                }
            }
            else
            {
                EditorGUILayout.HelpBox(
                    "No palette to preview. Select a palette asset or generate a new one.",
                    MessageType.Warning
                );
            }
        }

        private void GeneratePreview()
        {
            List<Color> colors = new List<Color>();

            switch (previewType)
            {
                case PaletteGenerator.PaletteType.Analogous:
                    colors = GenerateAnalogous(previewColorCount, previewHue);
                    break;
                case PaletteGenerator.PaletteType.Complementary:
                    colors = GenerateComplementary(previewColorCount, previewHue);
                    break;
                case PaletteGenerator.PaletteType.Triadic:
                    colors = GenerateTriadic(previewColorCount, previewHue);
                    break;
                case PaletteGenerator.PaletteType.Tetradic:
                    colors = GenerateTetradic(previewColorCount, previewHue);
                    break;
                case PaletteGenerator.PaletteType.Monochromatic:
                    colors = GenerateMonochromatic(previewColorCount, previewHue);
                    break;
            }

            previewColors = colors.ToArray();
        }

        private void DrawColorGrid(Color[] colors)
        {
            int columns = Mathf.Min(4, colors.Length);
            float swatchSize = (EditorGUIUtility.currentViewWidth - 40) / columns;

            for (int i = 0; i < colors.Length; i += columns)
            {
                EditorGUILayout.BeginHorizontal();
                
                for (int j = 0; j < columns && i + j < colors.Length; j++)
                {
                    Color color = colors[i + j];
                    Rect rect = GUILayoutUtility.GetRect(swatchSize, swatchSize);
                    EditorGUI.DrawRect(rect, color);
                    
                    // Draw border
                    Handles.BeginGUI();
                    Handles.color = Color.black;
                    Handles.DrawPolyLine(
                        new Vector3(rect.x, rect.y),
                        new Vector3(rect.xMax, rect.y),
                        new Vector3(rect.xMax, rect.yMax),
                        new Vector3(rect.x, rect.yMax),
                        new Vector3(rect.x, rect.y)
                    );
                    Handles.EndGUI();
                }
                
                EditorGUILayout.EndHorizontal();
            }
        }

        private void DrawColorList(Color[] colors)
        {
            EditorGUILayout.LabelField("Color Values", EditorStyles.boldLabel);
            
            for (int i = 0; i < colors.Length; i++)
            {
                EditorGUILayout.BeginHorizontal();
                
                EditorGUILayout.LabelField($"Color {i + 1}", GUILayout.Width(60));
                
                Rect colorRect = GUILayoutUtility.GetRect(30, 20);
                EditorGUI.DrawRect(colorRect, colors[i]);
                
                EditorGUILayout.LabelField(
                    $"RGB({colors[i].r:F2}, {colors[i].g:F2}, {colors[i].b:F2})",
                    GUILayout.Width(200)
                );
                
                EditorGUILayout.LabelField(
                    $"Hex: #{ColorUtility.ToHtmlStringRGB(colors[i])}",
                    GUILayout.Width(100)
                );
                
                EditorGUILayout.EndHorizontal();
            }
        }

        private void CreatePaletteAsset(Color[] colors)
        {
            string path = EditorUtility.SaveFilePanelInProject(
                "Save Palette Asset",
                "NewPalette",
                "asset",
                "Choose where to save the palette"
            );

            if (string.IsNullOrEmpty(path)) return;

            PaletteSO palette = ScriptableObject.CreateInstance<PaletteSO>();
            palette.paletteName = System.IO.Path.GetFileNameWithoutExtension(path);
            palette.colors = new List<Color>(colors);
            palette.description = $"{previewType} palette with {colors.Length} colors (Hue: {previewHue:F0}°)";

            AssetDatabase.CreateAsset(palette, path);
            AssetDatabase.SaveAssets();

            EditorUtility.FocusProjectWindow();
            Selection.activeObject = palette;

            Debug.Log($"Created palette asset at {path}");
        }

        // Palette generation methods (duplicated from PaletteGenerator for editor preview)
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
