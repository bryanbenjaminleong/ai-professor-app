# AI Professor — Content Audit Report
**Date:** March 31, 2026

## Executive Summary

24 Quick Guides and 5 Full Courses exist. Guides vary wildly in quality (2K–36K chars). Courses have thin lesson content (skeleton outlines, not teachable material). The Vibe Coding Masterclass is the only course with real depth (30 lessons). A standardized content template is needed before creating new material.

---

## 1. Quick Guides Audit (24 guides)

### Quality Tiers

**🟢 Excellent (deep, detailed, actionable):**
| Guide | Chars | Lessons | Why |
|-------|-------|---------|-----|
| VS Code Setup | 36,012 | 5 | Step-by-step, thorough |
| Grok (xAI) | 28,735 | 5 | Well-structured, complete |
| Kimi AI | 27,125 | 5 | Good depth and examples |
| Gemini | 24,909 | 5 | Comprehensive |
| Vibe Coding | 17,400 | 4 | Detailed, engaging |
| GitHub Basics | 15,820 | 4 | Practical, code examples |
| OpenClaw | 15,488 | 5 | Good beginner guide |
| Windsurf IDE | 15,473 | 5 | Solid content |
| Cursor | 11,668 | 5 | Good depth |

**🟡 Adequate (usable but thin):**
| Guide | Chars | Lessons | Issue |
|-------|-------|---------|-------|
| Voice AI | 12,072 | 5 | Could use more examples |
| ChatGPT | 9,222 | 5 | Surprisingly thin for the flagship topic |
| CrewAI | 6,465 | 5 | No checklists, needs hands-on projects |
| GitHub Copilot | 6,612 | 4 | Lacks advanced techniques |
| AI Image Gen | 5,573 | 5 | Needs more prompt examples |
| Fine-Tuning LLMs | 5,909 | 5 | Complex topic, too shallow |
| AI for Excel | 5,898 | 4 | Missing real spreadsheet examples |
| AI Email | 5,861 | 4 | Generic advice, few tools |
| AI Meetings | 5,578 | 4 | Lacks specific tool walkthroughs |
| No-Code AI Apps | 5,791 | 4 | Needs concrete builder tutorials |
| RAG & Knowledge | 7,284 | 5 | Technical but surface-level |
| BotFather | 4,382 | 4 | OK for scope but basic |
| Claude | 4,714 | 5 | Thin — Claude deserves more depth |

**🔴 Thin / Incomplete:**
| Guide | Chars | Lessons | Issue |
|-------|-------|---------|-------|
| Your First Website | 2,188 | 3 | No screenshots, no step-by-step build, just bullet points |
| Perplexity | 2,626 | 4 | Almost placeholder-level content |

### Common Issues Across Guides
1. **No screenshots/images** — all text, no visual walkthroughs
2. **No interactive elements** — no quizzes, no "try it yourself" exercises
3. **No prerequisites section** — users don't know what they need before starting
4. **Inconsistent structure** — some have checklists, some don't
5. **No difficulty progression** — lessons don't build on each other consistently
6. **No external links to docs** — missing official documentation references
7. **No estimated time per lesson** — only some guides have this
8. **No "next steps" / learning paths** — guides are isolated, not connected

---

## 2. Full Courses Audit (5 courses)

### Overview
| Course | Weeks | Lessons | Enrolled | Content Depth |
|--------|-------|---------|----------|---------------|
| AI Engineer Bootcamp | 8 | 8 | 0 | 🔴 Skeleton |
| Vibe Coding Masterclass | 6 | 30 | 0 | 🟢 Deep |
| Intro to ML | 8 | 8 | 0 | 🔴 Skeleton |
| Deep Learning | 12 | 12 | 0 | 🔴 Skeleton |
| NLP | 10 | 10 | 0 | 🔴 Skeleton |

### Critical Finding: 4 of 5 courses are outlines, not content

Example — AI Engineer Bootcamp Week 1 (60 min estimated):
```
# Week 1: Prompt Engineering

Master the art and science of prompt engineering.

## Topics
- Zero-shot, few-shot, chain-of-thought prompting
- Prompt templates and patterns
- Testing and optimizing prompts
```

That's 3 bullet points for a 60-minute lesson. Not teachable.

### What a real lesson needs (for comparison)
The Vibe Coding course does it right — 3,500+ chars per lesson with:
- Narrative introduction
- Code examples
- Step-by-step exercises
- Common mistakes
- Takeaways

### Course-Specific Issues

**AI Engineer Bootcamp**
- ✅ Good topic selection and progression
- ❌ Zero actual content — just topic outlines
- ❌ No hands-on projects
- ❌ No code examples

**Intro to Machine Learning**
- ✅ Good scope (8 weeks, fundamentals)
- ❌ Skeleton content only
- ❌ No Python code examples
- ❌ No datasets or exercises

**Deep Learning**
- ✅ Ambitious scope (12 weeks, CNN/RNN/Transformers)
- ❌ Skeleton content only
- ❌ No PyTorch code
- ❌ Too ambitious for current content level

**Natural Language Processing**
- ✅ Modern curriculum (transformers, RAG, fine-tuning)
- ❌ Skeleton content only
- ❌ No practical examples

**Vibe Coding Masterclass**
- ✅ 30 lessons with real content
- ✅ Engaging writing style
- ⚠️ Could still use more code examples and exercises

---

## 3. Structural Issues

### Guides
- All content is hardcoded in a single 11,474-line `GuideContent.tsx` file
- Not database-driven — can't be updated without a code deploy
- No content management system

### Courses
- Stored in Supabase (good)
- But course detail rendering has had issues (cache problems)
- No image_url set for any course (all null)
- No instructor profiles

### Missing Infrastructure
- No quiz/assessment system
- No progress tracking in guides (only courses)
- No certificate generation
- No payment/Stripe integration yet
- No content versioning

---

## 4. Recommended Template for Future Content

### Quick Guide Template (per guide)

```markdown
# [Guide Title]

## Meta
- **Topic:** [Category]
- **Difficulty:** beginner | intermediate | advanced
- **Duration:** [X] lessons, ~[Y] minutes total
- **Prerequisites:** [What user needs before starting]
- **Tools needed:** [List of tools/accounts]

## Lesson Structure (each lesson):

### [Lesson N: Title]

**⏱ Time:** ~[X] minutes
**🎯 Goal:** [What user will accomplish]

#### Overview
[2-3 paragraph introduction explaining WHY this matters]

#### Content
[Detailed step-by-step content with:]
- Headers (##, ###) for structure
- **Bold** for key terms
- Code blocks for commands/code
- Comparison tables where relevant
- Emoji sparingly for visual markers (⚠️ tips, ✅ actions)

#### Try It Yourself
[1-2 hands-on exercises with clear instructions]

#### Key Takeaways
- [3-5 bullet points summarizing the lesson]

#### Troubleshooting (if applicable)
- **Problem:** [common issue] → **Fix:** [solution]

---

## Quality Checklist (before publishing):
- [ ] Each lesson has 1,500+ characters of content
- [ ] At least one hands-on exercise per lesson
- [ ] Code examples work (test them!)
- [ ] External links to official docs included
- [ ] No jargon without explanation
- [ ] Mobile-friendly formatting (short paragraphs)
- [ ] "Next steps" at the end pointing to related guides/courses
```

### Full Course Template (per lesson/week)

```markdown
# Week [N]: [Lesson Title]

## Meta
- **Week:** [N] of [Total]
- **Estimated time:** [X] minutes
- **Prerequisites:** [Previous week's concepts]
- **Deliverable:** [What student will build/complete]

---

## 🎯 Learning Objectives
By the end of this week, you will be able to:
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

---

## 📖 Lesson Content

### Introduction (2-3 paragraphs)
[Why this topic matters, real-world context, what we'll build]

### Section 1: [Concept Name]
[Detailed explanation with examples]

#### Code Example
```[language]
// Working, tested code example
```

#### Explanation
[Line-by-line walkthrough of what the code does]

### Section 2: [Next Concept]
[Continue building on Section 1]

### Common Mistakes
⚠️ **Mistake 1:** [description] → **Do this instead:** [correct approach]
⚠️ **Mistake 2:** [description] → **Do this instead:** [correct approach]

---

## 🔨 Hands-On Project
[Build something that applies the week's concepts]

**Requirements:**
- [Requirement 1]
- [Requirement 2]

**Starter code:** [link or inline]
**Expected output:** [description or screenshot]

---

## ✅ Knowledge Check
1. [Question 1 - conceptual]
2. [Question 2 - practical]
3. [Question 3 - debugging scenario]

---

## 📚 Resources
- [Official documentation link]
- [Recommended reading]
- [Community/forum link]

---

## 🚀 Next Week Preview
[Brief teaser of what's coming next]
```

### Course-Level Template (metadata)

```yaml
title: [Course Title]
description: [1-2 sentences for card display]
topic: [Category]
difficulty: beginner | intermediate | advanced
duration_weeks: [N]
image_url: [Unsplash/stock image URL]
is_published: false  # true only when ALL lessons are complete

# Course must have:
# - Complete description (not just topic list)
# - Cover image
# - All lessons filled out (5,000+ chars each)
# - At least 1 hands-on project per 2 weeks
# - Final project spanning last 2 weeks
# - Prerequisites clearly stated
# - Learning outcomes listed
```

---

## 5. Priority Actions

### Before Soft Launch
1. **Flesh out 4 skeleton courses** (or unpublish them) — empty courses look unprofessional
2. **Expand thin guides** (Website builder, Perplexity) to minimum 5K chars
3. **Add cover images** to all 5 courses (currently all null)
4. **Add "next steps"** at end of each guide linking to related content

### Post-Launch
5. Build quiz/assessment system for courses
6. Add Stripe payment integration for premium courses
7. Create content management (move guides out of hardcoded TSX)
8. Add progress tracking for guides (not just courses)
9. Build learning paths (connect guides → courses → specializations)

### Content Gaps (topics to add)
- **Prompt Engineering** (dedicated guide — currently only in course)
- **AI Safety & Ethics** (guide)
- **AI for Business** (guide)
- **Building AI SaaS Products** (course)
- **AI Agents & Automation** (course — broader than CrewAI guide)
- **Computer Vision** (course)

---

_Report generated by STAR_
