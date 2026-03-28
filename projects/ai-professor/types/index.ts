/**
 * Type Exports - Main entry point for commonly used types
 *
 * Type Organization:
 * - ./course.ts - Database Course types (used with Supabase operations)
 * - ./content.ts - Content generation types (used by scripts)
 * - ./database.ts - Auto-generated Supabase database types
 * - ./index.ts (this file) - UI/API types for frontend components
 */

// ===========================================
// Re-exports from database types
// ===========================================
export type {
  Course as DBCourse,
  Lesson as DBLesson,
  User as DBUser,
} from './database';

// ===========================================
// Re-exports from course types (DB operations)
// ===========================================
export type {
  Course as CourseDB,
  CourseListFilters,
  CreateCourseInput,
  UpdateCourseInput,
  CreateLessonInput,
  UpdateLessonInput,
  LessonResource,
  CourseSyllabus,
  ContentGenerationRequest,
  ContentType,
  GeneratedContent,
  LessonOutline,
  QuizQuestion as CourseQuizQuestion,
  Quiz as CourseQuiz,
  Exercise as CourseExercise,
  ResearchRequest,
  ResearchSource as CourseResearchSource,
  ResearchUpdate,
  CourseAnalytics,
  EnrollInCourseInput,
  EnrollmentWithCourse,
} from './course';

export { TOPICS, isValidTopic, calculateCourseProgress, getDifficultyLevel } from './course';
export type { Topic, DifficultyLevel } from './database';

// ===========================================
// UI/API Course Types (for frontend display)
// ===========================================

/**
 * UI Course - Used for frontend display and API responses
 * This is separate from DBCourse which maps directly to the database
 */
export interface UICourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: Instructor;
  level: CourseLevel;
  duration: string;
  weeklyHours: number;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  topics: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  curriculum: CurriculumWeek[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * @deprecated Use UICourse for frontend or CourseDB for database operations
 */
export type Course = UICourse;

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CurriculumWeek {
  week: number;
  title: string;
  description: string;
  lessons: UILesson[];
  duration: string;
}

export interface UILesson {
  id: string;
  week: number;
  order: number;
  title: string;
  description: string;
  videoUrl?: string;
  videoDuration?: string;
  content: string;
  codeExamples?: CodeExample[];
  quiz?: UIQuiz;
  completed?: boolean;
}

/**
 * @deprecated Use UILesson
 */
export type Lesson = UILesson;

export interface CodeExample {
  language: string;
  code: string;
  filename?: string;
}

export interface UIQuiz {
  id: string;
  title: string;
  questions: UIQuizQuestion[];
}

/**
 * @deprecated Use UIQuiz
 */
export type Quiz = UIQuiz;

export interface UIQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

/**
 * @deprecated Use UIQuizQuestion
 */
export type QuizQuestion = UIQuizQuestion;

// ===========================================
// Instructor Types
// ===========================================

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  expertise: string[];
  rating: number;
  courseCount: number;
  studentCount: number;
}

// ===========================================
// User Types (UI)
// ===========================================

export interface UIUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  enrolledCourses: EnrolledCourse[];
  certificates: Certificate[];
  createdAt: string;
}

/**
 * @deprecated Use UIUser for frontend or User from database types
 */
export type User = UIUser;

export type UserRole = 'student' | 'instructor' | 'admin';

export interface EnrolledCourse {
  courseId: string;
  course: UICourse;
  progress: number;
  completedLessons: string[];
  currentLesson?: string;
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  credentialUrl: string;
}

// ===========================================
// Review Types
// ===========================================

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ===========================================
// Auth Types
// ===========================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  email: string;
}

// ===========================================
// API Response Types
// ===========================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ===========================================
// Filter Types
// ===========================================

export interface CourseFilters {
  search?: string;
  level?: CourseLevel;
  topics?: string[];
  sortBy?: 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high';
  page?: number;
}

// ===========================================
// Pricing Types
// ===========================================

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  recommended?: boolean;
  cta: string;
}

// ===========================================
// UI Types
// ===========================================

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ToastType = 'success' | 'error' | 'warning' | 'info';
