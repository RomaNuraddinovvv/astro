document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing functionality...');
    
    // === QUOTE FUNCTIONALITY ===
    const quoteText = document.getElementById('quote-text');
    const newQuoteBtn = document.querySelector('.new-quote-btn');

    const quotes = [
        '"The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." - Carl Sagan',
        '"Somewhere, something incredible is waiting to be known." - Carl Sagan',
        '"The universe is a pretty big place. If it\'s just us, seems like an awful waste of space." - Carl Sagan',
        '"The Earth is the only world known so far to harbor life. There is nowhere else, at least in the near future, to which our species could migrate." - Carl Sagan',
        '"We are like butterflies who flutter for a day and think it is forever." - Carl Sagan',
        '"The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff." - Carl Sagan'
    ];

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    function updateQuote() {
        if (quoteText) {
            const randomQuote = getRandomQuote();
            quoteText.textContent = randomQuote;
        }
    }

    if (newQuoteBtn) {
        newQuoteBtn.onclick = function() {
            updateQuote();
            return false;
        };
    }

    updateQuote(); // Set initial quote

    // === AVATAR FUNCTIONALITY ===
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarImg = document.getElementById('avatar-img');

    if (avatarUpload && avatarImg) {
        // Reset avatar to default on page load
        avatarImg.src = 'avatar.png';
        
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // === SAVE BUTTONS ===
    document.querySelectorAll('.save-btn').forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            const input = parent.querySelector('input');
            if (input) {
                alert('Changes saved!');
            }
        });
    });

    // === LOGOUT BUTTON ===
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }
});
