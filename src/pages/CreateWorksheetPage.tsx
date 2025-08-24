import QuestionList from '../components/worksheet/QuestionList'
import SimilarQuestionList from '../components/worksheet/SimilarQuestionList'
import { useQuestionStore } from '../store/questionStore'
import { useWorksheetProblems } from '../hooks/worksheet/useWorksheetProblems'
import { useSimilarProblems } from '../hooks/worksheet/useSimilarProblems'

const CreateWorksheetPage = () => {
  useWorksheetProblems()
  useSimilarProblems()

  const { worksheetProblems, similarProblems } = useQuestionStore()

  return (
    <div className="flex h-screen justify-center p-8">
      <SimilarQuestionList similarProblems={similarProblems} />
      <QuestionList problems={worksheetProblems} />
    </div>
  )
}

export default CreateWorksheetPage
