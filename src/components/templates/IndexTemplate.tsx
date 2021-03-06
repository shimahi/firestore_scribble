import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FormControl, TextField, List } from '@material-ui/core'
import { db, auth } from 'firebaseConfig'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { TaskItem } from 'components/atoms'
import 'twin.macro'

export const IndexTemplate = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState([
    {
      id: '',
      title: '',
    },
  ])

  const [input, setInput] = useState('')

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        })),
      )
    })

    return () => unSub()
  }, [])

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) router.push('/login')
    })

    return () => unSub()
  })

  const newTask = (/* e: React.MouseEvent<HTMLButtonElement> */) => {
    db.collection('tasks').add({
      title: input,
    })
    setInput('')
  }

  return (
    <section tw="pt-12">
      <h1 tw="text-center">TODO APP</h1>
      <button
        onClick={async () => {
          try {
            await auth.signOut()
            router.push('/login')
          } catch (error) {
            alert(error.message)
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <div tw="flex justify-center my-12">
        <FormControl>
          <TextField
            label="New task ?"
            InputLabelProps={{
              shrink: true,
            }}
            value={input}
            onChange={({ target: { value } }) => {
              setInput(value)
            }}
          />
        </FormControl>
        <button disabled={!input} onClick={newTask}>
          <AddToPhotosIcon />
        </button>
      </div>

      <hr />

      <List>
        {tasks.map(({ id, title }) => (
          <TaskItem key={id} id={id} title={title} />
        ))}
      </List>
    </section>
  )
}
