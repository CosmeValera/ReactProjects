import { create } from 'zustand';
import { type Question } from '../types'

interface State {
  questions: Question[],
  currentQuestion: number,
  fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      console.log('hola')
    }
  }
})