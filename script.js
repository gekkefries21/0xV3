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
        
        // Add next class to the section being transitioned to
        sections[newSection].classList.add('next');
        sections[newSection].classList.add('active');
        contents[newSection].classList.add('visible');
        
        // Start transition
        sections[currentSection].classList.add('hidden');
        sections[currentSection].classList.remove('active');
        contents[currentSection].classList.remove('visible');
        
        setTimeout(() => {
            // Reset the classes to prepare for next transition
            sections[currentSection].classList.remove('hidden');
            sections[newSection].classList.remove('next');
            currentSection = newSection;
            updateHash();
        }, 1000); // Match this timeout with the CSS transition duration
    };

    // Initialize the first section
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

