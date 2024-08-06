document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('#top-bar');
    const audio = document.querySelector('#audio');
    const progressBar = document.querySelector('#progress-bar');
    const playPauseBtn = document.querySelector('#play-pause-btn');
    let currentSection = 0;
    let transitionTimeout;
    let isPlaying = false;

    const updateHash = () => {
        const sectionIds = ['home', 'showcase', 'download'];
        window.location.hash = sectionIds[currentSection];
    };
    
    const updateDots = () => {
        dots.forEach((dot, index) => {
            if (index === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const updateProgressBar = () => {
        if (audio.duration) {
            progressBar.max = audio.duration;
            progressBar.value = audio.currentTime;
            const updateInterval = setInterval(() => {
                if (!isPlaying) return;
                progressBar.value = audio.currentTime;
            }, 500);
            return updateInterval;
        }
    };

    const changeSection = (newSection) => {
        sections[currentSection].classList.remove('active');
        contents[currentSection].classList.remove('visible');
        navbar.style.opacity = '0'; // Hide the navbar before transitioning
        clearTimeout(transitionTimeout); // Clear any existing timeout
        
        currentSection = newSection;
        sections[currentSection].classList.add('active');
        
        // Show navbar again after the section transition is complete
        transitionTimeout = setTimeout(() => {
            navbar.style.opacity = '1'; // Show the navbar
        }, 1000); // Adjust this value if needed
        
        setTimeout(() => {
            contents[currentSection].classList.add('visible');
        }, 500); // Delay for content fade-in after opacity transition
        
        updateHash();
        updateDots();
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    };

    sections[currentSection].classList.add('active');
    contents[currentSection].classList.add('visible');
    updateHash();
    updateDots();

    // Event listeners
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            if (currentSection < sections.length - 1) {
                changeSection(currentSection + 1);
            }
        } else {
            if (currentSection > 0) {
                changeSection(currentSection - 1);
            }
        }
    });

    document.querySelector('.explore-btn').addEventListener('click', () => {
        changeSection(1); // Go to Showcase section
        audio.play(); // Start playing audio
        topBar.style.opacity = '1'; // Show the top bar
        updateProgressBar();
    });

    playPauseBtn.addEventListener('click', handlePlayPause);

    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });

    audio.addEventListener('ended', () => {
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    });
});
