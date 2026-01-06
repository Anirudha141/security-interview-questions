// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Question Accordion Toggle
document.querySelectorAll('.question-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        const isActive = card.classList.contains('active');

        // Optional: Close other open questions (uncomment for single-open behavior)
        // document.querySelectorAll('.question-card').forEach(c => c.classList.remove('active'));

        if (isActive) {
            card.classList.remove('active');
        } else {
            card.classList.add('active');
        }
    });
});

// Expand/Collapse All functionality (if buttons exist)
const expandAllBtn = document.getElementById('expand-all');
const collapseAllBtn = document.getElementById('collapse-all');

if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.question-card').forEach(card => {
            card.classList.add('active');
        });
    });
}

if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.question-card').forEach(card => {
            card.classList.remove('active');
        });
    });
}
