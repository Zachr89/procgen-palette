using UnityEngine;

namespace ProcGenPalette
{
    /// <summary>
    /// Simple camera orbit script for demo video recording.
    /// Smoothly rotates camera around a target point.
    /// </summary>
    public class DemoCameraOrbit : MonoBehaviour
    {
        [Header("Orbit Settings")]
        [Tooltip("Target point to orbit around (usually center of scene objects)")]
        public Transform target;

        [Tooltip("Rotation speed in degrees per second")]
        [Range(5f, 60f)]
        public float orbitSpeed = 15f;

        [Tooltip("Distance from target")]
        [Range(5f, 30f)]
        public float distance = 10f;

        [Tooltip("Height above target")]
        [Range(2f, 20f)]
        public float height = 6f;

        [Header("Optional Settings")]
        [Tooltip("Start angle offset in degrees")]
        public float startAngle = 0f;

        [Tooltip("Enable smooth damping for more cinematic movement")]
        public bool useSmoothDamping = true;

        [Tooltip("Damping time when smooth damping is enabled")]
        [Range(0.1f, 2f)]
        public float dampingTime = 0.3f;

        private float currentAngle;
        private float angularVelocity;

        void Start()
        {
            currentAngle = startAngle;

            // Auto-create target if none specified
            if (target == null)
            {
                GameObject targetObj = new GameObject("CameraOrbitTarget");
                target = targetObj.transform;
                target.position = CalculateSceneCenter();
            }

            // Position camera at start angle
            UpdateCameraPosition(currentAngle);
        }

        void Update()
        {
            float targetAngle = currentAngle + (orbitSpeed * Time.deltaTime);

            if (useSmoothDamping)
            {
                currentAngle = Mathf.SmoothDampAngle(currentAngle, targetAngle, ref angularVelocity, dampingTime);
            }
            else
            {
                currentAngle = targetAngle;
            }

            UpdateCameraPosition(currentAngle);
        }

        void UpdateCameraPosition(float angle)
        {
            float radians = angle * Mathf.Deg2Rad;
            float x = target.position.x + Mathf.Cos(radians) * distance;
            float z = target.position.z + Mathf.Sin(radians) * distance;

            transform.position = new Vector3(x, target.position.y + height, z);
            transform.LookAt(target);
        }

        /// <summary>
        /// Calculate the center point of all renderers in the scene
        /// </summary>
        Vector3 CalculateSceneCenter()
        {
            MeshRenderer[] renderers = FindObjectsOfType<MeshRenderer>();
            if (renderers.Length == 0)
            {
                return Vector3.zero;
            }

            Vector3 sum = Vector3.zero;
            foreach (var renderer in renderers)
            {
                sum += renderer.bounds.center;
            }

            return sum / renderers.Length;
        }

        /// <summary>
        /// Set orbit speed (useful for demo recording to pause/resume)
        /// </summary>
        public void SetOrbitSpeed(float speed)
        {
            orbitSpeed = speed;
        }

        /// <summary>
        /// Pause camera orbit
        /// </summary>
        public void Pause()
        {
            enabled = false;
        }

        /// <summary>
        /// Resume camera orbit
        /// </summary>
        public void Resume()
        {
            enabled = true;
        }

        // Visualize orbit path in editor
        void OnDrawGizmosSelected()
        {
            if (target == null) return;

            Gizmos.color = Color.yellow;
            
            // Draw orbit circle
            int segments = 64;
            float angleStep = 360f / segments;
            
            for (int i = 0; i < segments; i++)
            {
                float angle1 = i * angleStep * Mathf.Deg2Rad;
                float angle2 = (i + 1) * angleStep * Mathf.Deg2Rad;

                Vector3 point1 = new Vector3(
                    target.position.x + Mathf.Cos(angle1) * distance,
                    target.position.y + height,
                    target.position.z + Mathf.Sin(angle1) * distance
                );

                Vector3 point2 = new Vector3(
                    target.position.x + Mathf.Cos(angle2) * distance,
                    target.position.y + height,
                    target.position.z + Mathf.Sin(angle2) * distance
                );

                Gizmos.DrawLine(point1, point2);
            }

            // Draw line to target
            Gizmos.color = Color.green;
            Gizmos.DrawLine(transform.position, target.position);
        }
    }
}
