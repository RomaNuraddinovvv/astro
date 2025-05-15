document.addEventListener('DOMContentLoaded', () => {
    const NASA_API_KEY = 'DEMO_KEY'; // Replace with your NASA API key
    const categories = document.querySelectorAll('.category');
    const quizContainer = document.querySelector('.quiz-container');
    const resultContainer = document.querySelector('.result-container');
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const explanationElement = document.querySelector('.explanation');
    const submitButton = document.querySelector('.next-btn');
    const backButton = document.querySelector('.back-btn');
    const retryButton = document.querySelector('.retry-btn');
    const quizTitle = document.querySelector('.quiz-title');
    const resultScore = document.querySelector('.result-score');
    const resultMessage = document.querySelector('.result-message');
    const nasaImage = document.querySelector('.nasa-image');
    const imageTitle = document.querySelector('.image-title');

    let currentCategory = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let questions = [];

    // Fetch NASA Astronomy Picture of the Day
    async function fetchNASAImageOfTheDay() {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
            const data = await response.json();
            nasaImage.src = data.url;
            imageTitle.textContent = data.title;
        } catch (error) {
            console.error('Error fetching NASA image:', error);
            nasaImage.src = 'https://via.placeholder.com/1200x300';
            imageTitle.textContent = 'Error loading NASA image';
        }
    }

    // Predefined questions
    const quizQuestions = {
        planets: [
            {
                question: 'Which planet is known as the "Red Planet"?',
                options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                answer: 1,
                explanation: 'Mars is called the "Red Planet" because of its reddish appearance, caused by iron oxide (rust) on its surface.'
            },
            {
                question: 'What is the largest planet in our solar system?',
                options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
                answer: 1,
                explanation: 'Jupiter is the largest planet in our solar system, with a mass more than 2.5 times that of all other planets combined.'
            },
            {
                question: 'Which planet has the most moons?',
                options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                answer: 1,
                explanation: 'Saturn has the most moons in our solar system, with over 80 confirmed moons.'
            }
        ],
        stars: [
            {
                question: 'What is the closest star to Earth?',
                options: ['Polaris', 'Proxima Centauri', 'Sun', 'Sirius'],
                answer: 2,
                explanation: 'The Sun is the closest star to Earth, located at an average distance of about 93 million miles (150 million kilometers).'
            },
            {
                question: 'What type of star is our Sun?',
                options: ['Red Dwarf', 'Yellow Dwarf', 'Blue Giant', 'White Dwarf'],
                answer: 1,
                explanation: 'Our Sun is a G-type main-sequence star (G2V), commonly known as a yellow dwarf.'
            },
            {
                question: 'What is a supernova?',
                options: ['A new star', 'A dying star explosion', 'A black hole', 'A galaxy'],
                answer: 1,
                explanation: 'A supernova is a powerful and luminous explosion of a star that occurs at the end of its life cycle.'
            }
        ],
        space: [
            {
                question: 'Who was the first person to walk on the Moon?',
                options: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'Alan Shepard'],
                answer: 1,
                explanation: 'Neil Armstrong became the first person to walk on the Moon on July 20, 1969, during the Apollo 11 mission.'
            },
            {
                question: 'What was the first artificial satellite launched into space?',
                options: ['Explorer 1', 'Sputnik 1', 'Vanguard 1', 'Telstar 1'],
                answer: 1,
                explanation: 'Sputnik 1, launched by the Soviet Union in 1957, was the first artificial satellite to orbit Earth.'
            },
            {
                question: 'What is the name of NASA\'s first space station?',
                options: ['Mir', 'Skylab', 'ISS', 'Salyut'],
                answer: 1,
                explanation: 'Skylab was NASA\'s first space station, launched in 1973 and operated until 1979.'
            }
        ],
        galaxies: [
            {
                question: 'What galaxy do we live in?',
                options: ['Andromeda', 'Milky Way', 'Triangulum', 'Large Magellanic Cloud'],
                answer: 1,
                explanation: 'We live in the Milky Way galaxy, a barred spiral galaxy containing our Solar System.'
            },
            {
                question: 'What is the closest major galaxy to the Milky Way?',
                options: ['Andromeda (M31)', 'Triangulum (M33)', 'Centaurus A', 'Sombrero Galaxy'],
                answer: 0,
                explanation: 'The Andromeda Galaxy (M31) is the closest major galaxy to the Milky Way, located about 2.5 million light-years away.'
            },
            {
                question: 'What type of galaxy is the Milky Way?',
                options: ['Elliptical', 'Spiral', 'Irregular', 'Lenticular'],
                answer: 1,
                explanation: 'The Milky Way is a barred spiral galaxy, characterized by a central bar-shaped structure and spiral arms.'
            }
        ],
        blackholes: [
            {
                question: 'What is a black hole?',
                options: ['Empty space', 'A collapsed star with infinite density', 'A dark planet', 'A type of galaxy'],
                answer: 1,
                explanation: 'A black hole is a region of spacetime where gravity is so strong that nothing, including light, can escape from it.'
            },
            {
                question: 'What is the event horizon of a black hole?',
                options: ['The center', 'The boundary where nothing can escape', 'The outer layer', 'The accretion disk'],
                answer: 1,
                explanation: 'The event horizon is the boundary around a black hole beyond which nothing can escape, not even light.'
            },
            {
                question: 'What is the name of the black hole at the center of our galaxy?',
                options: ['Cygnus X-1', 'Sagittarius A*', 'M87*', 'V404 Cygni'],
                answer: 1,
                explanation: 'Sagittarius A* is the supermassive black hole at the center of our Milky Way galaxy.'
            }
        ],
        astronomy: [
            {
                question: 'What is the study of celestial objects called?',
                options: ['Geology', 'Astronomy', 'Meteorology', 'Oceanography'],
                answer: 1,
                explanation: 'Astronomy is the scientific study of celestial objects, space, and the physical universe as a whole.'
            },
            {
                question: 'What is a light-year?',
                options: ['Time measurement', 'Distance measurement', 'Speed measurement', 'Energy measurement'],
                answer: 1,
                explanation: 'A light-year is the distance that light travels in one year, approximately 9.46 trillion kilometers.'
            },
            {
                question: 'What is the main tool used by astronomers to observe distant objects?',
                options: ['Microscope', 'Telescope', 'Periscope', 'Kaleidoscope'],
                answer: 1,
                explanation: 'Telescopes are the primary tools used by astronomers to observe and study distant celestial objects.'
            }
        ]
    };

    // Reset quiz state
    function resetQuizState() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        explanationElement.style.display = 'none';
        submitButton.textContent = 'Submit';
        submitButton.disabled = true;
        
        // Remove any existing event listeners
        submitButton.removeEventListener('click', handleSubmit);
        submitButton.removeEventListener('click', handleNext);
        submitButton.removeEventListener('click', showResults);
        
        // Add initial event listener
        submitButton.addEventListener('click', handleSubmit);
    }

    // Display question
    function displayQuestion(question) {
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(button);
        });
        explanationElement.style.display = 'none';
        submitButton.disabled = true;
        submitButton.textContent = 'Submit';
    }

    // Handle option selection
    function selectOption(index) {
        if (selectedOption !== null) return;
        
        selectedOption = index;
        const options = optionsElement.children;
        
        for (let option of options) {
            option.classList.remove('selected');
        }
        
        options[index].classList.add('selected');
        submitButton.disabled = false;
    }

    // Handle submit
    function handleSubmit() {
        if (selectedOption === null) return;
        
        const options = optionsElement.children;
        
        if (selectedOption === questions[currentQuestionIndex].answer) {
            options[selectedOption].classList.add('correct');
            score++;
        } else {
            options[selectedOption].classList.add('incorrect');
            options[questions[currentQuestionIndex].answer].classList.add('correct');
        }
        
        explanationElement.textContent = questions[currentQuestionIndex].explanation;
        explanationElement.style.display = 'block';
        
        // Check if this is the last question
        if (currentQuestionIndex === questions.length - 1) {
            submitButton.textContent = 'View Results';
            submitButton.removeEventListener('click', handleSubmit);
            submitButton.addEventListener('click', showResults);
        } else {
            submitButton.textContent = 'Next Question';
            submitButton.removeEventListener('click', handleSubmit);
            submitButton.addEventListener('click', handleNext);
        }
    }

    // Handle next question
    function handleNext() {
        selectedOption = null;
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
        submitButton.removeEventListener('click', handleNext);
        submitButton.addEventListener('click', handleSubmit);
    }

    // Show results
    function showResults() {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        resultScore.textContent = `${score}/${questions.length}`;
        
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) {
            resultMessage.textContent = 'Excellent! You\'re a space expert!';
        } else if (percentage >= 60) {
            resultMessage.textContent = 'Good job! Keep learning about space!';
        } else {
            resultMessage.textContent = 'Keep exploring! Space is fascinating!';
        }

        // Remove any existing back to categories button
        const existingBackBtn = document.querySelector('.back-to-categories-btn');
        if (existingBackBtn) {
            existingBackBtn.remove();
        }

        // Add back to categories button
        const backToCategoriesBtn = document.createElement('button');
        backToCategoriesBtn.className = 'retry-btn back-to-categories-btn';
        backToCategoriesBtn.style.marginLeft = '10px';
        backToCategoriesBtn.textContent = 'Back to Categories';
        backToCategoriesBtn.addEventListener('click', () => {
            resultContainer.style.display = 'none';
            categories.forEach(c => c.style.display = 'block');
            resetQuizState();
        });
        
        // Insert the new button after the retry button
        retryButton.parentNode.insertBefore(backToCategoriesBtn, retryButton.nextSibling);
    }

    // Event Listeners
    categories.forEach(category => {
        category.addEventListener('click', () => {
            currentCategory = category.dataset.category;
            quizTitle.textContent = `Quiz: ${category.querySelector('h3').textContent}`;
            categories.forEach(c => c.style.display = 'none');
            quizContainer.style.display = 'block';
            
            questions = quizQuestions[currentCategory];
            resetQuizState();
            displayQuestion(questions[currentQuestionIndex]);
        });
    });

    backButton.addEventListener('click', () => {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        categories.forEach(c => c.style.display = 'block');
        resetQuizState();
    });

    retryButton.addEventListener('click', () => {
        resultContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        resetQuizState();
        displayQuestion(questions[currentQuestionIndex]);
    });

    // Initialize
    fetchNASAImageOfTheDay();
}); 