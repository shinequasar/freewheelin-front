export const convertLevelToDifficulty = (
  level: number,
): 'easy' | 'easyMedium' | 'medium' | 'mediumHard' | 'hard' => {
  switch (level) {
    case 1:
      return 'easy'
    case 2:
      return 'easyMedium'
    case 3:
      return 'medium'
    case 4:
      return 'mediumHard'
    case 5:
      return 'hard'
    default:
      return 'medium' // 기본값
  }
}
