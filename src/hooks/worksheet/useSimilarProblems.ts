import { useEffect } from 'react'
import { getSimilarProblems } from '../../api/service/worksheetService'
import { useQuestionStore } from '../../store/questionStore'

export const useSimilarProblems = () => {
  const { worksheetProblems, setSimilarProblems, activeQuestionId, isReplacedProblem } =
    useQuestionStore()

  useEffect(() => {
    if (activeQuestionId && activeQuestionId !== -1) {
      if (isReplacedProblem(activeQuestionId)) return

      const excludedProblemIds = worksheetProblems
        .filter((problem) => problem.id !== activeQuestionId)
        .map((problem) => problem.id)

      getSimilarProblems(activeQuestionId, excludedProblemIds)
        .then((res) => {
          setSimilarProblems(res.data)
        })
        .catch((err) => {
          console.error('= 유사문제를 가져올 수 없습니다.', err)
        })
    } else {
      setSimilarProblems([])
    }
  }, [activeQuestionId, worksheetProblems, setSimilarProblems, isReplacedProblem])
}
