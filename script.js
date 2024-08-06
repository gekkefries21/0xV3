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
            contents[currentSection].classList.remove('visible');
            setTimeout(() => {
                currentSection = newSection;
                wrapper.style.transform = `translateY(-${currentSection * 100}vh)`;
                setTimeout(() => {
                    contents[currentSection].classList.add('visible');
                }, 500); // Delay for content fade-in after slide transition
                updateHash();
            }, 500); // Delay for content fade-out before slide transition
        }
    };

    contents[currentSection].classList.add('visible');
    updateHash();

    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            changeSection(currentSection + 1);
        } else {
            changeSection(currentSection - 1);
        }
    });
});
