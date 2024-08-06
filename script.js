document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    let currentSection = 0;
    
    const updateHash = () => {
        const sectionIds = ['home', 'showcase', 'download'];
        window.location.hash = sectionIds[currentSection];
    };
    
    const changeSection = (newSection) => {
        if (newSection === currentSection) return;

        // Determine direction of transition
        const direction = newSection > currentSection ? 'down' : 'up';

        sections[currentSection].classList.remove('active');
        sections[currentSection].classList.add('hidden');
        sections[currentSection].classList.add(direction);

        sections[newSection].classList.add('active');
        sections[newSection].classList.remove('hidden');
        sections[newSection].classList.remove(direction);

        // Ensure content is hidden during transition
        contents[currentSection].classList.remove('visible');
        setTimeout(() => {
            contents[currentSection].classList.remove('visible');
            contents[newSection].classList.add('visible');
        }, 1000); // Delay to match transition time

        currentSection = newSection;
        updateHash();
    };

    // Initialize
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
