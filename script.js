document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    const navbar = document.querySelector('.navbar');
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
        
        // Hide the navbar during the transition
        navbar.style.opacity = '0'; 
        
        clearTimeout(transitionTimeout); // Clear any existing timeout
        
        currentSection = newSection;
        sections[currentSection].classList.add('active');
        
        // Schedule the navbar to reappear after the section transition is complete
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

    // Add click event listener for the button in the home section
    document.querySelector('#home button').addEventListener('click', () => {
        changeSection(1); // Move to the "Showcase" section
    });
});
