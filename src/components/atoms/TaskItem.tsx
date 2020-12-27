import { useState } from 'react'
import { db } from 'firebaseConfig'
import { ListItem, TextField, Grid } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import 'twin.macro'

type Props = {
  id: string
  title: string
}

export const TaskItem = ({ title, id }: Props) => {
  const [_title, setTitle] = useState(title)

  const editTask = () => {
    db.collection('tasks').doc(id).set(
      { title: _title },
      {
        merge: true,
      },
    )
  }

  const deleteTask = () => {
    db.collection('tasks').doc(id).delete()
  }

  return (
    <div tw="container mx-auto max-w-screen-md!">
      <ListItem>
        <h2>{title}</h2>
        <Grid container justify="flex-end">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Edit task"
            value={_title}
            onChange={({ target: { value } }) => {
              setTitle(value)
            }}
          />
        </Grid>
        <button onClick={editTask}>
          <EditOutlinedIcon />
        </button>
        <button onClick={deleteTask}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </ListItem>
    </div>
  )
}
