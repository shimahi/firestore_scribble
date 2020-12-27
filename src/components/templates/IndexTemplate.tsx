import React, { useState, useEffect } from 'react'
import { FormControl, TextField, List } from '@material-ui/core'
import { db } from '_firebase'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import { TaskItem } from 'components/atoms'

export const IndexTemplate = () => {
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

  const newTask = (/* e: React.MouseEvent<HTMLButtonElement> */) => {
    db.collection('tasks').add({
      title: input,
    })
    setInput('')
  }

  return (
    <section>
      <h1>TODO APP</h1>

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
      <hr />

      <List>
        {tasks.map(({ id, title }) => (
          <TaskItem key={id} id={id} title={title} />
        ))}
      </List>
    </section>
  )
}
