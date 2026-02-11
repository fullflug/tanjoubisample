document.addEventListener('DOMContentLoaded', () => {
    // --- Intro Logic ---
    const introOverlay = document.getElementById('intro-overlay');

    if (introOverlay) {
        const dismissIntro = () => {
            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1000);
        };
        introOverlay.addEventListener('click', dismissIntro);
        // Auto-dismiss after 8 seconds if not clicked
        setTimeout(dismissIntro, 8000);
    }

    // Entrance Animation
    const hero = document.getElementById('hero');
    hero.style.opacity = '0';
    hero.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
    });

    // Create falling elements (hearts/crosses)
    createFallingElements();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(20px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 800,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
});

function createFallingElements() {
    const container = document.body;
    const symbols = ['🖤', '🎀', '♡', '†'];

    setInterval(() => {
        const el = document.createElement('div');
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.position = 'fixed';
        el.style.top = '-50px';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (Math.random() * 20 + 10) + 'px';
        el.style.opacity = Math.random() * 0.5 + 0.2;
        el.style.color = Math.random() > 0.5 ? '#ffb7c5' : '#fff';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '0';
        el.style.textShadow = '0 0 5px rgba(255,183,197,0.5)';

        container.appendChild(el);

        const duration = Math.random() * 5000 + 5000;

        const animation = el.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: el.style.opacity },
            { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });

        animation.onfinish = () => el.remove();
    }, 500); // Add new element every 500ms
}

function tryPlay() {
    const audio = document.getElementById('bgm');
    const btn = document.getElementById('music-toggle');

    // Default to Pause icon (assuming auto-play works)
    btn.innerText = '⏸';
    btn.style.paddingLeft = '0';

    if (audio.paused) {
        audio.play().then(() => {
            btn.innerText = '⏸'; // Keep Pause icon if playing
            btn.classList.remove('paused');
            btn.style.paddingLeft = '0';
        }).catch(() => {
            console.log("自動再生がブロックされました");
            btn.innerText = '▶'; // Show Play icon if blocked
            btn.classList.add('paused');
            btn.style.paddingLeft = '5px';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Music Logic ---
    const audio = document.getElementById('bgm');
    const btn = document.getElementById('music-toggle');
    const musicTooltip = document.getElementById('music-tooltip');

    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            btn.innerText = '⏸';
            btn.classList.remove('paused');
            btn.style.paddingLeft = '0';
            if (musicTooltip) musicTooltip.style.display = 'none'; // Hide tooltip on play
        } else {
            audio.pause();
            btn.innerText = '▶';
            btn.classList.add('paused');
            btn.style.paddingLeft = '5px';
        }
    });

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.getElementById('lightbox-container');

    // Add click events to all memory cards
    document.querySelectorAll('.photo-card').forEach(card => {
        card.style.cursor = 'zoom-in';
        card.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxContainer.innerHTML = ''; // Clear previous content

            // Clone the card
            const clonedCard = card.cloneNode(true);

            // Remove skews and adjust for lightbox
            clonedCard.classList.remove('skew-left', 'skew-right', 'skew-center');
            clonedCard.style.transform = 'none';
            clonedCard.style.margin = '0';
            clonedCard.style.cursor = 'default';

            lightboxContainer.appendChild(clonedCard);
        });
    });

    // Close lightbox on click (background only, not the card itself)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
            closeLightboxAction();
        }
    });

    // Close on scroll
    window.addEventListener('scroll', () => {
        if (lightbox.style.display === 'flex') {
            closeLightboxAction();
        }
    }, { passive: true });

    function closeLightboxAction() {
        lightbox.style.display = 'none';
        lightboxContainer.innerHTML = '';
    }
});

// Remove tryPlay listeners at the end of the file as requested (no autoplay)
// window.addEventListener('load', tryPlay);
// document.addEventListener('click', tryPlay, { once: true });
// document.addEventListener('touchstart', tryPlay, { once: true });
