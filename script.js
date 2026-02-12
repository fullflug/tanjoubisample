// --- Hero Animation ---
const hero = document.getElementById('hero');
const audio = document.getElementById('bgm');
const btn = document.getElementById('music-toggle');
const musicTooltip = document.getElementById('music-tooltip');

if (hero) {
    hero.style.opacity = '0';
    hero.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
    });
}

// --- Music Logic (Manual Toggle) ---
if (audio && btn) {
    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            btn.innerText = '⏸';
            btn.classList.remove('paused');
            btn.style.paddingLeft = '0';
            if (musicTooltip) musicTooltip.style.display = 'none';
        } else {
            audio.pause();
            btn.innerText = '▶';
            btn.classList.add('paused');
            btn.style.paddingLeft = '5px';
        }
    });
}

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.getElementById('lightbox-container');

if (lightbox && lightboxContainer) {
    document.querySelectorAll('.photo-card').forEach(card => {
        card.style.cursor = 'zoom-in';
        card.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxContainer.innerHTML = '';

            const clonedCard = card.cloneNode(true);
            clonedCard.classList.remove('skew-left', 'skew-right', 'skew-center');
            clonedCard.style.transform = 'none';
            clonedCard.style.margin = '0';
            clonedCard.style.cursor = 'default';

            lightboxContainer.appendChild(clonedCard);
        });
    });

    const closeLightboxAction = () => {
        lightbox.style.display = 'none';
        lightboxContainer.innerHTML = '';
    };

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
            closeLightboxAction();
        }
    });

    window.addEventListener('scroll', () => {
        if (lightbox.style.display === 'flex') {
            closeLightboxAction();
        }
    }, { passive: true });
}
});
