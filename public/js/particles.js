/**
 * particles.js — Hafidh | Cyber-Glamour About Me Page
 *
 * tsParticles v2 — Linked Network Nodes with Antigravity Mouse Repulsion
 *
 * NOTE: Config ini adalah versi standalone (referensi).
 * Inisialisasi aktif ada langsung di <script> dalam welcome.blade.php.
 * File ini berguna jika ingin dipisah ke build pipeline / asset bundler.
 *
 * Dependency: tsparticles@2.x (loaded via CDN)
 */

(async function initParticles() {
    await tsParticles.load('tsparticles', {

        /* ── Canvas Background ─────────────────────────────────────── */
        background: { color: { value: 'transparent' } },

        /* ── Performance Limit ─────────────────────────────────────── */
        fpsLimit: 120,

        /* ── Mouse Interactivity ───────────────────────────────────── */
        interactivity: {
            detectsOn: 'window',   /* detects on window so pointer-events:none works */
            events: {
                onHover: { enable: true, mode: 'repulse' },   /* flee from cursor */
                onClick: { enable: true, mode: 'push'    },   /* spawn on click   */
                resize:  { enable: true },
            },
            modes: {
                /* Repulse: particles flee from the cursor */
                repulse: {
                    distance: 140,
                    duration: 0.5,
                    factor:   8,
                    speed:    1,
                    maxSpeed: 70,
                    easing:   'ease-out-quad',
                },
                /* Push: spawn extra particles on click */
                push: { quantity: 3 },
            },
        },

        /* ── Particle Appearance & Behavior ───────────────────────── */
        particles: {
            number: {
                value:   85,
                density: { enable: true, area: 900 },
            },

            /* Neon color palette: purple, violet, pink, cyan */
            color: {
                value: ['#7c3aed', '#a78bfa', '#ec4899', '#f9a8d4', '#06b6d4'],
            },

            shape: { type: 'circle' },

            opacity: {
                value: { min: 0.08, max: 0.50 },
                animation: {
                    enable:     true,
                    speed:      1.2,
                    sync:       false,
                    startValue: 'random',
                },
            },

            size: {
                value: { min: 1, max: 2.5 },
                animation: {
                    enable:     true,
                    speed:      1.5,
                    sync:       false,
                    startValue: 'random',
                },
            },

            /* ── Linked Network Lines between nearby particles ───── */
            links: {
                enable:   true,
                distance: 155,      /* max distance to draw a link */
                color:    '#7c3aed',
                opacity:  0.14,
                width:    1,
            },

            /* ── Movement ─────────────────────────────────────────── */
            move: {
                enable:   true,
                speed:    0.55,     /* slow, ambient drift */
                random:   true,
                straight: false,
                outModes: { default: 'bounce' },
            },
        },

        /* ── HiDPI / Retina Support ────────────────────────────────── */
        detectRetina: true,
    });
})();
