<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Hafidh — Full-Stack Web Developer. Executing commands with absolute control." />
    <title>Hafidh | Execute. Command. Control.</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700;800&family=Orbitron:wght@300;400&display=swap" rel="stylesheet" />

    <link rel="preconnect" href="https://cdn.tailwindcss.com" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/fontawesome.min.css" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/solid.min.css"      crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/brands.min.css"     crossorigin="anonymous" />
    
    <link rel="stylesheet" href="{{ asset('css/welcome.css') }}" />
</head>
<body>

    @yield('content')

    <script src="https://cdn.jsdelivr.net/npm/tsparticles-slim@2.12.0/tsparticles.slim.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    
    <script src="{{ asset('js/welcome.js') }}"></script>
</body>
</html>
