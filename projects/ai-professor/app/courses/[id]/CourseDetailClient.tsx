'use client'

export default function CourseDetailClient({ courseId }: { courseId: string }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Course: {courseId}
        </h1>
        <p>If you can see this, the basic rendering works.</p>
      </div>
    </div>
  )
}
