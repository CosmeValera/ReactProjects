// import { IconButton, Stack } from '@mui/icons-material'
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questionsStore'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from './types'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

const Question = ({ info } : { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number): string => {
    const { userSelectedAnswer, correctAnswer } = info;

    // User not select anything
    if (userSelectedAnswer == null) return 'transparent';
    // User selected but answer is wrong
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    // If this is the correct solution
    if (index === correctAnswer) return 'green'
    // If this is the user selection but it's wrong
    if (index === userSelectedAnswer) return 'red'
    // Otherwise
    return 'transparent';
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: '2rem', textAlign: 'left', mt: 4}}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighLighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>

      <List sx={{bgcolor: '#333'}} disablePadding>
        {info.answers.map((answer, index)=> (
          <ListItem key={index} disablePadding divider >
            <ListItemButton 
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(index)
              }}>
              <ListItemText primary={answer} sx={{textAlign: 'center'}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        { currentQuestion +1 } / { questions.length }

        <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
    </>
  )
}