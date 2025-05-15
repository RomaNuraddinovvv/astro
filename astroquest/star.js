// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Star data
    const stars = [
        {
            name: "Sirius",
            x: 35,
            y: 45,
            size: "1.7 times larger than the Sun",
            color: "White-blue",
            year: "Known since ancient times",
            fact: "The brightest star in the night sky and part of a binary star system."
        },
        {
            name: "Vega",
            x: 25,
            y: 25,
            size: "2.1 times larger than the Sun",
            color: "White-blue",
            year: "Known since ancient times",
            fact: "The fifth brightest star in the night sky and second brightest in the Northern Hemisphere."
        },
        {
            name: "Betelgeuse",
            x: 70,
            y: 20,
            size: "950 times larger than the Sun",
            color: "Red",
            year: "Known since ancient times",
            fact: "A red supergiant in the constellation Orion, which could explode as a supernova at any moment."
        },
        {
            name: "Aldebaran",
            x: 60,
            y: 65,
            size: "44 times larger than the Sun",
            color: "Orange-red",
            year: "Known since ancient times",
            fact: "Has 13 known exoplanets and is the brightest star in the constellation Taurus."
        },
        {
            name: "Antares",
            x: 85,
            y: 55,
            size: "700 times larger than the Sun",
            color: "Red",
            year: "Known since ancient times",
            fact: "A red supergiant in the constellation Scorpius, its name means 'rival of Mars'."
        },
        {
            name: "Procyon",
            x: 45,
            y: 30,
            size: "1.4 times larger than the Sun",
            color: "White-yellow",
            year: "Known since ancient times",
            fact: "Part of a binary star system and the eighth brightest star in the night sky."
        },
        {
            name: "Polaris",
            x: 10,
            y: 10,
            size: "30 times larger than the Sun",
            color: "Yellowish-white",
            year: "Known since ancient times",
            fact: "Located almost exactly above the North Pole and used for navigation."
        },
        {
            name: "Deneb",
            x: 15,
            y: 75,
            size: "200 times larger than the Sun",
            color: "White-blue",
            year: "Known since ancient times",
            fact: "One of the brightest known stars, with a luminosity 200,000 times greater than the Sun."
        }
    ];

    // Generate background stars
    function createBackgroundStars() {
        const container = document.getElementById('stars-container');
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            
            // Random size
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random twinkle delay
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            container.appendChild(star);
        }
    }

    // Create clickable stars and navigation
    function createClickableStars() {
        const container = document.getElementById('stars-container');
        const nav = document.querySelector('.star-nav');
        
        stars.forEach((star, index) => {
            // Create clickable star
            const starElement = document.createElement('div');
            starElement.className = 'clickable-star';
            starElement.style.left = `${star.x}%`;
            starElement.style.top = `${star.y}%`;
            starElement.style.animationDelay = `${index * 0.3}s`;
            starElement.dataset.index = index;
            
            // Create navigation button
            const button = document.createElement('button');
            button.className = 'star-btn';
            button.textContent = star.name;
            button.dataset.index = index;
            
            // Event listeners
            starElement.addEventListener('click', () => showStarInfo(index));
            button.addEventListener('click', () => showStarInfo(index));
            
            container.appendChild(starElement);
            nav.appendChild(button);
        });
    }

    // Show star information
    function showStarInfo(index) {
        const star = stars[index];
        const infoPanel = document.getElementById('star-info');
        
        // Update info
        infoPanel.querySelector('h2').textContent = star.name;
        document.getElementById('star-size').textContent = star.size;
        document.getElementById('star-color').textContent = star.color;
        document.getElementById('star-year').textContent = star.year;
        document.getElementById('star-fact').textContent = star.fact;
        
        // Show panel
        infoPanel.classList.add('active');
        
        // Highlight the selected star and button
        document.querySelectorAll('.clickable-star').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.star-btn').forEach(el => el.classList.remove('active'));
        
        document.querySelector(`.clickable-star[data-index="${index}"]`).classList.add('active');
        document.querySelector(`.star-btn[data-index="${index}"]`).classList.add('active');
    }

    // Initialize
    createBackgroundStars();
    createClickableStars();
    
    // Show the first star by default
    setTimeout(() => showStarInfo(0), 500);
});