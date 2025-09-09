import { ReactNode } from 'react'

// Base component props that most components will extend
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  id?: string
  'data-testid'?: string
}

// Common theme types
export type Theme = 'light' | 'dark' | 'system'

// Common size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Common color variants
export type ColorVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost'

// API response wrapper
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  error?: string
}

// User types (common across apps)
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'moderator'
  createdAt: string
  updatedAt: string
}

// Pagination types
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: ReactNode
  disabled?: boolean
  external?: boolean
  children?: NavItem[]
}
