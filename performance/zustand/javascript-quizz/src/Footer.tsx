import { useQuestionsData } from './hooks/useQuestionsData'

export const Footer = () => {
  const {correct, incorrect, unanswered} = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px'}}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - 🤔 ${unanswered} sin responder`}</strong>
    </footer>
  )
}