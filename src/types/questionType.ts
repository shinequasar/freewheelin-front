export interface CardProps {
  number: number
  title: string
  imageUrl: string
  difficulty: 'easy' | 'easyMedium' | 'medium' | 'mediumHard' | 'hard'
  percentage: number
  type: string
  questionCode?: number
}

export type Difficulty = 'easy' | 'easyMedium' | 'medium' | 'mediumHard' | 'hard'
