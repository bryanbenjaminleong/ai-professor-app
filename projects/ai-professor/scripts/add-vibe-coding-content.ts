import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const COURSE_ID = '37993b02-0364-43c4-938b-e41250a0e8ce'

// Complete 30-lesson curriculum for premium paid course
const lessons = [
  // ==================== WEEK 1: FOUNDATIONS ====================
  {
    course_id: COURSE_ID,
    title: 'What is Vibe Coding? The Revolution in Software Development',
    content: `# What is Vibe Coding? The Revolution in Software Development

⏱️ **45 minutes to complete**

## The Problem with Traditional Coding

Remember the last time you spent hours fighting with syntax? You knew *exactly* what you wanted to build, but translating that vision into code felt like solving a puzzle where half the pieces were missing.

That's the gap between **intent** and **implementation**—and it's where most developers lose time, energy, and sometimes their sanity.

**Vibe Coding** flips this entirely.

---

## The Vibe Coding Definition

> **Vibe Coding** is a development approach where you describe your intent in natural language, and AI handles the implementation details. You focus on *what* you want; AI figures out *how* to build it.

### The Core Loop

\`\`\`
1. DESCRIBE → Tell AI what you want in plain English
2. REVIEW → Examine the generated code
3. REFINE → Ask for changes, improvements, fixes
4. SHIP → Deploy working code faster
\`\`\`

---

## Why This Matters Now

In 2023, GitHub reported that developers using Copilot wrote code **55% faster**. But speed is just the beginning.

The real transformation:
- **Beginners** can build production apps on day one
- **Senior developers** eliminate tedious work and focus on architecture
- **Teams** prototype in hours instead of weeks
- **Entrepreneurs** ship MVPs without hiring dev teams

---

## Who Is Vibe Coding For?

### 🎯 Complete Beginners
You've never written a line of code, but you have ideas. Vibe coding lets you build those ideas *now*.

### 🎯 Intermediate Developers
You can build things, but it's slow. Vibe coding eliminates friction.

### 🎯 Senior Engineers
You're paid for your judgment, not your typing speed. Vibe coding lets you operate at your expertise level.

### 🎯 Founders & Product People
You have product vision but depend on developers. Vibe coding gives you agency.

---

## The Tools of Vibe Coding

- **Cursor** — AI-native code editor
- **Windsurf** — AI IDE from Codeium  
- **GitHub Copilot** — AI autocomplete pioneer
- **Claude/ChatGPT** — Conversational AI assistants

The stack doesn't matter—vibe coding works with any language, any framework.

---

## What Vibe Coding Is NOT

❌ It's not "AI will do everything" — You still need to review, test, and decide
❌ It's not cheating — It's leverage, the next evolution of tools
❌ It's not only for simple apps — Production systems at Fortune 500s use it
❌ It's not replacing developers — It's amplifying them

---

## Real-World Example: Building a Contact Form

**Traditional Approach (2-4 hours):** Research, setup, style, connect, debug
**Vibe Coding Approach (15-30 minutes):** 3 prompts, working form

**Prompt 1:** "Create a contact form with name, email, subject, message. Include validation."
**Prompt 2:** "Add submit handler that posts to /api/contact"
**Prompt 3:** "Fix email validation to accept + addresses"

**Result:** Working form in 15 minutes.

---

## Your First Exercise

Try this prompt in any AI tool:

> "Write a Python function that greets the user by name. If no name is provided, greet the world. Include example usage."

**Observe:** Did AI understand? Is code clean? What would you change?

---

## Key Takeaways

✅ Vibe coding = Describe intent → Review output → Refine → Ship
✅ Anyone can do it — beginners to seniors all benefit
✅ Tools are ready — Cursor, Copilot, Claude are mature
✅ The shift is mental — Focus on describing, not writing

---

**Coming Up:** Lesson 2 dives into the mindset shift required for vibe coding mastery.`,
    week_number: 1,
    order_index: 1,
    estimated_minutes: 45,
    resources: {
      links: [
        { title: 'Cursor IDE', url: 'https://cursor.sh' },
        { title: 'GitHub Copilot', url: 'https://github.com/features/copilot' }
      ],
      tools: ['Cursor', 'Copilot', 'ChatGPT', 'Claude'],
      concepts: ['Vibe Coding Definition', 'Intent vs Implementation']
    }
  },

  {
    course_id: COURSE_ID,
    title: 'The Vibe Coding Mindset Shift',
    content: `# The Vibe Coding Mindset Shift

⏱️ **40 minutes to complete**

## The Hardest Part Isn't Technical—It's Mental

Most people fail at vibe coding not because tools are hard, but because their brain is wired wrong for it.

Years of programming trained you to:
- Break problems into syntax-sized pieces
- Think in code structures
- Solve problems sequentially
- Focus on *how* before *what*

Vibe coding requires **unlearning** these patterns.

---

## The Old Brain vs. The Vibe Brain

### Traditional Developer Brain
\`\`\`
Problem → "I need a for loop" → "What's the syntax?" → [10 min deliberation]
\`\`\`

### Vibe Coder Brain
\`\`\`
Problem → "Filter this array for active items" → [AI generates code] → Done
\`\`\`

---

## The Three Mindset Shifts

### Shift #1: Think in Outcomes, Not Implementations

❌ "I need to write a function that loops..."
✅ "I need to process this data so that..."

### Shift #2: Trust, Then Verify

The AI will sometimes be wrong. That's expected. Your job: **catch mistakes quickly**.

**The Verify Protocol:**
1. Does it run?
2. Does it do what I asked?
3. Is it secure?
4. Is it maintainable?

### Shift #3: Iterate in Conversation, Not Code

**Old way:** Write → Error → Edit → Error → Edit → Works
**Vibe way:** Describe → Review → Refine prompt → Ship

---

## Anti-Patterns to Avoid

**Micromanaging:** ❌ "Use a for loop with index i..." → ✅ "Filter the array"
**Blind Acceptance:** ❌ Copy-paste without reading → ✅ Read and understand
**Giving Up:** ❌ First prompt fails → write yourself → ✅ Rephrase and retry

---

## What AI Is Good At vs. Struggles With

**Excels At:** Boilerplate, syntax, refactoring, tests, documentation
**Struggles With:** Domain logic, recent APIs, system interactions, security

---

## Exercise: Retrain Your Brain

Take a recent coding task:
1. Identify the task
2. Recall your old approach (steps, lookups, time)
3. Rewrite as 3-5 vibe prompts
4. Compare mental steps

---

## Key Takeaways

✅ Think outcomes, not implementations
✅ Trust, then verify quickly
✅ Iterate in conversation
✅ Avoid micromanaging AI
✅ Never ship what you don't understand`,
    week_number: 1,
    order_index: 2,
    estimated_minutes: 40,
    resources: { concepts: ['Intent over Syntax', 'Trust Calibration'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Setting Up Your AI Coding Environment',
    content: `# Setting Up Your AI Coding Environment

⏱️ **45 minutes to complete**

## The Essential Stack

### Tier 1: AI Code Editor (Pick One)

**Cursor** ⭐ *Recommended*
- VS Code fork with AI built-in
- Native codebase chat
- Multi-file AI editing
- Free tier, Pro $20/month

**VS Code + GitHub Copilot**
- Industry standard
- $10/month

**Windsurf**
- AI-native from Codeium
- Strong context understanding

### Tier 2: Conversational AI

**Claude** ⭐ - Excellent at code explanation
**ChatGPT (GPT-4)** - Versatile and widely used

---

## Cursor Setup

1. Download from cursor.sh
2. Import VS Code settings (if applicable)
3. Sign in for AI features
4. Enable Claude 3.5 Sonnet + GPT-4o models

**Essential Shortcuts:**
- Cmd+L: Open AI Chat
- Cmd+K: Generate Code
- Tab: Accept Suggestion
- Cmd+I: Inline Edit

---

## Your First Project

\`\`\`bash
mkdir vibe-coding-practice
cd vibe-coding-practice
\`\`\`

**Prompt:** "Initialize this as a modern web project with Vite, React, TypeScript, and Tailwind CSS."

Verify: \`npm run dev\` → http://localhost:5173

---

## Context Files Help AI

Create \`.cursorrules\`:

\`\`\`
# Project Context
- Use TypeScript for all files
- Prefer functional components
- Use Tailwind for styling
- Include error handling by default
\`\`\`

---

## Exercise: Test Your Setup

**Prompt:** "Create a QuoteGenerator React component with:
- Array of 5 inspirational quotes
- 'New Quote' button
- Quote text + author display
- Tailwind styling
- Animation on change"

**Verify:** Does it run? Display quotes? Button works?

---

## Checklist

- [ ] AI editor installed (Cursor recommended)
- [ ] Conversational AI access (Claude/ChatGPT)
- [ ] Shortcuts memorized
- [ ] Practice project created
- [ ] Quote Generator completed`,
    week_number: 1,
    order_index: 3,
    estimated_minutes: 45,
    resources: {
      links: [
        { title: 'Cursor', url: 'https://cursor.sh' },
        { title: 'VS Code', url: 'https://code.visualstudio.com' }
      ]
    }
  },

  {
    course_id: COURSE_ID,
    title: 'Your First AI-Assisted Code: Hello World Reimagined',
    content: `# Your First AI-Assisted Code: Hello World Reimagined

⏱️ **35 minutes to complete**

## The Vibe Coding Approach

Instead of typing \`console.log("Hello World")\`, you'll **describe** what you want.

### Step 1: Describe Intent

> "Create a greeting function that:
> - Takes name parameter (default 'World')
> - Returns personalized greeting
> - Handles edge cases (empty, null)
> - TypeScript types
> - Example usages"

### What AI Generates

\`\`\`typescript
function greet(name: string | null | undefined = "World"): string {
  if (!name || name.trim() === "") {
    name = "World";
  }
  return \`Hello, \${name}!\`;
}

console.log(greet());           // "Hello, World!"
console.log(greet("Alice"));    // "Hello, Alice!"
console.log(greet(""));         // "Hello, World!"
\`\`\`

### Step 2: Review

Read every line. Understand the edge case handling.

### Step 3: Refine

> "Add support for multiple languages ('en', 'es', 'fr')."

AI adds language parameter and translations.

---

## Building a CLI Tool

**Goal:** CLI that logs timestamped messages with emojis.

**Prompt 1:** "Create Node.js CLI tool that takes message, adds timestamp + random emoji, appends to vibelog.txt"

**Prompt 2:** "Add --no-emoji flag and error handling"

**Prompt 3:** "Add --clear flag to empty log"

**Try it:**
\`\`\`bash
node vibe-log.js "Started project"
node vibe-log.js "Fixed auth bug"
cat vibelog.txt
\`\`\`

---

## The Vibe Coding Loop

\`\`\`
PROMPT → AI GENERATES → REVIEW → TEST → FIX? → SHIP
                ↑__________________|
\`\`\`

---

## Exercise: Build a Timer

Requirements:
- Start/Stop/Reset buttons
- MM:SS display
- Visual state indication
- Edge case handling

Write 3-5 prompts maximum.

---

## Quality Check

For every AI output:
- [ ] Does it do what I asked?
- [ ] Is code clean?
- [ ] Security issues?
- [ ] Maintainable?

---

## Key Takeaways

✅ Describe intent, not implementation
✅ Always review generated code
✅ Iterate quickly (3-5 prompts)
✅ Test immediately`,
    week_number: 1,
    order_index: 4,
    estimated_minutes: 35,
    resources: { concepts: ['Prompt Sequencing', 'Code Review'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Understanding AI Capabilities & Limitations',
    content: `# Understanding AI Capabilities & Limitations

⏱️ **40 minutes to complete**

## The AI Reality Check

AI is both incredibly powerful and surprisingly limited. Knowing boundaries = productivity.

---

## What AI Does Exceptionally Well

✅ **Boilerplate code** — Setups, configurations, patterns
✅ **Language translation** — Python → TypeScript, React → Vue
✅ **Explaining code** — Legacy code, algorithms
✅ **Finding bugs** — Spot issues you've stared at for hours
✅ **Writing tests** — Comprehensive test suites
✅ **Documentation** — JSDoc, README, comments

---

## What AI Struggles With

⚠️ **Domain-specific logic** — Your company's unique rules
⚠️ **Recent library changes** — Training data cutoff
⚠️ **Complex system interactions** — Butterfly effects
⚠️ **Security in sensitive contexts** — Can introduce vulnerabilities
⚠️ **Performance at scale** — Might miss system implications

---

## The Capability Matrix

| Task | AI Rating | Your Role |
|------|-----------|-----------|
| Boilerplate | ⭐⭐⭐⭐⭐ | Verify & use |
| Bug finding | ⭐⭐⭐⭐ | Confirm diagnosis |
| Architecture | ⭐⭐⭐ | Make final decisions |
| Business logic | ⭐⭐ | Provide all context |
| Security | ⭐⭐ | Always audit |

---

## The Context Problem

AI only knows what you tell it.

**Vague:** "Create a user registration endpoint"
→ Gets a beautiful endpoint... with no database connection

**Specific:** "Create registration endpoint for Express + PostgreSQL + Prisma + bcrypt. Return JWT on success."
→ Gets complete, integrated solution

### Context Checklist

- [ ] Technology stack
- [ ] Constraints
- [ ] Existing patterns
- [ ] Edge cases
- [ ] Integration points

---

## The Confidence Trap

AI always sounds confident, even when wrong.

**Rule:** Confidence ≠ Correctness. Always verify.

---

## Exercise: Stress Test AI

**Test 1:** Simple vs Complex prompt
**Test 2:** Vague vs Specific prompt
**Test 3:** With vs Without edge cases
**Test 4:** Recent knowledge ("React 19 features")

---

## Key Takeaways

✅ AI excels at: boilerplate, translation, explanation, tests
✅ AI struggles: domain logic, recent changes, security
✅ Context is king — provide everything relevant
✅ Verify everything — confidence ≠ correctness
✅ You provide judgment; AI provides implementation`,
    week_number: 1,
    order_index: 5,
    estimated_minutes: 40,
    resources: { concepts: ['AI Capabilities', 'Context Provision'] }
  },

  // ==================== WEEK 2: THE ART OF DESCRIPTION ====================
  {
    course_id: COURSE_ID,
    title: 'Writing Crystal Clear Prompts',
    content: `# Writing Crystal Clear Prompts

⏱️ **45 minutes to complete**

## The Prompt is Your Programming Language

In vibe coding, you speak Prompt. Quality in = Quality out.

---

## The Anatomy of a Perfect Prompt

### 1. Intent (Required)
❌ "Make a function"
✅ "Create a function that validates email addresses"

### 2. Context (Usually Required)
❌ "Make it work with our system"
✅ "For Node.js API with TypeScript, integrate with src/utils/validate.ts"

### 3. Constraints (Powerful)
❌ "It should be fast"
✅ "Handle 10,000 validations/sec, zero external dependencies"

### 4. Examples (For Complex Logic)
\`\`\`
Input/Output:
- "user@example.com" → true
- "invalid" → false
- "user+tag@domain.co.uk" → true
\`\`\`

### 5. Style Preferences
"TypeScript with strict typing, JSDoc comments, functional style"

---

## The SPECIFIC Framework

**S** - Single purpose
**P** - Precise language
**E** - Examples included
**C** - Context provided
**I** - Iteration expected
**F** - Format specified
**I** - Inclusive of edge cases
**C** - Concise

---

## Prompt Patterns

### Pattern 1: Role Prompt
> "You are a security-focused developer. Create a password reset endpoint resistant to timing attacks."

### Pattern 2: Step-by-Step
> "Create user registration. Steps: 1) Data model 2) API endpoint 3) Validation 4) Password hashing 5) Email verification"

### Pattern 3: Constraint List
> "Search function requirements: partial matches, filtering, pagination, <100ms, no external services"

### Pattern 4: Example-Driven
> "Format phone numbers. Examples: '1234567890' → '(123) 456-7890'..."

### Pattern 5: Refinement
> "The function works but add: international numbers, extensions, return country code separately"

---

## Common Mistakes

❌ **Overloaded:** "Create complete user management with auth, profiles, avatars..." (Too much)
❌ **Underspecified:** "Make it look good" (Subjective)
❌ **Context-free:** "Create an API endpoint" (Which stack?)
❌ **Yes/No question:** "Can you create...?" (Might just say "yes")

---

## Prompt Length: Goldilocks Zone

- **Too short (<10 words):** Vague, poor output
- **Just right (30-100 words):** Complete but concise
- **Too long (>200 words):** Buried intent

Use bullet points for complex requests.

---

## Exercise: Prompt Makeover

Rewrite these:

1. "Add validation" → _______________
2. "Make it faster" → _______________
3. "Fix the bug" → _______________

---

## Key Takeaways

✅ Perfect prompts: Intent + Context + Constraints + Examples + Style
✅ Use SPECIFIC framework
✅ 30-100 words is the sweet spot
✅ Break complex tasks into prompt chains`,
    week_number: 2,
    order_index: 6,
    estimated_minutes: 45,
    resources: { concepts: ['Prompt Engineering', 'SPECIFIC Framework'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Breaking Down Complex Problems',
    content: `# Breaking Down Complex Problems

⏱️ **40 minutes to complete**

## The Atomic Prompt Strategy

Complex features fail when you try to build them in one prompt. The solution: **atomic prompts** — small, focused requests that build toward a larger goal.

---

## Why Atomic Prompts Work

**One big prompt:**
> "Build a complete e-commerce checkout system with cart, payment, inventory check, email confirmation, and order tracking"

Result: Shallow, buggy, incomplete.

**Multiple atomic prompts:**
1. "Create cart data structure with add/remove/clear methods"
2. "Build cart UI component with item list and total"
3. "Add inventory check API integration"
4. "Create checkout form with validation"
5. "Integrate Stripe payment"
6. "Add order confirmation email"
7. "Build order tracking page"

Result: Complete, tested, maintainable.

---

## The Decomposition Process

### Step 1: Identify the Feature
"User authentication system"

### Step 2: List Components
- Sign up form
- Login form
- Password reset
- Session management
- Protected routes
- Logout

### Step 3: Order by Dependency
1. Data model → 2. Sign up → 3. Login → 4. Session → 5. Protected routes → 6. Password reset → 7. Logout

### Step 4: Create Atomic Prompts
One prompt per component.

---

## Prompt Chaining

Connect prompts by referencing previous outputs:

**Prompt 1:** "Create User interface with id, email, passwordHash, createdAt"
**Prompt 2:** "Using the User interface, create signup endpoint..."
**Prompt 3:** "Create login endpoint that returns JWT..."
**Prompt 4:** "Create middleware that validates JWT from step 3..."

Each builds on the previous.

---

## The BUILD Framework

**B** - Break into components
**U** - Understand dependencies
**I** - Identify atomic prompts
**L** - Link prompts sequentially
**D** - Deploy incrementally

---

## Real Example: Building a Dashboard

### Decomposition

1. **Layout** - Sidebar + main content area
2. **Sidebar** - Navigation menu
3. **Header** - User info + notifications
4. **Stats Cards** - Key metrics
5. **Chart** - Data visualization
6. **Recent Activity** - Activity feed
7. **API Integration** - Fetch real data

### Atomic Prompts

\`\`\`
P1: "Create dashboard layout with sidebar (250px) and main content area"
P2: "Add navigation items to sidebar: Dashboard, Users, Settings, Logout"
P3: "Create header component with user avatar and notification bell"
P4: "Create stat card component that shows label, value, and trend"
P5: "Create simple bar chart component using the data provided"
P6: "Create activity feed component showing timestamped events"
P7: "Connect all components to /api/dashboard endpoint"
\`\`\`

---

## Dependency Mapping

Before prompting, map dependencies:

\`\`\`
Data Model
    ↓
API Endpoints
    ↓
Components
    ↓
Integration
    ↓
Polish
\`\`\`

Build bottom-up.

---

## Exercise: Decompose a Feature

**Task:** Build a commenting system

1. List all components
2. Identify dependencies
3. Order them
4. Write atomic prompts

<details>
<summary>Solution</summary>

Components: Comment data model, Comment form, Comment list, Reply thread, Like button, Edit/Delete, API endpoints

Order:
1. Comment interface
2. POST /api/comments endpoint
3. GET /api/comments endpoint
4. Comment form component
5. Single comment component
6. Comment list component
7. Reply functionality
8. Like button
9. Edit/Delete actions

</details>

---

## Anti-Patterns

❌ **The Kitchen Sink:** "Build everything at once"
❌ **The Leap:** Skip foundational pieces
❌ **The Tangle:** No clear dependency order
❌ **The Monolith:** One giant component

---

## Key Takeaways

✅ Atomic prompts = small, focused requests
✅ Decompose before prompting
✅ Order by dependency
✅ Chain prompts with references
✅ Build incrementally, test frequently`,
    week_number: 2,
    order_index: 7,
    estimated_minutes: 40,
    resources: { concepts: ['Atomic Prompts', 'Decomposition', 'Prompt Chaining'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Context is King: Providing the Right Information',
    content: `# Context is King: Providing the Right Information

⏱️ **40 minutes to complete**

## The Context Gap

AI without context is like a contractor without blueprints. They might build something, but probably not what you want.

---

## The Context Pyramid

\`\`\`
         PROJECT CONTEXT
              ↓
        ARCHITECTURE
              ↓
          STACK
              ↓
       CONSTRAINTS
              ↓
     CURRENT TASK
\`\`\`

Each layer adds precision to AI output.

---

## Types of Context

### 1. Stack Context
- Language (TypeScript, Python)
- Framework (React, Express, Next.js)
- Database (PostgreSQL, MongoDB)
- Tools (Prisma, Tailwind, Jest)

### 2. Architecture Context
- Patterns (MVC, microservices, serverless)
- Folder structure
- Naming conventions
- State management approach

### 3. Business Context
- What the app does
- Who uses it
- Key workflows
- Domain terminology

### 4. Constraint Context
- Performance requirements
- Security requirements
- Browser/device support
- API limitations

### 5. Code Context
- Existing files
- Related functions
- Current patterns
- Dependencies

---

## Context Delivery Methods

### Method 1: Project Rules File

Create \`.cursorrules\` or \`.github/copilot-instructions.md\`:

\`\`\`
# Project: E-commerce Platform
Stack: Next.js 14, TypeScript, Tailwind, Prisma, PostgreSQL

Patterns:
- Server Components by default
- Server Actions for mutations
- Functional components only
- Zod for validation

Conventions:
- kebab-case for files
- PascalCase for components
- Descriptive variable names
- Error boundaries around features

Constraints:
- No external auth services
- All API routes need rate limiting
- Images optimized by default
\`\`\`

### Method 2: Inline Context

Include context in each prompt:

> "In this Next.js 14 app using App Router and Prisma, create a product listing page..."

### Method 3: File References (Cursor)

Use @ to reference files:

> "Following the pattern in @auth.ts, create an admin authorization middleware"

### Method 4: Conversation Context

Previous prompts provide context:

> "Using the User model we created, now build the login endpoint"

---

## Context Templates

### API Endpoint Context
\`\`\`
Stack: [Framework] + [Language] + [Database]
Pattern: [REST/GraphQL/RPC]
Auth: [Method]
Validation: [Library]
Error handling: [Approach]
\`\`\`

### React Component Context
\`\`\`
Framework: [React/Next.js/Remix]
Styling: [Tailwind/CSS Modules/Styled]
State: [Local/Context/Redux]
Data fetching: [SWR/React Query/Server Components]
\`\`\`

---

## The Context Audit

Before prompting, ask:

- [ ] Did I mention the framework?
- [ ] Did I specify the language/version?
- [ ] Did I include relevant constraints?
- [ ] Did I reference existing patterns?
- [ ] Did I clarify the expected output?

---

## Exercise: Context-Enhanced Prompts

Take these vague prompts and add context:

1. "Create a form" → _______________
2. "Add authentication" → _______________
3. "Optimize this query" → _______________

---

## Key Takeaways

✅ Context = precision in AI output
✅ Use multiple context types (stack, architecture, business, constraints)
✅ Create project rules files for reusable context
✅ Reference existing code for pattern consistency
✅ Audit prompts for missing context`,
    week_number: 2,
    order_index: 8,
    estimated_minutes: 40,
    resources: { concepts: ['Context Types', 'Context Delivery'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Prompt Patterns That Work: Templates & Recipes',
    content: `# Prompt Patterns That Work: Templates & Recipes

⏱️ **35 minutes to complete**

## Why Patterns Matter

Experienced vibe coders don't reinvent prompts. They use patterns—proven templates that consistently produce good results.

---

## Pattern 1: The CRUD Generator

\`\`\`
Create a [RESOURCE] [OPERATION] endpoint for [FRAMEWORK].

Resource: [FIELDS]
Validations: [LIST]
Auth: [REQUIRED/OPTIONAL]
Response: [FORMAT]
Error cases: [LIST]
\`\`\`

**Example:**
> "Create a Product update endpoint for Express.js.
> Resource: name, price, description, category
> Validations: name required, price > 0
> Auth: Required (JWT)
> Response: Updated product object
> Error cases: Not found (404), Unauthorized (401), Validation error (400)"

---

## Pattern 2: The Component Builder

\`\`\`
Create a [TYPE] component for [PURPOSE].

Props: [LIST]
State: [NEEDED/NOT NEEDED]
Behavior: [DESCRIPTION]
Styling: [TAILWIND/CSS/ETC]
Accessibility: [ARIA/KEYBOARD]
\`\`\`

**Example:**
> "Create a dropdown component for user selection.
> Props: options array, onChange callback, selected value, placeholder
> State: Open/closed
> Behavior: Click to toggle, keyboard navigation, search filter
> Styling: Tailwind, matches existing design system
> Accessibility: aria-expanded, arrow keys, escape to close"

---

## Pattern 3: The Bug Hunter

\`\`\`
This code should [EXPECTED BEHAVIOR] but [ACTUAL BEHAVIOR].

Bug examples:
- [INPUT] → [WRONG OUTPUT]
- [INPUT] → [WRONG OUTPUT]

Find the bug, fix it, and explain what was wrong.
\`\`\`

---

## Pattern 4: The Refactor Request

\`\`\`
Refactor this [CODE TYPE] to improve [QUALITY].

Current issues: [LIST]
Keep: [WHAT NOT TO CHANGE]
Target: [SPECIFIC GOAL]
Constraints: [LIMITATIONS]
\`\`\`

---

## Pattern 5: The Test Suite

\`\`\`
Write comprehensive tests for [FUNCTION/COMPONENT].

Test types: [UNIT/INTEGRATION/E2E]
Framework: [JEST/VITEST/CYPRESS/ETC]
Coverage: [PERCENTAGE GOAL]
Include:
- Happy path
- Edge cases: [LIST]
- Error cases: [LIST]
- Mocks needed: [LIST]
\`\`\`

---

## Pattern 6: The API Integration

\`\`\`
Integrate with [API NAME] to [PURPOSE].

API docs: [URL OR SUMMARY]
Auth method: [API KEY/OAUTH/ETC]
Endpoints needed: [LIST]
Data mapping: [FROM → TO]
Error handling: [APPROACH]
Rate limits: [IF APPLICABLE]
\`\`\`

---

## Pattern 7: The Performance Fix

\`\`\`
Optimize [FUNCTION/COMPONENT] for [METRIC].

Current performance: [MEASUREMENT]
Target: [GOAL]
Bottleneck: [IF KNOWN]
Constraints: [WHAT CAN'T CHANGE]
Consider: [CACHING/MEMOIZATION/ALGORITHM CHANGE]
\`\`\`

---

## Your Prompt Library

Start collecting patterns for tasks you do often:

- [ ] API endpoint pattern
- [ ] React component pattern
- [ ] Test writing pattern
- [ ] Bug fixing pattern
- [ ] Refactoring pattern
- [ ] Integration pattern
- [ ] Documentation pattern

---

## Exercise: Create Your Patterns

Write patterns for:
1. A task you do weekly
2. A task you struggle with
3. A task unique to your domain

---

## Key Takeaways

✅ Patterns = proven prompt templates
✅ Customize patterns for your common tasks
✅ Build a personal prompt library
✅ Patterns save time and improve consistency`,
    week_number: 2,
    order_index: 9,
    estimated_minutes: 35,
    resources: { concepts: ['Prompt Patterns', 'Prompt Library'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Iterative Refinement: The Feedback Loop',
    content: `# Iterative Refinement: The Feedback Loop

⏱️ **35 minutes to complete**

## The First Draft Myth

AI output is rarely perfect on the first try. Expecting perfection leads to frustration. Expecting iteration leads to mastery.

---

## The Refinement Cycle

\`\`\`
PROMPT → OUTPUT → EVALUATE → REFINE PROMPT → BETTER OUTPUT → EVALUATE → ...
                                    ↓
                              GOOD ENOUGH → SHIP
\`\`\`

---

## Types of Refinement

### 1. Functional Refinement
"Add error handling"
"Fix the bug where..."

### 2. Quality Refinement
"Make the code more readable"
"Add type safety"
"Follow DRY principle"

### 3. Style Refinement
"Use Tailwind instead of CSS"
"Match the existing component style"
"Use arrow functions"

### 4. Performance Refinement
"Optimize for speed"
"Reduce memory usage"
"Add caching"

### 5. Edge Case Refinement
"Handle empty arrays"
"Support null values"
"Add input validation"

---

## Refinement Language

Be specific in refinements:

❌ "Fix it"
✅ "The submit button should disable during loading"

❌ "Make it better"
✅ "Extract the validation logic into a separate function"

❌ "It's broken"
✅ "When I click submit with empty fields, no error appears"

---

## The REFINE Method

**R** - Review the output carefully
**E** - Identify what's missing or wrong
**F** - Formulate specific feedback
**I** - Issue refined prompt
**N** - Note improvements
**E** - Evaluate if good enough

---

## When to Stop Iterating

Stop when:
- ✅ Code works as intended
- ✅ No obvious bugs
- ✅ Meets quality standards
- ✅ Passes your tests

Don't stop when:
- ❌ "Good enough" but hasn't been tested
- ❌ You're tired of prompting (one more iteration might fix it)
- ❌ You don't understand the code

---

## Exercise: Iteration Practice

**Starting prompt:**
> "Create a function that calculates the average of an array"

**Expected issues:** No error handling, no type checking, no empty array handling

**Your refinements:**
1. _______________
2. _______________
3. _______________

---

## Key Takeaways

✅ First drafts need refinement—expect it
✅ Be specific in refinement requests
✅ Use REFINE method: Review, Evaluate, Formulate, Issue, Note, Evaluate
✅ Stop when code works, tested, and understood`,
    week_number: 2,
    order_index: 10,
    estimated_minutes: 35,
    resources: { concepts: ['Iterative Refinement', 'Feedback Loop'] }
  },

  // ==================== WEEK 3: REVIEW & REFINE ====================
  {
    course_id: COURSE_ID,
    title: 'Reading AI-Generated Code: Understanding What You Ship',
    content: `# Reading AI-Generated Code: Understanding What You Ship

⏱️ **45 minutes to complete**

## The Golden Rule

> **Never ship code you can't explain.**

If AI wrote it and you don't understand it, you don't own it. You're shipping a black box.

---

## The CODE Review Framework

**C** - Comprehension: Do I understand every line?
**O** - Ownership: Could I recreate this from scratch?
**D** - Debugging: If this breaks, could I fix it?
**E** - Explanation: Could I teach this to someone else?

If any answer is "no," you need to spend more time with the code.

---

## Reading Strategies

### Strategy 1: Line-by-Line Narration

Read the code out loud (or in your head) as a story:

\`\`\`typescript
// "First, we define a function called validateEmail..."
function validateEmail(email: string): boolean {
  // "It takes an email string and returns a boolean..."
  
  // "If email is missing, return false immediately"
  if (!email) return false;
  
  // "Create a regex pattern for email validation..."
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
  // "Test the email against the pattern and return result"
  return pattern.test(email);
}
\`\`\`

If you can't narrate a line, that's a gap.

### Strategy 2: The "Why" Drill

For each significant line, ask "why?":

- Why use regex instead of a library?
- Why check !email instead of email === undefined?
- Why this particular regex pattern?

If you can't answer, ask the AI.

### Strategy 3: Edge Case Tracing

 mentally run through edge cases:

\`\`\`
Input: "" → !email is true → returns false ✓
Input: "invalid" → pattern.test fails → returns false ✓
Input: "a@b.c" → pattern.test passes → returns true ✓
Input: "  a@b.c  " → pattern.test... wait, would this pass?
\`\`\`

Find the gaps.

---

## Common AI Code Patterns to Recognize

### 1. The Over-Engineered Solution
AI sometimes adds unnecessary complexity.

\`\`\`typescript
// AI might write:
const capitalize = (str: string): string => {
  return str.split('').map((char, i) => 
    i === 0 ? char.toUpperCase() : char.toLowerCase()
  ).join('');
}

// When simpler would do:
const capitalize = (str: string) => 
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
\`\`\`

### 2. The Missing Edge Case
AI often forgets unusual inputs.

### 3. The Inconsistent Style
AI might mix patterns within one file.

### 4. The Unnecessary Dependency
AI might import libraries you don't need.

---

## When You Don't Understand

### Ask AI to Explain

> "Explain this code line by line in simple terms"

### Ask for Simplification

> "This seems complex. Can you simplify it?"

### Ask for Alternatives

> "What are other ways to accomplish this?"

---

## Exercise: Code Comprehension

Given this AI-generated code:

\`\`\`typescript
const processItems = async <T,>(
  items: T[],
  processor: (item: T) => Promise<T>
): Promise<T[]> => {
  const results: T[] = [];
  for (const item of items) {
    try {
      const processed = await processor(item);
      results.push(processed);
    } catch (e) {
      console.error(\`Failed to process: \${item}\`, e);
    }
  }
  return results;
};
\`\`\`

Questions:
1. What does this function do?
2. What happens if processor throws?
3. What is the generic T?
4. What's a potential issue with this implementation?

<details>
<summary>Answers</summary>

1. Processes array of items asynchronously, collecting successful results
2. Error is caught and logged, item skipped
3. Generic type placeholder for any type
4. Silent failures—callers don't know which items failed

</details>

---

## Key Takeaways

✅ Never ship what you can't explain
✅ Use CODE framework: Comprehension, Ownership, Debugging, Explanation
✅ Narrate code line-by-line to find gaps
✅ Ask "why" for each significant line
✅ When stuck, ask AI to explain`,
    week_number: 3,
    order_index: 11,
    estimated_minutes: 45,
    resources: { concepts: ['Code Review', 'Comprehension'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Common AI Mistakes & How to Spot Them',
    content: `# Common AI Mistakes & How to Spot Them

⏱️ **40 minutes to complete**

## AI Isn't Perfect—Here's What Goes Wrong

Understanding AI's common failure modes helps you catch issues quickly.

---

## Mistake #1: Hallucinated APIs

AI invents methods that don't exist.

\`\`\`typescript
// AI might generate:
const user = await User.findByEmailAndValidate(email);

// But your ORM only has:
const user = await User.findOne({ where: { email } });
\`\`\`

**How to spot:** Test immediately. Check docs.
**How to fix:** "Use the actual [YourORM] methods"

---

## Mistake #2: Outdated Patterns

AI trained on older code might suggest deprecated approaches.

\`\`\`typescript
// Old React pattern AI might suggest:
class Component extends React.Component {
  // ...
}

// Modern approach:
function Component() {
  // hooks
}
\`\`\`

**How to spot:** Know current best practices. Check version docs.
**How to fix:** "Use modern React patterns with hooks"

---

## Mistake #3: Security Vulnerabilities

AI might introduce security issues.

\`\`\`typescript
// Dangerous! SQL injection vulnerable
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Safe
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
\`\`\`

**How to spot:** Always audit for:
- SQL injection
- XSS vulnerabilities
- Exposed secrets
- Missing auth checks
- Unvalidated inputs

---

## Mistake #4: Silent Failures

AI might handle errors poorly.

\`\`\`typescript
// Silent failure—error swallowed
try {
  await processData(data);
} catch (e) {
  // Nothing happens
}
\`\`\`

**How to spot:** Look for empty catch blocks.
**How to fix:** "Handle errors properly with logging and user feedback"

---

## Mistake #5: Performance Anti-Patterns

AI might write inefficient code.

\`\`\`typescript
// N+1 query problem
for (const user of users) {
  const posts = await getPosts(user.id); // Query in loop!
}

// Better: fetch all at once
const posts = await getAllPosts(users.map(u => u.id));
\`\`\`

**How to spot:** Look for async operations in loops.
**How to fix:** "Optimize to avoid N+1 queries"

---

## Mistake #6: Inconsistent Error Handling

Mixed patterns for errors.

\`\`\`typescript
// Sometimes throws
if (!user) throw new Error('Not found');

// Sometimes returns null
if (!post) return null;

// Sometimes returns error object
if (!comment) return { error: 'Not found' };
\`\`\`

**How to spot:** Scan for multiple error strategies.
**How to fix:** "Use consistent error handling throughout"

---

## Mistake #7: Over-Engineering

AI might add complexity you don't need.

\`\`\`typescript
// Over-engineered
interface IUserServiceFactory {
  create(params: IUserParams): IUserService;
}

// Simple
function createUserService(params) {
  return new UserService(params);
}
\`\`\`

**How to spot:** Ask "Is all this abstraction necessary?"
**How to fix:** "Simplify. Remove unnecessary abstraction."

---

## The AI Code Audit Checklist

Before shipping AI code, check:

- [ ] Do all methods/functions actually exist?
- [ ] Is this using current best practices?
- [ ] Are there security vulnerabilities?
- [ ] Is error handling complete and consistent?
- [ ] Are there performance anti-patterns?
- [ ] Is the complexity level appropriate?
- [ ] Does it handle edge cases?
- [ ] Are types correct (TypeScript)?

---

## Exercise: Spot the Mistakes

Find 3 issues in this code:

\`\`\`typescript
async function getUserData(id: string) {
  const query = \`SELECT * FROM users WHERE id = \${id}\`;
  
  try {
    const result = await db.query(query);
    return result[0];
  } catch (e) {
    // handle error
  }
  
  // Get user's posts
  const posts = [];
  for (const postId of result[0].postIds) {
    const post = await db.query(\`SELECT * FROM posts WHERE id = \${postId}\`);
    posts.push(post);
  }
  
  return { user: result[0], posts };
}
\`\`\`

<details>
<summary>Issues</summary>

1. SQL injection vulnerability (string interpolation)
2. Empty catch block (silent failure)
3. Query in loop (N+1 problem)
4. \`result\` used outside try block scope
5. No validation of \`id\` input
6. Inconsistent error handling

</details>

---

## Key Takeaways

✅ AI makes predictable mistakes—learn to spot them
✅ Common issues: hallucinated APIs, outdated patterns, security holes
✅ Always test immediately
✅ Use the audit checklist
✅ When in doubt, ask AI to explain`,
    week_number: 3,
    order_index: 12,
    estimated_minutes: 40,
    resources: { concepts: ['AI Mistakes', 'Code Audit'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Security Pitfalls in AI Code',
    content: `# Security Pitfalls in AI Code

⏱️ **45 minutes to complete**

## The AI Security Problem

AI doesn't understand security context. It will happily generate vulnerable code that works perfectly—until it's exploited.

**You are the security layer.**

---

## Critical Vulnerability Categories

### 1. Injection Attacks

**SQL Injection:**
\`\`\`typescript
// VULNERABLE
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;

// SAFE
const query = 'SELECT * FROM users WHERE email = $1';
await db.query(query, [email]);
\`\`\`

**Command Injection:**
\`\`\`typescript
// VULNERABLE
exec(\`convert \${filename} output.png\`);

// SAFE
exec('convert', [filename, 'output.png']);
// or sanitize filename
\`\`\`

**Rule:** Never interpolate user input into commands.

---

### 2. Authentication & Authorization

**Missing Auth Checks:**
\`\`\`typescript
// VULNERABLE—no auth check
app.get('/api/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});

// SAFE
app.get('/api/users/:id', authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = await getUser(req.params.id);
  res.json(user);
});
\`\`\`

**Rule:** Every sensitive endpoint needs auth verification.

---

### 3. Data Exposure

**Overly Permissive Responses:**
\`\`\`typescript
// VULNERABLE—returns password hash!
res.json(user); // { id, email, passwordHash, role, ... }

// SAFE—explicit field selection
res.json({
  id: user.id,
  email: user.email,
  name: user.name
});
\`\`\`

**Rule:** Never return full database objects. Explicitly select fields.

---

### 4. Secrets in Code

AI might hardcode secrets:
\`\`\`typescript
// NEVER DO THIS
const apiKey = 'sk-live-abc123...';
const dbPassword = 'admin123';

// USE ENVIRONMENT VARIABLES
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;
\`\`\`

**Rule:** All secrets in environment variables, never in code.

---

### 5. Input Validation

**Missing Validation:**
\`\`\`typescript
// VULNERABLE—trusts all input
async function createPost(req, res) {
  await db.posts.insert(req.body);
}

// SAFE—validates input
async function createPost(req, res) {
  const { title, content } = req.body;
  
  if (!title || title.length > 200) {
    return res.status(400).json({ error: 'Invalid title' });
  }
  
  if (!content || content.length > 50000) {
    return res.status(400).json({ error: 'Invalid content' });
  }
  
  await db.posts.insert({ title, content, userId: req.user.id });
}
\`\`\`

**Rule:** Validate all input. Never trust user data.

---

### 6. XSS (Cross-Site Scripting)

**Dangerous HTML Rendering:**
\`\`\`typescript
// VULNERABLE
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// SAFE—let React escape
<div>{userContent}</div>

// If HTML needed, sanitize first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
\`\`\`

---

### 7. CORS Misconfiguration

**Too Permissive:**
\`\`\`typescript
// VULNERABLE
app.use(cors({ origin: '*' }));

// SAFE
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
\`\`\`

---

## The Security Audit Checklist

For every AI-generated endpoint:

- [ ] Is user input sanitized/parameterized?
- [ ] Is authentication verified?
- [ ] Is authorization checked?
- [ ] Are only necessary fields returned?
- [ ] Are there hardcoded secrets?
- [ ] Is input validated?
- [ ] Is output escaped?

---

## Prompting for Security

Add security requirements to prompts:

> "Create a user profile endpoint that:
> - Verifies JWT authentication
> - Only allows users to view their own profile (or admins)
> - Returns only: id, name, email, createdAt
> - Validates the ID parameter
> - Uses parameterized queries"

---

## Exercise: Secure the Code

Fix the vulnerabilities:

\`\`\`typescript
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  const results = await db.query(\`
    SELECT * FROM products WHERE name LIKE '%\${q}%'
  \`);
  res.json(results);
});
\`\`\`

<details>
<summary>Secure Version</summary>

\`\`\`typescript
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  
  // Validate input
  if (!q || typeof q !== 'string' || q.length > 100) {
    return res.status(400).json({ error: 'Invalid search query' });
  }
  
  // Parameterized query
  const results = await db.query(
    'SELECT id, name, price FROM products WHERE name LIKE $1',
    [\`%\${q}%\`]
  );
  
  // Explicit field selection (not SELECT *)
  res.json(results.map(r => ({
    id: r.id,
    name: r.name,
    price: r.price
  })));
});
\`\`\`

</details>

---

## Key Takeaways

✅ AI doesn't understand security—you do
✅ Never interpolate user input
✅ Always verify auth on sensitive endpoints
✅ Never return full database objects
✅ All secrets in environment variables
✅ Validate all input
✅ Use security checklist for every endpoint`,
    week_number: 3,
    order_index: 13,
    estimated_minutes: 45,
    resources: { concepts: ['Security', 'Injection', 'Authentication'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Code Quality Standards in AI Output',
    content: `# Code Quality Standards in AI Output

⏱️ **35 minutes to complete**

## AI Code Isn't Always Clean Code

AI generates working code, but "working" ≠ "good." You need to enforce quality standards.

---

## Quality Dimensions

### 1. Readability
Can someone else understand this code?

### 2. Maintainability  
Can this code be modified safely?

### 3. Testability
Is this code easy to test?

### 4. Performance
Is this code efficient?

### 5. Consistency
Does this match our codebase patterns?

---

## The Quality Checklist

### Naming
- [ ] Are variable names descriptive?
- [ ] Are function names verbs that describe actions?
- [ ] Are boolean names questions? (isLoading, hasPermission)
- [ ] Are constants SCREAMING_SNAKE_CASE?
- [ ] Are components PascalCase?

### Functions
- [ ] Does each function do one thing?
- [ ] Are functions under 30 lines?
- [ ] Are there fewer than 3 parameters?
- [ ] Is the abstraction level consistent?

### Structure
- [ ] Is there unnecessary nesting?
- [ ] Are complex conditions extracted to variables?
- [ ] Is error handling consistent?
- [ ] Are magic numbers replaced with constants?

### Comments
- [ ] Is the "why" explained, not the "what"?
- [ ] Are complex algorithms documented?
- [ ] Are TODOs marked with context?

---

## Common Quality Issues in AI Code

### Issue 1: Generic Names

\`\`\`typescript
// AI generated
const data = await getData(id);
const result = processData(data);
return result;

// Better
const userProfile = await fetchUserProfile(userId);
const validatedProfile = validateProfile(userProfile);
return validatedProfile;
\`\`\`

**Prompt:** "Use descriptive variable names that explain what data they hold"

### Issue 2: Long Functions

\`\`\`typescript
// AI generated 100-line function

// Prompt: "Split this into smaller functions, each with single responsibility"
\`\`\`

### Issue 3: Deep Nesting

\`\`\`typescript
// AI generated
if (user) {
  if (user.active) {
    if (user.hasPermission) {
      // do something
    }
  }
}

// Prompt: "Reduce nesting with early returns and guard clauses"
\`\`\`

---

## Prompting for Quality

Add quality requirements:

> "Create a function that [TASK].
> Requirements:
> - Maximum 20 lines
> - Descriptive variable names
> - Single responsibility
> - Include JSDoc comment
> - Add error handling
> - Follow [your style guide]"

---

## The Refactor Prompt

When AI code needs quality improvement:

> "Refactor this code to improve quality:
> - Extract magic numbers to named constants
> - Improve variable names
> - Reduce nesting with early returns
> - Split into smaller functions
> - Add JSDoc comments
> 
> Keep the same functionality."

---

## Exercise: Quality Improvement

Improve this AI-generated code:

\`\`\`typescript
function calc(d) {
  let r = 0;
  for (let i = 0; i < d.length; i++) {
    if (d[i].t === 'a') {
      r = r + d[i].v;
    } else if (d[i].t === 's') {
      r = r - d[i].v;
    }
  }
  return r;
}
\`\`\`

<details>
<summary>Improved Version</summary>

\`\`\`typescript
/**
 * Calculates the balance from a list of transactions
 * @param transactions - Array of transaction objects
 * @returns The calculated balance
 */
function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((balance, transaction) => {
    const { type, amount } = transaction;
    
    if (type === TransactionType.ADDITION) {
      return balance + amount;
    }
    
    if (type === TransactionType.SUBTRACTION) {
      return balance - amount;
    }
    
    return balance;
  }, 0);
}
\`\`\`

</details>

---

## Key Takeaways

✅ "Working" ≠ "Good" — enforce quality standards
✅ Check naming, functions, structure, comments
✅ Prompt for quality requirements upfront
✅ Use refactor prompts to improve AI output
✅ Quality is your responsibility, not AI's`,
    week_number: 3,
    order_index: 14,
    estimated_minutes: 35,
    resources: { concepts: ['Code Quality', 'Clean Code'] }
  },

  {
    course_id: COURSE_ID,
    title: 'When to Trust, When to Verify',
    content: `# When to Trust, When to Verify

⏱️ **35 minutes to complete**

## The Trust Spectrum

Not all AI output needs the same level of scrutiny. Learn to calibrate.

---

## High Trust Zones (Quick Review)

AI is reliable here. Brief verification is enough.

✅ **Boilerplate setup**
✅ **Standard CRUD operations**
✅ **Common design patterns**
✅ **Documentation generation**
✅ **Simple refactoring**
✅ **Test generation (non-critical)**

**Review time:** 30 seconds - 2 minutes

---

## Medium Trust Zones (Careful Review)

AI is mostly reliable but check details.

⚠️ **Business logic implementation**
⚠️ **API integrations**
⚠️ **Database queries**
⚠️ **State management**
⚠️ **Form validation**
⚠️ **Error handling**

**Review time:** 5-15 minutes

---

## Low Trust Zones (Deep Verification)

AI struggles here. Always verify thoroughly.

🔴 **Security-sensitive code**
🔴 **Authentication/authorization**
🔴 **Payment processing**
🔴 **Data encryption**
🔴 **Performance-critical paths**
🔴 **Third-party integrations (recent changes)**

**Review time:** 30+ minutes, maybe rewrite

---

## The VERIFY Method

**V** - Verify it runs without errors
**E** - Examine edge cases
**R** - Review security implications
**I** - Inspect performance
**F** - Factor in maintainability
**Y** - You understand every line

---

## Verification Techniques

### Technique 1: Mental Execution

Walk through the code with sample inputs:

\`\`\`
Input: { name: "", email: "test@example.com" }
Step 1: Check name → "" is falsy → error returned ✓
Input: { name: "John", email: "invalid" }
Step 1: Check name → "John" is truthy → continue
Step 2: Check email → pattern test → fails → error returned ✓
\`\`\`

### Technique 2: Edge Case Hunting

List edge cases and trace:

- Empty input?
- Null values?
- Very large values?
- Special characters?
- Concurrent access?

### Technique 3: Comparison

Compare AI output to:
- Similar code in your codebase
- Official documentation
- Known working implementations

---

## The 80/20 Rule

Spend 80% of verification time on the 20% that matters:

**Critical path:** Main user flows
**Security:** Auth, payments, permissions
**Data integrity:** CRUD operations
**Performance:** High-traffic endpoints

Don't over-verify non-critical code.

---

## Exercise: Trust Calibration

For each scenario, rate your trust level:

1. "Create a function to format dates"
2. "Create a password reset flow"
3. "Add a loading spinner to a button"
4. "Implement rate limiting for an API"
5. "Create a component for user avatars"

<details>
<summary>Suggested Trust Levels</summary>

1. **High** - Standard utility, low risk
2. **Low** - Security-sensitive, verify thoroughly
3. **High** - UI component, minimal risk
4. **Low** - Security/performance critical
5. **Medium** - Depends on requirements (auth? upload?)

</details>

---

## Key Takeaways

✅ Calibrate trust based on code criticality
✅ High trust: boilerplate, patterns → quick review
✅ Medium trust: business logic → careful review
✅ Low trust: security, payments → deep verification
✅ Use VERIFY method systematically
✅ Focus verification on critical paths`,
    week_number: 3,
    order_index: 15,
    estimated_minutes: 35,
    resources: { concepts: ['Trust Calibration', 'Verification'] }
  },

  // ==================== WEEK 4: INTERMEDIATE TECHNIQUES ====================
  {
    course_id: COURSE_ID,
    title: 'Multi-File Projects with AI',
    content: `# Multi-File Projects with AI

⏱️ **45 minutes to complete**

## The Multi-File Challenge

Real projects span multiple files. AI needs to understand relationships and maintain consistency across the codebase.

---

## Strategies for Multi-File Work

### Strategy 1: File-by-File Generation

Build incrementally:

1. **Data model** → \`types.ts\`
2. **API layer** → \`api/users.ts\`
3. **Business logic** → \`services/userService.ts\`
4. **UI components** → \`components/UserList.tsx\`
5. **Integration** → Wire together

Each prompt references previous files.

---

### Strategy 2: Feature-Based Prompts

Describe the full feature, let AI generate multiple files:

> "Create a user profile feature:
> - Type definitions in types/user.ts
> - API endpoints in api/users.ts
> - Profile component in components/Profile.tsx
> - Follow existing patterns in the codebase"

---

### Strategy 3: Cursor's Context (Codebase Awareness)

Cursor can read your entire codebase:

> "Look at existing API endpoints in src/api/ and create a similar endpoint for products"

---

## Prompting Across Files

### Reference Existing Files

> "Following the pattern in src/api/auth.ts, create a products endpoint"

### Specify File Structure

> "Create these files:
> - src/types/product.ts — Product interface
> - src/api/products.ts — CRUD endpoints
> - src/hooks/useProducts.ts — React Query hook
> - src/components/ProductList.tsx — Display component"

### Maintain Consistency

> "Match the error handling pattern used in other API files"
> "Use the same styling approach as existing components"

---

## The FEATURE Framework

**F** - File structure planned
**E** - Existing patterns referenced
**A** - Architecture consistent
**T** - Types shared across files
**U** - Utilities reused
**R** - Relationships defined
**E** - Exports organized

---

## Real Example: Building a Comments Feature

### Step 1: Types

> "Create src/types/comment.ts with Comment interface including id, content, author, createdAt, postId"

### Step 2: API

> "Using the Comment type, create src/api/comments.ts with:
> - GET /api/posts/:postId/comments
> - POST /api/posts/:postId/comments
> - DELETE /api/comments/:id
> Follow the pattern in src/api/posts.ts"

### Step 3: Hooks

> "Create src/hooks/useComments.ts with React Query hooks for the comment API. Match the pattern in usePosts.ts"

### Step 4: Components

> "Create src/components/CommentList.tsx and CommentForm.tsx using the hooks. Style consistently with existing components."

---

## Cross-File Refactoring

> "The Comment type has changed. Update all files that use it:
> - src/api/comments.ts
> - src/hooks/useComments.ts
> - src/components/CommentList.tsx"

---

## Exercise: Build a Notifications Feature

Create a complete notifications feature with:
- Types
- API endpoints
- React hooks
- UI components

Use 5-7 prompts maximum.

---

## Key Takeaways

✅ Build file-by-file with references
✅ Describe file structure explicitly
✅ Reference existing patterns for consistency
✅ Use FEATURE framework
✅ Cursor's codebase context helps maintain consistency`,
    week_number: 4,
    order_index: 16,
    estimated_minutes: 45,
    resources: { concepts: ['Multi-File Projects', 'Codebase Context'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Debugging with AI Assistance',
    content: `# Debugging with AI Assistance

⏱️ **40 minutes to complete**

## AI as Your Debugging Partner

AI excels at debugging because it:
- Recognizes common error patterns
- Can analyze large code blocks quickly
- Knows framework-specific issues
- Suggests multiple solutions

---

## The DEBUG Method

**D** - Describe the problem clearly
**E** - Provide error messages/logs
**B** - Share relevant code
**U** - Understand the fix
**G** - Guard against regression (add tests)

---

## Effective Debug Prompts

### Basic Debug Prompt

> "This code should [EXPECTED BEHAVIOR] but [ACTUAL BEHAVIOR].
> Error: [PASTE ERROR MESSAGE]
> Code: [PASTE RELEVANT CODE]
> What's wrong and how do I fix it?"

### Context-Rich Debug Prompt

> "I'm getting this error in a Next.js 14 app:
> [ERROR MESSAGE]
> 
> The error occurs when [SCENARIO].
> Here's the relevant code:
> [CODE]
> 
> The file imports [LIST IMPORTS].
> 
> What's causing this and how do I fix it?"

---

## Common Debugging Scenarios

### Scenario 1: Runtime Error

> "TypeError: Cannot read properties of undefined (reading 'map')
> Occurs in: src/components/UserList.tsx
> Code: [PASTE]
> The error happens when the page loads."

**AI typically identifies:** Missing null check before .map()

### Scenario 2: Type Error (TypeScript)

> "Type 'string' is not assignable to type 'number'.
> Interface: [PASTE]
> Code causing error: [PASTE]"

**AI typically identifies:** Mismatched types, suggests fix

### Scenario 3: Logic Bug

> "This function should calculate the total price including tax, but it's returning wrong values.
> Example: $100 with 10% tax should return $110, but it returns $1000.
> Code: [PASTE]"

**AI typically identifies:** Math error, missing parentheses, etc.

### Scenario 4: Framework-Specific Issue

> "Next.js Error: 'useState' cannot be used in Server Components.
> Code: [PASTE]
> This is an App Router page."

**AI typically identifies:** Client component needs 'use client' directive

---

## Providing Debugging Context

### What to Include

✅ Exact error message
✅ Stack trace (relevant parts)
✅ The code causing the error
✅ What you expected to happen
✅ What actually happens
✅ Relevant imports/dependencies
✅ Framework/version info if relevant

### What to Exclude

❌ Entire files if only one function matters
❌ Unrelated console logs
❌ Vague descriptions ("it doesn't work")

---

## Follow-Up Debug Prompts

If AI's fix doesn't work:

> "That didn't resolve the issue. Now I get: [NEW ERROR]"
> "The error persists even after applying your fix. Here's the updated code: [CODE]"
> "Your solution works but causes a new problem: [DESCRIBE]"

---

## Exercise: Debug These

### Bug 1
\`\`\`typescript
function calculateDiscount(price: number, discount: number) {
  return price - price * discount;
}

// calculateDiscount(100, 0.2) returns 80 ✓
// calculateDiscount(100, 20) returns -1900 ✗ (expected 80)
\`\`\`

**Your debug prompt:**

<details>
<summary>Debug Prompt</summary>

> "This function should apply a discount percentage to a price.
> Expected: calculateDiscount(100, 20) → 80 (20% off)
> Actual: calculateDiscount(100, 20) → -1900
> 
> It works when discount is 0.2, but fails when discount is 20.
> 
> Code: [code above]
> 
> What's the issue and how do I fix it?"

</details>

---

## Key Takeaways

✅ Use DEBUG method: Describe, Errors, Code, Understand, Guard
✅ Provide exact errors, code, and context
✅ Be specific about expected vs actual behavior
✅ Iterate if first fix doesn't work
✅ Always understand the fix before applying`,
    week_number: 4,
    order_index: 17,
    estimated_minutes: 40,
    resources: { concepts: ['Debugging', 'Error Analysis'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Refactoring Legacy Code with AI',
    content: `# Refactoring Legacy Code with AI

⏱️ **40 minutes to complete**

## The Refactoring Opportunity

Legacy code is where AI shines. It can modernize, clean, and improve old code while preserving functionality.

---

## What AI Can Refactor

✅ **Modernize syntax** (var → const, callbacks → async/await)
✅ **Extract functions** (long functions → small functions)
✅ **Improve naming** (x → userCount)
✅ **Add types** (JavaScript → TypeScript)
✅ **Reduce complexity** (nested conditionals → early returns)
✅ **Update patterns** (class components → hooks)

---

## The REFACTOR Process

**R** - Identify refactoring goal
**E** - Extract the code to refactor
**F** - Formulate specific instructions
**A** - Apply AI output
**C** - Confirm functionality preserved
**T** - Test thoroughly
**O** - Organize cleanup
**R** - Repeat for next improvement

---

## Refactoring Prompt Patterns

### Modernization

> "Refactor this code to use modern JavaScript/TypeScript patterns:
> - Use const/let instead of var
> - Use arrow functions
> - Use async/await instead of .then()
> - Use template literals
> - Use destructuring
> 
> Code: [PASTE]"

### Type Addition

> "Convert this JavaScript to TypeScript with proper types:
> - Add interfaces for data structures
> - Type all function parameters
> - Type all return values
> - Use strict mode
> 
> Code: [PASTE]"

### Function Extraction

> "This function is too long (50+ lines). Refactor it by:
> - Extracting logical sections into separate functions
> - Giving each function a single responsibility
> - Using descriptive names for new functions
> - Keeping the same public interface
> 
> Code: [PASTE]"

### Complexity Reduction

> "Reduce the complexity of this code:
> - Use early returns instead of nested if
> - Extract complex conditions to named variables
> - Remove dead code
> - Simplify logic where possible
> 
> Code: [PASTE]"

---

## Incremental Refactoring

Don't refactor everything at once. Use the **Strangler Fig pattern**:

1. Identify one small piece to improve
2. Refactor that piece with AI
3. Test thoroughly
4. Commit
5. Repeat

---

## Safety Checks

### Before Refactoring
- [ ] Do I have tests for this code?
- [ ] Do I understand what this code does?
- [ ] Is this code actively used?

### After Refactoring
- [ ] Do all tests pass?
- [ ] Does manual testing confirm functionality?
- [ ] Is the code easier to understand?

---

## Exercise: Refactor This

\`\`\`javascript
var processOrder = function(order) {
  var total = 0;
  for (var i = 0; i < order.items.length; i++) {
    if (order.items[i].price > 0) {
      if (order.items[i].quantity > 0) {
        total = total + (order.items[i].price * order.items[i].quantity);
      }
    }
  }
  if (order.discount) {
    total = total - (total * order.discount);
  }
  if (order.tax) {
    total = total + (total * order.tax);
  }
  return total;
};
\`\`\`

**Your refactoring prompt:**

<details>
<summary>Refactored Version</summary>

\`\`\`typescript
interface OrderItem {
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  discount?: number;
  tax?: number;
}

function calculateOrderTotal(order: Order): number {
  const subtotal = order.items
    .filter(item => item.price > 0 && item.quantity > 0)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const afterDiscount = order.discount 
    ? subtotal * (1 - order.discount) 
    : subtotal;
  
  const total = order.tax 
    ? afterDiscount * (1 + order.tax) 
    : afterDiscount;
  
  return total;
}
\`\`\`

</details>

---

## Key Takeaways

✅ AI excels at modernizing and cleaning legacy code
✅ Use REFACTOR process: goal → extract → instruct → apply → confirm → test
✅ Refactor incrementally (Strangler Fig pattern)
✅ Always test before and after
✅ Understand refactored code before committing`,
    week_number: 4,
    order_index: 18,
    estimated_minutes: 40,
    resources: { concepts: ['Refactoring', 'Legacy Code', 'Modernization'] }
  },

  {
    course_id: COURSE_ID,
    title: 'API Integration Workflows',
    content: `# API Integration Workflows

⏱️ **45 minutes to complete**

## AI Makes API Integration Easy

Integrating APIs used to mean hours reading docs. AI can accelerate this dramatically.

---

## The INTEGRATE Framework

**I** - Identify the API and purpose
**N** - Note authentication method
**T** - Define types/interfaces
**E** - Establish base configuration
**G** - Generate request functions
**R** - Review error handling
**A** - Add retry/timeout logic
**T** - Test with real calls
**E** - Encapsulate in service/module

---

## Integration Prompt Template

\`\`\`
Integrate with [API NAME] for [PURPOSE].

API Documentation: [SUMMARY OR URL]
Base URL: [URL]
Auth: [METHOD - API key, OAuth, etc.]
Required headers: [LIST]

Endpoints needed:
1. [ENDPOINT] - [PURPOSE]
2. [ENDPOINT] - [PURPOSE]

For each endpoint:
- Create TypeScript types for request/response
- Implement fetch function with error handling
- Include retry logic for transient failures
- Add request timeout (30s default)

Use [FETCH LIBRARY - axios, ky, native fetch]
\`\`\`

---

## Real Example: Stripe Integration

### Prompt

> "Integrate with Stripe API for subscription management.
> 
> Auth: Bearer token (sk_test_...)
> Base URL: https://api.stripe.com/v1
> 
> Endpoints needed:
> 1. Create customer - POST /customers
> 2. Create subscription - POST /subscriptions
> 3. Cancel subscription - DELETE /subscriptions/:id
> 4. Get subscription - GET /subscriptions/:id
> 
> For each:
> - TypeScript types
> - Fetch function with error handling
> - Retry logic (3 attempts)
> 
> Use native fetch"

### AI Generates

\`\`\`typescript
// Types
interface StripeCustomer {
  id: string;
  email: string;
  name: string;
}

interface CreateCustomerParams {
  email: string;
  name: string;
}

// Service
class StripeService {
  private baseUrl = 'https://api.stripe.com/v1';
  private headers: HeadersInit;

  constructor(apiKey: string) {
    this.headers = {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  async createCustomer(params: CreateCustomerParams): Promise<StripeCustomer> {
    const response = await this.fetchWithRetry(\`\${this.baseUrl}/customers\`, {
      method: 'POST',
      headers: this.headers,
      body: new URLSearchParams(params as any),
    });
    
    return response.json();
  }

  private async fetchWithRetry(url: string, options: RequestInit, attempts = 3): Promise<Response> {
    // ... retry logic
  }
}
\`\`\`

---

## Handling Common API Issues

### Rate Limiting

> "Add rate limit handling. If we get 429, wait for Retry-After header and retry."

### Pagination

> "The API returns paginated results. Add a helper that fetches all pages automatically."

### Webhooks

> "Create a webhook handler for [EVENTS]. Verify the signature using [METHOD]."

---

## Exercise: Integrate an API

Choose an API you work with and create a complete integration:

1. Define the purpose
2. List needed endpoints
3. Write the integration prompt
4. Review generated code
5. Test with real API calls

---

## Key Takeaways

✅ Use INTEGRATE framework for systematic integration
✅ Provide API docs summary, auth, endpoints in prompt
✅ Request TypeScript types, error handling, retry logic
✅ Test with real API calls
✅ Handle rate limits, pagination, webhooks`,
    week_number: 4,
    order_index: 19,
    estimated_minutes: 45,
    resources: { concepts: ['API Integration', 'Error Handling', 'Rate Limiting'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Building a Full Feature End-to-End',
    content: `# Building a Full Feature End-to-End

⏱️ **50 minutes to complete**

## The Capstone Challenge

Let's build a complete feature from scratch using everything you've learned.

**Feature:** User Profile Management

---

## Feature Requirements

- View profile (GET)
- Update profile (PUT)
- Upload avatar (image upload)
- Change password (with validation)
- Delete account (with confirmation)

---

## Step 1: Plan the Architecture

**Files needed:**
- \`types/user.ts\` — Type definitions
- \`api/profile.ts\` — API endpoints
- \`hooks/useProfile.ts\` — Data fetching hooks
- \`components/ProfileForm.tsx\` — Edit form
- \`components/AvatarUpload.tsx\` — Avatar component
- \`components/DeleteAccount.tsx\` — Delete confirmation

**Dependencies:**
- React Query for data
- Zod for validation
- File upload library

---

## Step 2: Generate Types

> "Create types/user.ts with:
> 
> interface User:
> - id: string
> - email: string
> - name: string
> - avatarUrl?: string
> - createdAt: Date
> 
> interface UpdateProfileInput:
> - name: string (1-100 chars)
> - email (valid email format)
> 
> interface ChangePasswordInput:
> - currentPassword: string
> - newPassword: string (min 8 chars)
> - confirmPassword: string
> 
> Add JSDoc comments"

---

## Step 3: Generate API Layer

> "Create api/profile.ts for user profile management.
> 
> Functions:
> 1. getProfile() - GET /api/profile
> 2. updateProfile(data) - PUT /api/profile
> 3. uploadAvatar(file) - POST /api/profile/avatar (FormData)
> 4. changePassword(data) - POST /api/profile/password
> 5. deleteAccount() - DELETE /api/profile
> 
> Each function:
> - Returns typed response
> - Handles errors with typed ApiError
> - Includes auth header from getAuthToken()
> 
> Use the types from types/user.ts"

---

## Step 4: Generate Hooks

> "Create hooks/useProfile.ts with React Query hooks.
> 
> Hooks:
> - useProfile() - Query for getProfile
> - useUpdateProfile() - Mutation for updateProfile
> - useUploadAvatar() - Mutation for uploadAvatar
> - useChangePassword() - Mutation for changePassword
> - useDeleteAccount() - Mutation for deleteAccount
> 
> Include:
> - Proper cache invalidation
> - Success/error toast notifications
> - Loading states
> 
> Use the API functions from api/profile.ts"

---

## Step 5: Generate Components

> "Create components/ProfileForm.tsx
> 
> Requirements:
> - Form with name and email fields
> - Real-time validation using Zod
> - Submit button disabled during loading
> - Success/error feedback
> - Cancel button to reset changes
> 
> Use:
> - useProfile() hook for data
> - useUpdateProfile() hook for submission
> - Tailwind CSS styling
> - Match existing form patterns in the codebase"

---

## Step 6: Integration Testing

> "I've created the profile feature. Review for:
> - Missing error handling
> - Security issues
> - Type safety gaps
> - Performance concerns
> 
> Files:
> - types/user.ts
> - api/profile.ts
> - hooks/useProfile.ts
> - components/ProfileForm.tsx"

---

## Step 7: Add Missing Pieces

Based on review, add:
- Loading states
- Error boundaries
- Accessibility features
- E2E tests

---

## Exercise: Build Your Own Feature

Choose a feature from your own project and build it end-to-end:

1. _______________ (Plan)
2. _______________ (Types)
3. _______________ (API)
4. _______________ (Hooks)
5. _______________ (Components)
6. _______________ (Review)
7. _______________ (Polish)

---

## Key Takeaways

✅ Plan architecture before prompting
✅ Generate in dependency order (types → API → hooks → components)
✅ Reference previous files for consistency
✅ Review generated code for gaps
✅ Test end-to-end before shipping`,
    week_number: 4,
    order_index: 20,
    estimated_minutes: 50,
    resources: { concepts: ['Feature Development', 'End-to-End'] }
  },

  // ==================== WEEK 5: ADVANCED WORKFLOWS ====================
  {
    course_id: COURSE_ID,
    title: 'Test-Driven Development with AI',
    content: `# Test-Driven Development with AI

⏱️ **45 minutes to complete**

## AI Changes TDD

Traditional TDD: Write test → Fail → Write code → Pass → Refactor
AI-Enhanced TDD: Describe behavior → Generate tests → Generate code → Verify

---

## The AI-TDD Flow

\`\`\`
1. DESCRIBE expected behavior
2. GENERATE tests from description
3. REVIEW tests (do they match intent?)
4. GENERATE implementation
5. RUN tests (do they pass?)
6. REFINE if needed
\`\`\`

---

## Test Generation Prompts

### Unit Tests

> "Write comprehensive Jest tests for this function:
> 
> [PASTE FUNCTION]
> 
> Test cases:
> - Happy path (valid inputs)
> - Edge cases (empty, null, undefined)
> - Boundary cases (min, max values)
> - Error cases (invalid inputs)
> 
> Include:
> - Descriptive test names
> - Arrange-Act-Assert pattern
> - Proper cleanup
> 
> Aim for 100% coverage"

### React Component Tests

> "Write React Testing Library tests for this component:
> 
> [PASTE COMPONENT]
> 
> Test:
> - Renders correctly
> - User interactions (click, type, etc.)
> - State changes
> - Props variations
> - Accessibility (if applicable)
> 
> Use screen.getByRole preferentially"

### Integration Tests

> "Write integration tests for this API endpoint:
> 
> [PASTE ENDPOINT]
> 
> Test:
> - Successful requests
> - Authentication requirements
> - Validation errors
> - Database interactions
> - Error responses
> 
> Use test database, clean up after each test"

---

## The Test-First Approach

### Step 1: Write Test Prompt

> "I need a function that [DESCRIPTION].
> 
> First, write tests that define expected behavior:
> - [INPUT] should return [OUTPUT]
> - [INPUT] should return [OUTPUT]
> - [EDGE CASE] should [BEHAVIOR]
> 
> Then write the implementation to pass those tests."

### Step 2: Review Tests

Are these tests actually testing what you want?

### Step 3: Generate Implementation

> "Now implement the function to pass all tests"

### Step 4: Run and Verify

\`\`\`bash
npm test
\`\`\`

---

## Test Quality Checklist

- [ ] Tests describe behavior, not implementation
- [ ] Test names are descriptive
- [ ] Each test has one assertion focus
- [ ] Edge cases are covered
- [ ] Error cases are tested
- [ ] Tests are independent
- [ ] Tests are deterministic (no flaky tests)

---

## Exercise: TDD a Calculator

**Prompt:** "I need a calculator function that supports add, subtract, multiply, divide.

Write tests first for:
- add(2, 3) → 5
- subtract(5, 2) → 3
- multiply(3, 4) → 12
- divide(10, 2) → 5
- divide(10, 0) → throws error
- All operations handle negative numbers

Then implement to pass tests."

---

## Key Takeaways

✅ AI-TDD: Describe → Generate tests → Generate code → Verify
✅ Write tests first, let AI generate both tests and implementation
✅ Review tests to ensure they match intent
✅ Cover happy path, edge cases, errors
✅ Run tests to verify implementation`,
    week_number: 5,
    order_index: 21,
    estimated_minutes: 45,
    resources: { concepts: ['TDD', 'Test Generation'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Documentation & Comments at Scale',
    content: `# Documentation & Comments at Scale

⏱️ **35 minutes to complete**

## The Documentation Debt Problem

Code without documentation is technical debt. But documentation is tedious.

**AI solves this.**

---

## Documentation Types AI Can Generate

✅ **JSDoc/TSDoc** — Function and class documentation
✅ **README** — Project overview
✅ **API documentation** — Endpoint descriptions
✅ **Inline comments** — Complex logic explanation
✅ **Type documentation** — Interface/Type descriptions

---

## Documentation Prompts

### JSDoc Generation

> "Add comprehensive JSDoc comments to all functions in this file:
> 
> [PASTE CODE]
> 
> Include:
> - @param with types and descriptions
> - @returns with description
> - @throws for error cases
> - @example for complex functions
> 
> Comments should explain 'why', not just 'what'"

### README Generation

> "Create a README.md for this project:
> 
> Project: [DESCRIPTION]
> Stack: [LIST]
> Setup: [STEPS]
> 
> Include:
> - Project description
> - Prerequisites
> - Installation steps
> - Usage examples
> - Available scripts
> - Environment variables
> - Contributing guidelines
> - License"

### API Documentation

> "Generate API documentation for these endpoints:
> 
> [PASTE ENDPOINTS]
> 
> Format: Markdown with:
> - Endpoint path and method
> - Description
> - Request parameters/body
> - Response format
> - Error codes
> - Example requests/responses"

---

## Comment Guidelines

**Good comments explain WHY:**
\`\`\`typescript
// Cache results for 5 minutes to reduce API calls
const cachedData = await cache.get(key);
\`\`\`

**Bad comments explain WHAT:**
\`\`\`typescript
// Get cached data
const cachedData = await cache.get(key);
\`\`\`

---

## Prompt for Quality Comments

> "Add inline comments to this code.
> 
> Rules:
> - Comment on 'why', not 'what'
> - Explain complex algorithms
> - Note any non-obvious decisions
> - Mark TODOs with context
> - No redundant comments
> 
> Code: [PASTE]"

---

## Exercise: Document a Service

Take a service/module from your codebase:

1. Generate JSDoc for all functions
2. Add inline comments for complex logic
3. Update or create README section
4. Generate API docs if applicable

---

## Key Takeaways

✅ AI eliminates documentation drudgery
✅ Generate JSDoc, README, API docs with prompts
✅ Comments should explain 'why', not 'what'
✅ Review documentation for accuracy
✅ Keep documentation in sync with code`,
    week_number: 5,
    order_index: 22,
    estimated_minutes: 35,
    resources: { concepts: ['Documentation', 'JSDoc', 'README'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Performance Optimization with AI',
    content: `# Performance Optimization with AI

⏱️ **40 minutes to complete**

## AI as Performance Partner

AI can identify bottlenecks, suggest optimizations, and generate efficient code.

---

## Optimization Categories

### 1. Algorithm Optimization
Better time/space complexity

### 2. Database Optimization
Query efficiency, indexing

### 3. Frontend Performance
Bundle size, rendering

### 4. Caching Strategies
Reduce redundant work

---

## Optimization Prompts

### Algorithm Analysis

> "Analyze this function for performance:
> 
> [PASTE CODE]
> 
> Current complexity: [IF KNOWN]
> Expected input size: [SIZE]
> 
> Identify:
> - Time complexity
> - Space complexity
> - Bottlenecks
> - Optimization opportunities
> 
> Provide optimized version with complexity analysis"

### Database Query Optimization

> "Optimize this database query:
> 
> [PASTE QUERY]
> 
> Table sizes: [SIZES]
> Current performance: [MEASUREMENT]
> 
> Suggest:
> - Index recommendations
> - Query restructuring
> - N+1 query fixes
> - Pagination strategies"

### React Performance

> "Optimize this React component for performance:
> 
> [PASTE COMPONENT]
> 
> Issues:
> - [DESCRIBE SYMPTOMS]
> 
> Consider:
> - Memoization (useMemo, useCallback)
> - Virtualization for lists
> - Lazy loading
> - Bundle splitting
> - Reducing re-renders"

---

## The OPTIMIZE Framework

**O** - Observe the bottleneck (measure first)
**P** - Profile to identify cause
**T** - Target specific issue
**I** - Instruct AI with context
**M** - Measure improvement
**I** - Iterate if needed
**Z** - Zero in on biggest wins
**E** - Ensure no regression

---

## Common Optimizations

### Frontend
- Memoization
- Virtualization (long lists)
- Code splitting
- Image optimization
- Debouncing/throttling

### Backend
- Query optimization
- Caching
- Connection pooling
- Async processing
- Load balancing

---

## Exercise: Optimize a Function

\`\`\`typescript
function findDuplicates(arr: number[]): number[] {
  const duplicates: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
\`\`\`

**Your optimization prompt:**

<details>
<summary>Optimized</summary>

\`\`\`typescript
function findDuplicates(arr: number[]): number[] {
  const seen = new Set<number>();
  const duplicates = new Set<number>();
  
  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }
  
  return Array.from(duplicates);
}

// O(n) instead of O(n³)
\`\`\`

</details>

---

## Key Takeaways

✅ Measure before optimizing
✅ AI can analyze complexity and suggest improvements
✅ Common wins: memoization, caching, query optimization
✅ Always measure improvement
✅ Ensure no functionality regression`,
    week_number: 5,
    order_index: 23,
    estimated_minutes: 40,
    resources: { concepts: ['Performance', 'Optimization', 'Complexity'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Code Review Collaboration with AI',
    content: `# Code Review Collaboration with AI

⏱️ **35 minutes to complete**

## AI as Code Review Assistant

AI can review code before humans do, catching issues early.

---

## What AI Can Review

✅ **Logic errors** — Incorrect implementations
✅ **Security issues** — Vulnerabilities
✅ **Performance** — Inefficient patterns
✅ **Best practices** — Framework conventions
✅ **Code quality** — Readability, maintainability
✅ **Test coverage** — Missing tests

---

## Review Prompt Template

> "Review this code for:
> 
> [PASTE CODE]
> 
> Check for:
> 1. Logic errors
> 2. Security vulnerabilities
> 3. Performance issues
> 4. Best practice violations
> 5. Missing error handling
> 6. Test coverage gaps
> 
> Provide:
> - Issues found (severity: high/medium/low)
> - Specific line references
> - Suggested fixes
> - Positive observations"

---

## Specialized Reviews

### Security Review

> "Perform a security audit of this code:
> 
> [PASTE CODE]
> 
> Focus on:
> - Injection vulnerabilities
> - Authentication/authorization issues
> - Data exposure risks
> - Input validation gaps
> - Secret management
> - CORS/CSP concerns"

### Performance Review

> "Review this code for performance:
> 
> [PASTE CODE]
> 
> Analyze:
> - Time/space complexity
> - Memory leaks
> - Unnecessary computations
> - Network request patterns
> - Database query efficiency"

### Accessibility Review (Frontend)

> "Review this component for accessibility:
> 
> [PASTE CODE]
> 
> Check:
> - ARIA attributes
> - Keyboard navigation
> - Screen reader support
> - Color contrast
> - Focus management"

---

## Using AI in Team Code Reviews

### Pre-Review
1. Run AI review before PR
2. Fix high-priority issues
3. Submit cleaner PR

### During Review
1. Use AI to explain complex code
2. Ask AI for alternative implementations
3. Validate AI suggestions with team

---

## Exercise: Review Code

\`\`\`typescript
async function handlePayment(req: Request, res: Response) {
  const { cardNumber, amount } = req.body;
  
  const result = await fetch('https://payment.api/charge', {
    method: 'POST',
    body: JSON.stringify({ cardNumber, amount })
  });
  
  res.json(await result.json());
}
\`\`\`

**Your review prompt:**

---

## Key Takeaways

✅ AI catches issues before human review
✅ Use specialized prompts for security, performance, accessibility
✅ AI explains complex code during reviews
✅ Don't replace human review—augment it
✅ Validate AI suggestions with team`,
    week_number: 5,
    order_index: 24,
    estimated_minutes: 35,
    resources: { concepts: ['Code Review', 'Security Audit'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Managing Technical Debt with AI',
    content: `# Managing Technical Debt with AI

⏱️ **35 minutes to complete**

## Technical Debt is Inevitable

Every codebase has it. AI makes it easier to manage.

---

## Types of Technical Debt

1. **Code quality debt** — Poor structure, naming
2. **Documentation debt** — Missing/outdated docs
3. **Test debt** — Missing or weak tests
4. **Dependency debt** — Outdated packages
5. **Architecture debt** — Suboptimal design

---

## AI Debt Management Strategies

### Strategy 1: Debt Identification

> "Analyze this codebase for technical debt:
> 
> Files: [LIST OR DESCRIPTION]
> 
> Identify:
> - Code smells
> - Missing tests
> - Outdated patterns
> - Complex functions (high cyclomatic complexity)
> - Missing documentation
> - Security concerns
> 
> Prioritize by impact and effort"

### Strategy 2: Incremental Paydown

> "Refactor this function to reduce technical debt:
> 
> [PASTE CODE]
> 
> Issues:
> - Long function (50+ lines)
> - Deep nesting
> - Magic numbers
> - No tests
> 
> Refactor to:
> - Extract to smaller functions
> - Add constants for magic numbers
> - Reduce nesting with early returns
> - Maintain same functionality"

### Strategy 3: Documentation Paydown

> "Add documentation for this undocumented module:
> 
> [PASTE CODE]
> 
> Add:
> - Module-level README
> - Function JSDoc
> - Inline comments for complex logic
> - Usage examples"

---

## The Debt Paydown Prompt

\`\`\`
Analyze and fix technical debt in [FILE/MODULE].

Current issues:
- [ISSUE 1]
- [ISSUE 2]
- [ISSUE 3]

Constraints:
- Maintain backward compatibility
- Don't change public API
- Add tests if missing

Output:
1. Analysis of current state
2. Recommended changes
3. Refactored code
4. New tests (if applicable)
\`\`\`

---

## Debt Prevention Prompts

> "Before I commit this code, review it for potential technical debt:
> 
> [PASTE CODE]
> 
> Flag:
> - Premature abstractions
> - Missing error handling
> - Hardcoded values
> - Missing types
> - Untestable code
> - Performance concerns"

---

## Exercise: Assess Your Debt

Take a module from your codebase:

1. Ask AI to identify technical debt
2. Prioritize issues (impact/effort)
3. Create a paydown plan
4. Refactor one issue

---

## Key Takeaways

✅ AI identifies debt you might miss
✅ Incremental paydown prevents overwhelming rewrites
✅ Use AI for prevention (pre-commit review)
✅ Prioritize by impact and effort
✅ Document as you pay down debt`,
    week_number: 5,
    order_index: 25,
    estimated_minutes: 35,
    resources: { concepts: ['Technical Debt', 'Refactoring'] }
  },

  // ==================== WEEK 6: PRODUCTION & BEYOND ====================
  {
    course_id: COURSE_ID,
    title: 'From Prompt to Production: The Complete Workflow',
    content: `# From Prompt to Production: The Complete Workflow

⏱️ **50 minutes to complete**

## The Production-Ready Checklist

Shipping to production requires more than working code.

---

## The PRODUCTION Framework

**P** - Plan the feature completely
**R** - Review generated code thoroughly
**O** - Optimize for performance
**D** - Document the changes
**U** - Unit and integration tests
**C** - Check security thoroughly
**T** - Test in staging environment
**I** - Implement monitoring/logging
**O** - Organize rollback plan
**N** - Notify stakeholders

---

## Complete Workflow Example

### Feature: User Notification Preferences

### Step 1: Requirements

**Prompt:**
> "I need to build a user notification preferences feature.
> 
> Requirements:
> - Users can enable/disable notification types
> - Notification types: email, push, sms
> - Each type has categories: marketing, updates, alerts
> - Preferences stored per user
> - Default preferences for new users
> - API to get/update preferences
> 
> What files and components do I need?"

### Step 2: Data Model

**Prompt:**
> "Create a Prisma schema for notification preferences.
> 
> User has many notification preferences.
> Each preference has:
> - type (email/push/sms)
> - category (marketing/updates/alerts)
> - enabled (boolean)
> 
> Add indexes for common queries."

### Step 3: API Layer

**Prompt:**
> "Create API endpoints for notification preferences:
> 
> GET /api/users/:id/preferences
> PUT /api/users/:id/preferences
> POST /api/users/:id/preferences/reset (reset to defaults)
> 
> Include:
> - Authentication
> - Authorization (users can only edit their own)
> - Validation
> - Error handling"

### Step 4: Frontend

**Prompt:**
> "Create a NotificationPreferences React component:
> 
> - Display toggle for each type/category combination
> - Save changes on toggle
> - Show loading state
> - Show success/error feedback
> - Include reset to defaults button
> 
> Use:
> - useMutation from React Query
> - Tailwind CSS
> - Accessible toggle switches"

### Step 5: Tests

**Prompt:**
> "Write tests for the notification preferences feature:
> 
> API tests:
> - GET returns user preferences
> - PUT updates preferences
> - Authorization prevents cross-user access
> 
> Component tests:
> - Renders all toggles
> - Toggle triggers save
> - Shows feedback"

### Step 6: Security Review

**Prompt:**
> "Review this notification preferences code for security:
> 
> [PASTE ALL FILES]
> 
> Check:
> - Authentication/authorization
> - Input validation
> - Data exposure
> - CSRF protection"

### Step 7: Performance

**Prompt:**
> "Review for performance:
> 
> [PASTE FILES]
> 
> Consider:
> - Database queries
> - N+1 problems
> - Unnecessary re-renders
> - Caching opportunities"

### Step 8: Documentation

**Prompt:**
> "Create documentation for notification preferences:
> 
> - API documentation (endpoints, request/response)
> - Database schema documentation
> - Component usage guide
> - Environment variables needed"

---

## Deployment Checklist

- [ ] All tests pass
- [ ] Code reviewed
- [ ] Security audit complete
- [ ] Performance acceptable
- [ ] Documentation updated
- [ ] Environment variables set
- [ ] Monitoring configured
- [ ] Rollback plan ready
- [ ] Stakeholders notified
- [ ] Feature flags (if applicable)

---

## Exercise: Ship a Feature

Take a feature from idea to production:

1. Define requirements
2. Generate data model
3. Generate API
4. Generate frontend
5. Generate tests
6. Security review
7. Performance check
8. Documentation
9. Deployment checklist

---

## Key Takeaways

✅ Use PRODUCTION framework for complete workflow
✅ Generate in order: model → API → frontend → tests → docs
✅ Security and performance review before shipping
✅ Complete all checklist items
✅ Have a rollback plan`,
    week_number: 6,
    order_index: 26,
    estimated_minutes: 50,
    resources: { concepts: ['Production Workflow', 'Deployment'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Testing AI-Generated Code',
    content: `# Testing AI-Generated Code

⏱️ **45 minutes to complete**

## Why AI Code Needs More Testing

AI code works, but might have:
- Edge cases you didn't specify
- Subtle bugs in complex logic
- Security vulnerabilities
- Performance issues

**Testing is your safety net.**

---

## Testing Layers

### Layer 1: Unit Tests
Test individual functions/components

### Layer 2: Integration Tests
Test how pieces work together

### Layer 3: E2E Tests
Test complete user flows

---

## Test Generation Strategy

### For Functions

> "Write comprehensive tests for this function:
> 
> [PASTE FUNCTION]
> 
> Test cases:
> - Happy path with typical inputs
> - Edge cases: null, undefined, empty, boundary values
> - Error cases: invalid inputs
> - Type safety (if TypeScript)
> 
> Use Jest/Testing Library.
> Aim for 100% coverage."

### For Components

> "Write React Testing Library tests:
> 
> [PASTE COMPONENT]
> 
> Test:
> - Renders correctly
> - User interactions
> - Props variations
> - State changes
> - Accessibility
> - Error states
> 
> Prefer getByRole over getByTestId."

### For API Endpoints

> "Write integration tests for this endpoint:
> 
> [PASTE ENDPOINT]
> 
> Test:
> - Successful requests
> - Authentication
> - Authorization
> - Validation errors
> - Edge cases
> 
> Use test database. Clean up after tests."

---

## Testing Anti-Patterns to Avoid

❌ **Testing implementation details** — Test behavior, not how it's implemented
❌ **Brittle selectors** — Avoid deep DOM paths
❌ **Missing cleanup** — Tests should be isolated
❌ **Overspecified tests** — Don't test every prop separately
❌ **No error cases** — Test what goes wrong

---

## The Test Quality Checklist

- [ ] Tests describe behavior, not implementation
- [ ] Tests are independent (can run in any order)
- [ ] Tests are deterministic (no flakiness)
- [ ] Edge cases are covered
- [ ] Error cases are tested
- [ ] Tests clean up after themselves
- [ ] Tests run fast (unit < 1s, integration < 10s)

---

## Exercise: Test a Feature

Generate comprehensive tests for the notification preferences feature from the previous lesson.

Include:
- Unit tests for utility functions
- Component tests for UI
- Integration tests for API

---

## Key Takeaways

✅ AI code needs thorough testing
✅ Test at multiple levels: unit, integration, E2E
✅ Test behavior, not implementation
✅ Cover edge cases and error states
✅ Ensure tests are deterministic and fast`,
    week_number: 6,
    order_index: 27,
    estimated_minutes: 45,
    resources: { concepts: ['Testing', 'Unit Tests', 'Integration Tests'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Deployment Workflows with AI',
    content: `# Deployment Workflows with AI

⏱️ **40 minutes to complete**

## AI for DevOps

AI can help with deployment configuration, CI/CD pipelines, and infrastructure as code.

---

## What AI Can Generate

✅ **Docker configurations**
✅ **CI/CD pipelines** (GitHub Actions, GitLab CI, etc.)
✅ **Kubernetes manifests**
✅ **Terraform scripts**
✅ **Deployment scripts**
✅ **Monitoring configurations**

---

## Deployment Prompts

### Docker Configuration

> "Create a Dockerfile for this application:
> 
> Stack: [FRAMEWORK/LANGUAGE]
> Build steps: [STEPS]
> Environment variables: [LIST]
> Port: [NUMBER]
> 
> Requirements:
> - Multi-stage build for smaller image
> - Security best practices
> - Health check
> - Proper .dockerignore"

### GitHub Actions

> "Create a GitHub Actions workflow for:
> 
> Application: [TYPE]
> Stack: [TECHNOLOGIES]
> 
> Workflow:
> 1. On push to main
> 2. Run tests
> 3. Build application
> 4. Deploy to [PLATFORM]
> 
> Include:
> - Caching for faster builds
> - Environment secrets reference
> - Deployment to staging on PRs
> - Deployment to production on main merge"

### Environment Configuration

> "Create environment configuration for:
> 
> Environments: development, staging, production
> Variables needed: [LIST]
> 
> Include:
> - .env.example file
> - Documentation for each variable
> - Validation script"

---

## Deployment Checklist Prompt

> "Create a deployment checklist for this feature:
> 
> [DESCRIBE FEATURE]
> 
> Include:
> - Pre-deployment steps
> - Deployment steps
> - Post-deployment verification
> - Rollback steps
> - Monitoring/alerting setup"

---

## Monitoring Setup

> "Set up monitoring for this application:
> 
> Platform: [NEW RELIC/DATADOG/ETC]
> Application type: [TYPE]
> 
> Include:
> - Health checks
> - Error tracking
> - Performance monitoring
> - Alert rules
> - Dashboard configuration"

---

## Exercise: Create Deployment Pipeline

For a Next.js application:

1. Generate Dockerfile
2. Generate GitHub Actions workflow
3. Generate environment configuration
4. Generate health check endpoint
5. Generate monitoring setup

---

## Key Takeaways

✅ AI generates deployment configs, CI/CD, IaC
✅ Be specific about platform and requirements
✅ Include security best practices in prompts
✅ Always review generated infrastructure code
✅ Test deployment workflows`,
    week_number: 6,
    order_index: 28,
    estimated_minutes: 40,
    resources: { concepts: ['Deployment', 'CI/CD', 'Docker'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Vibe Coding Ethics & Best Practices',
    content: `# Vibe Coding Ethics & Best Practices

⏱️ **40 minutes to complete**

## The Ethical Vibe Coder

With great power comes great responsibility.

---

## Ethical Considerations

### 1. Code Ownership

**Question:** Who owns AI-generated code?

**Best practice:**
- Understand AI tool terms of service
- Your company likely owns code you generate at work
- Attribute significant AI assistance when appropriate

### 2. Security & Privacy

**Risks:**
- Sending proprietary code to AI services
- AI potentially including sensitive data in output

**Best practice:**
- Don't send secrets to AI
- Review AI output for accidental data exposure
- Use enterprise AI solutions for sensitive code

### 3. Attribution

**Question:** Should you disclose AI assistance?

**Best practice:**
- Be transparent in academic settings
- Disclose when required by company policy
- Credit AI tools in documentation if significant

### 4. Quality Responsibility

**Truth:** You are responsible for AI-generated code, not the AI.

**Best practice:**
- Always review before shipping
- Test thoroughly
- Maintain same quality standards as manual code

### 5. Intellectual Property

**Risks:**
- AI might generate code similar to training data
- Potential copyright issues

**Best practice:**
- Don't ask AI to clone proprietary code
- Use AI for original solutions
- Be cautious with obvious patent situations

---

## Professional Best Practices

### Practice 1: Never Ship Blind
Always understand AI-generated code before shipping.

### Practice 2: Maintain Standards
AI doesn't lower the bar—you enforce quality.

### Practice 3: Document AI Assistance
Note when AI significantly contributed to complex features.

### Practice 4: Security First
AI doesn't understand your security context—you do.

### Practice 5: Continuous Learning
Don't let AI make you lazy. Keep learning fundamentals.

---

## The Vibe Coder's Oath

\`\`\`
I will understand every line of code I ship.
I will test AI-generated code as thoroughly as my own.
I will prioritize security and privacy.
I will give credit where due.
I will continue learning, not just prompting.
I will use AI as a tool, not a crutch.
\`\`\`

---

## Navigating Workplace Policies

**Questions to ask:**
- What's our policy on AI coding tools?
- Are there approved tools?
- What code can/can't be shared with AI?
- How should we document AI assistance?

---

## Exercise: Ethics Scenarios

Discuss these scenarios:

1. **Scenario:** AI generates code that closely resembles a copyrighted library.
   - What do you do?

2. **Scenario:** Your company bans AI tools, but you used one to meet a deadline.
   - What should you have done?

3. **Scenario:** AI introduces a security vulnerability that causes a breach.
   - Who is responsible?

---

## Key Takeaways

✅ You own AI-generated code and its issues
✅ Never send sensitive data to AI services
✅ Maintain same quality standards
✅ Be transparent when required
✅ Keep learning fundamentals
✅ AI is a tool, not a replacement for skill`,
    week_number: 6,
    order_index: 29,
    estimated_minutes: 40,
    resources: { concepts: ['Ethics', 'Best Practices', 'Security'] }
  },

  {
    course_id: COURSE_ID,
    title: 'Your Vibe Coding Future: Staying Current',
    content: `# Your Vibe Coding Future: Staying Current

⏱️ **35 minutes to complete**

## The Evolving Landscape

AI coding tools improve monthly. What's cutting-edge today is outdated tomorrow.

Staying current is essential.

---

## How to Stay Current

### 1. Follow AI Tool Updates

**Watch for:**
- New model releases (GPT-5, Claude updates)
- Feature additions to Cursor, Copilot, etc.
- New AI-native tools

**Sources:**
- Tool blogs and changelogs
- AI Twitter/X communities
- Developer newsletters

### 2. Practice New Capabilities

When tools update:
- Try new features immediately
- Update your prompt patterns
- Share learnings with team

### 3. Community Learning

**Join:**
- AI coding Discord servers
- Reddit communities (r/LocalLLaMA, r/ClaudeAI)
- Twitter/X AI communities

**Share:**
- Your prompt patterns
- What works/doesn't
- Learnings from failures

---

## Skills That Remain Valuable

Despite AI advancement, these human skills become MORE valuable:

### 1. System Design
AI generates components. You design systems.

### 2. Product Judgment
AI doesn't know what users want. You do.

### 3. Problem Decomposition
Breaking down complex problems is a human skill.

### 4. Code Review
Critical evaluation of AI output.

### 5. Security Thinking
Understanding threats and mitigations.

### 6. Communication
Explaining technical decisions to stakeholders.

---

## Building Your Vibe Coding Stack

### Essential Tools
- Primary AI editor (Cursor/Windsurf/Copilot)
- Conversational AI (Claude/GPT-4)
- Specialized tools for your stack

### Supporting Tools
- Testing frameworks
- Documentation generators
- Code review helpers

### Workflow Optimization
- Keyboard shortcuts
- Custom prompts
- Context files
- Integration scripts

---

## The 10% Rule

Spend 10% of your coding time on:
- Learning new AI capabilities
- Improving your prompting
- Optimizing your workflow
- Sharing knowledge with others

---

## Your Growth Path

### Beginner → Intermediate
- Master basic prompting
- Build complete features with AI
- Learn to review AI code effectively

### Intermediate → Advanced
- Develop custom prompt patterns
- Optimize AI workflows
- Handle complex, multi-file projects

### Advanced → Expert
- Contribute to AI coding community
- Train others in vibe coding
- Push boundaries of what's possible

---

## Course Completion

🎉 **Congratulations!**

You've completed the Vibe Coding Masterclass.

### What You Learned

- ✅ Vibe coding fundamentals and mindset
- ✅ Prompt engineering for code
- ✅ AI capabilities and limitations
- ✅ Code review and security
- ✅ Testing AI-generated code
- ✅ Production workflows
- ✅ Ethics and best practices

### Your Next Steps

1. **Practice daily** — Use vibe coding for real work
2. **Build projects** — Create portfolio pieces with AI
3. **Share knowledge** — Teach others what you learn
4. **Stay current** — Keep up with AI developments
5. **Push boundaries** — Find new ways to leverage AI

---

## Final Exercise

Create a "Vibe Coding Manifesto" for yourself:

1. What principles will you follow?
2. What will you always do?
3. What will you never do?
4. How will you stay current?
5. How will you measure success?

---

## Thank You

You're now equipped to code at the speed of thought. The future of development is conversational, and you're prepared.

**Go build something amazing.** 🚀

---

## Key Takeaways

✅ Stay current with AI tool updates
✅ Human skills (design, judgment, review) remain valuable
✅ Spend 10% of time on learning/optimization
✅ Build your personal vibe coding stack
✅ Share knowledge with the community
✅ Keep pushing boundaries`,
    week_number: 6,
    order_index: 30,
    estimated_minutes: 35,
    resources: {
      links: [
        { title: 'Cursor', url: 'https://cursor.sh' },
        { title: 'Claude', url: 'https://claude.ai' },
        { title: 'GitHub Copilot', url: 'https://github.com/features/copilot' }
      ],
      concepts: ['Continuous Learning', 'Future of AI Coding']
    }
  }
];

async function main() {
  console.log('🎓 Adding Vibe Coding Masterclass Content...');
  console.log(`📚 Course ID: ${COURSE_ID}`);
  console.log(`📝 Creating ${lessons.length} comprehensive lessons...\n`);

  // Check if lessons already exist
  const { data: existingLessons, error: checkError } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('course_id', COURSE_ID);

  if (checkError) {
    console.error('❌ Error checking existing lessons:', checkError);
    return;
  }

  if (existingLessons && existingLessons.length > 0) {
    console.log(`⚠️  Found ${existingLessons.length} existing lessons. Deleting them first...`);
    
    const { error: deleteError } = await supabase
      .from('lessons')
      .delete()
      .eq('course_id', COURSE_ID);
    
    if (deleteError) {
      console.error('❌ Error deleting existing lessons:', deleteError);
      return;
    }
    console.log('✅ Deleted existing lessons\n');
  }

  // Insert lessons in batches
  const batchSize = 5;
  let inserted = 0;

  for (let i = 0; i < lessons.length; i += batchSize) {
    const batch = lessons.slice(i, i + batchSize);
    
    const { error: insertError } = await supabase
      .from('lessons')
      .insert(batch);

    if (insertError) {
      console.error(`❌ Error inserting batch ${Math.floor(i/batchSize) + 1}:`, insertError);
      console.error('Problematic batch:', batch.map(l => l.title));
      return;
    }

    inserted += batch.length;
    console.log(`✅ Inserted ${inserted}/${lessons.length} lessons...`);
  }

  // Calculate total estimated time
  const totalMinutes = lessons.reduce((acc, l) => acc + (l.estimated_minutes || 30), 0);
  const totalHours = Math.round(totalMinutes / 60);

  console.log(`\n🎉 Successfully created ${lessons.length} lessons!`);
  console.log('\n📊 Course Summary:');
  console.log('   - Duration: 6 weeks');
  console.log(`   - Total Lessons: ${lessons.length}`);
  console.log(`   - Estimated Learning Time: ~${totalHours} hours`);
  console.log('\n📚 Lesson Breakdown:');
  console.log('   Week 1: Foundations (5 lessons)');
  console.log('   Week 2: The Art of Description (5 lessons)');
  console.log('   Week 3: Review & Refine (5 lessons)');
  console.log('   Week 4: Intermediate Techniques (5 lessons)');
  console.log('   Week 5: Advanced Workflows (5 lessons)');
  console.log('   Week 6: Production & Beyond (5 lessons)');
  console.log('\n✨ Course is ready for students!');
}

main().catch(console.error);
