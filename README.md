# Security Interview Questions

A static website with 150 real cybersecurity interview questions across 5 domains:
- Penetration Testing (30 questions)
- Red Team Operations (30 questions)
- Mobile Security (30 questions)
- Network Security (30 questions)
- Cloud Security (30 questions)

## Features
- Clean, modern dark theme
- Mobile responsive
- Expandable Q&A format
- Difficulty indicators (Easy/Medium/Hard)
- Community submission form

---

## Deployment to GitHub Pages (FREE)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it: `security-interview-questions` (or any name)
4. Set to **Public**
5. Click **Create repository**

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. In your new repo, click **Add file** → **Upload files**
2. Drag and drop ALL files from the `security-interview-questions` folder
3. Click **Commit changes**

**Option B: Using Git Command Line**
```bash
cd security-interview-questions
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/security-interview-questions.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Select branch: **main** and folder: **/ (root)**
6. Click **Save**

### Step 4: Access Your Site

After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/security-interview-questions/
```

---

## Setting Up the Submission Form (Formspree)

The submission form uses Formspree (free tier: 50 submissions/month).

### Setup Steps:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **New Form**
3. Give it a name (e.g., "Security Questions Submissions")
4. Copy your form endpoint (looks like: `https://formspree.io/f/xrgvpqwz`)
5. Edit `pages/submit.html`
6. Find this line:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
7. Replace `YOUR_FORM_ID` with your actual form ID
8. Commit and push the change

Now submissions will be sent to your email!

---

## Customization

### Change Colors
Edit `css/style.css` and modify the `:root` variables:
```css
:root {
    --primary: #00d4aa;        /* Main accent color */
    --bg-dark: #0a0a0f;        /* Background color */
    --bg-card: #12121a;        /* Card background */
}
```

### Add Questions
1. Open the relevant HTML file in `pages/`
2. Copy an existing `<div class="question-card">` block
3. Modify the question number, text, difficulty, and answer
4. Save and commit

### Change Branding
- Logo text: Search for "SecInterview" in HTML files
- Footer: Edit the footer section in each HTML file

---

## Alternative Hosting Options

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Sign up and click **Add new site** → **Import an existing project**
3. Connect to GitHub and select your repository
4. Click **Deploy site**

### Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Sign up and click **New Project**
3. Import your GitHub repository
4. Click **Deploy**

### Cloudflare Pages (Free)
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub account
3. Select your repository
4. Deploy

---

## Project Structure

```
security-interview-questions/
├── index.html              # Homepage
├── css/
│   └── style.css          # All styles
├── js/
│   └── main.js            # Navigation and accordion
├── pages/
│   ├── pentest.html       # Penetration Testing questions
│   ├── redteam.html       # Red Team questions
│   ├── mobile.html        # Mobile Security questions
│   ├── network.html       # Network Security questions
│   ├── cloud.html         # Cloud Security questions
│   └── submit.html        # Question submission form
└── README.md              # This file
```

---

## Custom Domain (Optional)

If you want to use a custom domain (e.g., `securityinterviews.com`):

1. Buy a domain (~$10-15/year) from Namecheap, GoDaddy, Google Domains, etc.
2. In GitHub Pages settings, enter your custom domain
3. Configure DNS at your registrar:
   - CNAME record: `www` → `YOUR_USERNAME.github.io`
   - A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Wait for DNS propagation (up to 24 hours)

---

## License

This project is open source. Feel free to use, modify, and share.

---

## Contributing

Have a great interview question? Use the submission form on the site, or create a pull request!
