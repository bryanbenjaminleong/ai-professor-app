import { MetadataRoute } from 'next'
import { db } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pulseaiprofessor.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/breaking`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/paths`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic courses
  let coursePages: MetadataRoute.Sitemap = []
  try {
    const courses = await db.courses.getAll()
    coursePages = courses.map((course: any) => ({
      url: `${baseUrl}/courses/${course.id}`,
      lastModified: new Date(course.updated_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Failed to fetch courses for sitemap:', error)
  }

  // Quick guides (static IDs)
  const guideIds = [
    'guide-openclaw',
    'guide-chatgpt',
    'guide-claude',
    'guide-gemini',
    'guide-grok',
    'guide-kimi',
    'guide-perplexity',
    'guide-cursor',
    'guide-vscode',
    'guide-github',
    'guide-website',
    'guide-botfather', // Adding BotFather
  ]
  
  const guidePages: MetadataRoute.Sitemap = guideIds.map(id => ({
    url: `${baseUrl}/guides/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic news articles
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const news = await db.news.getRecent(50)
    newsPages = news.map((article: any) => ({
      url: `${baseUrl}/news/${article.id}`,
      lastModified: new Date(article.published_at || article.created_at || new Date()),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to fetch news for sitemap:', error)
  }

  return [...staticPages, ...coursePages, ...guidePages, ...newsPages]
}
