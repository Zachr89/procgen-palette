using UnityEngine;
using System.Collections.Generic;

namespace ProcGenPalette
{
    /// <summary>
    /// ScriptableObject for storing pre-configured color palettes.
    /// Create via Assets > Create > ProcGen Palette > Palette
    /// </summary>
    [CreateAssetMenu(fileName = "NewPalette", menuName = "ProcGen Palette/Palette", order = 1)]
    public class PaletteSO : ScriptableObject
    {
        [Header("Palette Info")]
        public string paletteName = "New Palette";
        
        [TextArea(2, 4)]
        public string description = "A procedurally generated color palette";

        [Header("Colors")]
        public List<Color> colors = new List<Color>
        {
            Color.white,
            Color.gray,
            Color.black
        };

        /// <summary>
        /// Gets a color by index with wrapping.
        /// </summary>
        public Color GetColor(int index)
        {
            if (colors.Count == 0) return Color.magenta;
            return colors[Mathf.Abs(index) % colors.Count];
        }

        /// <summary>
        /// Gets a random color from the palette.
        /// </summary>
        public Color GetRandomColor()
        {
            if (colors.Count == 0) return Color.magenta;
            return colors[Random.Range(0, colors.Count)];
        }

        /// <summary>
        /// Adds a new color to the palette.
        /// </summary>
        public void AddColor(Color color)
        {
            colors.Add(color);
        }

        /// <summary>
        /// Removes a color at the specified index.
        /// </summary>
        public void RemoveColorAt(int index)
        {
            if (index >= 0 && index < colors.Count)
            {
                colors.RemoveAt(index);
            }
        }
    }
}
