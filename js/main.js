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

// Search Functionality
const searchBox = document.getElementById('searchBox');
const searchInfo = document.getElementById('searchInfo');
const noResults = document.getElementById('noResults');

if (searchBox) {
    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const questionCards = document.querySelectorAll('.question-card');
        const toolCards = document.querySelectorAll('.tool-card');
        let visibleCount = 0;
        let totalCount = 0;

        // Search in question cards (for question pages)
        if (questionCards.length > 0) {
            totalCount = questionCards.length;
            questionCards.forEach(card => {
                const questionText = card.querySelector('.question-text').textContent.toLowerCase();
                const answerText = card.querySelector('.answer-text').textContent.toLowerCase();
                
                // Search in both question and answer
                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Search in tool cards (for tools page)
        if (toolCards.length > 0) {
            totalCount = toolCards.length;
            toolCards.forEach(card => {
                const toolName = card.querySelector('.tool-name').textContent.toLowerCase();
                const toolDesc = card.querySelector('.tool-description').textContent.toLowerCase();
                
                // Search in tool name and description
                if (toolName.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Update search info
        if (searchTerm === '') {
            searchInfo.textContent = '';
            if (noResults) noResults.style.display = 'none';
        } else {
            const itemType = questionCards.length > 0 ? 'questions' : 'tools';
            searchInfo.textContent = `Showing ${visibleCount} of ${totalCount} ${itemType}`;
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }
    });
}
