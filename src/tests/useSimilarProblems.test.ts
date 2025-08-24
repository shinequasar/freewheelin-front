import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSimilarProblems } from '../hooks/worksheet/useSimilarProblems'
import { useQuestionStore } from '../store/questionStore'
import { getSimilarProblems } from '../api/service/worksheetService'
import type { Problem } from '../types/apiType'

vi.mock('../api/service/worksheetService', () => ({
  getSimilarProblems: vi.fn(),
}))

vi.mock('../store/questionStore', () => ({
  useQuestionStore: vi.fn(),
}))

const mockGetSimilarProblems = vi.mocked(getSimilarProblems)
const mockUseQuestionStore = vi.mocked(useQuestionStore)

describe('useSimilarProblems', () => {
  const mockSetSimilarProblems = vi.fn()
  const mockIsReplacedProblem = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseQuestionStore.mockReturnValue({
      worksheetProblems: [
        { id: 1, title: '문제 1', level: 1, type: 1, answerRate: 85, problemImageUrl: '' },
        { id: 2, title: '문제 2', level: 2, type: 1, answerRate: 70, problemImageUrl: '' },
      ],
      similarProblems: [],
      setSimilarProblems: mockSetSimilarProblems,
      activeQuestionId: null,
      isReplacedProblem: mockIsReplacedProblem,
    })
  })

  it('activeQuestionId가 null이면 similarProblems를 빈 배열로 설정해야 한다', () => {
    mockUseQuestionStore.mockReturnValue({
      worksheetProblems: [],
      similarProblems: [],
      setSimilarProblems: mockSetSimilarProblems,
      activeQuestionId: null,
      isReplacedProblem: mockIsReplacedProblem,
    } satisfies ReturnType<typeof useQuestionStore>)

    renderHook(() => useSimilarProblems())

    expect(mockSetSimilarProblems).toHaveBeenCalledWith([])
  })

  it('활성화된 문제가 교체된 문제면 API 호출하지 않아야 한다', () => {
    mockUseQuestionStore.mockReturnValue({
      worksheetProblems: [
        { id: 1, title: '문제 1', level: 1, type: 1, answerRate: 85, problemImageUrl: '' },
      ],
      similarProblems: [],
      setSimilarProblems: mockSetSimilarProblems,
      activeQuestionId: 1,
      isReplacedProblem: mockIsReplacedProblem,
    } satisfies ReturnType<typeof useQuestionStore>)

    mockIsReplacedProblem.mockReturnValue(true)

    renderHook(() => useSimilarProblems())

    expect(mockGetSimilarProblems).not.toHaveBeenCalled()
  })

  it('활성화된 문제가 교체되지 않은 문제면 유사 문제를 가져와야 한다', async () => {
    const mockSimilarProblems = [
      { id: 3, title: '유사 문제 1', level: 1, type: 1, answerRate: 80, problemImageUrl: '' },
    ]

    mockUseQuestionStore.mockReturnValue({
      worksheetProblems: [
        { id: 1, title: '문제 1', level: 1, type: 1, answerRate: 85, problemImageUrl: '' },
        { id: 2, title: '문제 2', level: 2, type: 1, answerRate: 70, problemImageUrl: '' },
      ],
      similarProblems: [],
      setSimilarProblems: mockSetSimilarProblems,
      activeQuestionId: 1,
      isReplacedProblem: mockIsReplacedProblem,
    } satisfies ReturnType<typeof useQuestionStore>)

    mockIsReplacedProblem.mockReturnValue(false)
    mockGetSimilarProblems.mockResolvedValue({ data: mockSimilarProblems as Problem[] })

    renderHook(() => useSimilarProblems())

    await waitFor(() => {
      expect(mockGetSimilarProblems).toHaveBeenCalledWith(1, [2])
      expect(mockSetSimilarProblems).toHaveBeenCalledWith(mockSimilarProblems)
    })
  })

  it('API 호출 실패 시 에러를 처리해야 한다', async () => {
    const mockError = new Error('API 호출 실패')

    mockUseQuestionStore.mockReturnValue({
      worksheetProblems: [
        { id: 1, title: '문제 1', level: 1, type: 1, answerRate: 85, problemImageUrl: '' },
      ],
      similarProblems: [],
      setSimilarProblems: mockSetSimilarProblems,
      activeQuestionId: 1,
      isReplacedProblem: mockIsReplacedProblem,
    } satisfies ReturnType<typeof useQuestionStore>)

    mockIsReplacedProblem.mockReturnValue(false)
    mockGetSimilarProblems.mockRejectedValue(mockError)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    renderHook(() => useSimilarProblems())

    await waitFor(() => {
      expect(mockGetSimilarProblems).toHaveBeenCalledWith(1, [])
      expect(consoleSpy).toHaveBeenCalledWith('= 유사문제를 가져올 수 없습니다.', mockError)
    })

    consoleSpy.mockRestore()
  })
})
