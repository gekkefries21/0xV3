document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    const navbar = document.querySelector('.navbar');
    const exploreButton = document.getElementById('explore-button');
    const audio = document.getElementById('audio');
    const topBar = document.getElementById('top-bar');
    const playPauseButton = document.getElementById('play-pause-button');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const updateProgressBar = () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        progressBar.value = (currentTime / duration) * 100;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration - currentTime);
    };

    const setAudioTime = (event) => {
        const duration = audio.duration;
        const newTime = (event.target.value / 100) * duration;
        audio.currentTime = newTime;
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audio.pause();
            playPauseButton.textContent = 'Play';
        } else {
            audio.play();
            playPauseButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    };

    exploreButton.addEventListener('click', () => {
        changeSection(1); // Move to the Showcase section
        audio.play();
        topBar.style.opacity = '1'; // Show the top bar when audio starts playing
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
    });

    audio.addEventListener('timeupdate', updateProgressBar);
    progressBar.addEventListener('input', setAudioTime);
    playPauseButton.addEventListener('click', togglePlayPause);

    sections[currentSection].classList.add('active');
    contents[currentSection].classList.add('visible');
    updateHash();
    updateDots();

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
});
