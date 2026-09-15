// ==========================================
// 1. STOP VIDEO AUDIO ON MODAL CLOSE
// ==========================================
const videoModal = document.getElementById('videoModal');
const introVideo = document.getElementById('introVideo');

if (videoModal && introVideo) {
    videoModal.addEventListener('hidden.bs.modal', function () {
        introVideo.pause();
        introVideo.currentTime = 0; 
    });
}

// ==========================================
// 2. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
// ==========================================
window.onscroll = function() {
    handleScrollFeatures();
    revealOnScroll(); 
    if (typeof updateActiveNavbarTab === 'function') {
        updateActiveNavbarTab();
    }
};

function handleScrollFeatures() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    let topBtn = document.getElementById("backToTopBtn");
    if (winScroll > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 3. DYNAMIC FOOTER YEAR
// ==========================================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ==========================================
// 4. TYPEWRITER EFFECT
// ==========================================
const words = ["Volunteer", "Youth Leader", "Information Systems Student", "Musician", "Tech Enthusiast"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    let loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000); 
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    let loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            i = (words.length > (i + 1)) ? i + 1 : 0;
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

// ==========================================
// 5. SCROLL REVEAL ANIMATIONS
// ==========================================
function revealOnScroll() {
    let reveals = document.querySelectorAll('.reveal');
    let windowHeight = window.innerHeight;
    
    for (let i = 0; i < reveals.length; i++) {
        let elementTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 100; 
        
        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// ==========================================
// ==========================================
// 6. HOBBIES & SKILLS FILTER LOGIC
// ==========================================
function filterSkills(category) {
    const skillCols = document.querySelectorAll('.skill-item-col');
    skillCols.forEach(col => {
        const itemCat = col.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            col.classList.remove('d-none');
            setTimeout(() => {
                col.style.opacity = '1';
                col.style.transform = 'scale(1)';
            }, 10);
        } else {
            col.style.opacity = '0';
            col.style.transform = 'scale(0.95)';
            setTimeout(() => col.classList.add('d-none'), 180);
        }
    });

    document.querySelectorAll('.category-pill-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });
}

// Hook up category pill buttons
document.querySelectorAll('.category-pill-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        filterSkills(filter);
    });
});

// ==========================================
// 7. EVENT LISTENERS & BOOTSTRAP UTILITIES
// ==========================================
function updateDigitalClockAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "Good evening";
    if (hours >= 5 && hours < 12) {
        greeting = "Good morning";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good afternoon";
    }
    const greetingEl = document.getElementById('liveGreeting');
    if (greetingEl) greetingEl.textContent = greeting;

    const clockEl = document.getElementById('digitalClock');
    if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });
    }
}
setInterval(updateDigitalClockAndGreeting, 1000);

function initBootstrapTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
}

window.onload = function() {
    typingEffect();
    filterSkills("all");
    revealOnScroll(); 
    initBootstrapTooltips();
    updateDigitalClockAndGreeting();
};

// Bootstrap 5 Form Validation & Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            playSfx('pop');
            if (typeof showEnovaToast === 'function') {
                showEnovaToast('Please fill out all required fields properly.', 'fas fa-exclamation-triangle');
            }
            return;
        }

        this.classList.add('was-validated');
        playSfx('pop');
        const toastElement = document.getElementById('successToast');
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
        if (typeof showEnovaToast === 'function') {
            showEnovaToast('Message transmitted successfully! 🚀', 'fas fa-paper-plane');
        }
        this.reset();
        this.classList.remove('was-validated');
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0';
    });
}


// ==========================================
// 8. MCR ERA THEME ENGINE
// ==========================================
const eraConfig = {
    'classic': {
        name: 'Classic Orange',
        badge: 'Signature Era',
        particles: ['<i class="fas fa-spider"></i>', '<i class="fas fa-flask"></i>', '<i class="fas fa-skull"></i>', '🦇', '<i class="fas fa-fire"></i>'],
        colors: ['#ff7300', '#ffb347', '#ff5500', '#ffffff']
    },
    'revenge': {
        name: 'Three Cheers',
        badge: 'Revenge Era',
        particles: ['<i class="fas fa-tint"></i>', '<i class="fas fa-spider"></i>', '<i class="fas fa-skull"></i>', '<i class="fas fa-flask"></i>', '🥀', '🦇'],
        colors: ['#e60026', '#ff1a40', '#8b0000', '#ff4d6d', '#ffffff']
    },
    'black-parade': {
        name: 'Black Parade',
        badge: 'The Black Parade',
        particles: ['<i class="fas fa-skull"></i>', '<i class="fas fa-cross"></i>', '<i class="fas fa-music"></i>', '<i class="fas fa-crown"></i>', '💀', '🥀'],
        colors: ['#ffffff', '#e2e8f0', '#cbd5e1', '#94a3b8']
    },
    'danger-days': {
        name: 'Danger Days',
        badge: 'Killjoy Era',
        particles: ['<i class="fas fa-bolt"></i>', '<i class="fas fa-radiation"></i>', '<i class="fas fa-spray-can"></i>', '⚡', '★', '<i class="fas fa-fire"></i>'],
        colors: ['#00f0ff', '#ff007f', '#ffe600', '#00ffaa']
    }
};

let currentEra = localStorage.getItem('mcr_era_theme') || 'classic';

function setMCREra(era) {
    if (!eraConfig[era]) era = 'classic';
    currentEra = era;
    document.body.setAttribute('data-theme', era);
    localStorage.setItem('mcr_era_theme', era);

    // Update labels and badges
    const navLabel = document.getElementById('navEraLabel');
    if (navLabel) navLabel.textContent = eraConfig[era].name;

    const eraBadge = document.getElementById('eraBadge');
    if (eraBadge) eraBadge.textContent = eraConfig[era].badge;

    // Update active state in dropdown and era tabs
    document.querySelectorAll('.era-select-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-era') === era);
    });
    document.querySelectorAll('.era-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-era') === era);
    });
}

// Hook up click listeners for theme buttons
document.querySelectorAll('.era-select-btn, .era-tab-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const era = this.getAttribute('data-era');
        if (era) {
            setMCREra(era);
            playSfx('pop');
            if (typeof showEnovaToast === 'function' && eraConfig[era]) {
                showEnovaToast(`Theme switched to ${eraConfig[era].name}!`, 'fas fa-palette');
            }
        }
    });
});


// ==========================================
// 9. CUSTOM VINYL AUDIO PLAYER & CONTROLS
// ==========================================
const favMusic = document.getElementById('favMusic');
const playBtn = document.getElementById('playBtn');
const playBtnIcon = document.getElementById('playBtnIcon');
const vinylStage = document.getElementById('vinylStage');
const equalizer = document.getElementById('equalizer');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');
const mcrProgressBar = document.getElementById('mcrProgressBar');
const mcrProgressFill = document.getElementById('mcrProgressFill');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const stormToggleBtn = document.getElementById('stormToggleBtn');
const stormStatus = document.getElementById('stormStatus');

let stormEnabled = true;
let prevVolume = 0.8;

// Format seconds into m:ss
function formatAudioTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Toggle Play / Pause
function toggleAudioPlayback() {
    if (!favMusic) return;
    if (favMusic.paused) {
        favMusic.play().then(() => {
            updatePlayerState(true);
        }).catch(err => console.log("Audio playback blocked:", err));
    } else {
        favMusic.pause();
        updatePlayerState(false);
    }
}

function updatePlayerState(isPlaying) {
    if (playBtnIcon) {
        playBtnIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    if (vinylStage) {
        vinylStage.classList.toggle('is-playing', isPlaying);
    }
    if (equalizer) {
        equalizer.classList.toggle('is-playing', isPlaying);
    }
    const navWave = document.getElementById('navbarAudioWave');
    if (navWave) {
        navWave.classList.toggle('is-playing', isPlaying);
    }

    if (isPlaying && stormEnabled) {
        startRain();
    } else {
        stopRain();
    }
}

if (playBtn) {
    playBtn.addEventListener('click', toggleAudioPlayback);
}

// Progress and duration updates
if (favMusic) {
    favMusic.addEventListener('loadedmetadata', () => {
        if (durationTimeEl) durationTimeEl.textContent = formatAudioTime(favMusic.duration);
    });

    favMusic.addEventListener('timeupdate', () => {
        if (currentTimeEl) currentTimeEl.textContent = formatAudioTime(favMusic.currentTime);
        if (favMusic.duration && mcrProgressFill) {
            const percent = (favMusic.currentTime / favMusic.duration) * 100;
            mcrProgressFill.style.width = percent + '%';
        }
    });

    favMusic.addEventListener('ended', () => {
        updatePlayerState(false);
        favMusic.currentTime = 0;
        if (mcrProgressFill) mcrProgressFill.style.width = '0%';
    });

    favMusic.addEventListener('play', () => updatePlayerState(true));
    favMusic.addEventListener('pause', () => updatePlayerState(false));
}

// Click on progress bar to seek
if (mcrProgressBar && favMusic) {
    mcrProgressBar.addEventListener('click', (e) => {
        const rect = mcrProgressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        if (favMusic.duration) {
            favMusic.currentTime = (clickX / width) * favMusic.duration;
        }
    });
}

// Volume Control & Mute
function updateVolumeIcon(vol) {
    if (!volumeIcon) return;
    if (vol == 0 || favMusic.muted) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (vol < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

if (volumeSlider && favMusic) {
    volumeSlider.addEventListener('input', (e) => {
        favMusic.volume = parseFloat(e.target.value);
        favMusic.muted = false;
        updateVolumeIcon(favMusic.volume);
    });
}

if (volumeIcon && favMusic && volumeSlider) {
    volumeIcon.addEventListener('click', () => {
        if (favMusic.muted) {
            favMusic.muted = false;
            favMusic.volume = prevVolume || 0.8;
            volumeSlider.value = favMusic.volume;
        } else {
            prevVolume = favMusic.volume;
            favMusic.muted = true;
            volumeSlider.value = 0;
        }
        updateVolumeIcon(favMusic.muted ? 0 : favMusic.volume);
    });
}

// FX Storm toggle
if (stormToggleBtn) {
    stormToggleBtn.addEventListener('click', () => {
        stormEnabled = !stormEnabled;
        stormToggleBtn.classList.toggle('active', stormEnabled);
        if (stormStatus) stormStatus.textContent = stormEnabled ? 'ON' : 'OFF';

        if (!stormEnabled) {
            stopRain();
        } else if (favMusic && !favMusic.paused) {
            startRain();
        }
    });
}


// ==========================================
// 10. ERA-ADAPTIVE PARTICLE STORM
// ==========================================
const rainContainer = document.getElementById('rainContainer');
let rainInterval = null;

function startRain() {
    if (rainInterval || !rainContainer || !stormEnabled) return;
    rainInterval = setInterval(createRainItem, 250);
}

function stopRain() {
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }
}

function createRainItem() {
    if (!rainContainer) return;
    const item = document.createElement('div');
    item.classList.add('falling-item');

    const era = eraConfig[currentEra] || eraConfig['classic'];
    const elements = era.particles;
    const colors = era.colors;

    item.innerHTML = elements[Math.floor(Math.random() * elements.length)];
    item.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 3 + 2.2; 
    item.style.animationDuration = duration + 's';
    
    const size = Math.random() * 18 + 16; 
    item.style.fontSize = size + 'px';
    item.style.color = colors[Math.floor(Math.random() * colors.length)];

    rainContainer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, duration * 1000);
}


// ==========================================
// 11. MCR LYRIC QUOTE ROTATOR
// ==========================================
const mcrQuotes = [
    `"Give me a reason to believe." — Thank You for the Venom`,
    `"Fire at will! Preach all you want, but who's gonna save me?" — Thank You for the Venom`,
    `"I am not afraid to keep on living, I am not afraid to walk this world alone." — Famous Last Words`,
    `"So long and goodnight, so long and goodnight..." — Helena`,
    `"Awake and unafraid, asleep or dead." — Famous Last Words`,
    `"Look alive, sunshine! 109 in the sky..." — Na Na Na`,
    `"I'll tell you all the things I'll do, I'll show you how to follow you." — Thank You for the Venom`,
    `"We'll carry on... and though you're dead and gone, your memory will carry on." — Black Parade`
];

let quoteIndex = 0;
const mcrQuoteText = document.getElementById('mcrQuoteText');

function rotateMCRQuote() {
    if (!mcrQuoteText) return;
    mcrQuoteText.style.opacity = '0';
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % mcrQuotes.length;
        mcrQuoteText.textContent = mcrQuotes[quoteIndex];
        mcrQuoteText.style.opacity = '1';
    }, 400);
}

setInterval(rotateMCRQuote, 4500);


// ==========================================
// 12. FACEBOOK-STYLE NAVBAR & SCROLLSPY
// ==========================================
const navSections = ['home', 'about', 'experience', 'skills-hobbies', 'gallery', 'music', 'faq', 'contact'];

function updateActiveNavbarTab() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let activeId = 'home';

    for (let k = 0; k < navSections.length; k++) {
        const sec = document.getElementById(navSections[k]);
        if (sec) {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                activeId = navSections[k];
                break;
            }
        }
    }

    document.querySelectorAll('.fb-tab-item').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-section') === activeId);
    });

    document.querySelectorAll('.fb-mobile-item').forEach(item => {
        const href = item.getAttribute('href');
        item.classList.toggle('active', href === `#${activeId}`);
    });
}

// Center Tab Click Listeners
document.querySelectorAll('.fb-tab-item').forEach(tab => {
    tab.addEventListener('click', function(e) {
        playSfx('click');
        document.querySelectorAll('.fb-tab-item').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Mobile Drawer Item Listeners & Auto-Close
const mobileDrawerCollapse = document.getElementById('navbarNav');
document.querySelectorAll('.fb-mobile-item').forEach(item => {
    item.addEventListener('click', () => {
        playSfx('click');
        if (mobileDrawerCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(mobileDrawerCollapse) || new bootstrap.Collapse(mobileDrawerCollapse, { toggle: false });
            bsCollapse.hide();
        }
    });
});

// Quick Action: Terminal Launcher in Navbar
const navTerminalBtn = document.getElementById('navTerminalBtn');
if (navTerminalBtn) {
    navTerminalBtn.addEventListener('click', () => {
        playSfx('click');
        toggleTerminal();
    });
}

// Quick Action: Navbar Equalizer Wave Click
const navbarAudioWave = document.getElementById('navbarAudioWave');
if (navbarAudioWave) {
    navbarAudioWave.addEventListener('click', () => {
        toggleAudioPlayback();
    });
}


// ==========================================
// 13. THE VIRUS PRANK LOGIC
// ==========================================
const prankTrigger = document.getElementById('prankTrigger');
const prankOverlay = document.getElementById('prankOverlay');
const prankAudio = document.getElementById('prankAudio');
const killPcBtn = document.getElementById('killPcBtn');

if (prankTrigger && prankOverlay && prankAudio && killPcBtn) {
    prankTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        alert("⚠️ CRITICAL ALERT: SYSTEM COMPROMISED...\n\nLOL you got a Virus! 🦠");
        prankOverlay.classList.remove('d-none');
        prankAudio.volume = 0.8;
        prankAudio.play().catch(err => console.log("Browser blocked autoplay:", err));
    });

    killPcBtn.addEventListener('click', function() {
        alert("Just kidding bro XD");
        prankOverlay.classList.add('d-none');
        prankAudio.pause();
        prankAudio.currentTime = 0;
    });
}

// Initial theme application
setMCREra(currentEra);


// ==========================================
// 14. FULLSCREEN PHOTO GALLERY LIGHTBOX
// ==========================================
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');

const galleryImages = document.querySelectorAll('.gallery-img');
const totalGallerySlides = galleryImages.length;
let currentLightboxIdx = 0;

function openLightbox(index) {
    if (!galleryLightbox || !lightboxImg || index < 0 || index >= totalGallerySlides) return;
    currentLightboxIdx = index;
    lightboxImg.src = galleryImages[index].getAttribute('src');
    if (lightboxCounter) {
        lightboxCounter.textContent = `Photo ${index + 1} of ${totalGallerySlides}`;
    }
    galleryLightbox.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.add('d-none');
    document.body.style.overflow = '';
}

function showNextLightbox() {
    openLightbox((currentLightboxIdx + 1) % totalGallerySlides);
}

function showPrevLightbox() {
    openLightbox((currentLightboxIdx - 1 + totalGallerySlides) % totalGallerySlides);
}

// Attach slide click listeners
galleryImages.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
});

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextLightbox);
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevLightbox);

// Keyboard controls for Lightbox
window.addEventListener('keydown', (e) => {
    if (!galleryLightbox || galleryLightbox.classList.contains('d-none')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextLightbox();
    if (e.key === 'ArrowLeft') showPrevLightbox();
});


// ==========================================
// 15. INTERACTIVE DEVELOPER TERMINAL (ENOVA-CLI)
// ==========================================
const terminalLauncherBtn = document.getElementById('terminalLauncherBtn');
const terminalDrawer = document.getElementById('terminalDrawer');
const terminalInput = document.getElementById('terminalInput');
const terminalHistory = document.getElementById('terminalHistory');
const terminalBody = document.getElementById('terminalBody');
const termCloseBtn = document.getElementById('termCloseBtn');
const termMinBtn = document.getElementById('termMinBtn');
const termMaxBtn = document.getElementById('termMaxBtn');
const termClearShortcut = document.getElementById('termClearShortcut');

function toggleTerminal() {
    if (!terminalDrawer) return;
    const isClosed = terminalDrawer.classList.contains('d-none');
    terminalDrawer.classList.toggle('d-none', !isClosed);
    if (isClosed && terminalInput) {
        terminalInput.focus();
        scrollTerminalToBottom();
    }
}

function scrollTerminalToBottom() {
    if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

if (terminalLauncherBtn) terminalLauncherBtn.addEventListener('click', toggleTerminal);
if (termCloseBtn) termCloseBtn.addEventListener('click', () => terminalDrawer.classList.add('d-none'));
if (termMinBtn) termMinBtn.addEventListener('click', () => terminalDrawer.classList.add('d-none'));
if (termMaxBtn) {
    termMaxBtn.addEventListener('click', () => {
        if (terminalDrawer.style.width === '90vw') {
            terminalDrawer.style.width = '';
            terminalDrawer.style.height = '';
        } else {
            terminalDrawer.style.width = '90vw';
            terminalDrawer.style.height = '75vh';
        }
    });
}
if (termClearShortcut) {
    termClearShortcut.addEventListener('click', () => {
        if (terminalHistory) terminalHistory.innerHTML = '';
        if (terminalInput) terminalInput.focus();
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

// Terminal Command Parser
if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = terminalInput.value.trim();
            if (!rawCmd) return;

            // Echo command
            const echoEl = document.createElement('div');
            echoEl.className = 'term-cmd-echo';
            echoEl.innerHTML = `<span class="prompt-user">kerby@enova-os:~$</span> ${escapeHTML(rawCmd)}`;
            terminalHistory.appendChild(echoEl);

            const parts = rawCmd.split(' ').filter(Boolean);
            const cmd = parts[0].toLowerCase();
            const arg = parts.slice(1).join(' ').toLowerCase();

            let responseText = '';

            switch (cmd) {
                case 'help':
                    responseText = `
Available commands:
  about      - Profile, education & aspirations
  skills     - Technical competencies & stack
  projects   - Featured practical & academic work
  theme      - Switch MCR era [revenge|black-parade|danger-days|classic]
  contact    - Email, phone, location & socials
  matrix     - Activate digital cyber rain
  mcr        - Toggle 'Thank You for the Venom'
  clear      - Wipe terminal history
  whoami     - Current user session details
  date       - Display current system time
  sudo       - Superuser privileges`;
                    break;

                case 'about':
                    responseText = `Kerby Zamudio Enova
====================================
• Degree: BS in Information Systems (Camarines Norte State College)
• Leadership: President & Adviser, Red Cross Youth (Paracale Chapter)
• Focus: Bridging system analysis with creative design & robust hardware troubleshooting.`;
                    break;

                case 'skills':
                    responseText = `
[Technical Competencies]
• Programming: Java (Core/OOP), HTML5, CSS3, Modern JS, Bootstrap 5
• Hardware: Laptop Refurbishment, Component Diagnostics, Cable Management
• Specialized: CCTV/DVR Integration, PisoNet Systems, Networking
• Leadership: Disaster Risk Reduction, BLS/CPR, Event Management`;
                    break;

                case 'projects':
                    responseText = `
1. Optimizing Pabirik Laundry House
   - Role: Lead Developer & UI/UX Designer
   - Tools: Figma, System Analysis, Transaction Flows
2. KARTEL-Daet Work Immersion
   - Role: Hardware Diagnostician & Network Technician
   - Scope: CCTV installations, PisoNet units, refurbished laptops
3. Red Cross Youth Leadership
   - Scope: Paracale Chapter youth empowerment & first aid drives`;
                    break;

                case 'theme':
                    if (['revenge', 'black-parade', 'danger-days', 'classic'].includes(arg)) {
                        setMCREra(arg);
                        responseText = `[OK] Theme switched to '${arg}'. Dynamic accents and particle storm updated!`;
                    } else {
                        responseText = `Usage: theme [revenge | black-parade | danger-days | classic]
Currently active: ${currentEra}`;
                    }
                    break;

                case 'contact':
                    responseText = `
• Email: kerbyenova89@gmail.com
• Phone: 095571596198
• Address: Purok 1, Malaguit, Paracale, Camarines Norte
• GitHub: https://github.com/Curbiee`;
                    break;

                case 'matrix':
                    // Trigger custom matrix effect
                    responseText = `[SYSTEM] Waking up Neo... Initializing Matrix cyber protocol...`;
                    if (rainContainer) {
                        for (let k = 0; k < 25; k++) {
                            setTimeout(() => {
                                const drop = document.createElement('div');
                                drop.className = 'falling-item';
                                drop.innerHTML = ['01', '10', 'MATRIX', '⚡', '💻'][Math.floor(Math.random() * 5)];
                                drop.style.left = Math.random() * 100 + 'vw';
                                drop.style.color = '#00ff66';
                                drop.style.fontFamily = 'monospace';
                                drop.style.animationDuration = '2s';
                                rainContainer.appendChild(drop);
                                setTimeout(() => drop.remove(), 2200);
                            }, k * 120);
                        }
                    }
                    break;

                case 'mcr':
                    toggleAudioPlayback();
                    responseText = `[AUDIO] Toggled 'Thank You for the Venom' by My Chemical Romance. 🦇`;
                    break;

                case 'clear':
                    terminalHistory.innerHTML = '';
                    terminalInput.value = '';
                    return;

                case 'whoami':
                    responseText = `guest@enova-os (Guest Developer / Recruiter Session)`;
                    break;

                case 'date':
                    responseText = new Date().toLocaleString();
                    break;

                case 'sudo':
                    responseText = `Permission denied: User 'guest' is not in the sudoers file. This incident will be reported to Kerby! 😉`;
                    break;

                default:
                    responseText = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
                    break;
            }

            const resEl = document.createElement('div');
            resEl.className = 'term-res-output';
            resEl.textContent = responseText;
            terminalHistory.appendChild(resEl);

            terminalInput.value = '';
            scrollTerminalToBottom();
        }
    });
}


// ==========================================
// 16. 3D MOUSE PARALLAX TILT & FLASHLIGHT
// ==========================================
const tiltCards = document.querySelectorAll('.tilt-card, .flashlight-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        if (card.classList.contains('tilt-card')) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('tilt-card')) {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        }
    });
});


// ==========================================
// 17. PROJECT CASE STUDY MODAL ENGINE
// ==========================================
const caseStudies = {
    'kartel': {
        title: 'KARTEL-Daet Technical Immersion',
        badge: 'Work Immersion 2024',
        html: `
            <div class="mb-4">
                <span class="badge bg-orange text-dark mb-2">Hardware & Networking Immersion</span>
                <h5 class="text-white fw-bold">Commercial Tech Support & Diagnostics</h5>
                <p class="text-silver">Hands-on technical internship focused on end-user support, hardware diagnostics, and networking deployments.</p>
            </div>
            <div class="blueprint-block mb-4">
                <h6 class="text-orange fw-bold mb-2"><i class="fas fa-microchip me-2"></i>Core Engineering Tasks:</h6>
                <ul class="text-silver small mb-0 ps-3">
                    <li class="mb-2"><strong>Japan-Refurbished Laptops:</strong> Complete hardware teardown, thermal paste re-application, CMOS battery checks, and clean Windows deployment.</li>
                    <li class="mb-2"><strong>PisoNet Units:</strong> Maintenance of coin acceptors, digital timer boards, power distribution, and OS hardening against user tampering.</li>
                    <li><strong>CCTV & Networking:</strong> Crimped RJ45 cabling, installed IP & coaxial CCTV cameras, configured DVR remote viewing, and set up dual-band Wi-Fi routers.</li>
                </ul>
            </div>
            <div>
                <h6 class="text-white fw-bold mb-2">Technologies & Tools:</h6>
                <span class="tech-tag-badge">Hardware Diagnostics</span>
                <span class="tech-tag-badge">CCTV / NVR</span>
                <span class="tech-tag-badge">RJ45 / Cabling</span>
                <span class="tech-tag-badge">PisoNet Architecture</span>
                <span class="tech-tag-badge">BIOS/CMOS Setup</span>
            </div>
        `
    },
    'pabirik': {
        title: 'Optimizing Pabirik Laundry House System',
        badge: 'Academic Lead Project',
        html: `
            <div class="mb-4">
                <span class="badge bg-orange text-dark mb-2">Information Systems Project</span>
                <h5 class="text-white fw-bold">Digital Laundry Transaction & Management System</h5>
                <p class="text-silver">Led the comprehensive system analysis and UI/UX design to streamline order tracking, weight calculations, and customer billing for Pabirik Laundry House.</p>
            </div>
            <div class="blueprint-block mb-4">
                <h6 class="text-orange fw-bold mb-2"><i class="fas fa-sitemap me-2"></i>System Analysis & UI Highlights:</h6>
                <ul class="text-silver small mb-0 ps-3">
                    <li class="mb-2"><strong>Figma High-Fidelity Prototype:</strong> Designed clean POS and admin dashboards tailored for rapid customer check-in and automated ticket generation.</li>
                    <li class="mb-2"><strong>Process Automation:</strong> Replaced manual paper logging with automated status tracking (Received -> Washing -> Drying -> Ready for Pickup).</li>
                    <li><strong>Entity-Relationship Design:</strong> Mapped data models for transactions, inventory (detergents/softeners), and customer order records.</li>
                </ul>
            </div>
            <div>
                <h6 class="text-white fw-bold mb-2">Tech Stack & Methodology:</h6>
                <span class="tech-tag-badge">Figma UI/UX</span>
                <span class="tech-tag-badge">System Analysis</span>
                <span class="tech-tag-badge">ERD Modeling</span>
                <span class="tech-tag-badge">Wireframing</span>
                <span class="tech-tag-badge">Data Flow Diagrams</span>
            </div>
        `
    },
    'rcy': {
        title: 'Red Cross Youth Leadership & Preparedness',
        badge: 'President & Adviser 2023-2025',
        html: `
            <div class="mb-4">
                <span class="badge bg-orange text-dark mb-2">Humanitarian Leadership</span>
                <h5 class="text-white fw-bold">Paracale Chapter Youth Leadership</h5>
                <p class="text-silver">Directed community service campaigns, disaster risk reduction workshops, and volunteer mobilization across Paracale, Camarines Norte.</p>
            </div>
            <div class="blueprint-block mb-4">
                <h6 class="text-orange fw-bold mb-2"><i class="fas fa-hands-helping me-2"></i>Key Impact Areas:</h6>
                <ul class="text-silver small mb-0 ps-3">
                    <li class="mb-2"><strong>Volunteer Mobilization:</strong> Coordinated teams of 40+ youth volunteers for local safety drills and disaster relief drives.</li>
                    <li class="mb-2"><strong>First Aid & BLS Facilitation:</strong> Led hands-on demonstrations for bandaging, splinting, and basic life support for junior council members.</li>
                    <li><strong>Advocacy & Outreach:</strong> Spearheaded health awareness campaigns and community blood donation recruitment.</li>
                </ul>
            </div>
            <div>
                <h6 class="text-white fw-bold mb-2">Leadership Competencies:</h6>
                <span class="tech-tag-badge">Team Leadership</span>
                <span class="tech-tag-badge">Crisis Response</span>
                <span class="tech-tag-badge">First Aid / CPR</span>
                <span class="tech-tag-badge">Public Speaking</span>
                <span class="tech-tag-badge">Youth Mentorship</span>
            </div>
        `
    },
    'pisonet-net': {
        title: 'Commercial Network Deployment & PisoNet Hardening',
        badge: 'Field Deployment 2024',
        html: `
            <div class="mb-4">
                <span class="badge bg-orange text-dark mb-2">Network Infrastructure & Hardware</span>
                <h5 class="text-white fw-bold">PisoNet Station Architecture & Surveillance Network</h5>
                <p class="text-silver">Comprehensive local deployment of commercial gaming PisoNet units with customized network routing, bandwidth management, and surveillance integration in Daet, Camarines Norte.</p>
            </div>
            <div class="blueprint-block mb-4">
                <h6 class="text-orange fw-bold mb-2"><i class="fas fa-network-wired me-2"></i>Network & Hardware Architecture:</h6>
                <ul class="text-silver small mb-0 ps-3">
                    <li class="mb-2"><strong>QoS Bandwidth Optimization:</strong> Implemented router bandwidth throttling and low-latency prioritization (QoS) for competitive online gaming alongside regular browsing.</li>
                    <li class="mb-2"><strong>Hardware & Coin-Timer Hardening:</strong> Assembled modular relay boards, coin acceptors with anti-cheat diodes, and secure internal chassis wiring.</li>
                    <li><strong>DVR Surveillance Integration:</strong> Configured 8-channel DVR system with port forwarding and remote mobile monitoring for establishment security.</li>
                </ul>
            </div>
            <div>
                <h6 class="text-white fw-bold mb-2">Core Technologies:</h6>
                <span class="tech-tag-badge">Network Topology</span>
                <span class="tech-tag-badge">QoS Traffic Shaping</span>
                <span class="tech-tag-badge">Hardware Diagnostics</span>
                <span class="tech-tag-badge">DVR Remote Streaming</span>
                <span class="tech-tag-badge">Relay Timers</span>
            </div>
        `
    }
};

const caseStudyTitle = document.getElementById('caseStudyTitle');
const caseStudyBody = document.getElementById('caseStudyBody');
const caseStudyModalEl = document.getElementById('caseStudyModal');

document.querySelectorAll('.open-case-study').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevents card flipping on button click
        playSfx('click');
        const projectKey = this.getAttribute('data-project');
        const projectData = caseStudies[projectKey];

        if (projectData && caseStudyTitle && caseStudyBody && caseStudyModalEl) {
            caseStudyTitle.innerHTML = `<i class="fas fa-file-code me-2"></i> ${projectData.title}`;
            caseStudyBody.innerHTML = projectData.html;

            const modal = new bootstrap.Modal(caseStudyModalEl);
            modal.show();
        }
    });
});


// ==========================================
// 18. INTERACTIVE FLIP CARDS (CLICK & TAP)
// ==========================================
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't flip if clicking an action button (e.g. View Tech Logs) or link
        if (e.target.closest('.open-case-study') || e.target.closest('a') || e.target.closest('button')) {
            return;
        }
        playSfx('flip');
        this.classList.toggle('is-flipped');
    });

    // Keyboard accessibility: Enter or Space flips the card
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.closest('.open-case-study') || e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            e.preventDefault();
            playSfx('flip');
            this.classList.toggle('is-flipped');
        }
    });
});


// ==========================================
// 19. EXPERIENCE FILTERS & FLIP-ALL CONTROLS
// ==========================================
function filterExperience(category) {
    const items = document.querySelectorAll('.exp-item-col');
    items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            item.classList.remove('d-none');
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => item.classList.add('d-none'), 180);
        }
    });

    document.querySelectorAll('.exp-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-exp-filter') === category);
    });
}

document.querySelectorAll('.exp-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        playSfx('click');
        const filter = this.getAttribute('data-exp-filter');
        filterExperience(filter);
    });
});

// Flip All Cards Toggle
const flipAllProjectsBtn = document.getElementById('flipAllProjectsBtn');
let allProjectsFlipped = false;

if (flipAllProjectsBtn) {
    flipAllProjectsBtn.addEventListener('click', () => {
        allProjectsFlipped = !allProjectsFlipped;
        playSfx('flip');
        
        document.querySelectorAll('#experienceGrid .flip-card').forEach(card => {
            card.classList.toggle('is-flipped', allProjectsFlipped);
        });

        flipAllProjectsBtn.classList.toggle('active', allProjectsFlipped);
        const label = document.getElementById('flipAllLabel');
        const icon = document.getElementById('flipAllIcon');
        if (label) label.textContent = allProjectsFlipped ? 'Front View' : 'Flip All';
        if (icon) icon.className = allProjectsFlipped ? 'fas fa-undo' : 'fas fa-sync-alt';
    });
}


// ==========================================
// 20. WEB AUDIO API TACTILE SOUND FX
// ==========================================
let audioCtx = null;
let sfxEnabled = localStorage.getItem('enova_sfx_enabled') !== 'false'; // default true
const sfxToggleBtn = document.getElementById('sfxToggleBtn');
const sfxIcon = document.getElementById('sfxIcon');

function updateSfxUI() {
    if (sfxIcon) {
        sfxIcon.className = sfxEnabled ? 'fas fa-volume-up text-orange' : 'fas fa-volume-mute text-secondary';
    }
    if (sfxToggleBtn) {
        sfxToggleBtn.classList.toggle('muted', !sfxEnabled);
        sfxToggleBtn.title = sfxEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects';
    }
}

function playSfx(type = 'click') {
    if (!sfxEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        if (type === 'flip') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'pop') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now);
            osc.stop(now + 0.06);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        }
    } catch (e) {
        // Silently catch audio context errors if browser blocks autoplay
    }
}

if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
        sfxEnabled = !sfxEnabled;
        localStorage.setItem('enova_sfx_enabled', sfxEnabled);
        updateSfxUI();
        if (sfxEnabled) playSfx('pop');
    });
    updateSfxUI();
}


// ==========================================
// 21. COMMAND PALETTE (SPOTLIGHT SEARCH)
// ==========================================
const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
const cmdPaletteModalEl = document.getElementById('commandPaletteModal');
const cmdPaletteInput = document.getElementById('cmdPaletteInput');
const cmdResultsList = document.getElementById('cmdResultsList');

const commandItems = [
    // Navigation
    { id: 'nav-home', title: 'Home / Hero', group: 'Navigation', icon: 'fas fa-home', badge: 'Section', action: () => scrollToSection('#home') },
    { id: 'nav-about', title: 'About & Education', group: 'Navigation', icon: 'fas fa-user', badge: 'Section', action: () => scrollToSection('#about') },
    { id: 'nav-exp', title: 'Experience & Projects', group: 'Navigation', icon: 'fas fa-briefcase', badge: 'Section', action: () => scrollToSection('#experience') },
    { id: 'nav-skills', title: 'Skills Playground', group: 'Navigation', icon: 'fas fa-code', badge: 'Section', action: () => scrollToSection('#skills-hobbies') },
    { id: 'nav-gallery', title: 'Photo Gallery', group: 'Navigation', icon: 'fas fa-images', badge: 'Section', action: () => scrollToSection('#gallery') },
    { id: 'nav-music', title: 'MCR Music Player', group: 'Navigation', icon: 'fas fa-compact-disc', badge: 'Section', action: () => scrollToSection('#music') },
    { id: 'nav-contact', title: 'Contact Me', group: 'Navigation', icon: 'fas fa-paper-plane', badge: 'Section', action: () => scrollToSection('#contact') },
    // Actions & Modals
    { id: 'act-resume', title: 'View / Print Resume (CV)', group: 'Actions', icon: 'fas fa-file-pdf', badge: 'Modal', action: () => openResumeModal() },
    { id: 'act-cli', title: 'Open Interactive Terminal (CLI)', group: 'Actions', icon: 'fas fa-terminal', badge: 'CLI', action: () => toggleTerminal() },
    { id: 'act-play-venom', title: 'Play / Pause "Thank You for the Venom"', group: 'Actions', icon: 'fas fa-play', badge: 'Music', action: () => toggleAudioPlayback() },
    { id: 'act-flip-all', title: 'Flip All Project Cards', group: 'Actions', icon: 'fas fa-sync-alt', badge: 'Toggle', action: () => { if (flipAllProjectsBtn) flipAllProjectsBtn.click(); } },
    // Themes
    { id: 'theme-classic', title: 'Theme: Classic Orange', group: 'Themes', icon: 'fas fa-fire', badge: 'Theme', action: () => setMCREra('classic') },
    { id: 'theme-revenge', title: 'Theme: Three Cheers (Revenge)', group: 'Themes', icon: 'fas fa-tint', badge: 'Theme', action: () => setMCREra('revenge') },
    { id: 'theme-parade', title: 'Theme: The Black Parade', group: 'Themes', icon: 'fas fa-skull', badge: 'Theme', action: () => setMCREra('black-parade') },
    { id: 'theme-danger', title: 'Theme: Danger Days (Killjoy)', group: 'Themes', icon: 'fas fa-bolt', badge: 'Theme', action: () => setMCREra('danger-days') }
];

let selectedCmdIdx = 0;
let filteredCommands = [...commandItems];

function renderCommandResults(query = '') {
    if (!cmdResultsList) return;
    const cleanQ = query.trim().toLowerCase();
    filteredCommands = commandItems.filter(cmd => 
        cmd.title.toLowerCase().includes(cleanQ) || 
        cmd.group.toLowerCase().includes(cleanQ) ||
        cmd.badge.toLowerCase().includes(cleanQ)
    );

    if (filteredCommands.length === 0) {
        cmdResultsList.innerHTML = `<div class="p-3 text-center text-silver small">No matching commands for "${escapeHTML(cleanQ)}"</div>`;
        return;
    }

    selectedCmdIdx = 0;
    let html = '';
    let currentGroup = '';

    filteredCommands.forEach((cmd, idx) => {
        if (cmd.group !== currentGroup) {
            currentGroup = cmd.group;
            html += `<div class="cmd-group-title">${currentGroup}</div>`;
        }
        html += `
            <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
                <div class="cmd-item-left">
                    <i class="${cmd.icon} cmd-item-icon"></i>
                    <span class="cmd-item-title">${cmd.title}</span>
                </div>
                <span class="cmd-item-badge">${cmd.badge}</span>
            </div>
        `;
    });

    cmdResultsList.innerHTML = html;

    cmdResultsList.querySelectorAll('.cmd-item').forEach(el => {
        el.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            executeCommand(idx);
        });
    });
}

function executeCommand(idx) {
    if (idx < 0 || idx >= filteredCommands.length) return;
    const cmd = filteredCommands[idx];
    playSfx('click');
    if (cmdPaletteModalEl) {
        const bsModal = bootstrap.Modal.getInstance(cmdPaletteModalEl);
        if (bsModal) bsModal.hide();
    }
    setTimeout(() => {
        if (typeof cmd.action === 'function') cmd.action();
    }, 200);
}

function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function openResumeModal() {
    const resumeModalEl = document.getElementById('resumeModal');
    if (resumeModalEl) {
        const modal = new bootstrap.Modal(resumeModalEl);
        modal.show();
    }
}

if (cmdPaletteBtn && cmdPaletteModalEl) {
    cmdPaletteBtn.addEventListener('click', () => {
        playSfx('click');
        const modal = new bootstrap.Modal(cmdPaletteModalEl);
        modal.show();
    });

    cmdPaletteModalEl.addEventListener('shown.bs.modal', () => {
        if (cmdPaletteInput) {
            cmdPaletteInput.value = '';
            cmdPaletteInput.focus();
            renderCommandResults('');
        }
    });

    if (cmdPaletteInput) {
        cmdPaletteInput.addEventListener('input', (e) => {
            renderCommandResults(e.target.value);
        });

        cmdPaletteInput.addEventListener('keydown', (e) => {
            const items = cmdResultsList.querySelectorAll('.cmd-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedCmdIdx = (selectedCmdIdx + 1) % items.length;
                updateCmdSelection(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedCmdIdx = (selectedCmdIdx - 1 + items.length) % items.length;
                updateCmdSelection(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executeCommand(selectedCmdIdx);
            }
        });
    }
}

function updateCmdSelection(items) {
    items.forEach((item, idx) => {
        item.classList.toggle('selected', idx === selectedCmdIdx);
        if (idx === selectedCmdIdx) {
            item.scrollIntoView({ block: 'nearest' });
        }
    });
}

// Global keyboard shortcut: Ctrl+K or Cmd+K
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (cmdPaletteModalEl) {
            const isShown = cmdPaletteModalEl.classList.contains('show');
            const bsModal = bootstrap.Modal.getOrCreateInstance(cmdPaletteModalEl);
            if (isShown) {
                bsModal.hide();
            } else {
                playSfx('click');
                bsModal.show();
            }
        }
    }
});


// ==========================================
// 22. RESUME PRINTING & CONTACT ENHANCEMENTS
// ==========================================
const printResumeBtn = document.getElementById('printResumeBtn');

function printResumeDocument() {
    playSfx('click');

    const resumeContent = document.getElementById('resumePrintArea');
    if (!resumeContent) {
        window.print();
        return;
    }

    // Create or reuse hidden iframe to print ONLY the clean resume
    let printFrame = document.getElementById('resumePrintFrame');
    if (!printFrame) {
        printFrame = document.createElement('iframe');
        printFrame.id = 'resumePrintFrame';
        printFrame.style.position = 'fixed';
        printFrame.style.right = '0';
        printFrame.style.bottom = '0';
        printFrame.style.width = '0';
        printFrame.style.height = '0';
        printFrame.style.border = '0';
        printFrame.style.visibility = 'hidden';
        document.body.appendChild(printFrame);
    }

    // Clone content and remove any print button inside
    const clone = resumeContent.cloneNode(true);
    const btnInClone = clone.querySelector('#printResumeBtn');
    if (btnInClone && btnInClone.parentElement) {
        btnInClone.parentElement.remove();
    }

    const printDoc = printFrame.contentWindow.document;
    printDoc.open();
    printDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Kerby Z. Enova - Curriculum Vitae</title>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                @page { size: A4 portrait; margin: 12mm 15mm; }
                * { box-sizing: border-box; }
                body {
                    font-family: 'Open Sans', Arial, sans-serif;
                    background-color: #ffffff;
                    color: #1f2937;
                    margin: 0;
                    padding: 0;
                    font-size: 10pt;
                    line-height: 1.45;
                }
                h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; margin: 0 0 6px 0; color: #111827; }
                .text-white { color: #111827 !important; }
                .text-silver, .text-light-gray { color: #4b5563 !important; }
                .text-orange { color: #c2410c !important; }
                .fw-bold { font-weight: 700 !important; }
                .fw-semibold { font-weight: 600 !important; }
                .small { font-size: 9pt; }
                .resume-header-card {
                    background: #f8fafc;
                    border: 1.5px solid #e2e8f0;
                    border-left: 5px solid #ea580c;
                    border-radius: 8px;
                    padding: 16px 20px;
                    margin-bottom: 20px;
                }
                .row { display: flex; flex-wrap: wrap; margin: 0 -12px; }
                .col-md-7 { width: 58%; padding: 0 12px; }
                .col-md-5 { width: 42%; padding: 0 12px; }
                .resume-section-title {
                    font-size: 11pt;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #ea580c;
                    border-bottom: 1.5px solid #e2e8f0;
                    padding-bottom: 4px;
                    margin: 16px 0 12px 0;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .resume-timeline-item {
                    border-left: 2px solid #ea580c;
                    padding-left: 12px;
                    margin-left: 4px;
                    margin-bottom: 14px;
                    position: relative;
                    page-break-inside: avoid;
                }
                .resume-timeline-item::before {
                    content: "";
                    position: absolute;
                    left: -6px;
                    top: 4px;
                    width: 10px;
                    height: 10px;
                    background: #ea580c;
                    border-radius: 50%;
                    border: 2px solid #ffffff;
                }
                .tech-tag-badge {
                    background: #f1f5f9;
                    border: 1px solid #cbd5e1;
                    color: #1e293b;
                    font-size: 8.5pt;
                    font-weight: 600;
                    padding: 2px 8px;
                    border-radius: 4px;
                    display: inline-block;
                    margin: 2px 2px;
                }
                ul { margin: 0; padding-left: 18px; list-style: none; }
                li { margin-bottom: 6px; }
                p { margin: 0 0 6px 0; }
            </style>
        </head>
        <body>
            ${clone.innerHTML}
        </body>
        </html>
    `);
    printDoc.close();

    // Give iframe time to parse CSS and fonts, then trigger native print dialog
    setTimeout(() => {
        try {
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();
        } catch (e) {
            window.print();
        }
    }, 250);
}

if (printResumeBtn) {
    printResumeBtn.addEventListener('click', printResumeDocument);
}

// Contact form quick inquiry chips
const contactMessage = document.getElementById('contactMessage');
const charCount = document.getElementById('charCount');

document.querySelectorAll('.inquiry-chip').forEach(chip => {
    chip.addEventListener('click', function() {
        playSfx('click');
        const text = this.getAttribute('data-text');
        if (contactMessage && text) {
            contactMessage.value = text;
            contactMessage.focus();
            if (charCount) charCount.textContent = text.length;
            
            document.querySelectorAll('.inquiry-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

if (contactMessage && charCount) {
    contactMessage.addEventListener('input', () => {
        charCount.textContent = contactMessage.value.length;
    });
}

// One-Click Copy Buttons
document.querySelectorAll('.copy-info-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const text = this.getAttribute('data-copy');
        if (!text) return;

        playSfx('pop');
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check text-success"></i> Copied!';
            this.classList.add('border-success');
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('border-success');
            }, 2000);
        }).catch(err => {
            console.error('Clipboard copy failed:', err);
        });
    });
});


// ==========================================
// 23. THEME TOAST NOTIFICATIONS & VISITOR REACTIONS
// ==========================================
const enovaToastContainer = document.getElementById('enovaToastContainer');

function showEnovaToast(message, icon = 'fas fa-check-circle') {
    if (!enovaToastContainer) return;

    const toastId = 'toast-' + Date.now();
    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = 'toast enova-toast align-items-center text-white show';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
        <div class="d-flex align-items-center p-2">
            <div class="toast-body d-flex align-items-center gap-2">
                <i class="${icon} text-orange fs-5"></i>
                <span class="fw-semibold">${message}</span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    enovaToastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

// Visitor Reactions Engine (Facebook-Style Kudos)
const defaultReactions = { rock: 42, fire: 38, killjoy: 29, fuel: 25, goth: 51 };
let storedReactions = {};

try {
    const saved = localStorage.getItem('enova_reactions');
    storedReactions = saved ? JSON.parse(saved) : { ...defaultReactions };
} catch (e) {
    storedReactions = { ...defaultReactions };
}

function updateReactionCountsUI() {
    Object.keys(storedReactions).forEach(key => {
        const el = document.getElementById(`count-${key}`);
        if (el) el.textContent = storedReactions[key];
    });
}

updateReactionCountsUI();

document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const type = this.getAttribute('data-reaction');
        if (!type) return;

        playSfx('pop');

        // Increment count
        storedReactions[type] = (storedReactions[type] || 0) + 1;
        try {
            localStorage.setItem('enova_reactions', JSON.stringify(storedReactions));
        } catch (err) {}
        updateReactionCountsUI();

        // Spawn floating emoji animation from cursor / button position
        const emoji = this.querySelector('.reaction-emoji')?.textContent || '⚡';
        const rect = this.getBoundingClientRect();
        const floatEl = document.createElement('div');
        floatEl.className = 'floating-reaction';
        floatEl.textContent = emoji;
        floatEl.style.left = `${rect.left + rect.width / 2 - 12}px`;
        floatEl.style.top = `${rect.top - 10}px`;
        document.body.appendChild(floatEl);

        setTimeout(() => floatEl.remove(), 1200);

        showEnovaToast(`Echo recorded! ${emoji} Thank you!`, 'fas fa-bolt');
    });
});

// Share Profile Button
const shareProfileBtn = document.getElementById('shareProfileBtn');
if (shareProfileBtn) {
    shareProfileBtn.addEventListener('click', () => {
        playSfx('pop');
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showEnovaToast('Portfolio link copied to clipboard! 📋', 'fas fa-share-alt');
        }).catch(() => {
            showEnovaToast('Here is the link: ' + url, 'fas fa-link');
        });
    });
}