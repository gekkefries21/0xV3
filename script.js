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
            // Start fading out current content
            contents[currentSection].classList.remove('visible');

            // Slide transition
            wrapper.style.transform = `translateY(-${newSection * 100}vh)`;
            
            // Ensure the transition of sliding and fading happens smoothly
            setTimeout(() => {
                // Ensure the new section's content becomes visible after sliding completes
                currentSection = newSection;
                contents[currentSection].classList.add('visible');
                updateHash();
            }, 1000); // Ensure this matches the CSS transition time
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

