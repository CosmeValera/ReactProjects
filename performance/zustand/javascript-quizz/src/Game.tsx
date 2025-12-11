// import { IconButton, Stack } from '@mui/icons-material'
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questionsStore'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from './types'

const Question = ({ info } : { info: QuestionType }) => {
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
            <ListItemButton>
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
  const currentQuestions = useQuestionsStore(state => state.currentQuestion)

  const questionInfo = questions[currentQuestions]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}