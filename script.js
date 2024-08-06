document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    
    const updateHash = () => {
        const sectionIds = ['home', 'showcase', 'download'];
        window.location.hash = sectionIds[currentSection];
    };
    
    const changeSection = (newSection) => {
        sections[currentSection].style.opacity = 0;
        currentSection = newSection;
        sections[currentSection].style.opacity = 1;
        updateHash();
    };

    sections.forEach(section => {
        section.style.opacity = 0;
    });
    sections[currentSection].style.opacity = 1;
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
