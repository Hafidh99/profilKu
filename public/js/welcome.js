(function () {
    const $h = document.getElementById('clk-h');
    const $m = document.getElementById('clk-m');
    const $s = document.getElementById('clk-s');
    const $d = document.getElementById('clk-date');
    const p2 = n => String(n).padStart(2, '0');
    const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const MONS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    function tick() {
        const n = new Date();
        if ($h) $h.textContent = p2(n.getHours());
        if ($m) $m.textContent = p2(n.getMinutes());
        if ($s) $s.textContent = p2(n.getSeconds());
        if ($d) $d.textContent = `${DAYS[n.getDay()]} ${MONS[n.getMonth()]} ${n.getDate()}, ${n.getFullYear()}`;
    }
    tick(); setInterval(tick, 1000);
})();

(async function () {
    if (window.matchMedia('(max-width:640px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (typeof tsParticles === 'undefined') return;

    await tsParticles.load('tsparticles', {
        background: { color: { value: 'transparent' } },
        fpsLimit: 40,
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: 'repulse' },
                resize:  { enable: true, delay: 0.5 },
            },
            modes: { repulse: { distance: 80, duration: 0.4, factor: 4, speed: 1, maxSpeed: 40 } },
        },
        particles: {
            number:  { value: 28, density: { enable: true, area: 900 } },
            color:   { value: ['#4c1d95','#7c3aed','#c084fc'] },
            shape:   { type: 'circle' },
            opacity: { value: { min: .06, max: .28 }, animation: { enable: true, speed: .6, sync: false, startValue: 'random' } },
            size:    { value: { min: 1, max: 2 }, animation: { enable: false } },
            links:   { enable: true, distance: 130, color: '#4c1d95', opacity: .10, width: 1 },
            move:    { enable: true, speed: .25, random: true, straight: false, outModes: { default: 'bounce' } },
        },
        detectRetina: false,
    });
})();

(function () {
    if (window.matchMedia('(max-width:640px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.getElementById('chain-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let W, H;
    let mouseX = -9999, mouseY = -9999;
    let clickPending = false, glowIntensity = 0;
    let chains = [];
    let paused = false;

    const GRAVITY = .18, DAMPING = .88, LINK_LEN = 24,
          ITERS = 4,
          MOUSE_R = 130, LIFT = 26;

    const GRAD_STOPS = [
        [0,    [8,  3,  26 ]],
        [.22,  [40, 15, 82 ]],
        [.48,  [90, 50, 162]],
        [.75,  [35, 12, 70 ]],
        [1,    [6,  2,  18 ]],
    ];
    const GLOW_STOPS = [
        [0,    [38, 13, 64 ]],
        [.22,  [70, 45, 118]],
        [.48,  [128,88, 200]],
        [.75,  [65, 42, 108]],
        [1,    [30, 10, 52 ]],
    ];

    const FRAME_MS = 1000 / 60;
    let lastFrame  = 0;

    function buildChain(sx, sy, ex, ey, opt = {}) {
        const sag  = opt.sag  !== undefined ? opt.sag  : 40;
        const pinS = opt.pinS !== false;
        const pinE = opt.pinE !== false;
        const lSz  = opt.lSz  || 24;
        const noFloor = opt.noFloor || false;
        const dx = ex - sx, dy = ey - sy;
        const n  = Math.max(4, Math.round(Math.sqrt(dx*dx+dy*dy) / LINK_LEN));
        const pts = [];
        for (let i = 0; i <= n; i++) {
            const t = i/n;
            const x = sx + dx*t;
            const y = sy + dy*t + Math.sin(t*Math.PI)*sag;
            pts.push({ x, y, px: x, py: y, restY: y, ax: x, ay: y,
                       pinned: (i===0&&pinS)||(i===n&&pinE), noFloor });
        }
        return { pts, lSz };
    }

    function setupChains() {
        chains = [
            buildChain(W*.5,  -70,   W*.5,  H*.52, { sag:0,  pinS:true, pinE:false, lSz:32, noFloor:true }),
            buildChain(-80,   H*.32, W*.72, H*.82, { sag:40, pinS:true, pinE:true,  lSz:25 }),
            buildChain(-80,   H*.65, W*.58, H*.88, { sag:28, pinS:true, pinE:true,  lSz:24 }),
            buildChain(W+80,  H*.28, W*.30, H*.80, { sag:40, pinS:true, pinE:true,  lSz:25 }),
            buildChain(W+80,  H*.65, W*.42, H*.88, { sag:26, pinS:true, pinE:true,  lSz:24 }),
        ];
    }

    function updateChain(chain, doClick) {
        const pts = chain.pts, n = pts.length;
        const now = performance.now() * .0004;

        for (let i = 0; i < n; i++) {
            const p = pts[i];
            if (p.pinned) continue;
            const vx = (p.x - p.px) * DAMPING;
            const vy = (p.y - p.py) * DAMPING;
            p.px = p.x; p.py = p.y;
            p.x += vx + Math.sin(now*1.1 + i*.7) * .025;
            p.y += vy + GRAVITY;

            const dx = p.x - mouseX, dy = p.y - mouseY;
            const d  = Math.sqrt(dx*dx + dy*dy);
            if (d < MOUSE_R && d > 0) {
                const f = ((MOUSE_R - d)/MOUSE_R)**2 * 3;
                p.x += dx/d * f; p.y += dy/d * f;
            }

            if (doClick) {
                p.py += LIFT * (.55 + Math.random()*.45);
                p.px += (Math.random()-.5) * 5;
            }

            if (!p.noFloor && p.y > p.restY + 30) {
                p.y  = p.restY + 30;
                p.py = p.y + (p.y - p.py) * .25;
            }
        }

        for (let it = 0; it < ITERS; it++) {
            for (const p of pts) { if (p.pinned) { p.x = p.ax; p.y = p.ay; } }
            for (let i = 0; i < n-1; i++) {
                const a = pts[i], b = pts[i+1];
                const dx = b.x-a.x, dy = b.y-a.y;
                const d  = Math.sqrt(dx*dx+dy*dy)||.0001;
                const c  = (d-LINK_LEN)/d*.5;
                if (!a.pinned) { a.x += dx*c; a.y += dy*c; }
                if (!b.pinned) { b.x -= dx*c; b.y -= dy*c; }
            }
        }
    }

    function drawLink(x, y, angle, size, glow) {
        const w  = size * .62, h = size * .36, lw = Math.max(1.5, size * .17);
        ctx.save();
        ctx.translate(x, y); ctx.rotate(angle);

        const stops = glow > .1 ? GLOW_STOPS : GRAD_STOPS;
        const g = ctx.createLinearGradient(-w, -h, w, h);
        for (const [pos, [r,gr,b]] of stops) {
            g.addColorStop(pos, `rgb(${r},${gr},${b})`);
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
        ctx.strokeStyle = g;
        ctx.lineWidth   = lw;
        ctx.globalAlpha = glow > .1 ? .7 + glow * .3 : .75;
        ctx.stroke();

        ctx.globalAlpha = .12 + glow * .12;
        ctx.beginPath();
        ctx.arc(0, -h * .12, w * .56, Math.PI * 1.18, Math.PI * 1.82);
        ctx.strokeStyle = `rgba(185,125,255,1)`;
        ctx.lineWidth   = lw * .32;
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.restore();
    }

    function drawChain(chain, glow) {
        const pts = chain.pts, n = pts.length, lSz = chain.lSz;
        for (let i = 0; i < n-1; i++) {
            const a = pts[i], b = pts[i+1];
            const mx = (a.x+b.x)*.5, my = (a.y+b.y)*.5;
            const angle = Math.atan2(b.y-a.y, b.x-a.x);
            const sz = lSz * (.65 + .5*(my/H));
            drawLink(mx, my, i%2===0 ? angle : angle+Math.PI*.5, sz, glow);
        }
    }

    function loop(ts) {
        requestAnimationFrame(loop);
        if (paused) return;
        if (ts - lastFrame < FRAME_MS) return;
        lastFrame = ts;

        ctx.clearRect(0, 0, W, H);
        const doClick = clickPending;
        if (doClick) clickPending = false;
        const glow = glowIntensity;
        glowIntensity *= .93; if (glowIntensity < .005) glowIntensity = 0;
        for (const c of chains) { updateChain(c, doClick); drawChain(c, glow); }
    }

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
    document.addEventListener('click',   ()  => { clickPending = true; glowIntensity = 1.0; });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            W = canvas.width = innerWidth; H = canvas.height = innerHeight; setupChains();
        }, 200);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
    });

    const heroEl = document.getElementById('hero');
    if (heroEl && 'IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            paused = document.hidden || !entries[0].isIntersecting;
        }, { threshold: 0.01 }).observe(heroEl);
    }

    W = canvas.width = innerWidth; H = canvas.height = innerHeight;
    setupChains();
    requestAnimationFrame(loop);
})();

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ delay: .4 })
        .fromTo('.hero-proto',  { opacity:0, y:12 }, { opacity:1, y:0, duration:.9,  ease:'power3.out' })
        .fromTo('.hero-cmd',    { opacity:0, y:16 }, { opacity:1, y:0, duration:.9,  ease:'power3.out' }, '-=.55')
        .fromTo('.hero-name',   { opacity:0, y:90, filter:'blur(16px)' }, { opacity:1, y:0, filter:'blur(0px)', duration:1.6, ease:'power4.out' }, '-=.55')
        .fromTo('.hero-enter',  { opacity:0, y:14 }, { opacity:1, y:0, duration:.85, ease:'power3.out' }, '-=.6')
        .fromTo('.digital-clock',{ opacity:0, x:-50 },{ opacity:1, x:0, duration:1.1, ease:'power3.out' }, '-=1.5');

    gsap.fromTo('#profile-card', { opacity:0, y:110 }, {
        scrollTrigger: { trigger:'#profile', start:'top 72%', toggleActions:'play none none reverse' },
        opacity:1, y:0, duration:1.3, ease:'power4.out',
    });

    [
        { id:'ti-laravel',  x:-300, y:0    },
        { id:'ti-filament', x:0,    y:-280 },
        { id:'ti-tailwind', x:0,    y:-280 },
        { id:'ti-livewire', x:0,    y:-280 },
        { id:'ti-php',      x:300,  y:0    },
    ].forEach(({ id, x, y }, i) => {
        gsap.fromTo(`#${id}`, { opacity:0, x, y }, {
            scrollTrigger: { trigger:'#tech', start:'top 76%', toggleActions:'play none none reverse' },
            opacity:1, x:0, y:0, duration:1.05, delay:i*.1, ease:'back.out(1.6)',
        });
    });

    gsap.fromTo(['#s-github','#s-email','#s-linkedin'], { opacity:0, y:55 }, {
        scrollTrigger: { trigger:'.social-grid', start:'top 87%', toggleActions:'play none none reverse' },
        opacity:1, y:0, duration:.9, stagger:.14, ease:'power3.out',
    });
}

(function () {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const s = document.documentElement.scrollTop;
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (h > 0 ? (s/h)*100 : 0) + '%';
    }, { passive: true });
})();
