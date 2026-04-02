'use client'

import Link from 'next/link'
import { Clock, BookOpen, ChevronRight, ArrowRight, Layers } from 'lucide-react'
import { Card, Badge } from '@/components/ui'

interface Program {
  id: string
  title: string
  slug: string
  description: string
  difficulty: string
  total_weeks: number
  modules: Module[]
  total_lessons: number
}

interface Module {
  id: string
  title: string
  description: string
  difficulty: string
  duration_weeks: number
  image_url?: string
  lesson_count: number
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

const PROGRAM_ICONS: Record<string, string> = {
  'Digital Transformation': '🏗️',
  'AI Strategy': '🤖',
  'Leading Through Change': '🏔️',
  'Risk Mastery': '🛡️',
}

export default function ProgramsClient({ programs }: { programs: Program[] }) {
  if (programs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No programs available yet.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Programs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Master a complete discipline with our 4-module programs. Each program includes 24 lessons, hands-on projects, and capstone assessments.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> 4 Programs</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 16 Courses</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 96 Lessons</span>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="space-y-8">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden card-hover">
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{PROGRAM_ICONS[program.title] || '📚'}</span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{program.title}</h2>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={DIFFICULTY_COLORS[program.difficulty] || DIFFICULTY_COLORS.intermediate}>
                        {program.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {program.total_weeks} weeks
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {program.total_lessons} lessons
                      </span>
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">$49.99</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{program.description}</p>

                {/* Modules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {program.modules.map((mod, i) => (
                    <Link
                      key={mod.id}
                      href={`/courses/${mod.id}`}
                      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all card-hover group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Module {i + 1}</span>
                        <Badge className={`text-xs ${DIFFICULTY_COLORS[mod.difficulty] || ''}`}>
                          {mod.difficulty}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {mod.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{mod.lesson_count} lessons</span>
                        <span>·</span>
                        <span>{mod.duration_weeks}w</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 group-hover:text-primary-500 transition-colors">
                        View course <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Or buy individual modules for $14.99 each
                  </span>
                  <Link
                    href="/pricing"
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                  >
                    View pricing <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
