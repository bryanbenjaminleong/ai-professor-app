'use client'

import Link from 'next/link'
import { BookOpen, HelpCircle, Mail, MessageSquare } from 'lucide-react'
import { Card, Button } from '@/components/ui'

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Get help with your account and courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">FAQ</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Find answers to commonly asked questions.</p>
          <Link href="/guides">
            <Button variant="outline" className="w-full">Browse Guides</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Support</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">We will get back to you within 24 hours.</p>
          <a href="mailto:support@pulseaiprofessor.com">
            <Button variant="outline" className="w-full">Send Email</Button>
          </a>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Community</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Join our AI learning community.</p>
          <Button variant="outline" className="w-full">Coming Soon</Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Report Issue</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Found a bug? Let us know.</p>
          <a href="mailto:support@pulseaiprofessor.com">
            <Button variant="outline" className="w-full">Report</Button>
          </a>
        </Card>
      </div>
    </div>
  )
}
