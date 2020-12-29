import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import 'twin.macro'
import { Button, FormControl, TextField, Typography } from '@material-ui/core'
import { auth } from 'firebaseConfig'

export const LoginTemplate = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/')
      }
    })
  })

  return (
    <article tw="pt-12">
      <h1 tw="text-center">{isLogin ? 'Login' : 'Register'} </h1>
      <div tw="container mx-auto px-4 max-w-screen-md! grid grid-cols-1 gap-5 my-12">
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            label="E-mail"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="password"
            label="Password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          tw="w-32 h-10 mx-auto"
          onClick={
            isLogin
              ? async () => {
                  try {
                    await auth.signInWithEmailAndPassword(email, password)
                    router.push('/')
                  } catch (error) {
                    alert(error.message)
                  }
                }
              : async () => {
                  try {
                    await auth.createUserWithEmailAndPassword(email, password)
                    router.push('/')
                  } catch (error) {
                    alert(error.message)
                  }
                }
          }
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <br />
        <Typography>
          <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Create new account ?' : 'Back to login'}</span>
        </Typography>
      </div>
    </article>
  )
}
