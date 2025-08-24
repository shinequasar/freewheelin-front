type ProblemLevel = 1 | 2 | 3 | 4 | 5 // 1:하, 2:중하, 3:중, 4:상, 5:최상
type ProblemType = 1 | 2 // 1: 객관식, 2: 주관식

interface Problem {
  id: number
  level: ProblemLevel
  type: ProblemType
  problemImageUrl: string
  title: string
  answerRate: number
}
type GetProblemsResponse = {
  data: Problem[]
}
export type { Problem, ProblemLevel, ProblemType, GetProblemsResponse }
