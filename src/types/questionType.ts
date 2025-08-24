import type { Problem } from './apiType'

export type Difficulty = 'easy' | 'easyMedium' | 'medium' | 'mediumHard' | 'hard'
export interface CardProps {
  number: number
  title: string
  imageUrl: string
  difficulty: 'easy' | 'easyMedium' | 'medium' | 'mediumHard' | 'hard'
  percentage: number
  type: string
  questionCode: number
}

export interface SimilarQuestionCardProps {
  problem: Problem
  number: number
}

export interface QuestionCardProps {
  problem: Problem
  number: number
}
