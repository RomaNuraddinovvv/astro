document.addEventListener('DOMContentLoaded', function() {
    // Initialize Splitting for text animation
    try {
        Splitting({ target: '.planet-title h1', by: 'chars' });
    } catch (error) {
        console.warn('Splitting initialization failed:', error);
    }

    const elApp = document.querySelector('#app');
    if (!elApp) {
        console.error('App element not found');
        return;
    }

    // Section switching functionality
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.bottom-nav-item');

    function switchSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.removeAttribute('data-active');
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.setAttribute('data-active', '');
        }

        // Update navigation items
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });
    }

    // Add click handlers for navigation items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            switchSection(sectionId);
        });
    });

    // Initialize with planets section
    switchSection('planets-section');

    // Planet selection functionality
    const planetElements = document.querySelectorAll('.planet');
    const planetNavItems = document.querySelectorAll('.planet-nav li');

    function getPlanetDetails(planet) {
        const details = {
            mercury: {
                tilt: '4879',
                gravity: '0.9',
                speed: '47.4'
            },
            venus: {
                tilt: '12104',
                gravity: '0.9',
                speed: '35.0'
            },
            earth: {
                tilt: '12756',
                gravity: '1.0',
                speed: '29.8'
            },
            mars: {
                tilt: '6792',
                gravity: '0.4',
                speed: '24.1'
            },
            jupiter: {
                tilt: '142984',
                gravity: '2.5',
                speed: '13.1'
            },
            saturn: {
                tilt: '120536',
                gravity: '1.1',
                speed: '9.7'
            },
            uranus: {
                tilt: '51118',
                gravity: '0.9',
                speed: '6.8'
            },
            neptune: {
                tilt: '49528',
                gravity: '1.1',
                speed: '5.4'
            }
        };
        return details[planet] || {};
    }

    function typePlanetDetails(planet) {
        const details = getPlanetDetails(planet);
        const activePlanet = document.querySelector('.planet[data-active]');
        if (!activePlanet) return;

        const detailElements = activePlanet.querySelectorAll('.detail');
        detailElements.forEach(element => {
            const detailType = element.dataset.detail;
            const value = details[detailType];
            const postfix = element.dataset.postfix;
            
            if (value) {
                element.textContent = value + postfix;
            }
        });
    }

    function selectPlanet(planet) {
        // Update planet elements
        planetElements.forEach(element => {
            element.removeAttribute('data-active');
            if (element.dataset.planet === planet) {
                element.setAttribute('data-active', '');
            }
        });

        // Update navigation items
        planetNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.planet === planet) {
                item.classList.add('active');
            }
        });

        // Update app data attribute
        document.getElementById('app').dataset.currentPlanet = planet;

        // Type out planet details
        typePlanetDetails(planet);
    }

    // Add click handlers for planet navigation
    planetNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const planet = item.dataset.planet;
            selectPlanet(planet);
        });
    });

    // Initialize with first planet
    selectPlanet('mercury');

    /* Animation Utilities */
    function animate(duration, fn) {
        const start = performance.now();
        const ticks = Math.ceil(duration / 16.666667);
        let progress = 0;

        function tick(now) {
            if (progress >= 1) {
                fn(1);
                return;
            }

            const elapsed = now - start;
            progress = elapsed / duration;
            fn(progress);
            requestAnimationFrame(tick);
        }

        tick(start);
    }

    function easing(progress) {
        return (1 - Math.cos(progress * Math.PI)) / 2;
    }

    const animationDefaults = {
        duration: 1000,
        easing
    };

    animate.fromTo = ({ from, to, easing, duration }, fn) => {
        easing = easing || animationDefaults.easing;
        duration = duration || animationDefaults.duration;
        const delta = +to - +from;

        return animate(duration, progress => fn(from + easing(progress) * delta));
    };
});