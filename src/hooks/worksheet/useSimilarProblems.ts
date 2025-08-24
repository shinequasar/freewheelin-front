import { useEffect, useMemo } from 'react'
import { getSimilarProblems } from '../../api/service/worksheetService'
import { useQuestionStore } from '../../store/questionStore'

export const useSimilarProblems = () => {
  const { worksheetProblems, setSimilarProblems, activeQuestionId, isReplacedProblem } =
    useQuestionStore()

  const excludedProblemIds = useMemo(() => {
    if (!activeQuestionId || activeQuestionId === -1) return []
    return worksheetProblems
      .filter((problem) => problem.id !== activeQuestionId)
      .map((problem) => problem.id)
  }, [activeQuestionId, worksheetProblems])

  useEffect(() => {
    if (activeQuestionId && activeQuestionId !== -1) {
      if (isReplacedProblem(activeQuestionId)) return

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
  }, [activeQuestionId, excludedProblemIds, setSimilarProblems, isReplacedProblem])
}
