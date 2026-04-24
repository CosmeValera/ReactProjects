import { useQuestionsStore } from '../store/questionsStore';

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const {userSelectedAnswer, correctAnswer} = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })
  
  return {correct, incorrect, unanswered}
}


/////// LITTLE BIT OF THEORY ////////
// 1) Option 1:
// const questions = useQuestionsStore(state => state.questions)
// With this we tell Zustand to observe when the state.questions value changes, and rerender that value then

// 2) Option 2:
// const { questions } = useQuestionsStore(state => state)
// However, if we do it like this, what we are telling Zustand is to rerender every time anything on the state changes, but we don't need that because we can have a lot other states in it, but here we are interested only on observing the changes of 'questions'. Better to stick with the first option!
// There's another option, you could do it like option 2, and add the Zustand's 'shallow' property, like this: const { questions } = useQuestionsStore(state => state, shallow). In this case we would be asking Zustand to deal with it to not rerender always. Anyway, just stick with option 1 in 99% of the cases.