@extends('layouts.app')

@section('content')
    <div id="progress-bar" aria-hidden="true"></div>
    <div id="tsparticles"  aria-hidden="true"></div>
    <canvas id="chain-canvas" aria-hidden="true"></canvas>

    <section id="hero" class="section" aria-labelledby="hero-name">

        <div class="hero-content">
            <span class="hero-proto">Protocol Active &nbsp;·&nbsp; Submission Received</span>
            <span class="hero-cmd">Executing Commands.</span>
            <h1 class="hero-name" id="hero-name">Izumi Desu.</h1>
            <a href="#profile" class="hero-enter" aria-label="Enter the domain">
                Enter The Domain &nbsp;<span class="arr" aria-hidden="true">↓</span>
            </a>
        </div>

        <span class="hero-sparkle" aria-hidden="true">◆</span>

        <div class="digital-clock" aria-label="Session time">
            <div class="clock-label">Nandich Time</div>
            <div class="clock-time">
                <span id="clk-h">00</span><span class="clock-sep">:</span><span id="clk-m">00</span><span class="clock-sep">:</span><span id="clk-s">00</span>
            </div>
            <div class="clock-date" id="clk-date">Loading…</div>
        </div>

    </section>

    <section id="profile" class="section" aria-label="Profile">

        <article class="glass-card" id="profile-card">
            <div class="card-glow-bar" aria-hidden="true"></div>
            <div class="card-body">
                <div class="card-avatar-row">
                    <div class="avatar-ring" aria-hidden="true">
                        <div class="avatar-inner">
                            <div class="avatar-init">H</div>
                        </div>
                    </div>
                    <div>
                        <h2 class="card-name">Hafidh</h2>
                        <p class="card-role">Full-Stack Web Developer</p>
                        <div class="card-status">
                            <span class="status-dot"></span>
                            <span class="status-txt">In Control · Available</span>
                        </div>
                    </div>
                </div>

                <div class="card-sep" role="separator"></div>

                <p class="card-bio">
                    Crafting <span class="dom">absolute control</span> in Laravel systems.
                    Forging <span class="shd">secure, unbreakable bonds</span> in every
                    multi-tenant architecture I bind. Some connections are meant to be kept
                    <span class="shd">strictly backstreet</span>, operating flawlessly
                    <span class="dom">in the shadows</span>.
                </p>

                <div class="chips" role="list">
                    <span class="chip" role="listitem"><i class="fa-brands fa-laravel"             style="color:#ef4444;"></i> Laravel</span>
                    <span class="chip" role="listitem"><i class="fa-solid fa-fire-flame-curved"     style="color:#f97316;"></i> Filament</span>
                    <span class="chip" role="listitem"><i class="fa-brands fa-css3-alt"             style="color:#38bdf8;"></i> Tailwind</span>
                    <span class="chip" role="listitem"><i class="fa-brands fa-php"                  style="color:#818cf8;"></i> PHP</span>
                    <span class="chip" role="listitem"><i class="fa-solid fa-bolt"                  style="color:#c084fc;"></i> Livewire</span>
                </div>
            </div>
        </article>

    </section>

    <section id="tech" class="section" aria-label="Tech stack and contact">

        <div class="sec-hdr">
            <p class="sec-eye">The Instruments of Control</p>
            <h2 class="sec-tit">The <span class="acc">Arsenal</span></h2>
        </div>

        <div class="tech-grid" role="list">
            <div class="tech-item" id="ti-laravel"  role="listitem"><div class="t-icon" style="color:#ef4444;"><i class="fa-brands fa-laravel"></i></div><span class="t-lbl">Laravel</span></div>
            <div class="tech-item" id="ti-filament" role="listitem"><div class="t-icon" style="color:#f97316;"><i class="fa-solid fa-fire-flame-curved"></i></div><span class="t-lbl">Filament</span></div>
            <div class="tech-item" id="ti-tailwind" role="listitem"><div class="t-icon" style="color:#38bdf8;"><i class="fa-brands fa-css3-alt"></i></div><span class="t-lbl">Tailwind</span></div>
            <div class="tech-item" id="ti-livewire" role="listitem"><div class="t-icon" style="color:#c084fc;"><i class="fa-solid fa-bolt"></i></div><span class="t-lbl">Livewire</span></div>
            <div class="tech-item" id="ti-php"      role="listitem"><div class="t-icon" style="color:#818cf8;"><i class="fa-brands fa-php"></i></div><span class="t-lbl">PHP</span></div>
        </div>

        <div class="social-wrap">
            <div class="sec-hdr" style="margin-bottom:1.75rem;">
                <p class="sec-eye">Establish a Channel</p>
                <h2 class="sec-tit">The <span class="acc">Ties</span></h2>
            </div>
            <nav class="social-grid" aria-label="Contact links">
                <a id="s-github"   href="https://github.com/Hafidh99"      target="_blank" rel="noopener noreferrer" class="s-block s-block--gh" aria-label="GitHub Hafidh99">
                    <div class="s-ico"><i class="fa-brands fa-github"></i></div>
                    <div class="s-nfo"><span class="s-plat">GitHub</span><span class="s-hand">github.com/Hafidh99</span></div>
                    <div class="s-arr"><i class="fa-solid fa-arrow-right"></i></div>
                </a>
                <a id="s-email"    href="mailto:hafidh@example.com"                                                   class="s-block s-block--em" aria-label="Email Hafidh">
                    <div class="s-ico"><i class="fa-solid fa-envelope"></i></div>
                    <div class="s-nfo"><span class="s-plat">Email</span><span class="s-hand">hafidh@example.com</span></div>
                    <div class="s-arr"><i class="fa-solid fa-arrow-right"></i></div>
                </a>
                <a id="s-linkedin" href="https://linkedin.com/in/hafidh99" target="_blank" rel="noopener noreferrer" class="s-block s-block--li" aria-label="LinkedIn Hafidh99">
                    <div class="s-ico"><i class="fa-brands fa-linkedin"></i></div>
                    <div class="s-nfo"><span class="s-plat">LinkedIn</span><span class="s-hand">linkedin.com/in/hafidh99</span></div>
                    <div class="s-arr"><i class="fa-solid fa-arrow-right"></i></div>
                </a>
            </nav>
        </div>

    </section>

    <a class="forbidden-harbor" href="#" aria-label="Hidden passage" tabindex="-1">
        <i class="fa-solid fa-lock" aria-hidden="true"></i>
        <span class="fh-tt">Forbidden Harbor</span>
    </a>

    <footer class="site-footer">
        <p>⬡ &nbsp;Bound by craft. Executed with precision. &nbsp;·&nbsp; Hafidh © {{ date('Y') }}</p>
    </footer>
@endsection
