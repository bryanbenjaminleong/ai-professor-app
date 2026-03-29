'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, BookOpen, CheckCircle, ChevronRight, Zap } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { HowToJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import ReactMarkdown from 'react-markdown'

// Real guide content from content/guides/*.json
const GUIDES_DATA: Record<string, {
  title: string
  description: string
  topic: string
  lessons: { title: string; content: string }[]
}> = {
  'guide-openclaw': {
    title: 'Installing OpenClaw',
    description: 'Set up your own AI assistant. Step-by-step for beginners.',
    topic: 'Getting Started',
    lessons: [
      { 
        title: 'What is OpenClaw?', 
        content: `**OpenClaw** is your personal AI assistant that runs on your own computer. Think of it like having ChatGPT, but private, customizable, and connected to your own tools.

## 🎯 What You'll Learn

By the end of this guide, you will:

- ✅ Understand what OpenClaw can do for you
- ✅ Know if your computer is ready
- ✅ Have OpenClaw installed and running
- ✅ Be chatting with your first AI assistant

**Time to complete:** ~30 minutes

## 🤔 Why Use OpenClaw?

### Privacy
Your conversations stay on your computer. No data sent to third parties unless you choose to connect services.

### Customizable
Add skills and tools for YOUR specific needs:
- Connect to your calendar
- Read your files
- Search the web
- Control smart home devices

### Multiple AI Models
Not locked into one AI provider:
- **OpenAI GPT-4** - Most capable
- **Anthropic Claude** - Great for writing
- **Local models** - Run offline, completely private

### Cost-Effective
- Use your existing API keys
- Pay only for what you use
- No monthly subscription required

## 💡 Real-World Use Cases

### For Developers
- "Review my pull request and suggest improvements"
- "Generate unit tests for this function"
- "Explain this error message and how to fix it"

### For Writers
- "Help me outline this article"
- "Rewrite this paragraph to be more engaging"
- "Check this for grammar and clarity"

### For Business
- "Summarize this meeting transcript"
- "Draft a response to this email"
- "Create a project timeline based on these requirements"

**→ Proceed to Lesson 2: System Requirements**`
      },
      { 
        title: 'System Requirements', 
        content: `## 📋 Minimum Requirements

| Requirement | Minimum | Recommended | Why It Matters |
|-------------|---------|-------------|----------------|
| **RAM** | 4 GB | 8 GB+ | AI models need memory |
| **Storage** | 2 GB free | 5 GB+ free | OpenClaw + cache |
| **OS** | Windows 10, macOS 10.15, Ubuntu 20.04 | Latest versions | Compatibility |
| **Internet** | Required for setup | Broadband | Download + API calls |

## 🔍 Step 1: Check Your Computer

### Windows
1. Press \`Windows Key + R\`
2. Type \`dxdiag\` and press Enter
3. Look at Memory (4GB+) and OS (Windows 10+)

### macOS
1. Click  Apple Menu → About This Mac
2. Check Memory (4GB+) and macOS Version (10.15+)

### Linux (Ubuntu)
\`\`\`bash
free -h        # Check RAM
lsb_release -a # Check Ubuntu version
\`\`\`

## 🔑 Step 2: Get Your API Key

### Option A: OpenAI (GPT-4, GPT-3.5) - Recommended

1. Go to **[platform.openai.com](https://platform.openai.com)**
2. Click **Sign Up**
3. Go to **API Keys** → **Create new secret key**
4. **Copy and save it securely** (you won't see it again!)
5. Add a payment method (minimum $5)

**Cost estimate:** GPT-4 ~$0.03/conversation, GPT-3.5 ~$0.002/conversation

## 🛠️ Step 3: Install Node.js

Check if installed:
\`\`\`bash
node --version
\`\`\`

If not, download from **[nodejs.org](https://nodejs.org)** (LTS version).

**→ Proceed to Lesson 3: Installation Step-by-Step**`
      },
      { 
        title: 'Installation Step-by-Step', 
        content: `## 🖥️ Install OpenClaw

### macOS / Linux
\`\`\`bash
npm install -g openclaw
\`\`\`

### Windows (Run as Administrator)
\`\`\`cmd
npm install -g openclaw
\`\`\`

### Verify Installation
\`\`\`bash
openclaw --version
\`\`\`

## 📁 Create Your Workspace

\`\`\`bash
# Create a folder for your AI assistant
mkdir ~/my-ai-assistant
cd ~/my-ai-assistant

# Initialize OpenClaw
openclaw init
\`\`\`

This creates:
\`\`\`
my-ai-assistant/
├── .env              # Your API keys (keep secret!)
├── config.yaml        # OpenClaw settings
├── conversations/     # Your chat history
└── skills/            # Custom skills you add
\`\`\`

## 🔐 Add Your API Key

Create a \`.env\` file:
\`\`\`bash
nano .env
\`\`\`

Add your key:
\`\`\`
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
\`\`\`

Save and exit (Ctrl+X, then Y, then Enter).

> ⚠️ **IMPORTANT:** Never share your \`.env\` file!

**→ Proceed to Lesson 4: Your First AI Assistant**`
      },
      { 
        title: 'Your First AI Assistant', 
        content: `## 🚀 Start OpenClaw

\`\`\`bash
cd ~/my-ai-assistant
openclaw start
\`\`\`

You'll see:
\`\`\`
🤖 OpenClaw is ready!
Model: gpt-4

You: _
\`\`\`

**Congratulations!** 🎉 Your AI assistant is running!

## 💬 Your First Conversation

\`\`\`
You: Hello! Can you help me write a professional email?
\`\`\`

The AI will respond and help you!

## 🎯 Try These Example Prompts

### For Writing
- "Write a LinkedIn post about AI trends in 2024"
- "Help me rewrite this paragraph to be more professional"

### For Learning
- "Explain machine learning like I'm 12 years old"
- "What's the difference between SQL and NoSQL databases?"

### For Coding
- "Write a Python function to sort a list of numbers"
- "Debug this code: [paste your code]"

## 🛠️ Add Skills

\`\`\`bash
openclaw skill add web-search
openclaw skill add weather
\`\`\`

Now you can ask: "What's the weather in Singapore?" or "Search for the latest AI news"

## ⌨️ Useful Commands

| Command | What It Does |
|---------|-------------|
| \`clear\` | Clear the screen |
| \`exit\` | Quit OpenClaw |
| \`help\` | Show all commands |

## 🎉 Congratulations!

You now have your own personal AI assistant running locally on your computer!

**Next Steps:**
- Explore more skills at **[clawhub.com](https://clawhub.com)**
- Read docs at **[docs.openclaw.ai](https://docs.openclaw.ai)**
- Join the community at **[discord.gg/clawd](https://discord.gg/clawd)**`
      },
      { 
        title: 'Connect to Telegram (BotFather)', 
        content: `## 📱 Connect OpenClaw to Telegram

One of OpenClaw's most powerful features is **Telegram integration** — access your AI assistant from your phone, anywhere!

## Why Telegram?

- **Mobile Access** - Chat with your AI on the go
- **Always On** - Your assistant runs 24/7 on your server
- **Share with Others** - Family/team can use your AI
- **Push Notifications** - Get proactive messages from your AI

## Step 1: Create a Telegram Bot

### Open BotFather

1. Open Telegram (phone or desktop)
2. Search for **@BotFather**
3. Start a chat with the verified BotFather (blue checkmark ✓)

### Create Your Bot

Send:
\`\`\`
/newbot
\`\`\`

BotFather will ask for:
1. **Bot name** - Display name (e.g., "My AI Assistant")
2. **Bot username** - Must end in \`bot\` (e.g., \`my_ai_assistant_bot\`)

### Save Your Token

BotFather responds with:
\`\`\`
Done! Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure!
\`\`\`

⚠️ **Copy this token** — you'll need it for OpenClaw!

## Step 2: Configure OpenClaw

### Add Telegram to Config

Open your OpenClaw config file:
\`\`\`bash
nano ~/.openclaw/config.json
\`\`\`

Add the Telegram section:
\`\`\`json
{
  "plugins": {
    "entries": {
      "telegram": {
        "enabled": true,
        "config": {
          "botToken": "YOUR_BOT_TOKEN_HERE"
        }
      }
    }
  }
}
\`\`\`

Replace \`YOUR_BOT_TOKEN_HERE\` with your actual token.

### Restart OpenClaw

\`\`\`bash
openclaw gateway restart
\`\`\`

## Step 3: Test Your Bot

1. Open Telegram
2. Find your bot (search for the username)
3. Click **Start**
4. Send a message!

Your OpenClaw AI will respond! 🎉

## Pro Tips

### Set Bot Description
In BotFather, send:
\`\`\`
/setdescription
\`\`\`
Then select your bot and write a description.

### Set Bot Commands
\`\`\`
/setcommands
\`\`\`
Add:
\`\`\`
start - Start chatting with the AI
help - Show available commands
status - Check system status
\`\`\`

### Security
- Never share your bot token
- Regenerate if compromised: \`/revoke\` in BotFather
- Your bot is private — only people with the username can find it

**→ You now have a mobile AI assistant!**`
      },
    ]
  },
  'guide-chatgpt': {
    title: 'Using ChatGPT Effectively',
    description: 'Master ChatGPT prompts and get better results.',
    topic: 'AI Tools',
    lessons: [
      { 
        title: 'Introduction to ChatGPT', 
        content: `**ChatGPT** is an AI assistant created by OpenAI that can understand and generate human-like text. It's like having a knowledgeable assistant available 24/7.

## 🎯 What You'll Learn

- ✅ Understand what ChatGPT can and cannot do
- ✅ Know which version to use (Free vs Plus)
- ✅ Be ready to write effective prompts
- ✅ Avoid common mistakes

## 🤔 What is ChatGPT?

ChatGPT is a **large language model** trained on billions of words. It can:

- ✅ Answer questions
- ✅ Write and edit text
- ✅ Explain complex topics
- ✅ Help with coding
- ✅ Brainstorm ideas
- ✅ Translate languages
- ✅ Summarize content

## 🆓 Free vs Plus: Which Should You Use?

| Feature | Free (GPT-3.5) | Plus ($20/mo) |
|---------|---------------|---------------|
| **Model** | GPT-3.5 | GPT-4 + GPT-3.5 |
| **Speed** | Fast | GPT-4 slower |
| **Accuracy** | Good | Excellent |
| **File Upload** | ❌ No | ✅ Yes |
| **Web Browsing** | ❌ No | ✅ Yes |
| **Image Input** | ❌ No | ✅ Yes |

**Recommendation:** Start with Free. Upgrade to Plus if you need more accuracy or file analysis.

## ⚠️ What ChatGPT Cannot Do

- ❌ Access real-time information (Free version)
- ❌ Browse the internet (Free version)
- ❌ Remember previous conversations (starts fresh each chat)
- ⚠️ Be 100% accurate - always verify important facts

## 🚀 Getting Started

1. Go to **[chat.openai.com](https://chat.openai.com)**
2. Click **Sign Up**
3. Use Google, Microsoft, or email
4. Verify your email

**→ Proceed to Lesson 2: Writing Great Prompts**`
      },
      { 
        title: 'Writing Great Prompts', 
        content: `The quality of ChatGPT's responses depends on the quality of your prompts.

## 🎯 The CTF Framework

Every great prompt has three parts:

- **C**ontext - Background information
- **T**ask - What you want done
- **F**ormat - How you want it delivered

## 📝 Before & After Examples

### ❌ Bad: "Write an email"
### ✅ Good:
\`\`\`
[Context] I'm a software developer who needs to request time off
[Task] Write a professional email to my manager asking for 3 days off
[Format] Keep it under 150 words, include dates (March 15-17)
\`\`\`

## 🎨 Prompt Templates

### For Writing
\`\`\`
Write a [type of content] about [topic] for [audience].
The tone should be [formal/casual/professional].
Length: [word count]
Key points to include: [list]
\`\`\`

### For Learning
\`\`\`
Explain [topic] like I'm [age/level].
Use analogies related to [field I know].
Give me 3 practice questions to test my understanding.
\`\`\`

### For Coding
\`\`\`
Write a [language] function that [task].
Requirements:
- [requirement 1]
- [requirement 2]
Include: Error handling, example usage, comments
\`\`\`

## 💡 Pro Tips

### 1. Be Specific
❌ "Help me with my presentation"
✅ "Create an outline for a 10-minute presentation about AI trends in healthcare for doctors"

### 2. Set Constraints
"Explain blockchain in 3 paragraphs maximum, using words a 10-year-old would understand"

### 3. Role-Play
"You are a senior marketing executive with 20 years of experience. Review this marketing plan and provide critical feedback:"

**→ Proceed to Lesson 3: Advanced Techniques**`
      },
      { 
        title: 'Advanced Techniques', 
        content: `## 🧠 Chain of Thought Prompting

Get better reasoning by asking ChatGPT to "think out loud."

### ❌ Basic: "What's 15% of 847?"
### ✅ Chain of Thought:
\`\`\`
"Calculate 15% of 847. Think step by step, showing your work."
\`\`\`

## 🎭 Role Playing

Give ChatGPT a specific persona for specialized help.

### Marketing Expert
\`\`\`
"You are a senior marketing executive with 20 years of experience in B2B SaaS.
I'm launching a new productivity app.

1. Review my landing page copy
2. Suggest improvements
3. Identify gaps in my value proposition"
\`\`\`

### Interview Coach
\`\`\`
"You are an interview coach who has helped 500+ people land jobs at FAANG companies.
Practice a behavioral interview with me. Ask me one question at a time,
then provide feedback before moving to the next question."
\`\`\`

## 🔄 Few-Shot Prompting

Give examples to show exactly what you want.

\`\`\`
"Convert these sentences to professional business language.

Examples:
Input: "This thing is broken"
Output: "This feature requires troubleshooting"

Input: "I need help with this"
Output: "I would appreciate your assistance with this matter"

Now convert:
1. "That's a bad idea"
2. "Can we meet tomorrow?"
\`\`\`

## 📏 Output Formatting

### Tables
\`\`\`
"Compare these 3 laptops in a table with columns: Price, Weight, Battery Life, Screen Quality"
\`\`\`

### JSON
\`\`\`
"Extract all email addresses from this text and return as JSON: { emails: [...] }"
\`\`\`

## 🔁 Iterative Refinement

Don't settle for the first response!

\`\`\`
Initial: "Write a product description"
ChatGPT: [First draft]

You: "Make it more emotional and focus on benefits"
ChatGPT: [Revised draft]

You: "Add a technical specs section at the end"
ChatGPT: [Draft with specs]

You: "Make it 50% shorter"
ChatGPT: [Concise version]
\`\`\`

**→ Proceed to Lesson 4: Pro Tips & Best Practices**`
      },
      { 
        title: 'Pro Tips & Best Practices', 
        content: `## 💡 Power User Tips

### 1. Use Custom Instructions (Plus)

Set preferences once, apply to all chats:

**Settings → Custom Instructions**

**What to tell ChatGPT about you:**
\`\`\`
I'm a software developer working in fintech.
I prefer concise, technical answers.
When showing code, use TypeScript and React.
\`\`\`

**How you want ChatGPT to respond:**
\`\`\`
- Be direct and concise
- Use bullet points for lists
- Include code examples when relevant
- If you're unsure, say so
\`\`\`

### 2. Create Prompt Templates

Save your best prompts for reuse!

### 3. Use Voice Input (Mobile)

Don't type - talk! Tap the headphones icon in the mobile app.

## ✅ Do's

- ✅ Verify important facts from authoritative sources
- ✅ Save important conversations (copy to a document)
- ✅ Ask for clarification if responses are unclear
- ✅ Use ChatGPT for first drafts, then edit

## ❌ Don'ts

- ❌ Share passwords, API keys, or personal info
- ❌ Assume it's always right (hallucinations happen)
- ❌ Use for medical/legal advice
- ❌ Copy-paste directly into production without reviewing

## 🎯 When to Use ChatGPT

### ✅ Great For
- First drafts (emails, reports, content)
- Learning new concepts
- Brainstorming ideas
- Code assistance
- Summarizing long content

### ⚠️ Use With Caution
- Fact-checking (verify elsewhere)
- Mathematical calculations
- Current events (data may be outdated)

### ❌ Not Suitable For
- Medical diagnosis
- Legal advice
- Financial advice
- Emergency situations

## 🎉 Congratulations!

You now know how to:

✅ Understand ChatGPT's capabilities and limits
✅ Write effective prompts using CTF framework
✅ Use advanced techniques (CoT, role-play, few-shot)
✅ Apply best practices and avoid common mistakes

**Practice makes perfect! Use ChatGPT daily and keep a "prompts that worked" document.** 🚀`
      },
      { 
        title: 'Connect ChatGPT to Telegram', 
        content: `## 📱 Deploy ChatGPT as a Telegram Bot

Want to access ChatGPT from your phone? Create your own ChatGPT Telegram bot!

## Why Telegram + ChatGPT?

- **Mobile access** - Chat with ChatGPT anywhere
- **Share with others** - Friends/family can use your bot
- **24/7 available** - Runs on your server, always online
- **Free** - No ChatGPT Plus needed (uses your API key)

## Step 1: Get OpenAI API Key

1. Go to **[platform.openai.com](https://platform.openai.com)**
2. API Keys → Create new secret key
3. Copy and save securely

## Step 2: Create Telegram Bot

### Open BotFather

1. Open Telegram
2. Search **@BotFather**
3. Send: \`/newbot\`
4. Follow prompts to name your bot

### Save Your Token

BotFather gives you a token like:
\`\`\`
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
\`\`\`

⚠️ **Save this token!**

## Step 3: Deploy Your Bot

### Option A: Use OpenClaw (Easiest)

Follow the OpenClaw guide to connect ChatGPT to Telegram with minimal setup.

### Option B: Use Python

\`\`\`bash
pip install python-telegram-bot openai
\`\`\`

Create \`bot.py\`:
\`\`\`python
import openai
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters

openai.api_key = "YOUR_OPENAI_KEY"

async def chat(update: Update, context):
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": update.message.text}]
    )
    await update.message.reply_text(response.choices[0].message.content)

app = Application.builder().token("YOUR_BOT_TOKEN").build()
app.add_handler(MessageHandler(filters.TEXT, chat))
app.run_polling()
\`\`\`

Run:
\`\`\`bash
python bot.py
\`\`\`

### Option C: Use No-Code Platforms

- **ManyChat** - Visual bot builder
- **Chatfuel** - No-code bot platform
- **Dante AI** - ChatGPT wrapper with Telegram

## 🎉 Congratulations!

Your ChatGPT Telegram bot is ready! Share the bot username with friends and they can use ChatGPT too!`
      },
    ]
  },
  'guide-github': {
    title: 'GitHub Basics',
    description: 'Learn Git and GitHub from scratch.',
    topic: 'Development Setup',
    lessons: [
      { 
        title: 'What is Git & GitHub?', 
        content: `## Version Control Basics

**Git** is a version control system — it tracks changes to your files over time. Think of it like a "save game" feature for code. You can go back to any previous version, see who changed what, and work on features without breaking everything.

**GitHub** is a website that hosts Git repositories online. It's where you store your code, collaborate with others, and discover open-source projects.

## Why Does This Matter?

- **Never lose work** — Every change is saved
- **Collaborate easily** — Multiple people can work on the same project
- **Track history** — See exactly what changed and when
- **Undo mistakes** — Revert to any previous version

## Key Concepts

- **Repository (repo)** — A project folder tracked by Git
- **Commit** — A snapshot of your changes (like a save point)
- **Branch** — A parallel version for experimenting
- **Merge** — Combine changes from different branches

## Check if Git is Installed

\`\`\`bash
git --version
\`\`\`

**Expected output:** \`git version 2.43.0\`

If you see a version number, Git is installed!

**→ Proceed to Lesson 2: Setting Up GitHub**`
      },
      { 
        title: 'Setting Up GitHub', 
        content: `## Create Your GitHub Account

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Enter your email, create a password, choose a username
4. Verify your email

## Install Git

### macOS
\`\`\`bash
brew install git
\`\`\`

### Linux (Debian/Ubuntu)
\`\`\`bash
sudo apt update
sudo apt install git
\`\`\`

### Windows
Download from [git-scm.com](https://git-scm.com/download/win)

## Configure Git

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

Replace with your actual name and the email you used for GitHub.

### Verify:
\`\`\`bash
git config --list
\`\`\`

## Connect to GitHub (SSH Setup - Optional but Recommended)

\`\`\`bash
# Generate SSH Key
ssh-keygen -t ed25519 -C "your.email@example.com"

# View Your Public Key
cat ~/.ssh/id_ed25519.pub
\`\`\`

Copy the output and add it to GitHub: Settings → SSH and GPG keys → New SSH key

**→ Proceed to Lesson 3: Your First Repository**`
      },
      { 
        title: 'Your First Repository', 
        content: `## Create a Repository on GitHub

1. Go to github.com and click the **+** icon (top right)
2. Select **"New repository"**
3. Name it: \`my-first-repo\`
4. Choose **Public** or **Private**
5. Check **"Add a README file"**
6. Click **"Create repository"**

## Clone to Your Computer

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/my-first-repo.git
cd my-first-repo
\`\`\`

## Make Changes and Commit

\`\`\`bash
# Create a New File
echo "# My First Repo" > hello.md

# Check Status
git status

# Stage the File
git add hello.md

# Commit
git commit -m "Add hello.md"
\`\`\`

## Push to GitHub

\`\`\`bash
git push origin main
\`\`\`

Refresh your GitHub page — your file is there!

**The cycle:** Edit → \`git add\` → \`git commit\` → \`git push\`

**→ Proceed to Lesson 4: Collaboration Basics**`
      },
      { 
        title: 'Collaboration Basics', 
        content: `## Fork a Repository

A **fork** is your personal copy of someone else's repository.

1. Go to any public repository on GitHub
2. Click **"Fork"** (top right)
3. Click **"Create fork"**

## Clone Your Fork

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/forked-repo.git
cd forked-repo
\`\`\`

## Make Changes

\`\`\`bash
echo "Contributing!" >> README.md
git add README.md
git commit -m "Update README"
git push origin main
\`\`\`

## Create a Pull Request

A **pull request (PR)** asks the original owner to include your changes.

1. Go to your forked repo on GitHub
2. Click **"Contribute"** → **"Open pull request"**
3. Add a title and description
4. Click **"Create pull request"**

## Merge a Pull Request (For Repo Owners)

1. Go to the **"Pull requests"** tab
2. Click the PR
3. Review the changes
4. Click **"Merge pull request"**

## Keep Your Fork Updated

\`\`\`bash
git remote add upstream https://github.com/ORIGINAL_OWNER/original-repo.git
git fetch upstream
git checkout main
git merge upstream/main
\`\`\`

**Collaboration flow:** Fork → Clone → Edit → Push → Pull Request → Merge

## 🎉 Congratulations!

You now know how to:
- ✅ Create and clone repositories
- ✅ Make commits and push changes
- ✅ Fork repositories
- ✅ Create and merge pull requests`
      },
    ]
  },
  'guide-vscode': {
    title: 'Setting Up VS Code',
    description: 'Configure VS Code for productivity.',
    topic: 'Development Setup',
    lessons: [
      { title: 'Installing VS Code', content: '## Download VS Code\n\n1. Go to [code.visualstudio.com](https://code.visualstudio.com)\n2. Download for your operating system\n3. Run the installer\n\n### macOS\nDownload the .dmg file, drag to Applications\n\n### Windows\nDownload the installer, run and follow prompts\n\n### Linux\n```bash\nsudo snap install code --classic\n```\n\n**→ Proceed to Lesson 2: Essential Extensions**' },
      { title: 'Essential Extensions', content: '## Top 10 VS Code Extensions\n\n### 1. **Prettier** - Code formatter\nAuto-format your code on save\n\n### 2. **ESLint** - JavaScript linter\nCatch errors before running\n\n### 3. **GitLens** - Git supercharged\nSee who changed what, blame info, file history\n\n### 4. **Live Server** - Local dev server\nRight-click HTML → "Open with Live Server"\n\n### 5. **Auto Rename Tag** - HTML helper\nRename opening tag, closing tag updates automatically\n\n### 6. **Path Intellisense** - Autocomplete filenames\nType paths and get suggestions\n\n### 7. **Material Icon Theme** - Better icons\nBeautiful file icons for every file type\n\n### 8. **GitHub Copilot** - AI assistant\nAI-powered code suggestions (requires subscription)\n\n### 9. **Thunder Client** - API testing\nTest APIs without leaving VS Code\n\n### 10. **Error Lens** - Inline errors\nSee error messages directly in your code\n\n**→ Proceed to Lesson 3: Customization**' },
      { title: 'Customization', content: '## Settings.json\n\nOpen settings: \`Ctrl/Cmd + Shift + P\` → "Open User Settings (JSON)"\n\n### Useful Settings:\n\`\`\`json\n{\n  "editor.fontSize": 14,\n  "editor.tabSize": 2,\n  "editor.wordWrap": "on",\n  "editor.formatOnSave": true,\n  "editor.minimap.enabled": false,\n  "workbench.colorTheme": "One Dark Pro",\n  "files.autoSave": "afterDelay",\n  "files.autoSaveDelay": 1000\n}\n\`\`\`\n\n## Key Shortcuts\n\n| Action | Mac | Windows/Linux |\n|--------|-----|---------------|\n| Command Palette | \`Cmd+Shift+P\` | \`Ctrl+Shift+P\` |\n| Quick Open | \`Cmd+P\` | \`Ctrl+P\` |\n| Terminal | \`Ctrl+\`\` | \`Ctrl+\`\` |\n| Split Editor | \`Cmd+\\\` | \`Ctrl+\\\` |\n| Find | \`Cmd+F\` | \`Ctrl+F\` |\n| Global Search | \`Cmd+Shift+F\` | \`Ctrl+Shift+F\` |\n\n## 🎉 Congratulations!\n\nYou now have a fully configured VS Code setup!' },
    ]
  },
  'guide-website': {
    title: 'Your First Website (No Code)',
    description: 'Build a website without coding.',
    topic: 'Getting Started',
    lessons: [
      { title: 'Choose Your Platform', content: '## No-Code Website Builders\n\n### Wix\n- **Best for:** Beginners, small businesses\n- **Price:** Free plan, $16/mo premium\n- **Pros:** Drag-and-drop, templates\n- **Cons:** Limited customization on free plan\n\n### Squarespace\n- **Best for:** Portfolios, creative businesses\n- **Price:** $16/mo\n- **Pros:** Beautiful templates, all-in-one\n- **Cons:** Less flexible than others\n\n### Framer\n- **Best for:** Designers, modern sites\n- **Price:** Free plan, $15/mo\n- **Pros:** Design-first, animations\n- **Cons:** Learning curve\n\n### Carrd\n- **Best for:** One-page sites, landing pages\n- **Price:** Free, $19/year premium\n- **Pros:** Simple, affordable\n- **Cons:** Only single-page sites\n\n**→ Proceed to Lesson 2: Planning Your Site**' },
      { title: 'Planning Your Site', content: '## Site Structure\n\n### 1. Define Your Goal\n- What do you want visitors to do?\n- Contact you? Buy something? Learn more?\n\n### 2. List Your Pages\nTypical structure:\n- Home\n- About\n- Services/Products\n- Contact\n\n### 3. Gather Content\n- Text for each page\n- Images (use Unsplash for free photos)\n- Logo and brand colors\n\n### 4. Wireframe\nSketch your layout before building:\n- Header (logo + navigation)\n- Hero section (main message)\n- Content sections\n- Footer\n\n**→ Proceed to Lesson 3: Building & Publishing**' },
      { title: 'Building & Publishing', content: '## Step-by-Step Build\n\n### 1. Sign up for your chosen platform\n\n### 2. Choose a template\nPick one close to your vision\n\n### 3. Customize\n- Replace placeholder text\n- Add your images\n- Adjust colors/fonts\n\n### 4. Add pages\nCreate your site structure\n\n### 5. Connect a domain\n- Use free subdomain (yoursite.wix.com)\n- Or connect custom domain ($)\n\n### 6. Publish!\nClick "Publish" or "Go Live"\n\n## Tips\n- Keep it simple\n- Mobile-first design\n- Clear call-to-action\n- Fast loading images (compress!)\n\n## 🎉 Congratulations!\n\nYour website is now live!' },
    ]
  },
  'guide-claude': {
    title: 'Using Claude AI',
    description: 'Get started with Claude AI assistant.',
    topic: 'AI Tools',
    lessons: [
      { title: 'Introduction to Claude', content: '## What is Claude?\n\n**Claude** is an AI assistant created by Anthropic. It\'s known for:\n- Being helpful, harmless, and honest\n- Great at writing and analysis\n- Long context window (can read entire documents)\n- Artifacts feature (generates files you can download)\n\n## Claude vs ChatGPT\n\n| Feature | Claude | ChatGPT |\n|---------|--------|---------|\n| **Writing** | Excellent | Very Good |\n| **Analysis** | Excellent | Very Good |\n| **Coding** | Very Good | Excellent |\n| **Context Length** | 200K tokens | 128K tokens |\n| **Artifacts** | ✅ Yes | ❌ No |\n| **Web Browsing** | ✅ Yes | ✅ Yes |\n\n## Getting Started\n\n1. Go to **[claude.ai](https://claude.ai)**\n2. Sign up with email or Google\n3. Choose Free or Pro ($20/mo)\n\n**→ Proceed to Lesson 2: Getting Started**' },
      { title: 'Getting Started', content: '## Your First Conversation\n\nType: \`"Hello! Can you help me write a blog post about AI?"\`\n\nClaude will respond and help you!\n\n## Claude\'s Strengths\n\n### 1. Long Documents\nUpload PDFs, documents, or paste long text. Claude can analyze entire documents.\n\n### 2. Writing\nClaude excels at:\n- Blog posts\n- Marketing copy\n- Technical writing\n- Creative writing\n\n### 3. Analysis\n- Summarize documents\n- Extract key points\n- Compare texts\n- Find patterns\n\n**→ Proceed to Lesson 3: Using Artifacts**' },
      { title: 'Using Artifacts', content: '## What are Artifacts?\n\nArtifacts are files Claude generates that appear in a separate panel. You can:\n- Preview them\n- Download them\n- Edit them\n- Iterate with Claude\n\n## Types of Artifacts\n\n- **Code** - Python, JavaScript, HTML, etc.\n- **Documents** - Markdown, plain text\n- **Diagrams** - Mermaid flowcharts\n- **React Components** - Interactive UI\n- **HTML** - Web pages\n\n## How to Create Artifacts\n\nAsk Claude: "Create a React component for a contact form"\n\nClaude will generate it as an artifact you can preview and download!\n\n**→ Proceed to Lesson 4: Best Practices**' },
      { title: 'Best Practices', content: '## Tips for Using Claude\n\n### 1. Be Specific\n❌ "Help me write something"\n✅ "Help me write a 500-word blog post about sustainable fashion for millennials"\n\n### 2. Provide Context\n"Here\'s my resume. I\'m applying for a product manager role. Suggest improvements."\n\n### 3. Use Iteration\nStart broad, then refine:\n- "Make it more professional"\n- "Add more examples"\n- "Shorten it by 50%"\n\n### 4. Leverage Artifacts\nWhen you need code, documents, or diagrams, ask Claude to create them as artifacts.\n\n**→ Proceed to Lesson 5: Connect to Telegram**' },
      { title: 'Connect Claude to Telegram', content: `## 📱 Deploy Claude as a Telegram Bot

Access Claude from your phone via Telegram!

## Why Telegram + Claude?

- **Mobile access** - Chat with Claude anywhere
- **Long documents on the go** - Upload PDFs from your phone
- **Share with team** - Colleagues can use your Claude bot
- **24/7 available** - Runs on your server

## Step 1: Create Telegram Bot

### Open BotFather

1. Open Telegram
2. Search **@BotFather**
3. Send: \`/newbot\`
4. Name your bot (e.g., "My Claude Bot")
5. Choose username ending in \`bot\`

### Save Your Token

BotFather gives you:
\`\`\`
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
\`\`\`

## Step 2: Deploy Claude Bot

### Option A: Use OpenClaw (Recommended)

OpenClaw supports Claude API + Telegram out of the box. See the OpenClaw guide for setup.

### Option B: Build Custom Bot

Use Anthropic's Claude API:

\`\`\`python
import anthropic
from telegram import Update
from telegram.ext import Application, MessageHandler, filters

client = anthropic.Anthropic(api_key="YOUR_CLAUDE_KEY")

async def chat(update: Update, context):
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": update.message.text}]
    )
    await update.message.reply_text(message.content[0].text)

app = Application.builder().token("YOUR_BOT_TOKEN").build()
app.add_handler(MessageHandler(filters.TEXT, chat))
app.run_polling()
\`\`\`

### Option C: Use Bot Platforms

- **Dante AI** - Claude-powered Telegram bots
- **CustomGPT** - Deploy Claude to messaging platforms

## Tips

- Claude excels at long conversations — perfect for Telegram
- Set up command handlers for \`/start\`, \`/help\`, \`/clear\`
- Consider rate limiting if sharing with many users

## 🎉 Congratulations!

You now know how to use Claude AND deploy it to Telegram!` },
    ]
  },
  'guide-gemini': {
    title: 'Google Gemini Essentials',
    description: 'Master Google\'s multimodal AI assistant.',
    topic: 'AI Tools',
    lessons: [
      { title: 'What is Gemini?', content: '## Google Gemini\n\n**Gemini** is Google\'s most advanced AI model. It\'s:\n- Multimodal (text, images, audio, video)\n- Integrated with Google services\n- Available free with Google account\n\n## Gemini vs ChatGPT\n\n| Feature | Gemini | ChatGPT |\n|---------|--------|---------|\n| **Free** | ✅ Yes | ✅ Yes |\n| **Multimodal** | ✅ Native | ✅ Plus only |\n| **Google Integration** | ✅ Yes | ❌ No |\n| **Real-time Info** | ✅ Yes | ✅ Plus only |\n\n## Getting Started\n\n1. Go to **[gemini.google.com](https://gemini.google.com)**\n2. Sign in with Google account\n3. Start chatting!\n\n**→ Proceed to Lesson 2: Getting Started**' },
      { title: 'Getting Started with Gemini', content: '## Key Features\n\n### 1. Multimodal Input\nUpload images and ask questions about them:\n- "What\'s in this image?"\n- "Describe this chart"\n- "Transcribe this text"\n\n### 2. Google Integration\n- Search the web for current info\n- Connect to Google Workspace\n- Export to Google Docs\n\n### 3. Extensions\nConnect to:\n- Google Maps\n- YouTube\n- Google Flights\n- Google Hotels\n\n**→ Proceed to Lesson 3: Multimodal Capabilities**' },
      { title: 'Multimodal Capabilities', content: '## What Can You Do?\n\n### Images\n- Analyze photos and screenshots\n- Extract text from images (OCR)\n- Describe visual content\n- Identify objects and places\n\n### Documents\n- Upload PDFs\n- Summarize long documents\n- Extract key information\n\n### Code\n- Write and debug code\n- Explain code snippets\n- Generate documentation\n\n**→ Proceed to Lesson 4: Pro Tips**' },
      { title: 'Pro Tips & Integrations', content: '## Tips for Gemini\n\n### 1. Use @mentions\nType \`@\` to access:\n- \`@YouTube\` - Search and summarize videos\n- \`@Google Maps\` - Find places\n- \`@Google Flights\` - Search flights\n\n### 2. Export to Docs\nAfter getting a response:\n- Click "Export to Docs"\n- Edit in Google Docs\n\n### 3. Double-Check\nGemini can make mistakes. Always verify important information.\n\n## 🎉 Congratulations!\n\nYou now know how to use Google Gemini!' },
    ]
  },
  'guide-grok': {
    title: 'Using Grok (xAI)',
    description: 'Get started with Elon Musk\'s Grok AI.',
    topic: 'Emerging AI',
    lessons: [
      { title: 'What is Grok?', content: '## xAI\'s Grok\n\n**Grok** is an AI assistant created by xAI (Elon Musk\'s AI company). It\'s known for:\n- Real-time information from X (Twitter)\n- Witty and humorous personality\n- Two modes: Regular and Fun\n\n## Access\n\nGrok is available to X Premium+ subscribers ($16/mo):\n1. Subscribe to X Premium+\n2. Look for Grok in the X sidebar\n3. Start chatting!\n\n## Key Features\n\n- Real-time info from X posts\n- "Fun mode" with humorous responses\n- Image generation (Grok 2)\n- Less censorship than other AIs\n\n**→ Proceed to Lesson 2: Accessing Grok**' },
      { title: 'Accessing Grok via X', content: '## How to Use Grok\n\n### 1. Subscribe to X Premium+\nGo to X → Premium → Subscribe\n\n### 2. Find Grok\nLook for the Grok icon in the left sidebar\n\n### 3. Start Chatting\nType your question or prompt\n\n## Modes\n\n### Regular Mode\nStraightforward, helpful responses\n\n### Fun Mode\nWitty, sarcastic, humorous responses (Grok\'s signature style)\n\n**→ Proceed to Lesson 3: Unique Features**' },
      { title: 'Unique Features & Tips', content: '## What Makes Grok Different\n\n### 1. Real-Time Info\nAccess to X posts means Grok knows what\'s happening NOW.\n\n### 2. Personality\nUnlike other AIs, Grok has a distinct sense of humor.\n\n### 3. Less Guardrails\nGrok will answer questions other AIs might refuse.\n\n## Best Use Cases\n\n- Current events and news\n- Social media content\n- Fun, casual conversations\n- Checking what\'s trending\n\n## 🎉 Congratulations!\n\nYou now know how to use Grok!' },
    ]
  },
  'guide-kimi': {
    title: 'Kimi AI - Long Context Master',
    description: 'Master Kimi\'s massive context window.',
    topic: 'Emerging AI',
    lessons: [
      { title: 'What is Kimi?', content: '## Kimi AI\n\n**Kimi** is an AI assistant by Moonshot AI. It\'s famous for:\n- **200K+ token context window** (extremely long!)\n- Ability to read entire books\n- Document analysis powerhouse\n- Free to use\n\n## Why Use Kimi?\n\nWhen you need to analyze:\n- Long documents (100+ pages)\n- Multiple files at once\n- Research papers\n- Legal documents\n- Codebases\n\n## Access\n\n1. Go to **[kimi.moonshot.cn](https://kimi.moonshot.cn)**\n2. Sign up (supports various methods)\n3. Upload documents and start chatting!\n\n**→ Proceed to Lesson 2: Long Context**' },
      { title: 'Long Context Capabilities', content: '## Why 200K Tokens Matters\n\nOther AIs:\n- ChatGPT: ~4K-128K tokens\n- Claude: ~200K tokens\n- **Kimi: 200K+ tokens**\n\n## What Can You Upload?\n\n- PDF documents (100+ pages)\n- Word documents\n- Text files\n- Multiple files at once\n- Entire code repositories\n\n## Example Use Cases\n\n1. "Summarize this 100-page report"\n2. "Find all mentions of \'revenue\' in these documents"\n3. "Compare these three contracts"\n4. "What are the main themes in this book?"\n\n**→ Proceed to Lesson 3: Document Analysis**' },
      { title: 'Document Analysis Workflows', content: '## Best Practices\n\n### 1. Upload Multiple Documents\nKimi can analyze several files simultaneously.\n\n### 2. Ask Specific Questions\n❌ "What\'s in this document?"\n✅ "What are the key financial metrics mentioned?"\n\n### 3. Iterate\nFollow up with more questions based on the analysis.\n\n### 4. Export Results\nCopy the analysis to your notes.\n\n## Pro Tips\n\n- Compress PDFs before uploading (faster)\n- Use for literature reviews\n- Great for legal document analysis\n- Perfect for research synthesis\n\n## 🎉 Congratulations!\n\nYou now know how to leverage Kimi\'s long context!' },
    ]
  },
  'guide-perplexity': {
    title: 'Perplexity AI Search',
    description: 'AI-powered research with citations.',
    topic: 'AI Tools',
    lessons: [
      { title: 'What is Perplexity?', content: '## Perplexity AI\n\n**Perplexity** is an AI-powered search engine that:\n- Provides answers with **citations**\n- Searches the web in real-time\n- Shows sources for every claim\n- Offers a "Pro" search with deeper analysis\n\n## Why Use Perplexity?\n\n- **Research** - Find information with sources\n- **Fact-checking** - Verify claims with citations\n- **Learning** - Deep dive into topics\n- **Current events** - Real-time information\n\n## Access\n\n1. Go to **[perplexity.ai](https://perplexity.ai)**\n2. Start searching (no account needed)\n3. Create account for Pro features ($20/mo)\n\n**→ Proceed to Lesson 2: Basic Search**' },
      { title: 'Basic Search & Citations', content: '## How It Works\n\n1. Type your question\n2. Perplexity searches the web\n3. AI summarizes with **citations**\n4. Click citations to see sources\n\n## Example\n\n**Query:** "What are the health benefits of green tea?"\n\n**Response:**\n- Bullet points with answers\n- Numbers like [1], [2] after each claim\n- Click to see the source website\n\n## Focus Modes\n\n- **All** - General web search\n- **Academic** - Scholarly sources\n- **Writing** - For content creation\n- **Wolfram|Alpha** - Math and data\n\n**→ Proceed to Lesson 3: Pro Search**' },
      { title: 'Pro Search & Collections', content: '## Pro Search ($20/mo)\n\n### Features:\n- Deeper analysis (5x more sources)\n- File uploads (analyze documents)\n- Multiple AI models (GPT-4, Claude)\n- Unlimited Pro searches\n\n## Collections\n\nOrganize your research:\n1. Create a Collection\n2. Save searches to it\n3. Share with others\n\n## Threads\n\nContinue conversations:\n- Ask follow-up questions\n- Dive deeper into topics\n- Build on previous searches\n\n**→ Proceed to Lesson 4: Research Workflows**' },
      { title: 'Research Workflows', content: '## Best Practices\n\n### 1. Start Broad, Then Narrow\n- "Overview of AI in healthcare"\n- Then: "What are the privacy concerns?"\n- Then: "How is HIPAA addressed?"\n\n### 2. Use Academic Focus\nFor research papers, switch to Academic mode.\n\n### 3. Verify Citations\nAlways click through to sources to verify.\n\n### 4. Save to Collections\nKeep research organized by topic.\n\n## Pro Tips\n\n- Use for literature reviews\n- Great for competitive research\n- Perfect for fact-checking\n- Excellent for learning new topics\n\n## 🎉 Congratulations!\n\nYou now know how to use Perplexity for research!' },
    ]
  },
  'guide-cursor': {
    title: 'Cursor AI Code Editor',
    description: 'Supercharge coding with AI.',
    topic: 'Development Setup',
    lessons: [
      { title: 'What is Cursor?', content: '## Cursor AI\n\n**Cursor** is an AI-native code editor built on VS Code. It includes:\n- AI chat inside your editor\n- Code autocomplete with AI\n- Codebase awareness\n- One-click refactoring\n\n## Why Use Cursor?\n\n- **Faster coding** - AI helps write code\n- **Better code** - AI catches bugs\n- **Learning** - AI explains code\n- **Refactoring** - AI improves your code\n\n## Install\n\n1. Go to **[cursor.sh](https://cursor.sh)**\n2. Download for your OS\n3. Import VS Code settings (optional)\n\n**→ Proceed to Lesson 2: Installation & Setup**' },
      { title: 'Installation & Setup', content: '## Install Cursor\n\n1. Download from cursor.sh\n2. Run the installer\n3. Open Cursor\n\n## Import VS Code Settings\n\nCursor can import:\n- Extensions\n- Keybindings\n- Settings\n\nJust click "Import" when prompted.\n\n## Sign In\n\nSign in to unlock:\n- AI features\n- Cloud sync\n- Team features\n\n**→ Proceed to Lesson 3: AI Chat & Autocomplete**' },
      { title: 'AI Chat & Autocomplete', content: '## AI Chat\n\nPress \`Cmd/Ctrl + L\` to open AI chat.\n\n### Ask anything:\n- "Explain this function"\n- "Find bugs in this code"\n- "Write tests for this"\n- "How do I use this library?"\n\n## Tab Autocomplete\n\nStart typing, and Cursor suggests:\n- Code completions\n- Function implementations\n- Variable names\n- Entire blocks of code\n\nPress \`Tab\` to accept.\n\n## Codebase Awareness\n\nCursor knows your entire project:\n- \`@Codebase\` - Search your code\n- \`@Files\` - Reference specific files\n- \`@Docs\` - Reference documentation\n\n**→ Proceed to Lesson 4: Pro Tips**' },
      { title: 'Pro Tips & Workflows', content: '## Power User Tips\n\n### 1. Cmd+K for Inline Edit\nSelect code → \`Cmd+K\` → Describe change\n\n### 2. @Codebase for Context\n"Using @Codebase, explain how authentication works"\n\n### 3. Generate Tests\nRight-click function → "Generate Tests"\n\n### 4. Fix Errors\nHover over error → "Fix with AI"\n\n## Best Practices\n\n- Review AI suggestions before accepting\n- Use AI for first drafts, then refine\n- Learn from AI explanations\n- Keep code readable for AI context\n\n## 🎉 Congratulations!\n\nYou now know how to use Cursor AI!' },
    ]
  },
  'guide-botfather': {
    title: 'Creating Telegram Bots with BotFather',
    description: 'Learn to create and manage Telegram bots using BotFather.',
    topic: 'Development Setup',
    lessons: [
      { 
        title: 'What is BotFather?', 
        content: `## BotFather - Telegram's Bot Creator

**BotFather** is Telegram's official bot for creating and managing Telegram bots. Every Telegram bot is created through BotFather.

## What You'll Learn

By the end of this guide, you will:

- ✅ Create your first Telegram bot
- ✅ Configure bot settings (name, description, avatar)
- ✅ Get your bot token for API access
- ✅ Understand bot commands and features

**Time to complete:** ~20 minutes

## Why Create a Telegram Bot?

### Use Cases

- **Notifications** - Send alerts to users
- **Customer Service** - Auto-reply to common questions
- **Automation** - Integrate with your apps
- **Community Management** - Moderate groups
- **AI Assistants** - Connect AI to Telegram

### Why Telegram?

- **Free API** - No hosting costs for basic bots
- **Huge user base** - 800M+ users
- **Rich features** - Buttons, payments, web apps
- **Easy development** - Simple HTTP-based API

**→ Proceed to Lesson 2: Creating Your Bot**`
      },
      { 
        title: 'Creating Your First Bot', 
        content: `## Step-by-Step Bot Creation

### Step 1: Open BotFather

1. Open Telegram
2. Search for **@BotFather**
3. Start a chat with the verified BotFather (blue checkmark)

### Step 2: Create New Bot

Send the command:
\`\`\`
/newbot
\`\`\`

### Step 3: Name Your Bot

BotFather will ask for:
1. **Bot display name** - What users see (e.g., "My Cool Bot")
2. **Bot username** - Must end in \`bot\` (e.g., \`MyCoolBot\` or \`my_cool_bot\`)

### Step 4: Save Your Token

BotFather will respond with:
\`\`\`
Done! Congratulations on your new bot...
Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure...
\`\`\`

⚠️ **IMPORTANT:** Save this token! You'll need it to control your bot.

**→ Proceed to Lesson 3: Configuring Your Bot**`
      },
      { 
        title: 'Configuring Bot Settings', 
        content: `## Essential BotFather Commands

### Set Bot Description
\`\`\`
/setdescription
\`\`\`
Appears when users first open your bot.

Example:
\`\`\`
This bot helps you track cryptocurrency prices.
Send /price BTC to get current Bitcoin price.
\`\`\`

### Set Bot About Text
\`\`\`
/setabouttext
\`\`\`
Short text that appears in the bot's profile.

### Set Bot Avatar
\`\`\`
/setuserpic
\`\`\`
Upload an image as your bot's profile picture.

### Set Commands
\`\`\`
/setcommands
\`\`\`
Define your bot's commands with descriptions:
\`\`\`
start - Start using the bot
help - Show help message
price - Get cryptocurrency price
alert - Set price alert
\`\`\`

### Set Inline Placeholder
\`\`\`
/setinline
\`\`\`
Text shown when users type your bot's username in any chat.

**→ Proceed to Lesson 4: Using Your Bot Token**`
      },
      { 
        title: 'Using Your Bot Token', 
        content: `## Bot Token = Bot Password

Your token looks like:
\`\`\`
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
\`\`\`

The first part (1234567890) is your **bot ID**.
The second part is your **authentication key**.

## Testing Your Bot

### Quick Test (Browser)

Open this URL in your browser:
\`\`\`
https://api.telegram.org/bot<TOKEN>/getMe
\`\`\`

Replace \`<TOKEN>\` with your actual token.

You should see:
\`\`\`json
{
  "ok": true,
  "result": {
    "id": 1234567890,
    "is_bot": true,
    "first_name": "My Cool Bot",
    "username": "MyCoolBot"
  }
}
\`\`\`

### Sending a Test Message

To send a message to yourself:
1. Start a chat with your bot
2. Send any message (or click "Start")
3. Visit this URL:
\`\`\`
https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=YOUR_CHAT_ID&text=Hello!
\`\`\`

## Security Tips

✅ **DO:**
- Keep token in environment variables
- Regenerate if compromised: \`/revoke\` in BotFather
- Use webhooks in production

❌ **DON'T:**
- Commit token to GitHub
- Share token publicly
- Use token in client-side code

## 🎉 Congratulations!

You've created and configured your first Telegram bot!

**Next steps:**
- Learn a bot framework (python-telegram-bot, Telegraf.js)
- Build your first bot feature
- Deploy to a server

**→ Check out the OpenClaw guide to build an AI-powered bot!**`
      },
    ]
  },
  'guide-voice-ai-elevenlabs': {
    title: 'Voice AI & Speech Synthesis',
    description: 'Master AI voice synthesis, cloning, and speech applications.',
    topic: 'AI Engineering',
    lessons: [
      { 
        title: 'Introduction to Voice AI', 
        content: `## What is Voice AI?

Voice AI, also known as speech synthesis or text-to-speech (TTS) technology, uses deep learning models to convert written text into spoken audio. Modern voice AI systems can produce speech that's virtually indistinguishable from human voices.

### Core Capabilities

**1. Natural Speech Synthesis**
Today's voice AI models understand context, emotion, and nuance:
- Adjust tone based on punctuation and context
- Convey emotions like excitement, sadness, or urgency
- Maintain consistent voice quality across long passages
- Handle multiple languages and accents fluently

**2. Voice Cloning**
With just a few minutes of audio samples, voice AI can create a digital replica of any voice:
- Custom brand voices for businesses
- Personalized content at scale
- Voice preservation for accessibility
- Character voices for games and animation

**3. Real-time Processing**
Modern APIs can generate speech in near real-time:
- Live conversation agents
- Dynamic content narration
- Interactive voice responses
- Streaming audio for podcasts and videos

## Real-World Use Cases

### Content Creation
- **Audiobooks and Podcasts** - Produce audio content at scale
- **Video Narration** - YouTube, tutorials, explainer videos
- **Social Media** - TikTok, Reels voiceovers

### Business Applications
- **Customer Service** - Natural IVR systems
- **Marketing** - Radio/TV commercials at scale
- **E-Learning** - Training modules and courses

### Accessibility
- Screen readers with natural voices
- Audio versions of written content
- AAC devices with personalized voices

**→ Proceed to Lesson 2: ElevenLabs Platform**`
      },
      { 
        title: 'ElevenLabs Platform & Voice Cloning', 
        content: `## ElevenLabs Overview

ElevenLabs is one of the most sophisticated voice AI platforms, known for producing ultra-realistic synthetic voices.

### Key Features

**Multilingual Support** - 29+ languages
**Voice Library** - Hundreds of AI-generated voices
**Voice Cloning** - Create custom voices from audio samples
**Speech-to-Speech** - Transform audio while preserving characteristics

## Voice Cloning Step-by-Step

### Step 1: Prepare Audio Samples

✅ **Duration:** 1-5 minutes total
✅ **Quality:** Clean audio without background noise
✅ **Format:** MP3, WAV, or M4A
✅ **Content:** Natural speech (not reading lists)
✅ **Consistency:** Same speaker throughout

### Step 2: Recording Tips

- Use a quality microphone
- Record in a quiet room
- Speak naturally, as if having a conversation
- Include varied sentence structures and emotions

### Step 3: Upload and Process

1. Navigate to "VoiceLab" section
2. Click "Add Voice" → "Clone Voice"
3. Upload your audio samples
4. Name your voice and add description
5. Process takes 30-60 seconds

### Voice Settings

**Stability (0-100)**
- Lower (0-30): More expressive, variable delivery
- Higher (70-100): More consistent, stable output
- **Recommendation:** 30-50 for most use cases

**Similarity (0-100)**
- Higher values = closer match to original
- **Recommendation:** 70-90 for accurate cloning

**Style Exaggeration (0-100)**
- Controls emotional emphasis
- **Recommendation:** 0-30 for natural delivery

### Best Practices

✅ Audio quality matters more than quantity
✅ Remove background noise before uploading
✅ Choose natural content, not scripted
✅ Always obtain consent before cloning voices

**→ Proceed to Lesson 3: API Integration**`
      },
      { 
        title: 'Text-to-Speech API Integration', 
        content: `## API Overview

The ElevenLabs API is RESTful and supports multiple programming languages.

### Installation

\`\`\`bash
pip install elevenlabs  # Python
npm install elevenlabs-node  # Node.js
\`\`\`

### Basic Usage

\`\`\`python
from elevenlabs import generate, save, set_api_key

set_api_key("your_api_key_here")

audio = generate(
    text="Hello! Welcome to voice AI synthesis.",
    voice="Bella",
    model="eleven_monolingual_v1"
)

save(audio, "output.mp3")
\`\`\`

### Voice Settings

\`\`\`python
audio = generate(
    text="This is exciting news!",
    voice="Bella",
    model="eleven_monolingual_v1",
    stability=0.3,  # More expressive (0-1)
    similarity=0.8   # Closer to original (0-1)
)
\`\`\`

### Optimal Settings by Use Case

| Use Case | Stability | Similarity |
|----------|-----------|------------|
| Audiobook narration | 0.5-0.7 | 0.7-0.9 |
| Conversational AI | 0.3-0.5 | 0.6-0.8 |
| News/Announcements | 0.6-0.8 | 0.8-1.0 |
| Character voices | 0.2-0.4 | 0.5-0.7 |

### Choosing the Right Model

**eleven_monolingual_v1** - Best for English-only, highest quality
**eleven_multilingual_v2** - 29+ languages, improved quality

### Streaming Audio

\`\`\`python
audio_stream = generate(
    text="This will be streamed...",
    voice="Bella",
    stream=True
)

for chunk in audio_stream:
    # Process each audio chunk
    pass
\`\`\`

### Error Handling

\`\`\`python
import time

def generate_with_retry(text, voice, max_retries=3):
    for attempt in range(max_retries):
        try:
            return generate(text=text, voice=voice)
        except Exception as e:
            if '429' in str(e):
                wait_time = 2 ** attempt
                time.sleep(wait_time)
            else:
                raise
    raise Exception("Max retries exceeded")
\`\`\`

**→ Proceed to Lesson 4: Building Applications**`
      },
      { 
        title: 'Building Voice Applications', 
        content: `## Project 1: AI Podcast Generator

Convert blog posts into podcast-style audio.

\`\`\`python
from elevenlabs import generate, save
from pydub import AudioSegment

class PodcastGenerator:
    def __init__(self, api_key):
        self.api_key = api_key
        self.voice = "Bella"
    
    def generate_segment(self, text):
        return generate(
            text=text,
            voice=self.voice,
            model="eleven_monolingual_v1",
            stability=0.6,
            similarity=0.8
        )
    
    def create_podcast(self, segments, output_path):
        combined = AudioSegment.empty()
        
        for segment in segments:
            audio = self.generate_segment(segment)
            # Save, load, combine
            combined += AudioSegment.from_mp3(segment_path)
            combined += AudioSegment.silent(duration=1500)
        
        combined.export(output_path, format="mp3")
\`\`\`

## Project 2: Conversational Voice Assistant

\`\`\`python
import speech_recognition as sr
from elevenlabs import generate
import openai

class VoiceAssistant:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.conversation_history = []
    
    def listen(self):
        with self.microphone as source:
            audio = self.recognizer.listen(source)
        return self.recognizer.recognize_google(audio)
    
    def respond(self, text):
        # Generate AI response with GPT
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=self.conversation_history + [
                {"role": "user", "content": text}
            ]
        )
        return response.choices[0].message.content
    
    def speak(self, text):
        audio = generate(text=text, voice="Bella")
        # Play audio
\`\`\`

## Project 3: Multilingual Announcements

\`\`\`python
class MultilingualAnnouncer:
    def __init__(self):
        self.voices = {
            'en': 'Bella',
            'es': 'Antoni',
            'fr': 'Adam',
            'de': 'Dorothy'
        }
        self.model = "eleven_multilingual_v2"
    
    def generate_announcement(self, text, languages):
        results = {}
        for lang in languages:
            translated = self.translate(text, lang)
            audio = generate(
                text=translated,
                voice=self.voices[lang],
                model=self.model
            )
            results[lang] = audio
        return results
\`\`\`

**→ Proceed to Lesson 5: Production & Cost Optimization**`
      },
      { 
        title: 'Production & Cost Optimization', 
        content: `## Cost Optimization

### Understanding Pricing

- **Free Tier:** 10,000 characters/month
- **Starter ($5/mo):** 30,000 characters/month
- **Creator ($22/mo):** 100,000 characters/month
- **Pro ($99/mo):** 500,000 characters/month

### Optimization Techniques

**1. Smart Caching**

\`\`\`python
import hashlib, os

class AudioCache:
    def __init__(self, cache_dir="./audio_cache"):
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)
    
    def get(self, text, voice):
        key = hashlib.md5(f"{text}-{voice}".encode()).hexdigest()
        path = os.path.join(self.cache_dir, f"{key}.mp3")
        
        if os.path.exists(path):
            with open(path, "rb") as f:
                return f.read()
        return None
    
    def set(self, text, voice, audio_data):
        key = hashlib.md5(f"{text}-{voice}".encode()).hexdigest()
        with open(os.path.join(self.cache_dir, f"{key}.mp3"), "wb") as f:
            f.write(audio_data)
\`\`\`

**2. Text Optimization**

Reduce character count without sacrificing quality:
- Remove redundant phrases
- Eliminate excessive whitespace
- Simplify verbose expressions

**3. Batch Processing**

\`\`\`python
import concurrent.futures

def process_batch(texts, voice="Bella"):
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(generate, text=t, voice=voice) for t in texts]
        return [f.result() for f in concurrent.futures.as_completed(futures)]
\`\`\`

## Reliability Patterns

### Circuit Breaker

\`\`\`python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.state = "CLOSED"
    
    def call(self, func, *args):
        if self.state == "OPEN":
            if time.time() - self.last_failure > self.timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker OPEN")
        
        try:
            result = func(*args)
            self.failure_count = 0
            self.state = "CLOSED"
            return result
        except Exception:
            self.failure_count += 1
            if self.failure_count >= self.failure_threshold:
                self.state = "OPEN"
            raise
\`\`\`

### Rate Limiting

\`\`\`python
from collections import deque
import time

class RateLimiter:
    def __init__(self, max_requests=10, time_window=60):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def is_allowed(self):
        now = time.time()
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True
        return False
\`\`\`

## Production Checklist

✅ **Testing**
- Load test with expected traffic
- Test error scenarios
- Verify fallback mechanisms

✅ **Monitoring**
- Set up usage alerts
- Monitor API response times
- Track error rates

✅ **Security**
- Secure API key storage
- Implement rate limiting
- Add authentication

✅ **Optimization**
- Enable caching
- Pre-generate common responses
- Implement batch processing

## 🎉 Congratulations!

You now know how to:
- ✅ Understand voice AI capabilities
- ✅ Clone voices with ElevenLabs
- ✅ Integrate the TTS API
- ✅ Build voice applications
- ✅ Optimize for production

**Next Steps:**
- Build your first voice project
- Explore speech-to-text (Whisper)
- Create multilingual applications`
      },
    ]
  },
  'guide-rag-knowledge-bases': {
    title: 'RAG & Knowledge Bases',
    description: 'Build AI systems that retrieve and reason over your own data.',
    topic: 'AI Engineering',
    lessons: [
      { title: 'What is RAG?', content: `## Retrieval-Augmented Generation

**RAG** combines language models with external knowledge bases for accurate, up-to-date responses.

### The Three Pillars

\`\`\`
Query → Retrieval → Context + Query → LLM → Response
\`\`\`

**1. Retrieval**: Search your knowledge base for relevant documents
**2. Augmentation**: Combine retrieved context with the query
**3. Generation**: LLM generates response using the context

### Why RAG Matters

| Problem | RAG Solution |
|---------|--------------|
| Knowledge cutoff | Update knowledge base anytime |
| Hallucinations | Ground responses in sources |
| No private data access | Index your own documents |
| Context limits | Retrieve only what's needed |

### Use Cases

- **Enterprise Knowledge**: Search internal docs, wikis, policies
- **Customer Support**: Product manuals, troubleshooting guides
- **Legal/Compliance**: Case law, regulations, contracts
- **Research**: Academic papers, citations

### RAG vs Fine-Tuning

**Use RAG when:** Information changes, need citations, large private data
**Use Fine-Tuning when:** Changing behavior/style, stable knowledge

**→ Proceed to Lesson 2: Vector Databases**` },
      { title: 'Vector Databases', content: `## Storing and Searching Embeddings

Vector databases enable **semantic similarity search** - finding documents by meaning, not keywords.

### Core Concepts

**Embeddings**: Dense vectors representing semantic meaning
\`\`\`python
from openai import OpenAI
client = OpenAI()
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="How do I reset my password?"
)
embedding = response.data[0].embedding  # 1536-dimensional vector
\`\`\`

**Similarity Metrics**:
- Cosine similarity (most common)
- Euclidean distance
- Dot product

### Top Vector Databases

| Database | Type | Best For |
|----------|------|----------|
| **Pinecone** | Managed | Production, scale |
| **Weaviate** | Open Source | Self-hosted, hybrid search |
| **Chroma** | Open Source | Prototyping, simplicity |

### Quick Start: Chroma

\`\`\`python
import chromadb
client = chromadb.Client()
collection = client.create_collection("docs")

collection.add(
    documents=["Reset password via forgot password link"],
    ids=["doc1"]
)

results = collection.query(
    query_texts=["How do I recover my account?"],
    n_results=5
)
\`\`\`

**→ Proceed to Lesson 3: Embeddings & Chunking**` },
      { title: 'Embeddings & Chunking', content: `## Preprocessing for Quality Retrieval

### Embedding Models

| Model | Dimensions | Quality | Cost |
|-------|------------|---------|------|
| all-MiniLM-L6-v2 | 384 | Good | Free |
| all-mpnet-base-v2 | 768 | Better | Free |
| text-embedding-3-small | 1536 | Excellent | $$ |
| text-embedding-3-large | 3072 | Best | $$$ |

### Chunking Strategies

**Why chunk?**
- Embedding models have limits
- Smaller chunks = more precise retrieval
- Balance between context and specificity

**Chunking Approaches**:

1. **Fixed-Size**: Simple, predictable
\`\`\`python
def chunk(text, size=500, overlap=50):
    return [text[i:i+size] for i in range(0, len(text), size-overlap)]
\`\`\`

2. **Sentence-Based**: Respects boundaries
3. **Semantic**: Uses embeddings to find natural breaks
4. **Recursive** (recommended): Respects document structure

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_text(document)
\`\`\`

### Best Practices

- **Overlap**: 10-20% of chunk size
- **Chunk size**: 500-1000 tokens for general use
- **Metadata**: Attach source, page, section for filtering

**→ Proceed to Lesson 4: Building the Pipeline**` },
      { title: 'Building the RAG Pipeline', content: `## Complete RAG Implementation

### Architecture Overview

\`\`\`
Documents → Chunk → Embed → Store → Query → Retrieve → Generate
\`\`\`

### Full Pipeline Code

\`\`\`python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader

# 1. Load documents
loader = TextLoader("documents/manual.md")
documents = loader.load()

# 2. Chunk
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_documents(documents)

# 3. Embed and store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. Create retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# 5. Query
query = "How do I reset my password?"
relevant_docs = retriever.get_relevant_documents(query)

# 6. Generate response
llm = ChatOpenAI(model="gpt-4")
context = "\\n\\n".join([doc.page_content for doc in relevant_docs])
response = llm.predict(f"""Context: {context}

Question: {query}

Answer based on the context:""")
\`\`\`

### Advanced: Conversational RAG

\`\`\`python
from langchain.chains import ConversationalRetrievalChain

qa = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-4"),
    retriever=retriever,
    memory=ConversationBufferMemory(memory_key="chat_history")
)

result = qa({"question": "What is the refund policy?"})
\`\`\`

**→ Proceed to Lesson 5: Production**` },
      { title: 'RAG in Production', content: `## Evaluation and Optimization

### Key Metrics

**Retrieval Quality**:
- Precision: Relevant results / Total results
- Recall: Relevant results found / Total relevant
- MRR: Position of first relevant result

**Generation Quality**:
- Faithfulness: Response accuracy vs context
- Relevance: Does it answer the question?

### Optimization Techniques

**1. Re-ranking**
\`\`\`python
# Retrieve more, then re-rank with cross-encoder
initial_results = retriever.get_relevant_documents(query, k=20)
reranked = cross_encoder.rerank(query, initial_results, top_k=5)
\`\`\`

**2. Hybrid Search**
Combine vector + keyword search:
\`\`\`python
results = vectorstore.similarity_search(query, k=10) + \\
          keyword_search(query, k=10)
# Deduplicate and merge scores
\`\`\`

**3. Caching**
Cache frequent queries:
\`\`\`python
cache = {}
def cached_query(query):
    if query in cache:
        return cache[query]
    result = rag_pipeline(query)
    cache[query] = result
    return result
\`\`\`

### Monitoring

- Track query latency
- Log retrieval scores
- Monitor response quality
- Collect user feedback

### Production Checklist

✅ Embedding model versioned
✅ Chunking strategy documented
✅ Retrieval metrics baseline established
✅ Response quality evaluation in place
✅ Caching implemented
✅ Error handling and fallbacks
✅ Monitoring and alerting configured

## 🎉 Congratulations!

You now know how to build production RAG systems!

**Key Takeaways**:
- RAG = Retrieval + Augmentation + Generation
- Vector databases enable semantic search
- Chunking determines retrieval granularity
- Evaluation and optimization are ongoing processes` },
    ]
  },
  'guide-crewai-agents': {
    title: 'Building AI Agents with CrewAI',
    description: 'Create autonomous AI agents that work together.',
    topic: 'AI Engineering',
    lessons: [
      { title: 'What Are AI Agents?', content: `## Autonomous AI Systems

**AI Agents** are autonomous systems that perceive, reason, and act to accomplish goals.

### Agent Architecture

\`\`\`
┌─────────────┐
│  Perception │ ← Input from environment
└──────┬──────┘
       ↓
┌─────────────┐
│   Memory    │ ← Store experiences
└──────┬──────┘
       ↓
┌─────────────┐
│  Reasoning  │ ← Plan and decide
└──────┬──────┘
       ↓
┌─────────────┐
│   Action    │ → Execute tools/tasks
└─────────────┘
\`\`\`

### Why Multi-Agent?

Single agents have limits. **Multi-agent systems**:
- Divide complex tasks
- Provide checks and balances
- Enable specialization
- Handle parallel work

### Use Cases

| Use Case | Agents |
|----------|--------|
| Research | Researcher + Analyst + Writer |
| Customer Support | Triage + Specialist + QA |
| Content Creation | Strategist + Writer + Editor |
| Data Analysis | Collector + Cleaner + Analyst |

**→ Proceed to Lesson 2: CrewAI Framework**` },
      { title: 'CrewAI Framework', content: `## CrewAI Overview

CrewAI is a framework for orchestrating **role-playing AI agents**.

### Installation

\`\`\`bash
pip install crewai crewai-tools
\`\`\`

### Core Concepts

**Agent**: An AI with a role, goal, and backstory
**Task**: A specific assignment for an agent
**Crew**: A team of agents working together
**Process**: How agents collaborate (sequential/hierarchical)

### Quick Example

\`\`\`python
from crewai import Agent, Task, Crew

# Create an agent
researcher = Agent(
    role="Research Analyst",
    goal="Find comprehensive information on topics",
    backstory="You're an expert researcher with attention to detail",
    verbose=True
)

# Create a task
research_task = Task(
    description="Research the latest AI developments",
    agent=researcher
)

# Create a crew
crew = Crew(
    agents=[researcher],
    tasks=[research_task]
)

# Execute
result = crew.kickoff()
\`\`\`

**→ Proceed to Lesson 3: Creating Agents**` },
      { title: 'Creating Agents', content: `## The Agent Definition Trinity

Every agent needs: **Role**, **Goal**, and **Backstory**

### Role

What the agent does:
\`\`\`python
role = "Senior Software Engineer"
role = "Marketing Copywriter"
role = "Data Analyst"
\`\`\`

### Goal

What the agent aims to achieve:
\`\`\`python
goal = "Write clean, efficient, well-documented code"
goal = "Create compelling copy that drives conversions"
goal = "Extract actionable insights from data"
\`\`\`

### Backstory

Personality and context:
\`\`\`python
backstory = """You have 15 years of experience at top tech companies.
You're known for writing elegant solutions and thorough documentation."""
\`\`\`

### Complete Agent Example

\`\`\`python
from crewai import Agent

writer = Agent(
    role="Content Writer",
    goal="Create engaging, accurate content",
    backstory="""You're a Pulitzer-nominated writer who specializes in 
    making complex topics accessible. You always fact-check and cite sources.""",
    verbose=True,
    allow_delegation=False,
    tools=[]  # Add custom tools here
)
\`\`\`

### Agent Attributes

| Attribute | Purpose |
|-----------|---------|
| role | Define the agent's job |
| goal | What success looks like |
| backstory | Personality and expertise |
| verbose | Log agent reasoning |
| allow_delegation | Can agent assign tasks to others? |
| tools | Functions agent can use |

**→ Proceed to Lesson 4: Tasks & Collaboration**` },
      { title: 'Tasks & Collaboration', content: `## Tasks and Tools

### Creating Tasks

\`\`\`python
from crewai import Task

research_task = Task(
    description="""Research the company Acme Corp and provide:
    1. Company overview
    2. Key products
    3. Recent news
    4. Competitive landscape""",
    expected_output="A comprehensive report on Acme Corp",
    agent=researcher
)
\`\`\`

### Adding Tools

Agents can use tools to interact with the world:

\`\`\`python
from crewai_tools import SerperDevTool, WebsiteSearchTool

search_tool = SerperDevTool()
web_tool = WebsiteSearchTool()

researcher = Agent(
    role="Researcher",
    tools=[search_tool, web_tool]
)
\`\`\`

### Collaboration Patterns

**Sequential**: Tasks run in order
\`\`\`python
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, write_task, edit_task],
    process=Process.sequential
)
\`\`\`

**Hierarchical**: Manager delegates
\`\`\`python
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[main_task],
    process=Process.hierarchical,
    manager_llm="gpt-4"
)
\`\`\`

**→ Proceed to Lesson 5: Real Projects**` },
      { title: 'Real-World Projects', content: `## Project 1: Research Team

\`\`\`python
from crewai import Agent, Task, Crew, Process

# Agents
researcher = Agent(
    role="Research Specialist",
    goal="Find accurate, comprehensive information",
    backstory="PhD researcher with 10 years of experience",
    tools=[search_tool]
)

analyst = Agent(
    role="Data Analyst",
    goal="Extract insights and patterns",
    backstory="Former McKinsey consultant specializing in analysis"
)

writer = Agent(
    role="Technical Writer",
    goal="Create clear, engaging reports",
    backstory="Award-winning science communicator"
)

# Tasks
tasks = [
    Task(description="Research AI trends in 2024", agent=researcher),
    Task(description="Analyze findings and identify key themes", agent=analyst),
    Task(description="Write executive summary report", agent=writer)
]

# Crew
crew = Crew(agents=[researcher, analyst, writer], tasks=tasks)
result = crew.kickoff()
\`\`\`

## Project 2: Content Creation Pipeline

\`\`\`python
# Strategist → Writer → Editor → SEO Specialist

strategist = Agent(role="Content Strategist", ...)
writer = Agent(role="Content Writer", ...)
editor = Agent(role="Senior Editor", ...)
seo = Agent(role="SEO Specialist", ...)

crew = Crew(
    agents=[strategist, writer, editor, seo],
    tasks=[plan_task, write_task, edit_task, optimize_task],
    process=Process.sequential
)
\`\`\`

## 🎉 Congratulations!

You can now build multi-agent AI systems with CrewAI!

**Best Practices**:
- Clear role definitions prevent overlap
- Specific goals improve output quality
- Good backstories improve reasoning
- Start simple, add complexity gradually` },
    ]
  },
  'guide-ai-image-generation': {
    title: 'AI Image Generation Mastery',
    description: 'Create stunning visuals with AI image generators.',
    topic: 'AI Tools',
    lessons: [
      { title: 'Overview of Image AI Tools', content: `## The Big Three

| Platform | Strength | Best For |
|----------|----------|----------|
| **Midjourney** | Artistic quality | Concepts, branding |
| **DALL-E 3** | Precision, API | Specific details, automation |
| **Stable Diffusion** | Freedom, free | Privacy, customization |

### Midjourney

**Pros**: Exceptional artistic quality, strong community
**Cons**: Discord-only, no API, $10-60/month

### DALL-E 3

**Pros**: Precise prompt following, API access, text rendering
**Cons**: More restrictive, API costs accumulate

### Stable Diffusion

**Pros**: Free, local, unlimited, customizable
**Cons**: Requires GPU, steeper learning curve

### Quick Comparison

\`\`\`
Midjourney → "Make it beautiful"
DALL-E 3 → "Make it exactly as I described"
Stable Diffusion → "Make it however I want, infinitely"
\`\`\`

**→ Proceed to Lesson 2: Midjourney**` },
      { title: 'Midjourney Prompting', content: `## The Midjourney Language

Midjourney responds to **artistic, evocative** prompts.

### Prompt Structure

\`\`\`
[Subject] + [Style] + [Lighting] + [Technical] + [Parameters]
\`\`\`

### Example Evolution

❌ "a cat"
✅ "fluffy orange tabby on Victorian windowsill, warm afternoon light through lace curtains, oil painting, impressionist --ar 16:9 --v 6"

### Key Parameters

| Parameter | Effect | Range |
|-----------|--------|-------|
| \`--ar\` | Aspect ratio | 16:9, 9:16, 1:1 |
| \`--s\` | Stylization | 0-1000 |
| \`--c\` | Chaos/variety | 0-100 |
| \`--iw\` | Image weight | 0-3 |

### Prompt Recipe: Hero Images

\`\`\`
[Product] in [setting], professional photography, studio lighting, 
clean background, commercial aesthetic, 8k --ar 16:9 --s 150
\`\`\`

### Workflow

1. Generate 10-20 concepts (high chaos)
2. Select best, create variations
3. Upscale and refine
4. Iterate with adjusted parameters

**→ Proceed to Lesson 3: DALL-E 3**` },
      { title: 'DALL-E 3 & API', content: `## DALL-E 3: Precision at Scale

### Access Methods

**ChatGPT**: Conversational refinement ($20/month)
**API**: Programmatic generation ($0.04-0.12/image)

### Prompting Philosophy

Unlike Midjourney, DALL-E 3 wants **explicit, detailed** descriptions:

❌ "a dog"
✅ "A golden retriever sitting on the left side of the image, facing right, in a grassy park with oak trees in the background, sunny day, photographed with 85mm lens"

### API Integration

\`\`\`python
from openai import OpenAI
client = OpenAI()

response = client.images.generate(
    model="dall-e-3",
    prompt="Professional product photo of wireless headphones on marble surface",
    size="1024x1024",
    quality="hd"
)

image_url = response.data[0].url
\`\`\`

### Batch Generation

\`\`\`python
products = ["headphones", "watch", "laptop"]
for product in products:
    response = client.images.generate(
        model="dall-e-3",
        prompt=f"Product photo: {product}, white background",
        size="1024x1024"
    )
    save_image(response.data[0].url, f"{product}.png")
\`\`\`

**→ Proceed to Lesson 4: Stable Diffusion**` },
      { title: 'Stable Diffusion (Local)', content: `## Running Stable Diffusion Locally

### Hardware Requirements

| Level | GPU | VRAM |
|-------|-----|------|
| Minimum | GTX 1080 | 8GB |
| Recommended | RTX 3060 | 12GB |
| Optimal | RTX 4090 | 24GB |

### Installation (Automatic1111)

\`\`\`bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
./webui.sh  # Linux/Mac
webui-user.bat  # Windows
\`\`\`

### Prompting with Weights

\`\`\`
(cat:1.5)           # Strong emphasis
((cat))             # 1.1x per pair
[cat:0.8]           # Reduce influence
\`\`\`

### Negative Prompts (Essential!)

\`\`\`
(worst quality:1.4), (low quality:1.4), blurry, bad anatomy, 
bad hands, missing fingers, deformed
\`\`\`

### LoRA: Style Add-ons

\`\`\`
A woman, <lora:realistic_vision:0.7>, portrait photography
\`\`\`

### Key Settings

- **Sampler**: DPM++ 2M Karras
- **Steps**: 30-50
- **CFG Scale**: 7-9
- **Resolution**: Match model (512 or 1024)

**→ Proceed to Lesson 5: Workflows**` },
      { title: 'Production Workflows', content: `## Multi-Platform Strategy

### Workflow: Concept to Production

1. **Exploration** (Midjourney): 20-30 concepts, artistic
2. **Refinement** (DALL-E 3): Precise versions, text
3. **Production** (Stable Diffusion): Unlimited variations

### Automation Example

\`\`\`python
def generate_product_images(product):
    # Hero image via DALL-E API
    hero = generate_dalle(f"Product photo: {product}")
    
    # Variations via Stable Diffusion
    variations = []
    for bg in ["white", "marble", "lifestyle"]:
        variations.append(generate_sd(f"{product}, {bg} background"))
    
    return {"hero": hero, "variations": variations}
\`\`\`

### Quality Checklist

✅ Resolution matches target platform
✅ Consistent style across batch
✅ Text renders correctly
✅ No artifacts or errors
✅ File size optimized

### Best Practices

1. **Document prompts** that work
2. **Version control** your generations
3. **A/B test** different styles
4. **Track costs** per project
5. **Backup** successful prompts

## 🎉 Congratulations!

You can now create professional AI-generated images!

**Key Takeaways**:
- Choose tool based on use case
- Midjourney = art, DALL-E = precision, SD = freedom
- Combine tools strategically
- Document and iterate` },
    ]
  },
  'guide-fine-tuning-llms': {
    title: 'Fine-Tuning LLMs',
    description: 'Customize AI models for your specific use case.',
    topic: 'AI Engineering',
    lessons: [
      { title: 'Why Fine-Tune?', content: `## When to Fine-Tune LLMs

### Fine-Tuning vs Alternatives

| Approach | Best For |
|----------|----------|
| **Prompt Engineering** | Quick tasks, flexibility |
| **RAG** | Changing knowledge, citations |
| **Fine-Tuning** | Specific formats, domain adaptation |

### When to Fine-Tune

✅ Consistent output formats needed
✅ Domain-specific language/vocabulary
✅ Style and tone customization
✅ Efficiency at scale
✅ 1,000+ high-quality examples available

### When NOT to Fine-Tune

❌ Limited data (<100 examples)
❌ Task changes frequently
❌ Need reasoning about new information
❌ Prompt engineering works fine

### The LoRA Revolution

**Traditional fine-tuning**: Update all parameters (100+ GB VRAM)
**LoRA**: Update small adapter layers (6-16 GB VRAM)

\`\`\`
Full fine-tuning: 70B params = 1.1 TB memory
LoRA (r=16): 4M params = 16 GB memory
\`\`\`

**→ Proceed to Lesson 2: LoRA & QLoRA**` },
      { title: 'LoRA & QLoRA', content: `## Efficient Fine-Tuning

### LoRA: Low-Rank Adaptation

LoRA adds small trainable matrices instead of updating all weights:

\`\`\`
W' = W + BA
Where B × A << W in parameters
\`\`\`

**128x parameter reduction!**

### Key Hyperparameters

| Parameter | Effect | Typical |
|-----------|--------|---------|
| **Rank (r)** | Capacity | 16-64 |
| **Alpha (α)** | Update strength | 2× rank |
| **Target modules** | Which layers | q_proj, v_proj |

### QLoRA: Quantized LoRA

QLoRA adds 4-bit quantization:
- 4-bit NormalFloat (NF4) for weights
- Double quantization for constants
- Paged optimizers for memory spikes

**Memory comparison:**

| Model | Full FT | LoRA | QLoRA |
|-------|---------|------|-------|
| Llama-7B | 100 GB | 16 GB | **6 GB** |
| Llama-70B | 1.1 TB | 160 GB | **48 GB** |

### Configuration

\`\`\`python
from peft import LoraConfig

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM"
)
\`\`\`

**→ Proceed to Lesson 3: Data Preparation**` },
      { title: 'Preparing Training Data', content: `## Data Quality = Success

### Data Sources

1. **Human annotation** (best quality, expensive)
2. **Synthetic generation** (GPT-4 generated)
3. **Existing datasets** (public data)
4. **Production logs** (successful interactions)

### Data Format

**Instruction format:**
\`\`\`json
{
  "instruction": "Summarize the text",
  "input": "Long article text...",
  "output": "Brief summary..."
}
\`\`\`

**Chat format:**
\`\`\`json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Question?"},
    {"role": "assistant", "content": "Answer."}
  ]
}
\`\`\`

### Data Cleaning

- Remove duplicates
- Normalize text
- Filter by length
- Validate format

### Recommended Sizes

| Task | Minimum | Recommended |
|------|---------|-------------|
| Classification | 100-500 | 1,000-5,000 |
| Generation | 1,000-5,000 | 10,000-50,000 |
| Domain Adaptation | 5,000-10,000 | 50,000+ |

**→ Proceed to Lesson 4: Training**` },
      { title: 'Training with Hugging Face', content: `## Complete Training Pipeline

### Setup

\`\`\`bash
pip install torch transformers peft datasets accelerate bitsandbytes
\`\`\`

### Load Model with QLoRA

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model

# QLoRA config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

# Load model
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto"
)

# Apply LoRA
lora_config = LoraConfig(r=16, lora_alpha=32, ...)
model = get_peft_model(model, lora_config)
\`\`\`

### Training Arguments

\`\`\`python
from transformers import TrainingArguments

args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-4,
    fp16=True,
    logging_steps=10,
    evaluation_strategy="steps"
)
\`\`\`

### Train

\`\`\`python
from transformers import Trainer

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized_train,
    eval_dataset=tokenized_val
)

trainer.train()
trainer.save_model("./fine-tuned-model")
\`\`\`

**→ Proceed to Lesson 5: Evaluation & Deployment**` },
      { title: 'Evaluation & Deployment', content: `## Ensuring Quality

### Evaluation Metrics

**Classification**: Accuracy, F1, Precision, Recall
**Generation**: BLEU, ROUGE, Exact Match, LLM-as-Judge

### Capability Testing

Compare base vs fine-tuned on:
- Task-specific performance
- General knowledge (MMLU)
- Safety (toxicity, bias)

### Deployment Options

| Option | Pros | Cons |
|--------|------|------|
| **vLLM** | 10-20× faster | Setup complexity |
| **TGI** | HuggingFace native | Docker required |
| **FastAPI** | Full control | Manual optimization |

### vLLM Deployment

\`\`\`bash
python -m vllm.entrypoints.openai.api_server \\
    --model ./fine-tuned-model \\
    --port 8000
\`\`\`

\`\`\`python
import openai
client = openai.OpenAI(base_url="http://localhost:8000/v1")
response = client.chat.completions.create(
    model="fine-tuned-model",
    messages=[{"role": "user", "content": "Hello!"}]
)
\`\`\`

### Monitoring

- Track latency and throughput
- Log requests and responses
- Monitor for drift
- Collect user feedback

## 🎉 Congratulations!

You can now fine-tune and deploy custom LLMs!

**Key Takeaways**:
- LoRA/QLoRA makes fine-tuning accessible
- Data quality > quantity
- Evaluate rigorously before deployment
- Monitor continuously in production` },
    ]
  },
  'guide-ai-excel-sheets': {
    title: 'AI for Excel & Google Sheets',
    description: 'Supercharge your spreadsheets with AI-powered formulas and analysis.',
    topic: 'Productivity',
    lessons: [
      { title: 'AI-Powered Formulas', content: `## Transform Natural Language into Formulas

### The Old Way vs AI Way

**Old Way:** Google "Excel formula for..." → Copy-paste → Hope it works

**AI Way:** Describe what you want → Get working formula → Understand why

### Using ChatGPT for Formulas

**Prompt Template:**
\`\`\`
I need an Excel formula that [describe what you want].
Column A has [data type], Column B has [data type].
Example: If A2 is greater than 100, return "High", otherwise "Low"
\`\`\`

**Example Prompts:**

1. **Conditional Logic:**
"I need a formula that returns 'Over Budget' if expenses (B2) exceed budget (C2), otherwise 'On Track'"

Result: \`=IF(B2>C2, "Over Budget", "On Track")\`

2. **Text Manipulation:**
"Extract the first name from full name in A2 (e.g., 'John Smith' → 'John')"

Result: \`=LEFT(A2, FIND(" ", A2)-1)\`

3. **Date Calculations:**
"Calculate working days between A2 (start date) and B2 (end date), excluding weekends"

Result: \`=NETWORKDAYS(A2, B2)\`

4. **Complex Lookups:**
"VLOOKUP alternative that can look left - find price in Column C based on product name in Column E"

Result: \`=INDEX(C:C, MATCH(E2, E:E, 0))\`

### Formula Optimization Tips

- Always validate AI-generated formulas
- Use cell references, not hardcoded values
- Test with edge cases
- Add error handling: IFERROR()
- Comment complex formulas: use N("comment")

**→ Proceed to Lesson 2: Built-in AI Features**` },
      { title: 'Microsoft Copilot & Gemini in Sheets', content: `## Native AI Features

### Microsoft Copilot in Excel (Microsoft 365)

**What It Does:**
- Generate formulas from natural language
- Analyze data and create insights
- Build charts and visualizations
- Highlight patterns and trends

**How to Use:**
1. Open Excel (Microsoft 365)
2. Click "Copilot" in the ribbon
3. Type: "Create a formula that calculates..."
4. Review and insert

**Example Commands:**
- "Add up all sales where region is West"
- "Highlight the top 10% of values"
- "Create a pivot table showing sales by month"
- "Identify outliers in this data"

### Google Duet AI in Sheets

**Features:**
- "Help me organize" for data structuring
- Formula suggestions
- Chart recommendations
- Data cleaning assistance

### Limitations

**Microsoft Copilot:**
- Requires Microsoft 365 subscription
- Works best with clean data
- Limited to 100K rows

**Google Duet AI:**
- Google Workspace Enterprise only
- Privacy considerations
- Region restrictions

### Alternative: SheetAI Add-on

Works with both Excel and Google Sheets:
1. Install SheetAI extension
2. Use =AI() functions directly
3. Example: =AI("Summarize this data", A1:A100)

**→ Proceed to Lesson 3: Data Analysis with AI**` },
      { title: 'Data Analysis with AI', content: `## Extract Insights Automatically

### ChatGPT for Data Analysis

**Pattern 1: Paste Data Directly**
\`\`\`
Here's my sales data:
Month | Sales | Costs
Jan   | 5000  | 3000
Feb   | 6000  | 3500
...

Questions:
1. What's the profit margin trend?
2. Which month had best performance?
3. Any anomalies?
\`\`\`

**Pattern 2: Describe Data Structure**
\`\`\`
I have a spreadsheet with:
- 1000 rows of customer data
- Columns: Name, Email, Purchase Date, Amount, Product
- Want to: Identify top customers by frequency and value

What formulas/analysis should I do?
\`\`\`

### Analysis Techniques

**1. Summary Statistics**
Ask AI: "Create formulas to calculate mean, median, mode, and standard deviation for column B"

**2. Trend Analysis**
Ask AI: "How do I calculate month-over-month growth rate for my sales data?"

**3. Segmentation**
Ask AI: "Create a formula to categorize customers into High/Medium/Low based on purchase amount"

**4. Forecasting**
Ask AI: "Use LINEST or FORECAST to predict next month's sales"

### Visualization Recommendations

Ask AI:
- "What's the best chart type to show [data]?"
- "Create a histogram formula for age distribution"
- "Build a dynamic dashboard layout"

**→ Proceed to Lesson 4: Automation**` },
      { title: 'Automating Reports & Dashboards', content: `## AI-Powered Reporting

### Automated Report Generation

**Step 1: Define Report Structure**
\`\`\`
Create a monthly report template with:
1. Executive Summary (auto-generated summary)
2. Key Metrics (formulas)
3. Trends (charts)
4. Action Items (AI suggestions)
\`\`\`

**Step 2: Build Dynamic Elements**
- Use TODAY() for automatic dates
- Use SUMIFS/COUNTIFS for dynamic filtering
- Use ARRAYFORMULA for bulk operations

**Step 3: Connect to AI for Insights**

Use Zapier or Make.com to:
1. Trigger on schedule
2. Send data to ChatGPT API
3. Generate summary
4. Update spreadsheet

### Dashboard Best Practices

**Layout:**
- Top: KPI summary (3-5 metrics)
- Middle: Trend charts
- Bottom: Detailed tables

**AI-Generated Elements:**
- Auto-refresh summaries
- Anomaly alerts
- Predictive indicators
- Smart recommendations

### Example: Weekly Sales Report

\`\`\`
# Prompt for AI
Analyze this week's sales data:
- Total revenue: $XX
- Top product: XX
- Growth vs last week: XX%

Provide a 2-sentence executive summary.
Suggest 3 action items based on the data.
\`\`\`

### Tools for Advanced Automation

- **Coefficient:** AI-powered data syncing
- **Rows.com:** Built-in AI integrations
- **Sourcetable:** AI-native spreadsheet
- **Formula Bot:** Formula generation

## 🎉 Congratulations!

You can now use AI to supercharge your spreadsheets!

**Key Skills:**
- ✅ Generate formulas from natural language
- ✅ Use built-in AI features
- ✅ Analyze data with AI assistance
- ✅ Automate reports and dashboards

**Next Steps:**
- Explore the AI Email Automation guide
- Learn about AI Meeting Assistants
- Master No-Code AI Apps` },
    ]
  },
  'guide-ai-email-automation': {
    title: 'AI Email Automation',
    description: 'Automate your inbox and write better emails faster.',
    topic: 'Productivity',
    lessons: [
      { title: 'AI Email Tools Overview', content: `## The AI Email Revolution

### Why AI for Email?

The average professional spends **28% of their day** on email. AI can cut that in half.

### Top AI Email Tools

| Tool | Best For | Price |
|------|----------|-------|
| **Superhuman** | Speed, keyboard shortcuts | $30/mo |
| **Shortwave** | Gmail AI assistant | Free-$9/mo |
| **HEY** | Email restructuring | $12/mo |
| **Spark** | Team collaboration | Free |
| **Gmail AI** | Built-in writing help | Free |
| **Outlook Copilot** | Microsoft 365 users | Included |

### Key Features to Look For

✅ **Smart Compose** - AI suggestions while typing
✅ **Email Summarization** - TL;DR for long threads
✅ **Scheduled Sending** - Send at optimal times
✅ **Follow-up Reminders** - Never miss a reply
✅ **Categorization** - Auto-sort incoming mail
✅ **Template Generation** - AI-written responses

### Gmail Built-in AI

**Smart Compose:**
Start typing and press Tab to accept suggestions

**Smart Reply:**
Quick one-click responses at bottom of emails

**Help Me Write (Gemini):**
Click the sparkle icon → Describe what you need → Generate

**→ Proceed to Lesson 2: Composing Emails**` },
      { title: 'Automating Email Composition', content: `## Write Better Emails Faster

### The 3-Step AI Email Workflow

**1. Draft Generation**
\`\`\`
Prompt: Write a professional email to [recipient] about [topic].
Tone: [Formal/Casual/Friendly]
Key points to include:
- Point 1
- Point 2
- Point 3
\`\`\`

**2. Refinement**
\`\`\`
Make this email more concise
Add a clear call-to-action
Make it sound more [tone]
\`\`\`

**3. Polish**
\`\`\`
Check for clarity and professionalism
Suggest a subject line
Add appropriate greeting/closing
\`\`\`

### Email Templates with AI

**Follow-up Email:**
\`\`\`
Write a follow-up email to [Name] about our meeting on [date].
Reference our discussion about [topic].
Ask about next steps.
Keep it brief and professional.
\`\`\`

**Introduction Email:**
\`\`\`
Write an introduction email connecting [Person A] with [Person B].
Explain why they should connect (both work in X industry).
Suggest a coffee chat or call.
\`\`\`

**Request Email:**
\`\`\`
Write a polite email requesting [specific request] from [recipient].
Explain why it's needed and the deadline.
Offer to provide more information.
\`\`\`

### ChatGPT for Email

Create a dedicated conversation for email drafting:
1. Set context: "You are my email assistant. Help me write professional, concise emails."
2. Paste emails you receive: "Draft a response to this: [paste]"
3. Iterate: "Make it shorter/more formal/add detail"

**→ Proceed to Lesson 3: Smart Replies**` },
      { title: 'Smart Replies & Follow-ups', content: `## Never Miss a Response

### AI-Powered Quick Replies

**How They Work:**
1. AI analyzes incoming email
2. Generates 3 relevant responses
3. One click to send

**Best Practices:**
- Customize before sending
- Match the sender's tone
- Add specific details

### Follow-up Automation

**Tools with Smart Follow-ups:**
- **Superhuman:** Auto-remind if no reply in X days
- **Boomerang:** Schedule follow-ups automatically
- **Mixmax:** Track opens and set reminders

### Creating Follow-up Rules

**Rule 1: No Response in 3 Days**
\`\`\`
Hi [Name],

Following up on my previous email about [topic].
Let me know if you need any additional information.

Best,
[Your name]
\`\`\`

**Rule 2: After Meeting**
\`\`\`
Hi [Name],

Great meeting today! Here's a quick summary:
- [Point 1]
- [Point 2]

Next steps:
- [Action item]

Let me know if I missed anything.
\`\`\`

### Avoiding Follow-up Fatigue

✅ Maximum 2 follow-ups per thread
✅ Add value each time (don't just "checking in")
✅ Set reminders, not auto-sends
✅ Know when to move on

**→ Proceed to Lesson 4: Cold Outreach**` },
      { title: 'Cold Outreach Automation', content: `## Personalization at Scale

### The AI Cold Outreach Framework

**Don't:** Send generic templates
**Do:** Use AI to personalize every message

### Step 1: Research Automation

Use AI to research prospects:
\`\`\`
Research [Company Name] and [Person Name].
Find:
- Recent news/announcements
- LinkedIn activity
- Company initiatives
- Personal interests

Provide 3 personalization angles.
\`\`\`

### Step 2: Personalized Templates

\`\`\`
Write a cold email to [Name], [Title] at [Company].

Personalization hooks:
- Mention their recent [article/post/achievement]
- Reference [company initiative]
- Connect to their role in [area]

Offer: [Your value proposition]

Keep it under 100 words.
No buzzwords.
End with a question.
\`\`\`

### Step 3: A/B Testing with AI

Generate multiple versions:
\`\`\`
Create 3 subject line variations for:
[Your value proposition]

Variation 1: Direct
Variation 2: Question
Variation 3: Curiosity-driven
\`\`\`

### Tools for Scale

| Tool | Use Case |
|------|----------|
| **Lavender** | Email scoring + AI suggestions |
| **Apollo** | Prospecting + personalization |
| **Lemlist** | Automated campaigns |
| **Instantly** | Cold email at scale |

### Best Practices

✅ Personalize first sentence
✅ Keep emails under 125 words
✅ One clear CTA
✅ Mobile-optimized
✅ Send Tuesday-Thursday, 8-10am

### Response Rate Benchmarks

- **Generic cold email:** 1-2%
- **Personalized cold email:** 5-15%
- **Hyper-personalized with AI:** 15-30%

## 🎉 Congratulations!

You can now automate your email workflow with AI!

**Key Skills:**
- ✅ Use AI email tools effectively
- ✅ Draft emails with AI assistance
- ✅ Automate follow-ups
- ✅ Personalize cold outreach at scale

**Next Steps:**
- Set up your email automation workflow
- Create AI-powered templates
- Track and optimize response rates` },
    ]
  },
  'guide-ai-meeting-assistants': {
    title: 'AI Meeting Assistants',
    description: 'Never miss a meeting detail with AI-powered transcription and summaries.',
    topic: 'Productivity',
    lessons: [
      { title: 'Why AI Meeting Assistants?', content: `## The Meeting Problem

**Before AI:**
- Take manual notes → Miss key points
- Zone out → Lose context
- Action items forgotten → Follow-ups fail

**After AI:**
- Full transcription → Nothing missed
- AI summaries → Key points highlighted
- Auto action items → Accountability built-in

### What AI Meeting Assistants Do

| Feature | Benefit |
|---------|---------|
| **Transcription** | Full text of everything said |
| **Summarization** | TL;DR of long meetings |
| **Action Items** | Auto-extracted tasks |
| **Speaker ID** | Know who said what |
| **Search** | Find any conversation |
| **Integration** | Sync with calendars, CRMs |

### ROI of Meeting Assistants

- **Time saved:** 30-60 min/week per person
- **Accuracy:** 95%+ capture rate
- **Follow-through:** 3x better action item completion
- **Searchability:** Find any past conversation in seconds

**→ Proceed to Lesson 2: Tool Comparison**` },
      { title: 'Otter.ai & Fireflies Overview', content: `## Top Meeting AI Tools

### Otter.ai

**Best For:** Real-time transcription, collaboration

**Features:**
- Live transcription during meetings
- Speaker identification
- Automated summary
- Keyword search
- Integration: Zoom, Google Meet, Teams
- Mobile app for in-person meetings

**Pricing:**
- Free: 300 min/month
- Pro: $16.99/mo (6,000 min)
- Business: $30/user/mo

**Standout Feature:** OtterPilot auto-joins meetings and takes notes

### Fireflies.ai

**Best For:** Teams, CRM integration

**Features:**
- Transcription + AI summaries
- Sentiment analysis
- Action item extraction
- CRM sync (Salesforce, HubSpot)
- Collaboration tools
- Custom vocabulary

**Pricing:**
- Free: 800 min/month
- Pro: $18/mo (unlimited)
- Business: $29/user/mo

**Standout Feature:** Native integrations with 50+ apps

### Comparison

| Feature | Otter.ai | Fireflies |
|---------|----------|-----------|
| Real-time | ✅ Best | ✅ Good |
| CRM Integration | Basic | ✅ Excellent |
| Collaboration | ✅ Excellent | Good |
| Search | ✅ Excellent | Good |
| Mobile App | ✅ Yes | No |
| In-person | ✅ Yes | No |

### Other Options

- **Rev:** Human transcription (99% accuracy)
- **Trint:** Editor-focused
- **Gong:** Sales-specific
- **Avoma:** All-in-one meeting intelligence

**→ Proceed to Lesson 3: Using Effectively**` },
      { title: 'Meeting Summaries & Action Items', content: `## Getting the Most from AI Notes

### Setting Up for Success

**Before the Meeting:**
1. Connect calendar (auto-join enabled)
2. Add custom vocabulary (names, acronyms)
3. Set meeting type for better summaries

**During the Meeting:**
- Speak clearly
- Use names when referencing people
- State action items explicitly: "Action item for Sarah:..."

**After the Meeting:**
- Review summary (2 min)
- Verify action items
- Share with attendees
- Tag for future reference

### Summary Best Practices

**What AI Captures Well:**
✅ Decisions made
✅ Topics discussed
✅ Action items
✅ Questions raised
✅ Key points per speaker

**What Needs Human Review:**
⚠️ Nuanced agreements
⚠️ Off-record comments
⚠️ Emotional context
⚠️ Confidential details

### Action Item Extraction

**Explicit Format (Better):**
"Action item for John: Send proposal by Friday"
→ AI captures: ✅ John → Send proposal → Friday

**Implicit Format (Worse):**
"John, can you send the proposal?"
→ AI might miss: ⚠️

### Customizing Summaries

**In Otter:**
Click "Summary" → Edit → Add context

**In Fireflies:**
Use meeting templates for consistent format

### Search Tips

Search for:
- "action items" → All tasks
- "[Name]" → Their contributions
- "[Keyword]" → Topic mentions
- "decision" → Decisions made

**→ Proceed to Lesson 4: Integration & Best Practices**` },
      { title: 'Integration & Best Practices', content: `## Connect to Your Workflow

### Calendar Integration

**Google Calendar:**
1. Install Otter/Fireflies add-on
2. Enable auto-join for all meetings
3. Set rules (skip 1:1s, join external only)

**Outlook:**
1. Add plugin to Outlook
2. Configure meeting rules
3. Enable auto-transcription

### CRM Integration

**Fireflies → Salesforce:**
- Auto-log call notes
- Update opportunity fields
- Create follow-up tasks

**Fireflies → HubSpot:**
- Sync meeting notes to contacts
- Track engagement
- Update deal stages

### Slack/Teams Integration

**Post-meeting auto-post:**
\`\`\`
📋 Meeting: Weekly Standup
📅 Duration: 30 min
👥 Attendees: 8

Summary:
- Discussed Q3 priorities
- Identified blocker: API delay
- Next: Review on Thursday

Action Items:
- @Sarah: Update docs
- @Mike: Fix API issue
\`\`\`

### Team Best Practices

**Rollout:**
1. Start with pilot team
2. Create usage guidelines
3. Train on features
4. Gather feedback
5. Expand to company

**Guidelines:**
- Inform attendees of recording
- Review notes within 24 hours
- Don't replace active listening
- Use for async updates

### Privacy Considerations

✅ Always announce recording
✅ Get consent when required
✅ Redact sensitive info
✅ Set retention policies
✅ Control access permissions

## 🎉 Congratulations!

You can now use AI meeting assistants to never miss a detail!

**Key Skills:**
- ✅ Choose the right tool
- ✅ Set up integrations
- ✅ Extract action items
- ✅ Follow best practices

**Next Steps:**
- Try Otter.ai or Fireflies free tier
- Enable calendar integration
- Share summaries with your team` },
    ]
  },
  'guide-nocode-ai-apps': {
    title: 'Building No-Code AI Apps',
    description: 'Create AI-powered applications without writing code.',
    topic: 'Productivity',
    lessons: [
      { title: 'No-Code AI Platforms Overview', content: `## Build AI Apps Without Code

### Why No-Code + AI?

- **Speed:** Ideas to apps in days, not months
- **Cost:** Fraction of developer costs
- **Accessibility:** Anyone can build
- **Flexibility:** Iterate quickly

### Top No-Code AI Platforms

| Platform | Best For | Learning Curve |
|----------|----------|----------------|
| **Bubble** | Complex web apps | Medium |
| **Softr** | Simple websites | Easy |
| **Glide** | Mobile apps | Easy |
| **FlutterFlow** | Native apps | Medium |
| **Retool** | Internal tools | Medium |
| **Glide** | Database apps | Easy |

### AI-Ready Platforms

**Built-in AI:**
- Softr (OpenAI integration)
- Glide (AI components)
- Bubble (API connectors)

**API-Friendly:**
- All major platforms support API calls
- Connect to OpenAI, Claude, Gemini
- Use webhooks for automation

### What You Can Build

✅ AI chatbots
✅ Content generators
✅ Data analysis dashboards
✅ Customer support tools
✅ Personalized recommendation engines
✅ AI-powered forms and surveys

**→ Proceed to Lesson 2: Connecting AI APIs**` },
      { title: 'Connecting AI APIs to No-Code Tools', content: `## API Integration Basics

### What You'll Need

1. **API Key** from AI provider (OpenAI, Anthropic, etc.)
2. **No-code platform** with API support
3. **Basic understanding** of API calls

### OpenAI API Setup

**Step 1: Get API Key**
1. Go to platform.openai.com
2. Create API key
3. Save securely (you won't see it again)

**Step 2: Test with Postman**
\`\`\`
POST https://api.openai.com/v1/chat/completions
Headers:
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json

Body:
{
  "model": "gpt-4",
  "messages": [{"role": "user", "content": "Hello!"}]
}
\`\`\`

### Connecting to Bubble

**Method 1: API Connector Plugin**
1. Install API Connector
2. Add new API call
3. Set endpoint and headers
4. Test and use in workflows

**Method 2: Bubble's Native AI**
1. Enable AI features in settings
2. Use AI actions in workflows
3. Configure prompts and models

### Connecting to Softr

**Using Zapier:**
1. Trigger: Softr form submission
2. Action: OpenAI API call
3. Response: Update Softr record

**Using Make.com:**
1. Create scenario
2. Add OpenAI module
3. Connect to Softr via API

### Best Practices

✅ Never expose API keys in client-side code
✅ Use environment variables
✅ Implement rate limiting
✅ Cache common responses
✅ Monitor API costs

**→ Proceed to Lesson 3: AI Chatbots Without Code**` },
      { title: 'Building AI Chatbots Without Code', content: `## No-Code Chatbot Platforms

### Dedicated Chatbot Builders

**Voiceflow**
- Visual conversation designer
- AI/NLU built-in
- Multi-channel deployment
- Free tier available

**Botpress**
- Open-source option
- Visual flow builder
- NLU integration
- Self-host or cloud

**Dante AI**
- Train on your data
- Embeddable widget
- Simple setup
- Good for customer support

### Building with Voiceflow

**Step 1: Create Project**
- Choose template or blank
- Define personality and tone

**Step 2: Design Conversation**
- Use visual blocks
- Add AI responses
- Create decision trees

**Step 3: Add Knowledge Base**
- Upload documents
- Add FAQs
- Connect to website

**Step 4: Test & Deploy**
- Preview in browser
- Embed on website
- Connect to channels

### Building with Bubble + OpenAI

**Architecture:**
\`\`\`
User Input → Bubble → OpenAI API → Response → Display
\`\`\`

**Key Components:**
1. Input field (chat interface)
2. API call to OpenAI
3. Response display
4. Conversation history (database)

### Chat with Your Data

**Using Embeddings:**
1. Upload documents to Pinecone/Weaviate
2. User query → Find relevant chunks
3. Send to OpenAI with context
4. Return grounded response

**No-Code Options:**
- CustomGPT.ai
- Dante AI
- Chaindesk
- Flowise (visual builder)

**→ Proceed to Lesson 4: Deploying AI Apps**` },
      { title: 'Deploying AI Apps', content: `## From Build to Production

### Pre-Launch Checklist

✅ Test all user flows
✅ Check API rate limits
✅ Set up error handling
✅ Configure analytics
✅ Add privacy policy
✅ Test on mobile
✅ Set up monitoring

### Hosting Options

**For Web Apps:**

| Platform | Best For |
|----------|----------|
| **Bubble** | Hosted on Bubble |
| **Softr** | Hosted on Softr |
| **Webflow** | Marketing sites |
| **Vercel** | Custom deployments |

**For Mobile Apps:**
- **Glide:** Instant PWA
- **FlutterFlow:** App Store + Play Store
- **Adalo:** Direct app store publishing

### Custom Domain Setup

**Bubble:**
1. Settings → Domain
2. Add custom domain
3. Update DNS records
4. Enable SSL

**Softr:**
1. Settings → Custom Domain
2. Add CNAME record
3. Wait for propagation

### Scaling Considerations

**Performance:**
- Implement caching
- Optimize API calls
- Use pagination for lists
- Add loading states

**Cost Management:**
- Monitor API usage
- Set spending limits
- Cache AI responses
- Use cheaper models when possible

### Analytics & Monitoring

**Tools:**
- Google Analytics (traffic)
- Mixpanel (user behavior)
- Sentry (errors)
- Custom dashboards (API usage)

### Maintenance

**Weekly:**
- Check error logs
- Review API costs
- Monitor user feedback

**Monthly:**
- Update dependencies
- Review performance
- Plan feature improvements

## 🎉 Congratulations!

You can now build AI-powered apps without writing code!

**Key Skills:**
- ✅ Choose the right no-code platform
- ✅ Connect AI APIs
- ✅ Build AI chatbots
- ✅ Deploy and scale

**Next Steps:**
- Start with a simple project
- Try Voiceflow for chatbots
- Experiment with Bubble for apps
- Join no-code communities` },
    ]
  },
  'guide-github-copilot-deep-dive': {
    title: 'GitHub Copilot Deep Dive',
    description: 'Master AI pair programming with GitHub Copilot advanced techniques.',
    topic: 'Development',
    lessons: [
      { title: 'Beyond Basic Autocomplete', content: `## Advanced Copilot Techniques

### Context Awareness

Copilot understands:
- Open files in your editor
- Function signatures
- Variable names and types
- Comments and documentation
- Import statements

**Tip:** Keep relevant files open for better suggestions

### Multi-Line Suggestions

**Trigger:**
1. Write a comment describing what you want
2. Press Tab to accept
3. Continue pressing Tab for more lines

**Example:**
\`\`\`python
# Function to validate email address and extract domain
\`\`\`
↓ Copilot generates complete function

### Pattern Recognition

Copilot learns your patterns:
- Naming conventions
- Error handling style
- Comment style
- Code structure

**Tip:** Write consistent code for better suggestions

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Tab\` | Accept suggestion |
| \`Esc\` | Dismiss |
| \`Alt + ]\` | Next suggestion |
| \`Alt + [\` | Previous suggestion |
| \`Ctrl + Enter\` | Open panel (10 suggestions) |

### Improving Suggestions

**Bad Prompt:**
\`\`\`javascript
function processData(data) {
  // copilot fills this
}
\`\`\`

**Good Prompt:**
\`\`\`javascript
// Process user data array, filter inactive users,
// calculate average age, return stats object
function processData(data) {
\`\`\`

**→ Proceed to Lesson 2: Copilot Chat**` },
      { title: 'Copilot Chat & Commands', content: `## Conversational Coding

### What is Copilot Chat?

Inline AI assistant that can:
- Answer questions
- Explain code
- Suggest improvements
- Generate tests
- Debug issues

### Accessing Copilot Chat

**VS Code:**
- \`Ctrl + Shift + P\` → "GitHub Copilot Chat"
- Or click Chat icon in sidebar

**Commands:**

| Command | Use |
|---------|-----|
| \`/explain\` | Explain selected code |
| \`/tests\` | Generate unit tests |
| \`/fix\` | Fix problems in code |
| \`/docs\` | Generate documentation |
| \`/simplify\` | Simplify complex code |

### Slash Commands in Action

**Explain Code:**
\`\`\`
/explain How does this regex work?
\`\`\`

**Generate Tests:**
\`\`\`
/tests for this function using Jest
\`\`\`

**Fix Issues:**
\`\`\`
/fix The function returns undefined for empty arrays
\`\`\`

### Inline Chat

**Trigger:** \`Ctrl + I\` (Windows) or \`Cmd + I\` (Mac)

**Use Cases:**
- Quick questions without sidebar
- Iterative refinement
- Context-specific help

**Example Flow:**
1. Select code
2. Press \`Ctrl + I\`
3. "Add error handling"
4. Review suggestion
5. "Also log errors to console"
6. Accept final version

### Chat vs Autocomplete

| Feature | Autocomplete | Chat |
|---------|--------------|------|
| Speed | Instant | Slower |
| Context | Current file | Entire project |
| Interaction | One-way | Conversational |
| Best For | Writing code | Understanding/debugging |

**→ Proceed to Lesson 3: Multi-file Context**` },
      { title: 'Multi-file Context & Patterns', content: `## Project-Wide Understanding

### How Copilot Understands Projects

Copilot analyzes:
- File structure
- Import relationships
- Shared types/interfaces
- Common patterns

### Best Practices for Context

**1. Organize Files Logically**
\`\`\`
src/
  components/
    Button.tsx
    Input.tsx
  utils/
    helpers.ts
  types/
    index.ts
\`\`\`

**2. Use Consistent Naming**
- Same patterns across files
- Clear function names
- Descriptive variables

**3. Add Type Definitions**
\`\`\`typescript
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

Copilot will use these types across all files.

### Cross-File Patterns

**React + TypeScript:**
\`\`\`typescript
// Component file
import { User } from '../types';

export function UserCard({ user }: { user: User }) {
  // Copilot knows User type
}
\`\`\`

### Project Rules for Copilot

**Create .github/copilot-instructions.md:**
\`\`\`markdown
# Project Conventions

## Naming
- Use camelCase for variables
- Use PascalCase for components
- Prefix handlers with 'handle'

## Patterns
- Use async/await over .then()
- Prefer functional components
- Use Tailwind CSS classes

## Testing
- Use Jest + React Testing Library
- Test file: Component.test.tsx
\`\`\`

### Improving Multi-file Context

✅ Keep related files open
✅ Use consistent patterns
✅ Document conventions
✅ Share types across files
✅ Use descriptive imports

**→ Proceed to Lesson 4: Team Workflows**` },
      { title: 'Team Workflows & Best Practices', content: `## Copilot in Teams

### Code Review with Copilot

**Reviewer Perspective:**
- Copilot suggestions aren't always right
- Review for security, not just functionality
- Check for consistent style
- Verify edge cases

**Author Perspective:**
- Don't blindly accept suggestions
- Add comments for complex logic
- Test generated code
- Explain non-obvious choices

### Security Considerations

**Don't Let Copilot Generate:**
- ❌ Passwords or secrets
- ❌ Authentication logic (without review)
- ❌ Encryption implementations
- ❌ SQL queries (without sanitization)
- ❌ API keys in code

**Do Review For:**
- ✅ Input validation
- ✅ Error handling
- ✅ SQL injection risks
- ✅ XSS vulnerabilities
- ✅ Hardcoded values

### Team Guidelines

**Create a team standard:**

\`\`\`markdown
# Copilot Usage Guidelines

## When to Use
- Boilerplate code
- Standard patterns
- Test generation
- Documentation

## When to Avoid
- Security-critical code
- Novel algorithms
- Business logic
- Complex state management

## Code Review
- All Copilot code must be reviewed
- Add comment if logic is Copilot-generated
- Test edge cases
\`\`\`

### Training the Team

**Week 1:** Basic usage (autocomplete, comments)
**Week 2:** Chat commands (/explain, /tests)
**Week 3:** Advanced patterns
**Week 4:** Team conventions + review

### Measuring Productivity

**Metrics:**
- Time to write boilerplate
- Code review time
- Bug count
- Developer satisfaction

### Common Pitfalls

❌ Over-reliance (accepting without reading)
❌ Inconsistent style (letting Copilot dictate)
❌ Security blindness (not reviewing generated code)
❌ Skill atrophy (not learning fundamentals)

## 🎉 Congratulations!

You're now a Copilot power user!

**Key Skills:**
- ✅ Advanced autocomplete techniques
- ✅ Using Copilot Chat effectively
- ✅ Multi-file context optimization
- ✅ Team workflows and security

**Next Steps:**
- Create team guidelines
- Practice advanced techniques
- Share tips with colleagues` },
    ]
  },
  'guide-windsurf-ide': {
    title: 'Windsurf IDE by Codeium',
    description: 'The AI-native code editor for next-generation development.',
    topic: 'Development',
    lessons: [
      { title: 'What is Windsurf?', content: `## The AI-Native Code Editor

### Windsurf vs Traditional Editors

| Feature | VS Code | Windsurf |
|---------|---------|----------|
| AI Integration | Extension | Native |
| Context Awareness | File-level | Project-level |
| Chat | Sidebar | Inline |
| Code Generation | Suggestions | Full functions |
| Learning Curve | Familiar | New paradigm |

### Key Features

**Cascade:** Codeium's AI engine
- Project-wide understanding
- Multi-file editing
- Contextual suggestions
- Natural language commands

**Chat:** Inline AI assistant
- Ask questions about code
- Generate entire features
- Debug with AI
- Explain complex code

**Supercomplete:** Advanced autocomplete
- Predicts full implementations
- Understands patterns
- Learns your style

### Installation

**Download:** codeium.com/windsurf

**Platforms:**
- macOS (Intel + Apple Silicon)
- Windows
- Linux

**Setup:**
1. Download installer
2. Sign in with GitHub/Google
3. Import VS Code settings (optional)
4. Start coding!

**→ Proceed to Lesson 2: AI Features**` },
      { title: 'AI Features & Cascade', content: `## Cascade: The AI Engine

### How Cascade Works

1. **Indexing:** Analyzes entire codebase
2. **Understanding:** Maps relationships
3. **Predicting:** Anticipates your needs
4. **Generating:** Creates context-aware code

### Cascade Commands

**Natural Language to Code:**
\`\`\`
Create a React component for user profile with:
- Avatar image
- Name and email display
- Edit button
- Responsive design
\`\`\`

Cascade generates complete, styled component.

**Multi-File Operations:**
\`\`\`
Add authentication to this app:
- Login page
- Auth context
- Protected routes
- API middleware
\`\`\`

Cascade creates all necessary files.

### Supercomplete

**Trigger:** Just start typing

**Example:**
\`\`\`typescript
function calculate
\`\`\`

Supercomplete suggests:
\`\`\`typescript
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
\`\`\`

Based on your project's types!

### Code Actions

**Right-click menu:**
- "Cascade: Explain this"
- "Cascade: Generate tests"
- "Cascade: Refactor"
- "Cascade: Document"

### Comparison to Copilot

| Feature | Copilot | Cascade |
|---------|---------|---------|
| Context | Open files | Full project |
| Generation | Line-by-line | Full functions |
| Chat | Separate panel | Inline |
| Customization | Limited | Extensive |

**→ Proceed to Lesson 3: Workflow Integration**` },
      { title: 'Workflow Integration', content: `## Integrating Windsurf into Your Workflow

### Git Integration

**Built-in Git:**
- Source control panel
- Diff viewer
- Commit from editor
- Branch management

**AI + Git:**
\`\`\`
Cascade: Write a commit message for these changes
\`\`\`

### Terminal Integration

**Built-in Terminal:**
- Multiple tabs
- Split view
- AI commands in terminal

**Example:**
\`\`\`bash
# Ask Cascade to help with command
cascade "How do I undo the last commit but keep changes?"
\`\`\`

### Extensions

**Compatible with:**
- VS Code extensions
- Codeium extensions
- Custom plugins

**Essential Extensions:**
- GitLens
- Prettier
- ESLint
- Your theme of choice

### Project Setup

**Recommended Structure:**
\`\`\`
project/
├── .cascade/
│   └── instructions.md  # Custom instructions
├── src/
├── tests/
└── README.md
\`\`\`

**Cascade Instructions:**
\`\`\`markdown
# Project Instructions

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS

## Conventions
- Functional components
- Arrow functions
- Named exports

## Patterns
- Use React Query for data fetching
- Zod for validation
\`\`\`

**→ Proceed to Lesson 4: Tips & Tricks**` },
      { title: 'Tips & Tricks', content: `## Windsurf Productivity Hacks

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Cmd + K\` | Open Cascade chat |
| \`Cmd + I\` | Inline edit |
| \`Tab\` | Accept suggestion |
| \`Cmd + /\` | Toggle comment |
| \`Cmd + P\` | Quick open |

### Cascade Prompting Tips

**Be Specific:**
❌ "Add a button"
✅ "Add a primary button with Tailwind classes, calls handleSubmit on click, shows loading state"

**Provide Context:**
❌ "Fix this error"
✅ "Fix the TypeScript error in UserService.ts line 45, the type mismatch between User and UserDTO"

**Iterate:**
\`\`\`
You: Create a form component
Cascade: [generates form]
You: Add validation with Zod
Cascade: [updates with validation]
You: Add error display
Cascade: [adds error UI]
\`\`\`

### Performance Tips

**Speed Up Indexing:**
- Exclude node_modules
- Limit large files
- Use .cascadeignore

**.cascadeignore:**
\`\`\`
node_modules/
dist/
build/
*.min.js
*.lock
\`\`\`

### Common Workflows

**New Feature:**
1. Describe feature to Cascade
2. Review generated code
3. Test and iterate
4. Commit with AI message

**Bug Fix:**
1. Paste error message
2. Ask Cascade to explain
3. Request fix suggestions
4. Test solution

**Refactoring:**
1. Select code
2. "Cascade: Refactor for readability"
3. Review changes
4. Test functionality

### Hidden Features

- **Voice Commands:** Dictate to Cascade (experimental)
- **Multi-Cursor AI:** Edit multiple locations simultaneously
- **Codebase Search:** AI-powered semantic search

## 🎉 Congratulations!

You're ready to use Windsurf like a pro!

**Key Skills:**
- ✅ Understanding Cascade AI
- ✅ Using AI features effectively
- ✅ Integrating with your workflow
- ✅ Productivity shortcuts

**Next Steps:**
- Download Windsurf
- Try Cascade on your project
- Customize for your workflow` },
    ]
  },
  'guide-vibe-coding': {
    title: 'Vibe Coding with AI',
    description: 'Code with natural language. Let AI handle the syntax while you focus on intent.',
    topic: 'Development',
    lessons: [
      { title: 'What is Vibe Coding?', content: `## The End of Syntax Memorization

**Vibe coding** is a new way to program where you describe what you want in plain English, and AI writes the actual code. You focus on **intent**, AI handles **implementation**.

### The Old Way vs Vibe Coding

| Traditional Coding | Vibe Coding |
|-------------------|-------------|
| Memorize syntax | Describe intent |
| Write every line | AI generates code |
| Debug syntax errors | Debug logic errors |
| Hours of implementation | Minutes of description |
| Know the language | Know the problem |

### Why "Vibe"?

Because you're coding by **feeling** and **intent** rather than precise syntax:
- "Make it look modern"
- "Add a button that does X"
- "Fix the bug where Y happens"
- "Make it faster"

You describe the **vibe**, AI delivers the code.

### Tools for Vibe Coding

**AI Code Editors:**
- **Cursor** - VS Code fork with Claude/GPT built-in
- **Windsurf** - Codeium's AI-native IDE
- **Replit** - Browser-based with AI assistant
- **Zed** - Fast editor with AI integration

**AI Chat for Coding:**
- **Claude** - Excellent at understanding intent
- **ChatGPT** - Versatile coding assistant
- **Gemini** - Good with context
- **GitHub Copilot Chat** - IDE-integrated

### Who is Vibe Coding For?

✅ **Perfect for:**
- Beginners who know logic but not syntax
- Experienced developers who want speed
- Prototyping ideas quickly
- Learning new languages/frameworks
- Non-developers who want to build

⚠️ **Not ideal for:**
- Performance-critical code (you need to understand the output)
- Security-sensitive applications
- Novel algorithms (AI may hallucinate)
- Production systems without review

### The Mindset Shift

**From:** "I need to know the exact syntax"
**To:** "I need to clearly describe what I want"

**From:** "Let me write this function"
**To:** "Let me explain what this function should do"

**From:** "Debug the code"
**To:** "Debug the intent"

### Example: Building a Login Form

**Traditional (30+ minutes):**
\`\`\`
1. Create form HTML
2. Add CSS styling
3. Write validation JS
4. Handle form submission
5. Add error states
6. Connect to backend
7. Handle loading states
8. Test everything
\`\`\`

**Vibe Coding (5 minutes):**
\`\`\`
"Create a login form with email and password fields.
Add validation for email format and password strength.
Show error messages inline.
On submit, call /api/login and redirect to /dashboard on success.
Use Tailwind for styling, make it look modern."
\`\`\`

AI generates all the code. You review and adjust.

**→ Proceed to Lesson 2: Effective Prompting**` },
      { title: 'Effective Prompting for Code', content: `## How to Talk to AI Coders

The quality of your code depends on the quality of your prompts. Here's how to write prompts that get great results.

### The CLEAR Framework

**C - Context**
\`\`\`
I'm building a React app with Next.js 14 and Tailwind.
I need a component that...
\`\`\`

**L - Logic**
\`\`\`
The component should:
- Fetch user data from /api/users/:id
- Display loading state while fetching
- Show error message if fetch fails
- Render user profile when successful
\`\`\`

**E - Edge Cases**
\`\`\`
Handle cases where:
- User ID doesn't exist
- Network is slow (show spinner)
- User has no avatar (show placeholder)
\`\`\`

**A - Aesthetics**
\`\`\`
Style it with Tailwind:
- Card layout with shadow
- Avatar on left, info on right
- Blue accent color for buttons
- Responsive on mobile
\`\`\`

**R - Review Requirements**
\`\`\`
Include:
- TypeScript types
- Error handling
- Comments for complex logic
- Accessibility (aria labels)
\`\`\`

### Prompt Templates

**Building a Feature:**
\`\`\`
Create a [component/function] that [does what].

Context:
- Framework: [React/Vue/etc]
- Styling: [Tailwind/CSS/etc]
- State management: [if any]

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Edge case handling]

Output: [TypeScript/JavaScript/etc] with [comments/types/etc]
\`\`\`

**Fixing a Bug:**
\`\`\`
This code is supposed to [what it should do] but instead [what it does].

Here's the code:
[paste code]

Error message (if any): [error]

Expected behavior: [description]
\`\`\`

**Refactoring:**
\`\`\`
Refactor this code to be more [readable/performant/modern]:

[paste code]

Goals:
- [Goal 1]
- [Goal 2]

Keep the same functionality.
\`\`\`

### Bad vs Good Prompts

❌ **Bad:** "Make a button"
- No context
- No styling guidance
- No functionality specified

✅ **Good:** "Create a primary CTA button component in React with TypeScript. It should:
- Accept label, onClick, and optional loading prop
- Show spinner when loading is true
- Use Tailwind with blue background, white text, rounded corners
- Have hover and focus states
- Be keyboard accessible"

### Iterative Refinement

**Round 1:**
\`\`\`
"Create a user list component"
\`\`\`
→ AI generates basic list

**Round 2:**
\`\`\`
"Add search functionality to filter users by name"
\`\`\`
→ AI adds search state and filter

**Round 3:**
\`\`\`
"Make it virtualized for performance with 1000+ users"
\`\`\`
→ AI implements react-window

**Round 4:**
\`\`\`
"Add pagination with 20 users per page"
\`\`\`
→ AI adds pagination logic

**Pro Tip:** Start simple, iterate quickly. Each round takes seconds.

### Common Prompt Patterns

**1. Specification Prompt:**
"I need [exact specification]. Use [framework]. Style with [method]."

**2. Example Prompt:**
"Create something like [existing thing] but with [differences]."

**3. Problem Prompt:**
"I'm trying to [goal] but [problem]. Help me [solve/refactor/fix]."

**4. Learning Prompt:**
"Explain [concept] with code examples. Then show me how to [apply it]."

**→ Proceed to Lesson 3: Reviewing AI Code**` },
      { title: 'Reviewing & Refining AI Code', content: `## Never Blindly Trust AI

AI-generated code is fast but not always correct. Here's how to review and refine it effectively.

### The Review Checklist

**✅ Functional Correctness**
- Does it do what I asked?
- Are all edge cases handled?
- Does it integrate with existing code?

**✅ Security**
- Are there SQL injection risks?
- Is user input sanitized?
- Are secrets hardcoded?
- Are API endpoints protected?

**✅ Performance**
- Is it O(n) or O(n²)?
- Are there unnecessary re-renders?
- Is data fetching optimized?

**✅ Best Practices**
- Follows framework conventions?
- Is code DRY (Don't Repeat Yourself)?
- Are there proper error boundaries?

**✅ Maintainability**
- Is it readable?
- Are complex parts commented?
- Are variable names clear?

### Common AI Code Issues

**1. Hallucinated Imports**
\`\`\`typescript
// AI might invent packages that don't exist
import { fancyButton } from 'react-fancy-buttons' // ❌ Doesn't exist
\`\`\`
**Fix:** Check npm for actual package names

**2. Outdated APIs**
\`\`\`javascript
// AI might use deprecated methods
componentWillMount() { ... } // ❌ Deprecated in React 18
\`\`\`
**Fix:** Cross-reference with official docs

**3. Security Vulnerabilities**
\`\`\`javascript
// AI might suggest unsafe patterns
const query = \`SELECT * FROM users WHERE id = \${userId}\` // ❌ SQL injection
\`\`\`
**Fix:** Always use parameterized queries

**4. Logic Errors**
\`\`\`javascript
// AI might miss edge cases
if (user.role === 'admin') {
  return true // ❌ What about null/undefined?
}
\`\`\`
**Fix:** Add explicit null checks

### The Refinement Loop

**Step 1: Initial Generation**
\`\`\`
"Create a function to validate email addresses"
\`\`\`

**Step 2: Review Output**
- Check regex pattern validity
- Test with edge cases
- Verify RFC 5322 compliance

**Step 3: Refine**
\`\`\`
"The regex doesn't handle plus addresses like user+tag@domain.com.
Also add validation for max length (254 chars).
Return specific error messages for each failure type."
\`\`\`

**Step 4: Test**
\`\`\`
"Write tests for this validation function covering:
- Valid emails
- Invalid formats
- Edge cases
- Boundary conditions"
\`\`\`

### When to Rewrite vs Refine

**Refine (tweak AI output):**
- 80% of code is correct
- Minor bugs or styling issues
- Missing edge cases

**Rewrite (start fresh):**
- Fundamental approach is wrong
- AI misunderstood the intent
- Too many issues to fix incrementally

### Code Review Prompts

Ask AI to review its own code:
\`\`\`
"Review this code for:
1. Security vulnerabilities
2. Performance issues
3. Best practice violations
4. Edge cases I might have missed

Suggest improvements with explanations."
\`\`\`

### Pair Programming with AI

**You bring:**
- Domain knowledge
- Business requirements
- Acceptance criteria
- Final decision-making

**AI brings:**
- Syntax knowledge
- Pattern recognition
- Fast iteration
- Documentation skills

**Together:** Faster development with human oversight

**→ Proceed to Lesson 4: Real Workflows**` },
      { title: 'Real-World Vibe Coding Workflows', content: `## Complete Development Workflows

Here's how to use vibe coding for real projects from start to finish.

### Workflow 1: Building a Feature

**Step 1: Describe the Feature**
\`\`\`
"I need a user dashboard with:
- Sidebar navigation
- Stats cards (users, revenue, growth)
- Recent activity feed
- Responsive design
Built with Next.js 14 and Tailwind."
\`\`\`

**Step 2: Break into Components**
\`\`\`
"Now break this into separate components:
- DashboardLayout
- Sidebar
- StatsCard
- ActivityFeed

Show me the folder structure."
\`\`\`

**Step 3: Build Each Component**
\`\`\`
"Start with StatsCard. It should:
- Accept title, value, change, and icon props
- Show percentage change with up/down color
- Have hover effect
- Be reusable"
\`\`\`

**Step 4: Connect Data**
\`\`\`
"Now fetch real data from /api/stats.
Add loading states.
Handle errors gracefully.
Cache the data."
\`\`\`

**Step 5: Polish**
\`\`\`
"Add:
- Animations on load
- Dark mode support
- Accessibility improvements
- Responsive breakpoints"
\`\`\`

### Workflow 2: Bug Fixing

**Step 1: Describe the Bug**
\`\`\`
"My form validation isn't working. When I submit:
- Required fields don't show errors
- Email validation lets invalid emails through
- The form submits even with errors

Here's my current code: [paste]"
\`\`\`

**Step 2: Get Diagnosis**
\`\`\`
"What's causing these issues? Explain each one."
\`\`\`

**Step 3: Get Fixed Code**
\`\`\`
"Rewrite the validation to fix all issues.
Add clear error messages.
Show me the changes you made."
\`\`\`

**Step 4: Add Tests**
\`\`\`
"Write tests to prevent regression:
- Test each validation rule
- Test form submission blocking
- Test error message display"
\`\`\`

### Workflow 3: Learning a New Framework

**Step 1: Get an Overview**
\`\`\`
"Explain [framework] in simple terms.
What problems does it solve?
When should I use it?"
\`\`\`

**Step 2: Build Hello World**
\`\`\`
"Create the simplest possible [framework] app.
Explain each file and what it does."
\`\`\`

**Step 3: Add Features Incrementally**
\`\`\`
"Now add:
1. A route with a parameter
2. A form with state
3. An API call
4. Styling

Explain each addition."
\`\`\`

**Step 4: Build Something Real**
\`\`\`
"Help me build [actual project] with [framework].
Guide me through the architecture first,
then implement piece by piece."
\`\`\`

### Workflow 4: Code Review Assistance

**Ask AI to Review Your Code:**
\`\`\`
"Review this pull request for:
- Security issues
- Performance concerns
- Code style violations
- Missing error handling
- Potential bugs

Here's the diff: [paste]"
\`\`\`

**Ask for Alternatives:**
\`\`\`
"Is there a better way to implement this?
Show me 2-3 alternatives with pros/cons."
\`\`\`

### Pro Tips

1. **Keep a prompt library** - Save prompts that work well
2. **Use AI for boilerplate** - Focus your energy on logic
3. **Generate tests first** - AI writes great test cases
4. **Document as you go** - Ask AI to add comments
5. **Review in chunks** - Don't generate too much at once

## 🎉 Congratulations!

You now understand vibe coding!

**Key Skills:**
- ✅ Describe intent, not syntax
- ✅ Write effective prompts
- ✅ Review AI code critically
- ✅ Use real-world workflows

**Next Steps:**
- Try Cursor or Windsurf
- Build something with vibe coding
- Iterate and refine your prompting skills` },
    ]
  },
}

const TOPIC_COLORS: Record<string, string> = {
  'Getting Started': 'from-green-500 to-emerald-600',
  'AI Tools': 'from-purple-500 to-pink-600',
  'Development Setup': 'from-blue-500 to-cyan-600',
  'Emerging AI': 'from-indigo-500 to-violet-600',
  'AI Engineering': 'from-orange-500 to-red-600',
  'Productivity': 'from-yellow-500 to-amber-600',
  'Development': 'from-teal-500 to-emerald-600',
}

export default function GuideContent({ guideId }: { guideId: string }) {
  const [currentLesson, setCurrentLesson] = useState(0)
  
  const guide = GUIDES_DATA[guideId]
  
  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Guide Not Found</h1>
          <Link href="/guides"><Button>Back to Guides</Button></Link>
        </div>
      </div>
    )
  }

  const lesson = guide.lessons[currentLesson]
  const progress = ((currentLesson + 1) / guide.lessons.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* SEO Structured Data */}
      <ArticleJsonLd
        headline={`${guide.title} - Lesson ${currentLesson + 1}: ${lesson.title}`}
        description={guide.description}
        url={`https://pulseaiprofessor.com/guides/${guideId}`}
        datePublished={new Date().toISOString()}
        articleBody={lesson.content}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://pulseaiprofessor.com' },
          { name: 'Quick Guides', url: 'https://pulseaiprofessor.com/guides' },
          { name: guide.title, url: `https://pulseaiprofessor.com/guides/${guideId}` },
        ]}
      />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/guides"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Guides
          </Link>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Lesson {currentLesson + 1} of {guide.lessons.length}
            </span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {guide.lessons.map((l, i) => (
              <button
                key={i}
                onClick={() => setCurrentLesson(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  i === currentLesson
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {i + 1}. {l.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
          >
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Previous
          </Button>
          
          {currentLesson < guide.lessons.length - 1 ? (
            <Button onClick={() => setCurrentLesson(currentLesson + 1)}>
              Next Lesson
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Guide Complete!</span>
              </div>
              <Link href="/guides">
                <Button>Browse More Guides</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
