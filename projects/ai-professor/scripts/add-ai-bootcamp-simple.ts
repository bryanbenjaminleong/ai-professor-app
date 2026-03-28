import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data: users } = await supabase.from('users').select('id').limit(1)
  const instructorId = users?.[0]?.id
  
  if (!instructorId) {
    console.error('No users found')
    return
  }

  // Create course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert({
      title: 'AI Engineer Bootcamp',
      description: 'Master AI engineering from fundamentals to production deployment. 8 weeks covering prompt engineering, LLMs, RAG, agents, function calling, orchestration, testing, and deployment.',
      topic: 'AI Engineering',
      difficulty: 'intermediate',
      duration_weeks: 8,
      is_published: true,
      instructor_id: instructorId,
    })
    .select()
    .single()

  if (courseError || !course) {
    console.error('Error:', courseError)
    return
  }
  
  console.log('Created course:', course.id)

  // Add 8 lessons (one per week)
  const lessons = [
    { title: 'Prompt Engineering Mastery', content: '# Week 1: Prompt Engineering\n\nMaster the art and science of prompt engineering.\n\n## Topics\n- Zero-shot, few-shot, chain-of-thought prompting\n- Prompt templates and patterns\n- Testing and optimizing prompts', week_number: 1, order_index: 1 },
    { title: 'LLM Fundamentals & APIs', content: '# Week 2: LLM Fundamentals\n\nDeep dive into Large Language Models.\n\n## Topics\n- How LLMs work (transformers, attention)\n- Working with OpenAI, Claude, Gemini APIs\n- Token economics and cost management', week_number: 2, order_index: 2 },
    { title: 'RAG Systems & Vector Databases', content: '# Week 3: RAG Systems\n\nBuild Retrieval-Augmented Generation systems.\n\n## Topics\n- Vector databases (Pinecone, Weaviate, Chroma)\n- Embedding strategies\n- Chunking and retrieval optimization', week_number: 3, order_index: 3 },
    { title: 'AI Agent Architecture', content: '# Week 4: AI Agents\n\nBuild autonomous AI agents.\n\n## Topics\n- Agent patterns (ReAct, Plan-and-Execute)\n- Memory systems\n- Planning and execution loops', week_number: 4, order_index: 4 },
    { title: 'Function Calling & Tools', content: '# Week 5: Function Calling\n\nConnect AI to real tools and APIs.\n\n## Topics\n- OpenAI function calling\n- Tool use patterns\n- Building custom tools', week_number: 5, order_index: 5 },
    { title: 'API Integration & Orchestration', content: '# Week 6: Orchestration\n\nOrchestrate complex AI workflows.\n\n## Topics\n- LangChain and LlamaIndex\n- Multi-agent systems\n- Workflow automation', week_number: 6, order_index: 6 },
    { title: 'Testing & Evaluation', content: '# Week 7: Testing AI Systems\n\nEnsure AI quality and reliability.\n\n## Topics\n- Testing strategies for AI\n- Evaluation frameworks\n- Monitoring and observability', week_number: 7, order_index: 7 },
    { title: 'Production Deployment', content: '# Week 8: Deploy to Production\n\nShip AI systems to production.\n\n## Topics\n- Deployment strategies\n- Scaling and cost optimization\n- Security and compliance', week_number: 8, order_index: 8 },
  ]

  for (const lesson of lessons) {
    const { error } = await supabase.from('lessons').insert({
      course_id: course.id,
      ...lesson,
    })
    if (error) console.error('Error adding lesson:', error)
  }
  
  console.log('Added', lessons.length, 'lessons')
  console.log('Done!')
}

main()
