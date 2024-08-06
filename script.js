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
            // Move to the new section
            wrapper.style.transform = `translateY(-${newSection * 100}vh)`;
            // Ensure that the new content is not visible until after the slide transition
            setTimeout(() => {
                currentSection = newSection;
                contents[currentSection].classList.add('visible');
                updateHash();
            }, 1000); // Match this duration with the CSS transition time
        }
    };

    contents[currentSection].classList.add('visible');
    updateHash();

    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            // Scrolling down
            if (currentSection < sections.length - 1) {
                changeSection(currentSection + 1);
            }
        } else {
            // Scrolling up
            if (currentSection > 0) {
                changeSection(currentSection - 1);
            }
        }
    });
});
