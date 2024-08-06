document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const navIndicator = document.querySelector('.nav-indicator');
    let currentSection = 0;
    
    const updateHash = () => {
        const sectionIds = ['home', 'showcase', 'download'];
        window.location.hash = sectionIds[currentSection];
    };
    
    const updateNavIndicator = () => {
        const dots = navIndicator.querySelectorAll('div');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSection].classList.add('active');
    };
    
    const createNavDots = () => {
        sections.forEach(() => {
            const dot = document.createElement('div');
            navIndicator.appendChild(dot);
        });
    };
    
    const changeSection = (newSection) => {
        sections[currentSection].classList.remove('active');
        contents[currentSection].classList.remove('visible');
        currentSection = newSection;
        sections[currentSection].classList.add('active');
        setTimeout(() => {
            contents[currentSection].classList.add('visible');
        }, 500); // Delay for content fade-in after opacity transition
        updateNavIndicator();
        updateHash();
    };

    createNavDots();
    updateNavIndicator();
    sections[currentSection].classList.add('active');
    contents[currentSection].classList.add('visible');
    updateHash();

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
