import { describe, it, expect, beforeEach } from 'vitest'
import { useQuestionStore } from '../store/questionStore'
import type { Problem } from '../types/apiType'

const mockProblem1: Problem = {
  id: 1,
  title: '테스트 문제 1',
  level: 1,
  type: 1,
  answerRate: 85,
  problemImageUrl: '',
}

const mockProblem2: Problem = {
  id: 2,
  title: '테스트 문제 2',
  level: 2,
  type: 1,
  answerRate: 70,
  problemImageUrl: '',
}

const mockProblem3: Problem = {
  id: 3,
  title: '테스트 문제 3',
  level: 3,
  type: 2,
  answerRate: 60,
  problemImageUrl: '',
}

describe('questionStore', () => {
  beforeEach(() => {
    const store = useQuestionStore.getState()
    store.resetStore()
  })

  describe('초기 세팅 관리', () => {
    it('worksheetProblems 초기 상태가 빈 배열이어야 한다', () => {
      const store = useQuestionStore.getState()
      expect(store.worksheetProblems).toEqual([])
    })

    it('worksheetProblems의 빈 배열에 문제 배열을 추가할 수 있어야 한다', () => {
      const store = useQuestionStore.getState()
      const problems = [mockProblem1, mockProblem2]
      store.setWorksheetProblems(problems)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.worksheetProblems).toEqual(problems)
      expect(updatedStore.worksheetProblems).toHaveLength(2)
    })

    it('similarProblems를 설정할 수 있어야 한다', () => {
      const store = useQuestionStore.getState()
      const problems = [mockProblem3]

      store.setSimilarProblems(problems)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.similarProblems).toEqual(problems)
      expect(updatedStore.similarProblems).toHaveLength(1)
    })
  })

  describe('activeQuestionId 관리', () => {
    it('activeQuestionId를 설정할 수 있어야 한다', () => {
      const store = useQuestionStore.getState()

      store.setActiveQuestionId(1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(1)
    })

    it('같은 ID를 다시 클릭하면 null이 되어야 한다', () => {
      const store = useQuestionStore.getState()

      store.setActiveQuestionId(1)
      let updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(1)

      store.setActiveQuestionId(1)
      updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(null)
    })

    it('다른 ID를 클릭하면 새로운 ID로 설정되어야 한다', () => {
      const store = useQuestionStore.getState()

      store.setActiveQuestionId(1)
      let updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(1)

      store.setActiveQuestionId(2)
      updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(2)
    })
  })

  describe('문제 추가 (addProblem)', () => {
    it('활성화 된 문제 이전에 새 문제를 추가할 수 있어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2])
      store.setActiveQuestionId(1)

      store.addProblem(mockProblem3, 1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.worksheetProblems).toHaveLength(3)
      expect(updatedStore.worksheetProblems[0]).toEqual(mockProblem3)
      expect(updatedStore.worksheetProblems[1]).toEqual(mockProblem1)
    })

    it('activeId가 있으면 activeQuestionId가 없어도 추가된다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2])

      store.addProblem(mockProblem3, 1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.worksheetProblems).toHaveLength(3)
      expect(updatedStore.worksheetProblems[0]).toEqual(mockProblem3)
      expect(updatedStore.worksheetProblems[1]).toEqual(mockProblem1)
      expect(updatedStore.worksheetProblems[2]).toEqual(mockProblem2)
    })
  })

  describe('문제 교체 (replaceProblem)', () => {
    it('활성화된 문제를 유사문제로 교체할 수 있어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2])
      store.setSimilarProblems([mockProblem3])

      store.replaceProblem(mockProblem3, 1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.worksheetProblems[0]).toEqual(mockProblem3)
      expect(updatedStore.worksheetProblems[1]).toEqual(mockProblem2)
      expect(updatedStore.replacedProblems.has(mockProblem3.id)).toBe(true)
    })

    it('교체 후 activeQuestionId가 교체된 문제로 설정되어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2])
      store.setSimilarProblems([mockProblem3])

      store.replaceProblem(mockProblem3, 1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(mockProblem3.id)
    })

    it('존재하지 않는 문제를 교체하려고 하면 아무것도 변경되지 않아야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2])
      store.setSimilarProblems([mockProblem3])

      store.replaceProblem(mockProblem3, 999)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.worksheetProblems).toEqual([mockProblem1, mockProblem2])
      expect(updatedStore.replacedProblems.has(mockProblem3.id)).toBe(false)
    })
  })

  describe('문제 삭제 (deleteProblem)', () => {
    it('문제를 삭제할 수 있어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2, mockProblem3])

      store.deleteProblem(2)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.worksheetProblems).toHaveLength(2)
      expect(updatedStore.worksheetProblems.find((p) => p.id === 2)).toBeUndefined()
    })

    it('활성화된 문제를 삭제하면 activeQuestionId가 null이 되어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1, mockProblem2])
      store.setActiveQuestionId(1)

      store.deleteProblem(1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.activeQuestionId).toBe(null)
    })
  })

  describe('replacedProblems 관리', () => {
    it('교체된 문제가 replacedProblems에 추가되어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1])
      store.setSimilarProblems([mockProblem2])

      store.replaceProblem(mockProblem2, 1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.replacedProblems.has(mockProblem2.id)).toBe(true)
    })

    it('isReplacedProblem이 올바르게 작동해야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1])
      store.setSimilarProblems([mockProblem2])

      store.replaceProblem(mockProblem2, 1)

      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.isReplacedProblem(mockProblem2.id)).toBe(true)
      expect(updatedStore.isReplacedProblem(mockProblem1.id)).toBe(false)
    })

    it('clearReplacedProblems가 replacedProblems를 비울 수 있어야 한다', () => {
      const store = useQuestionStore.getState()
      store.setWorksheetProblems([mockProblem1])
      store.setSimilarProblems([mockProblem2])

      store.replaceProblem(mockProblem2, 1)
      const updatedStore = useQuestionStore.getState()
      expect(updatedStore.replacedProblems.size).toBeGreaterThan(0)

      store.clearReplacedProblems()
      const finalStore = useQuestionStore.getState()
      expect(finalStore.replacedProblems.size).toBe(0)
    })
  })
})
