import { useEffect } from 'react'
import { getProblems } from '../../api/service/worksheetService'
import { useQuestionStore } from '../../store/questionStore'

export const useWorksheetProblems = () => {
  const { setWorksheetProblems } = useQuestionStore()

  useEffect(() => {
    getProblems()
      .then((res) => {
        setWorksheetProblems(res.data)
      })
      .catch((err) => {
        console.error('= 초기세팅 문제를 가져올 수 없습니다.', err)
      })
  }, [setWorksheetProblems])
}
