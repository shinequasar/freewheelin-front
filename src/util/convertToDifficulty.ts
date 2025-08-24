import type { Problem } from '../types/apiType'

export const getDifficultyCounts = (problems: Problem[]) => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  problems.forEach((problem) => {
    counts[problem.level as keyof typeof counts]++
  })
  return counts
}

export const difficultyText = {
  1: '하',
  2: '중하',
  3: '중',
  4: '상',
  5: '최상',
}

export const difficultyColor = {
  1: 'text-difficulty-easy',
  2: 'text-difficulty-easyMedium',
  3: 'text-difficulty-medium',
  4: 'text-difficulty-mediumHard',
  5: 'text-difficulty-hard',
}
