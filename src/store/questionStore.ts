import { create } from 'zustand'

interface QuestionStore {
  activeQuestionId: number | null
  setActiveQuestionId: (id: number) => void
  removeQuestionId: (id: number) => void
}

export const useQuestionStore = create<QuestionStore>((set) => ({
  activeQuestionId: -1,
  setActiveQuestionId: (id: number) => {
    set((state) => ({
      activeQuestionId: state.activeQuestionId === id ? null : id,
    }))
  },
  removeQuestionId: (id: number) => {
    set((state) => ({
      activeQuestionId: state.activeQuestionId === id ? null : state.activeQuestionId,
    }))
  },
}))
