document.addEventListener('DOMContentLoaded', () => {
    const aimbotButton = document.getElementById('aimbot-toggle');
    const wallhackButton = document.getElementById('wallhack-toggle');
    const accuracySlider = document.getElementById('accuracy-slider');
    const accuracyValue = document.getElementById('accuracy-value');
    const themeToggle = document.getElementById('theme-toggle');
    const modeText = document.getElementById('mode-text');
    const aimbotStatus = document.getElementById('aimbot-status');
    const wallhackStatus = document.getElementById('wallhack-status');
    const wallhackOverlay = document.getElementById('wallhack-overlay');
    const targetNameInput = document.getElementById('target-name');
    const reticle = document.getElementById('reticle');
    const clickSound = document.getElementById('click-sound');

    // Aimbot toggle
    aimbotButton.addEventListener('click', () => {
        if (aimbotButton.textContent === 'Toggle Aimbot On') {
            aimbotButton.textContent = 'Toggle Aimbot Off';
            aimbotStatus.classList.add('on');
            playSound();
        } else {
            aimbotButton.textContent = 'Toggle Aimbot On';
            aimbotStatus.classList.remove('on');
            playSound();
        }
    });

    // Wallhack toggle
    wallhackButton.addEventListener('click', () => {
        if (wallhackButton.textContent === 'Toggle Wallhacks On') {
            wallhackButton.textContent = 'Toggle Wallhacks Off';
            wallhackStatus.classList.add('on');
            wallhackOverlay.classList.add('active');
            playSound();
        } else {
            wallhackButton.textContent = 'Toggle Wallhacks On';
            wallhackStatus.classList.remove('on');
            wallhackOverlay.classList.remove('active');
            playSound();
        }
    });

    // Accuracy slider
    accuracySlider.addEventListener('input', () => {
        accuracyValue.textContent = `${accuracySlider.value}%`;
        accuracyValue.classList.add('updated');
        playSound();
        setTimeout(() => accuracyValue.classList.remove('updated'), 300);
    });

    // Target name input
    targetNameInput.addEventListener('input', () => {
        if (targetNameInput.value.trim() !== '') {
            reticle.classList.add('active');
            setTimeout(() => reticle.classList.remove('active'), 1000);
        }
    });

    // Theme toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            modeText.textContent = 'Light Mode';
            updateParticles('light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            modeText.textContent = 'Dark Mode';
            updateParticles('dark');
        }
        playSound();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'a' || e.key === 'A') {
            aimbotButton.click();
        } else if (e.key === 'w' || e.key === 'W') {
            wallhackButton.click();
        } else if (e.key === 'ArrowLeft' && accuracySlider.value > 0) {
            accuracySlider.value = parseInt(accuracySlider.value) - 1;
            accuracySlider.dispatchEvent(new Event('input'));
        } else if (e.key === 'ArrowRight' && accuracySlider.value < 100) {
            accuracySlider.value = parseInt(accuracySlider.value) + 1;
            accuracySlider.dispatchEvent(new Event('input'));
        }
    });

    // Play sound
    function playSound() {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {}); // Handle autoplay restrictions
    }

    // Particle background
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)'
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles(mode) {
        particles.forEach(particle => {
            particle.color = mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)';
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
