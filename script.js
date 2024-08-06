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
        
        sections[currentSection].classList.add('hidden');
        sections[currentSection].classList.remove('active');
        contents[currentSection].classList.remove('visible');

        sections[newSection].classList.add('active');
        sections[newSection].classList.remove('next');
        contents[newSection].classList.add('visible');

        setTimeout(() => {
            sections[newSection].classList.remove('hidden');
            sections[newSection].classList.remove('next');
            sections[currentSection].classList.remove('active');
        }, 1000); // Match this timeout with the CSS transition duration

        currentSection = newSection;
        updateHash();
    };

    // Initialize the first section
    sections[currentSection].classList.add('active');
    contents[currentSection].classList.add('visible');
    updateHash();

    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            if (currentSection < sections.length - 1) {
                sections[currentSection].classList.add('next');
                changeSection(currentSection + 1);
            }
        } else {
            if (currentSection > 0) {
                sections[currentSection].classList.add('next');
                changeSection(currentSection - 1);
            }
        }
    });
});

