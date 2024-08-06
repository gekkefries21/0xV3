document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    let currentSection = 0;
    
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
        currentSection = newSection;
        sections[currentSection].classList.add('active');
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
});

