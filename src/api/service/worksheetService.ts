import type { GetProblemsResponse } from '../../types/apiType'
import apiInstance from '../common/apiInstance'

//문제리스트 조회 API
function getProblems(): Promise<GetProblemsResponse> {
  return apiInstance.get('/problems')
}

//유사문제 리스트 조회 API
function getSimilarProblems(
  problemId: number,
  excludedProblemIds?: number[],
): Promise<GetProblemsResponse> {
  return apiInstance.get(
    `/problems/${problemId}/similarity?excludedProblemIds=${excludedProblemIds?.join(',')}`,
  )
}

export { getProblems, getSimilarProblems }
