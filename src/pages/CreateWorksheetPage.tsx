import { useEffect } from 'react'
import { getProblems, getSimilarProblems } from '../api/service/worksheetService'
import QuestionList from '../components/worksheet/QuestionList'
import SimilarQuestionList from '../components/worksheet/SimilarQuestionList'
import { useQuestionStore } from '../store/questionStore'

const CreateWorksheetPage = () => {
  const {
    worksheetProblems,
    similarProblems,
    setWorksheetProblems,
    setSimilarProblems,
    activeQuestionId,
    isReplacedProblem,
  } = useQuestionStore()

  useEffect(() => {
    getProblems().then((res) => {
      setWorksheetProblems(res.data)
    })
  }, [setWorksheetProblems])

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
          console.error(err)
        })
    } else {
      setSimilarProblems([])
    }
  }, [activeQuestionId, setSimilarProblems, isReplacedProblem]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex h-screen justify-center p-8">
      <SimilarQuestionList similarProblems={similarProblems} />
      <QuestionList problems={worksheetProblems} />
    </div>
  )
}

export default CreateWorksheetPage
