document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const contents = document.querySelectorAll('.content');
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    document.body.appendChild(wrapper);
    
    sections.forEach(section => wrapper.appendChild(section));
    
    let currentSection = 0;
    
    const updateHash = () => {
        const sectionIds = ['home', 'showcase', 'download'];
        window.location.hash = sectionIds[currentSection];
    };
    
    const changeSection = (newSection) => {
        if (newSection >= 0 && newSection < sections.length) {
            // Fade out current content
            contents[currentSection].classList.remove('visible');
            // Wait for fade out before starting slide transition
            setTimeout(() => {
                wrapper.style.transform = `translateY(-${newSection * 100}vh)`;
                // Update section and fade in new content after sliding transition
                setTimeout(() => {
                    currentSection = newSection;
                    contents[currentSection].classList.add('visible');
                    updateHash();
                }, 1000); // Match this duration with the CSS transform transition time
            }, 500); // Match this duration with the CSS opacity transition time
        }
    };

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
