import { useEffect, useState } from 'react'
import { getProblems, getSimilarProblems } from '../api/service/worksheetService'
import type { Problem } from '../api/apiType'
import QuestionList from '../components/worksheet/QuestionList'
import SimilarQuestionList from '../components/worksheet/SimilarQuestionList'
import { useQuestionStore } from '../store/questionStore'

const CreateWorksheetPage = () => {
  const [problems, setProblems] = useState<Problem[]>([])
  const [similarProblems, setSimilarProblems] = useState<Problem[]>([])

  useEffect(() => {
    getProblems().then((res) => {
      setProblems(res.data)
    })
  }, [])

  const activeQuestionId = useQuestionStore((state) => state.activeQuestionId)

  useEffect(() => {
    if (activeQuestionId && activeQuestionId !== -1) {
      getSimilarProblems(activeQuestionId)
        .then((res) => {
          setSimilarProblems(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      setSimilarProblems([])
    }
  }, [activeQuestionId])

  return (
    <div className="flex h-screen justify-center p-8">
      <SimilarQuestionList similarProblems={similarProblems} />
      <QuestionList problems={problems} />
    </div>
  )
}

export default CreateWorksheetPage
