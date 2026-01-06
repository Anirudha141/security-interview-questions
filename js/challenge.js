// Security Challenge Gate
(function() {
    // Check if user has already passed the challenge
    const hasAccess = sessionStorage.getItem('securityAccess');
    
    if (hasAccess === 'granted') {
        return; // User already passed, show site
    }
    
    // Create challenge overlay
    const overlay = document.createElement('div');
    overlay.id = 'challengeOverlay';
    overlay.innerHTML = `
        <div class="challenge-container">
            <div class="challenge-header">
                <pre class="challenge-logo">
   ____           _____         _   
  / ___| ___  ___|_   _|__  ___| |_ 
  \\___ \\/ _ \\/ __|| |/ _ \\/ __| __|
   ___) |  __/ (__ | |  __/\\__ \\ |_ 
  |____/ \\___|\\___|_|\\___||___/\\__|
                </pre>
                <h2>> ACCESS RESTRICTED</h2>
                <p class="challenge-subtitle">[ Prove you're ready for cybersecurity ]</p>
            </div>
            
            <div class="challenge-content">
                <div class="challenge-question">
                    <p class="question-label">> SECURITY QUESTION:</p>
                    <p class="question-text">An attack that compromises database by injecting malicious code?</p>
                </div>
                
                <div class="challenge-input-group">
                    <input 
                        type="text" 
                        id="challengeAnswer" 
                        class="challenge-input" 
                        placeholder="Enter your answer..."
                        autocomplete="off"
                    >
                    <button id="submitChallenge" class="challenge-btn">SUBMIT</button>
                </div>
                
                <div id="challengeError" class="challenge-error"></div>
                
                <div class="challenge-hint">
                    <p style="opacity: 0.5; font-size: 0.85rem; margin-top: 20px;">
                        Hint: Think of common web vulnerabilities (format: SQL Injection)
                    </p>
                </div>
            </div>
            
            <div class="challenge-footer">
                <p>> root@secinterview:~$ ./verify_access.sh</p>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Focus input
    setTimeout(() => {
        document.getElementById('challengeAnswer').focus();
    }, 100);
    
    // Handle submission
    const submitBtn = document.getElementById('submitChallenge');
    const answerInput = document.getElementById('challengeAnswer');
    const errorDiv = document.getElementById('challengeError');
    
    function checkAnswer() {
        const answer = answerInput.value.trim().toLowerCase();
        
        // Accept multiple variations
        const correctAnswers = [
            'sql injection',
            'sqlinjection',
            'sql-injection',
            'sqli',
            'sql inject'
        ];
        
        if (correctAnswers.some(correct => answer === correct)) {
            // Correct answer!
            errorDiv.style.color = '#00ff41';
            errorDiv.textContent = '✓ ACCESS GRANTED! Initializing...';
            
            // Store access
            sessionStorage.setItem('securityAccess', 'granted');
            
            // Animate removal
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = 'auto';
                }, 500);
            }, 1000);
        } else {
            // Wrong answer
            errorDiv.style.color = '#ff0055';
            errorDiv.textContent = '✗ ACCESS DENIED! Incorrect answer. Try again.';
            answerInput.value = '';
            answerInput.classList.add('shake');
            setTimeout(() => answerInput.classList.remove('shake'), 500);
        }
    }
    
    // Click submit button
    submitBtn.addEventListener('click', checkAnswer);
    
    // Press Enter to submit
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
})();
