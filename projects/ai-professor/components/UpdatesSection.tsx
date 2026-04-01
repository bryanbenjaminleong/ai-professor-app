'use client'

import { useState, useEffect } from 'react'
import { Clock, Tag, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ChangelogEntry {
  version: number
  date: string
  type: 'major' | 'minor' | 'patch'
  summary: string
  lesson_ids?: string[]
}

interface ContentUpdate {
  id: string
  update_type: 'major' | 'minor' | 'patch'
  summary: string
  old_version: number
  new_version: number
  created_at: string
  lesson_id: string | null
}

interface LessonUpdateInfo {
  id: string
  title: string
  version: number
  changelog: ChangelogEntry[]
}

interface UpdatesSectionProps {
  courseId: string
  lessons: LessonUpdateInfo[]
  courseVersion: number
  courseChangelog: ChangelogEntry[]
}

const TYPE_COLORS: Record<string, string> = {
  major: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  minor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  patch: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

const TYPE_LABELS: Record<string, string> = {
  major: 'Major Update',
  minor: 'Minor Update',
  patch: 'Patch',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function UpdatesSection({
  courseId,
  lessons,
  courseVersion,
  courseChangelog,
}: UpdatesSectionProps) {
  const [contentUpdates, setContentUpdates] = useState<ContentUpdate[]>([])
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContentUpdates()
  }, [courseId])

  const fetchContentUpdates = async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}/updates`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setContentUpdates(data.data || [])
        }
      }
    } catch (err) {
      console.error('Failed to fetch content updates:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) => {
      const next = new Set(prev)
      if (next.has(lessonId)) {
        next.delete(lessonId)
      } else {
        next.add(lessonId)
      }
      return next
    })
  }

  // Find lessons that have been updated (version > 1)
  const updatedLessons = lessons.filter(
    (l) => l.version > 1 && Array.isArray(l.changelog) && l.changelog.length > 0
  )

  // Sort changelog by date descending
  const sortedChangelog = [...(courseChangelog || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </Card>
    )
  }

  // Don't show if there are no updates at all
  if (sortedChangelog.length === 0 && updatedLessons.length === 0 && contentUpdates.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Clock className="w-5 h-5" />
          <p className="text-sm">
            This course hasn&apos;t been reviewed yet. Content reviews run weekly to ensure freshness.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Course-level changelog */}
      {sortedChangelog.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" />
            Course Update History (v{courseVersion || 1})
          </h3>
          <div className="space-y-4">
            {sortedChangelog.map((entry, index) => (
              <div
                key={index}
                className={cn(
                  'flex gap-4 pb-4',
                  index < sortedChangelog.length - 1 &&
                    'border-b border-gray-100 dark:border-gray-800'
                )}
              >
                <Badge className={cn('flex-shrink-0 mt-0.5', TYPE_COLORS[entry.type] || TYPE_COLORS.patch)}>
                  {TYPE_LABELS[entry.type] || entry.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Version {entry.version}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Updated lessons */}
      {updatedLessons.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Updated Lessons ({updatedLessons.length})
          </h3>
          <div className="space-y-3">
            {updatedLessons.map((lesson) => {
              const isExpanded = expandedLessons.has(lesson.id)
              const lessonChangelog = [...(lesson.changelog || [])].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              )

              return (
                <div
                  key={lesson.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleLesson(lesson.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Badge className={TYPE_COLORS.minor}>v{lesson.version}</Badge>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {lesson.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800">
                      <div className="space-y-2">
                        {lessonChangelog.map((entry, idx) => (
                          <div key={idx} className="flex gap-3 text-sm">
                            <Badge
                              className={cn(
                                'flex-shrink-0 text-xs',
                                TYPE_COLORS[entry.type] || TYPE_COLORS.patch
                              )}
                            >
                              {entry.type}
                            </Badge>
                            <div>
                              <p className="text-gray-700 dark:text-gray-300">
                                {entry.summary}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                v{entry.version} · {formatDate(entry.date)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Recent content updates from the system */}
      {contentUpdates.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary-600" />
            Recent Content Reviews
          </h3>
          <div className="space-y-3">
            {contentUpdates.slice(0, 10).map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-3 text-sm"
              >
                <Badge className={cn('flex-shrink-0', TYPE_COLORS[update.update_type] || TYPE_COLORS.patch)}>
                  {update.update_type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 dark:text-gray-300">
                    {update.summary}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    v{update.old_version} → v{update.new_version} ·{' '}
                    {formatDate(update.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
