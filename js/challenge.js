// Security Challenge Gate - 3 Stages
(function() {
    // Check if user has already passed all challenges
    const hasAccess = sessionStorage.getItem('securityAccess');
    
    if (hasAccess === 'granted') {
        return; // User already passed, show site
    }
    
    // Get current stage (default to 1)
    let currentStage = parseInt(sessionStorage.getItem('challengeStage') || '1');
    
    // Simple hash function (SHA-256 simulation)
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str.toLowerCase().trim());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Challenge data for each stage (answers are SHA-256 hashed)
    const challenges = {
        1: {
            title: 'SECURITY CHECKPOINT 1/3',
            label: '> SECURITY QUESTION:',
            question: 'An attack that compromises database by injecting malicious code?',
            placeholder: 'Enter your answer...',
            // Hashed answers: sql injection, sqlinjection, sql-injection, sqli, sql inject
            answerHashes: [
                '0fa499aba8c8ffbe5e3a783601595f78853e54d5dcc46fcbfae275b904e29992',
                '645b82b573fe64356e51765a9c44fe4eb496483fe8b6b722b77d3e8e222cdbb9',
                '9cd950623fb52be4c8fcece30a9dc2842f58f1a867540ea55accb5630a4a9dcf',
                '41a91cc25ec5659c4b7457b2cee7537f9df2cde42195b0808343cd4e8bcce2f2',
                '119b33dccc321e7368577c6ec32b04efef6846667dcb17585945769566a9bdc5'
            ],
            hint: false
        },
        2: {
            title: 'SECURITY CHECKPOINT 2/3',
            label: '> ENUMERATION SKILLS:',
            question: 'What is the command to enumerate SMB shares?',
            placeholder: 'Enter the command...',
            // Hashed answers: enum4linux, smbclient, smbmap, enum4linux-ng, crackmapexec
            answerHashes: [
                '3b46edcc12edf9418d5e8fa835f6cd6f0f5f900d575968bff4cb886b6932e80c',
                '5f7ca3fb23ef3ea29d1d6453aff162879785e4d8f9b071298d906cdddf21aae5',
                'e8da70e0cc6ea2b8a5289fa1b6ac24d3bdde6c48bdbd3fccb9ccbcc345357174',
                '87da32b07fb30891123e35b5d6cba7bed8f95e63fade1bab5bc262fd7304d1b4',
                '950e67c9f8bd09ee30ad5dcddb3b4c90f75b92726f67f7f60fac5d01100b488a'
            ],
            hint: false
        },
        3: {
            title: 'FINAL CHALLENGE 3/3',
            label: '> THE DOOR:',
            question: 'I\'m about to open the door, but there\'s a password...<br>It doesn\'t look like what it seems:<br><br><code style="color: #00ff41; font-size: 0.9rem;">%56%31%56%35%56%6c%46%57%53%6b%5a%56%61%31%5a%43%55%6b%5a%72%50%51%3d%3d</code>',
            placeholder: 'Enter the decoded password...',
            // Hashed answers: youareready, you are ready, you-are-ready
            answerHashes: [
                '5bd130179bad7e8fb28fff4dca06092149bbb6e6822853f03c78f0b1b91ec267',
                '3ecb0a8485fcb550e58157a804d36408c0f033544f6f6b6a63cee536c00a82ed',
                '8abeaeca075c2f2ec14b6d8d20abf60cc9eb5cf7751c496debc0921feba2a143'
            ],
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
    
    async function checkAnswer() {
        const answer = answerInput.value.trim().toLowerCase();
        const answerHash = await hashString(answer);
        
        if (challenge.answerHashes.includes(answerHash)) {
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
