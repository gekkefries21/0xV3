document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    const navbar = document.querySelector('.navbar');
    const exploreButton = document.querySelector('.explore-button');
    let currentSection = 0;
    let transitionTimeout;

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

    exploreButton.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            changeSection(currentSection + 1);
        }
    });
});

