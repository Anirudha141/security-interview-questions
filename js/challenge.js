// Security Challenge Gate - 3 Stages
(function() {
    // Check if user has already passed all challenges
    const hasAccess = sessionStorage.getItem('securityAccess');
    
    if (hasAccess === 'granted') {
        return; // User already passed, show site
    }
    
    // Get current stage (default to 1)
    let currentStage = parseInt(sessionStorage.getItem('challengeStage') || '1');
    
    // Challenge data for each stage
    const challenges = {
        1: {
            title: 'SECURITY CHECKPOINT 1/3',
            label: '> SECURITY QUESTION:',
            question: 'An attack that compromises database by injecting malicious code?',
            placeholder: 'Enter your answer...',
            answers: ['sql injection', 'sqlinjection', 'sql-injection', 'sqli', 'sql inject'],
            hint: false
        },
        2: {
            title: 'SECURITY CHECKPOINT 2/3',
            label: '> ENUMERATION SKILLS:',
            question: 'What is the command to enumerate SMB shares?',
            placeholder: 'Enter the command...',
            answers: ['enum4linux', 'smbclient', 'smbmap', 'enum4linux-ng', 'crackmapexec'],
            hint: false
        },
        3: {
            title: 'FINAL CHALLENGE 3/3',
            label: '> THE DOOR:',
            question: 'I\'m about to open the door, but there\'s a password...<br>It doesn\'t look like what it seems:<br><br><code style="color: #00ff41; font-size: 0.9rem;">%56%31%56%35%56%6c%46%57%53%6b%5a%56%61%31%5a%43%55%6b%5a%72%50%51%3d%3d</code>',
            placeholder: 'Enter the decoded password...',
            answers: ['youareready', 'you are ready', 'you-are-ready'],
            hint: false
        }
    };
    
    const challenge = challenges[currentStage];
    
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
                <h2>> ${challenge.title}</h2>
                <p class="challenge-subtitle">[ Prove you're ready for cybersecurity ]</p>
            </div>
            
            <div class="challenge-content">
                <div class="challenge-question">
                    <p class="question-label">${challenge.label}</p>
                    <p class="question-text">${challenge.question}</p>
                </div>
                
                <div class="challenge-input-group">
                    <input 
                        type="text" 
                        id="challengeAnswer" 
                        class="challenge-input" 
                        placeholder="${challenge.placeholder}"
                        autocomplete="off"
                    >
                    <button id="submitChallenge" class="challenge-btn">SUBMIT</button>
                </div>
                
                <div id="challengeError" class="challenge-error"></div>
            </div>
            
            <div class="challenge-footer">
                <p>> root@secinterview:~$ ./verify_access.sh --stage=${currentStage}</p>
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
        
        if (challenge.answers.some(correct => answer === correct)) {
            // Correct answer!
            errorDiv.style.color = '#00ff41';
            
            if (currentStage < 3) {
                // Not the final stage
                errorDiv.textContent = `✓ CHECKPOINT ${currentStage} PASSED! Loading next challenge...`;
                
                // Save progress
                sessionStorage.setItem('challengeStage', (currentStage + 1).toString());
                
                // Reload to next stage
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } else {
                // Final stage - grant access
                errorDiv.textContent = '✓ ALL CHALLENGES COMPLETED! ACCESS GRANTED!';
                
                // Store access
                sessionStorage.setItem('securityAccess', 'granted');
                sessionStorage.removeItem('challengeStage');
                
                // Animate removal
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                        document.body.style.overflow = 'auto';
                    }, 500);
                }, 1500);
            }
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
