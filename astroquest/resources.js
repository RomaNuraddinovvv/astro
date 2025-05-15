function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('active');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.querySelector('.modal-content').classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Add click handlers to all resource links
document.querySelectorAll('.resource-link').forEach(link => {
    if (link.getAttribute('href') === '#') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
    }
});

// Add click handlers to all close buttons
document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.resource-modal');
        closeModal(modal.id);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('resource-modal')) {
        closeModal(e.target.id);
    }
}); 