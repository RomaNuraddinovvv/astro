document.addEventListener('DOMContentLoaded', function() {
    // ======= Element Selectors =======
    const categoriesDropdown = document.querySelector('.categories-dropdown');
    const categoriesPanel = document.querySelector('.categories-panel');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-section');
    const heroText = document.querySelector('.hero-text');
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const createAccountLink = document.getElementById('createAccountLink');
    const loginForm = document.getElementById('loginForm');
    const loginFields = document.querySelectorAll('.login-field');
    const registerFields = document.querySelectorAll('.register-field');
    const navbar = document.querySelector('.navbar');
    const faqItems = document.querySelectorAll('.faq-item');
    const backgroundVideo = document.querySelector('.background-video');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryContainers = document.querySelectorAll('.gallery-container');
    const navArrows = document.querySelectorAll('.nav-arrow');

    // ======= Video Background Enhancement =======
    if (backgroundVideo) {
        // Create overlay for better text visibility
        const videoOverlay = document.createElement('div');
        videoOverlay.className = 'video-overlay';
        backgroundVideo.parentNode.insertBefore(videoOverlay, backgroundVideo.nextSibling);
        
        // Handle video loading errors
        backgroundVideo.addEventListener('error', function() {
            backgroundVideo.style.display = 'none';
            heroSection.style.backgroundImage = 'url(https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg)';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        });
        
        // Ensure video fits viewport on resize
        window.addEventListener('resize', adjustVideoSize);
        
        function adjustVideoSize() {
            const windowRatio = window.innerWidth / window.innerHeight;
            const videoRatio = 16 / 9; // Assuming standard video ratio
            
            if (windowRatio < videoRatio) {
                backgroundVideo.style.width = 'auto';
                backgroundVideo.style.height = '100%';
            } else {
                backgroundVideo.style.width = '100%';
                backgroundVideo.style.height = 'auto';
            }
        }
        
        adjustVideoSize();
    }

    // ======= Sticky Navbar Effect =======
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ======= Categories Dropdown Functionality =======
    categoriesDropdown.addEventListener('click', function(event) {
        categoriesPanel.style.display = categoriesPanel.style.display === 'block' ? 'none' : 'block';
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        if (!categoriesDropdown.contains(event.target)) {
            categoriesPanel.style.display = 'none';
        }
    });

    categoriesPanel.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.querySelectorAll('.categories-panel ul li').forEach(item => {
        item.addEventListener('click', function(event) {
            const categoryText = this.textContent;
            document.querySelector('.categories-text').textContent = categoryText;
            categoriesPanel.style.display = 'none';
            event.preventDefault();
            event.stopPropagation();
            
            // Scroll to relevant section based on category
            const targetSection = document.querySelector(`.${categoryText.toLowerCase().replace(/\s+/g, '-')}-section`) || 
                                  document.querySelector('.nasa-gallery');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ======= Smooth Scroll for Scroll Indicator =======
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nasaGallery = document.querySelector('.nasa-gallery');
            if (nasaGallery) {
                nasaGallery.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ======= Hero Text Animation =======
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';
        heroText.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300);
    }

    // ======= Parallax Effect for Background =======
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (heroSection) {
            // Apply parallax effect to hero section
            const translateY = scrollPosition * 0.4;
            heroSection.style.backgroundPositionY = translateY + 'px';
            
            // Fade out hero content as user scrolls
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                const opacity = 1 - (scrollPosition / 700);
                if (opacity > 0) {
                    heroContent.style.opacity = opacity;
                }
            }
        }
    });

     // Modal elements
    const openModal = function() {
        loginModal.classList.add('active');
    };

   
    // Open modal when login or register buttons are clicked
    loginBtn.addEventListener('click', function() {
        openModal();
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        updateFormForLogin();
    });

    registerBtn.addEventListener('click', function() {
        openModal();
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        updateFormForRegister();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Tab switching functionality
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        updateFormForLogin();
    });

    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        updateFormForRegister();
    });

    // Create account link
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        updateFormForRegister();
    });

    // Password match validation
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    // Create password match indicator elements
    const passwordMatchIndicator = document.createElement('div');
    passwordMatchIndicator.className = 'password-match';
    passwordMatchIndicator.style.display = 'none';
    passwordMatchIndicator.textContent = 'Passwords match';
    
    const passwordMismatchIndicator = document.createElement('div');
    passwordMismatchIndicator.className = 'password-mismatch';
    passwordMismatchIndicator.style.display = 'none';
    passwordMismatchIndicator.textContent = 'Passwords do not match';
    
    // Append indicators after confirm password field
    confirmPassword.parentNode.appendChild(passwordMatchIndicator);
    confirmPassword.parentNode.appendChild(passwordMismatchIndicator);
    
    // Check password match on input
    function checkPasswordMatch() {
        if (confirmPassword.value === '') {
            passwordMatchIndicator.style.display = 'none';
            passwordMismatchIndicator.style.display = 'none';
        } else if (registerPassword.value === confirmPassword.value) {
            passwordMatchIndicator.style.display = 'block';
            passwordMismatchIndicator.style.display = 'none';
        } else {
            passwordMatchIndicator.style.display = 'none';
            passwordMismatchIndicator.style.display = 'block';
        }
    }
    
    registerPassword.addEventListener('input', checkPasswordMatch);
    confirmPassword.addEventListener('input', checkPasswordMatch);
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check which form is active
        if (loginTab.classList.contains('active')) {
            // Login form processing
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('Login submitted with:', { email, password });
            // Close the modal after successful login
            loginModal.classList.remove('active');
            // Redirect to planets page
            window.location.href = 'planet.html';
        } else {
            // Register form processing
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate that passwords match
            if (password !== confirmPassword) {
                passwordMismatchIndicator.style.display = 'block';
                return;
            }
            
            console.log('Registration submitted with:', { fullName, email, password });
            // Close the modal after successful registration
            loginModal.classList.remove('active');
            // Redirect to planets page
            window.location.href = 'planet.html';
        }
    });

    // Update form for login view
    function updateFormForLogin() {
        // Hide register fields, show login fields
        loginFields.forEach(field => field.style.display = 'block');
        registerFields.forEach(field => field.style.display = 'none');
        
        // Update button text and switch link
        document.querySelector('.auth-button').textContent = 'Log In';
        document.querySelector('.switch-prompt').textContent = "Don't have an account?";
        document.querySelector('.switch-link').textContent = 'Create an account';
    }

    // Update form for register view
    function updateFormForRegister() {
        // Hide login fields, show register fields
        loginFields.forEach(field => field.style.display = 'none');
        registerFields.forEach(field => field.style.display = 'block');
        
        // Update button text and switch link
        document.querySelector('.auth-button').textContent = 'Register';
        document.querySelector('.switch-prompt').textContent = 'Already have an account?';
        document.querySelector('.switch-link').textContent = 'Log in';
    } 
    
    document.querySelector('.auth-button').addEventListener('click', () => {
        document.querySelector('.auth-button').textContent = 'Register';
        window.location.href = 'planet.html';
    });
    

    

    // ======= NASA Gallery Implementation =======
    // Function to fetch data from NASA API
    async function fetchNASAImages(category) {
        let endpoint = '';
        
        switch(category) {
            case 'planets':
                endpoint = 'https://images-api.nasa.gov/search?q=planet&media_type=image';
                break;
            case 'stars':
                endpoint = 'https://images-api.nasa.gov/search?q=star&media_type=image';
                break;
            case 'galaxies':
                endpoint = 'https://images-api.nasa.gov/search?q=galaxy&media_type=image';
                break;
            case 'nebulae':
                endpoint = 'https://images-api.nasa.gov/search?q=nebula&media_type=image';
                break;
            case 'phenomena':
                endpoint = 'https://images-api.nasa.gov/search?q=supernova&media_type=image';
                break;
            default:
                endpoint = 'https://images-api.nasa.gov/search?q=space&media_type=image';
        }
        
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            const items = data.collection.items.slice(0, 6);
            return items.map(item => {
                const metadata = item.data[0];
                return {
                    name: metadata.title,
                    description: metadata.description ? metadata.description.substring(0, 150) + '...' : 'No description available',
                    image: item.links[0].href
                };
            });
        } catch (error) {
            console.error('Error fetching NASA images:', error);
            return [];
        }
    }

    // Initialize gallery with data
    async function initializeGallery(category) {
        const galleryContainer = document.querySelector(`.gallery-container.${category}`);
        if (!galleryContainer) return;
        
        // Clear existing content
        const featuredImage = galleryContainer.querySelector('.featured-image');
        const thumbnailsContainer = galleryContainer.querySelector('.thumbnails-container');
        
        if (!thumbnailsContainer) {
            const thumbnailsDiv = document.createElement('div');
            thumbnailsDiv.className = 'thumbnails-container';
            galleryContainer.appendChild(thumbnailsDiv);
        }
        
        // Fetch and display images
        const images = await fetchNASAImages(category);
        
        if (images.length > 0 && featuredImage) {
            featuredImage.querySelector('img').src = images[0].image;
            featuredImage.querySelector('.image-title').textContent = images[0].name;
            featuredImage.querySelector('.image-description').textContent = images[0].description;
        }
        
        // Create thumbnails
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';
            
            images.forEach((item, index) => {
                const thumb = document.createElement('div');
                thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
                thumb.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
                
                thumb.addEventListener('click', function() {
                    // Update featured image
                    featuredImage.querySelector('img').src = item.image;
                    featuredImage.querySelector('.image-title').textContent = item.name;
                    featuredImage.querySelector('.image-description').textContent = item.description;
                    
                    // Update active thumbnail
                    thumbnailsContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
                
                thumbnailsContainer.appendChild(thumb);
            });
        }
    }

    // Update category button click handlers
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active states
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            galleryContainers.forEach(container => container.classList.remove('active'));
            document.querySelector(`.gallery-container.${category}`).classList.add('active');
            
            // Initialize the gallery
            initializeGallery(category);
        });
    });

    // Initialize the first category on page load
    const firstCategory = document.querySelector('.category-btn.active');
    if (firstCategory) {
        initializeGallery(firstCategory.dataset.category);
    }

    // Gallery navigation with arrow controls
    if (navArrows) {
        navArrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const galleryContainer = this.closest('.gallery-container');
                const thumbnails = galleryContainer.querySelectorAll('.thumbnail');
                const activeThumb = galleryContainer.querySelector('.thumbnail.active');
                
                if (!activeThumb) return;
                
                let nextIndex;
                const currentIndex = Array.from(thumbnails).indexOf(activeThumb);
                
                if (this.classList.contains('next')) {
                    nextIndex = (currentIndex + 1) % thumbnails.length;
                } else {
                    nextIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
                }
                
                thumbnails[nextIndex].click();
                
                // Scroll thumbnail into view if needed
                const thumbsContainer = galleryContainer.querySelector('.thumbnails-container');
                if (thumbsContainer) {
                    thumbsContainer.scrollTo({
                        left: thumbnails[nextIndex].offsetLeft - thumbsContainer.offsetWidth / 2 + thumbnails[nextIndex].offsetWidth / 2,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ======= FAQ Accordion Implementation =======
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = question.querySelector('.toggle-icon');
        
        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => {
                const faqAnswer = faq.querySelector('.faq-answer');
                const faqToggleIcon = faq.querySelector('.toggle-icon');
                
                faq.classList.remove('active');
                faqAnswer.style.maxHeight = '0';
                faqAnswer.style.opacity = '0';
                faqToggleIcon.textContent = '+';
                faqToggleIcon.style.transform = 'rotate(0deg)';
            });
            
            // Open clicked FAQ if it was closed
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                toggleIcon.textContent = '−';
                toggleIcon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // ======= Helper Functions =======
    // Notification display function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Optional: Add keyboard navigation for gallery
    document.addEventListener('keydown', function(event) {
        const activeGallery = document.querySelector('.gallery-container.active');
        if (!activeGallery) return;
        
        if (event.key === 'ArrowLeft') {
            activeGallery.querySelector('.nav-arrow.prev').click();
        } else if (event.key === 'ArrowRight') {
            activeGallery.querySelector('.nav-arrow.next').click();
        }
    });

    // ======= Footer Link Scroll Functionality =======
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#home' || href === '#gallery' || href === '#faq') {
                e.preventDefault();
                let targetSection;
                switch(href) {
                    case '#home':
                        targetSection = document.querySelector('.hero-section');
                        break;
                    case '#gallery':
                        targetSection = document.querySelector('.nasa-gallery');
                        break;
                    case '#faq':
                        targetSection = document.querySelector('.faq-section');
                        break;
                }
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Для About и Support переход будет работать как обычно
        });
    });
});
