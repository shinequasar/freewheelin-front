import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWorksheetProblems } from '../hooks/worksheet/useWorksheetProblems'
import { useQuestionStore } from '../store/questionStore'
import { getProblems } from '../api/service/worksheetService'
import type { Problem } from '../types/apiType'

vi.mock('../api/service/worksheetService', () => ({
  getProblems: vi.fn(),
}))

vi.mock('../store/questionStore', () => ({
  useQuestionStore: vi.fn(),
}))

const mockGetProblems = vi.mocked(getProblems)
const mockUseQuestionStore = vi.mocked(useQuestionStore)

describe('useWorksheetProblems', () => {
  const mockSetWorksheetProblems = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseQuestionStore.mockReturnValue({
      setWorksheetProblems: mockSetWorksheetProblems,
      worksheetProblems: [],
    })
  })

  it('컴포넌트 마운트 시 문제 목록을 가져와야 한다', async () => {
    const mockProblems = [
      { id: 1, title: '테스트 문제 1', level: 1, type: 1, answerRate: 85, problemImageUrl: '' },
      { id: 2, title: '테스트 문제 2', level: 2, type: 1, answerRate: 70, problemImageUrl: '' },
    ]

    mockGetProblems.mockResolvedValue({ data: mockProblems as Problem[] })

    renderHook(() => useWorksheetProblems())

    await waitFor(() => {
      expect(mockGetProblems).toHaveBeenCalledTimes(1)
      expect(mockSetWorksheetProblems).toHaveBeenCalledWith(mockProblems)
    })
  })

  it('API 호출 실패 시 에러를 처리해야 한다', async () => {
    const mockError = new Error('API 호출 실패')
    mockGetProblems.mockRejectedValue(mockError)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    renderHook(() => useWorksheetProblems())

    await waitFor(() => {
      expect(mockGetProblems).toHaveBeenCalledTimes(1)
      expect(consoleSpy).toHaveBeenCalledWith('= 초기세팅 문제를 가져올 수 없습니다.', mockError)
    })

    consoleSpy.mockRestore()
  })
})
