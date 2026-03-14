using UnityEngine;
using System.Collections;

namespace ProcGenPalette
{
    /// <summary>
    /// Smoothly transitions scene materials to new palette colors.
    /// Used in demo video to show gradual color changes.
    /// </summary>
    public class PaletteTransition : MonoBehaviour
    {
        [Header("Transition Settings")]
        [Tooltip("Duration of color transition in seconds")]
        [Range(0.5f, 5f)]
        public float transitionDuration = 1.5f;

        [Tooltip("Animation curve for color interpolation")]
        public AnimationCurve transitionCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);

        [Header("Target Objects")]
        [Tooltip("If empty, applies to all MeshRenderers in scene")]
        public MeshRenderer[] targetRenderers;

        private Material[] materials;
        private Color[] startColors;
        private Color[] targetColors;
        private bool isTransitioning = false;

        void Start()
        {
            CacheMaterials();
        }

        /// <summary>
        /// Cache all materials that will be affected by palette changes
        /// </summary>
        void CacheMaterials()
        {
            MeshRenderer[] renderers = targetRenderers.Length > 0 
                ? targetRenderers 
                : FindObjectsOfType<MeshRenderer>();

            materials = new Material[renderers.Length];
            startColors = new Color[renderers.Length];

            for (int i = 0; i < renderers.Length; i++)
            {
                // Create material instance to avoid shared material issues
                materials[i] = renderers[i].material;
                startColors[i] = materials[i].color;
            }
        }

        /// <summary>
        /// Apply palette colors to scene with smooth transition
        /// </summary>
        /// <param name="palette">Palette to apply</param>
        public void ApplyPalette(Color[] palette)
        {
            if (isTransitioning)
            {
                StopAllCoroutines();
            }

            targetColors = palette;
            StartCoroutine(TransitionToColors());
        }

        /// <summary>
        /// Apply palette from PaletteSO asset
        /// </summary>
        /// <param name="paletteSO">ScriptableObject containing palette data</param>
        public void ApplyPaletteSO(PaletteSO paletteSO)
        {
            if (paletteSO == null || paletteSO.colors == null || paletteSO.colors.Length == 0)
            {
                Debug.LogWarning("PaletteTransition: Invalid palette provided");
                return;
            }

            ApplyPalette(paletteSO.colors);
        }

        /// <summary>
        /// Coroutine that performs smooth color interpolation
        /// </summary>
        IEnumerator TransitionToColors()
        {
            isTransitioning = true;

            // Record starting colors
            for (int i = 0; i < materials.Length; i++)
            {
                startColors[i] = materials[i].color;
            }

            float elapsed = 0f;

            while (elapsed < transitionDuration)
            {
                elapsed += Time.deltaTime;
                float normalizedTime = Mathf.Clamp01(elapsed / transitionDuration);
                float curveValue = transitionCurve.Evaluate(normalizedTime);

                // Interpolate each material's color
                for (int i = 0; i < materials.Length; i++)
                {
                    Color targetColor = targetColors[i % targetColors.Length];
                    materials[i].color = Color.Lerp(startColors[i], targetColor, curveValue);
                }

                yield return null;
            }

            // Ensure final colors are exact
            for (int i = 0; i < materials.Length; i++)
            {
                materials[i].color = targetColors[i % targetColors.Length];
            }

            isTransitioning = false;
        }

        /// <summary>
        /// Apply palette instantly without transition (for testing)
        /// </summary>
        public void ApplyPaletteInstant(Color[] palette)
        {
            if (materials == null || materials.Length == 0)
            {
                CacheMaterials();
            }

            for (int i = 0; i < materials.Length; i++)
            {
                materials[i].color = palette[i % palette.Length];
            }
        }

        /// <summary>
        /// Reset all materials to their original colors
        /// </summary>
        public void ResetToOriginal()
        {
            if (isTransitioning)
            {
                StopAllCoroutines();
                isTransitioning = false;
            }

            for (int i = 0; i < materials.Length; i++)
            {
                materials[i].color = startColors[i];
            }
        }
    }
}
