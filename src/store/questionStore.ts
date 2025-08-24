import { create } from 'zustand'
import type { Problem } from '../types/apiType'

interface QuestionStore {
  activeQuestionId: number | null
  worksheetProblems: Problem[]
  similarProblems: Problem[]
  replacedProblems: Set<number>

  setActiveQuestionId: (id: number) => void
  setWorksheetProblems: (problems: Problem[]) => void
  setSimilarProblems: (problems: Problem[]) => void

  addProblem: (problem: Problem, activeId: number) => void
  replaceProblem: (similarProblem: Problem, activeId: number) => void
  deleteProblem: (problemId: number) => void

  isReplacedProblem: (problemId: number) => boolean
  clearReplacedProblems: () => void

  // 테스트코드용 리셋 함수
  resetStore: () => void
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  activeQuestionId: null,
  worksheetProblems: [],
  similarProblems: [],
  replacedProblems: new Set(),

  setActiveQuestionId: (id: number) => {
    set((state) => ({
      activeQuestionId: state.activeQuestionId === id ? null : id,
    }))
  },

  setWorksheetProblems: (problems: Problem[]) => {
    set({ worksheetProblems: problems })
  },

  setSimilarProblems: (problems: Problem[]) => {
    set({ similarProblems: problems })
  },

  addProblem: (problem: Problem, activeId: number) => {
    const { worksheetProblems, similarProblems, replacedProblems, activeQuestionId } = get()

    const targetId = activeQuestionId !== null ? activeQuestionId : activeId
    const activeIndex = worksheetProblems.findIndex((p) => p.id === targetId)

    if (activeIndex === -1) return

    const newProblems = [...worksheetProblems]
    newProblems.splice(activeIndex, 0, problem)

    const newSimilarProblems = similarProblems.filter((p) => p.id !== problem.id)
    const newReplacedProblems = new Set(replacedProblems)
    newReplacedProblems.delete(problem.id)

    set({
      worksheetProblems: newProblems,
      similarProblems: newSimilarProblems,
      replacedProblems: newReplacedProblems,
    })
  },

  replaceProblem: (similarProblem: Problem, activeId: number) => {
    const { worksheetProblems, similarProblems, replacedProblems } = get()
    const activeIndex = worksheetProblems.findIndex((p) => p.id === activeId)
    if (activeIndex === -1) return
    const newProblems = [...worksheetProblems]
    const oldProblem = newProblems[activeIndex]
    if (!oldProblem) return

    const similarIndex = similarProblems.findIndex((p) => p.id === similarProblem.id)
    newProblems[activeIndex] = similarProblem

    const newSimilarProblems = [...similarProblems]
    if (similarIndex !== -1) {
      newSimilarProblems[similarIndex] = oldProblem
    } else {
      newSimilarProblems.push(oldProblem)
    }

    const newReplacedProblems = new Set(replacedProblems)
    newReplacedProblems.add(similarProblem.id)

    set({
      worksheetProblems: newProblems,
      similarProblems: newSimilarProblems,
      replacedProblems: newReplacedProblems,
    })

    const newActiveIndex = newProblems.findIndex((p) => p.id === similarProblem.id)
    if (newActiveIndex !== -1) {
      set({ activeQuestionId: similarProblem.id })
    }
  },

  deleteProblem: (problemId: number) => {
    const { worksheetProblems, activeQuestionId } = get()
    const newProblems = worksheetProblems.filter((p) => p.id !== problemId)
    const newActiveId = activeQuestionId === problemId ? null : activeQuestionId

    set({
      worksheetProblems: newProblems,
      activeQuestionId: newActiveId,
      similarProblems: newActiveId === null ? [] : get().similarProblems,
    })
  },

  isReplacedProblem: (problemId: number) => {
    const { replacedProblems } = get()
    return replacedProblems.has(problemId)
  },

  clearReplacedProblems: () => {
    set({ replacedProblems: new Set() })
  },

  // 테스트코드용 리셋 함수
  resetStore: () => {
    set({
      activeQuestionId: null,
      worksheetProblems: [],
      similarProblems: [],
      replacedProblems: new Set(),
    })
  },
}))
