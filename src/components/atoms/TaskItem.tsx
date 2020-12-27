import { useState } from 'react'
// import firebase from 'firebase/app'
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

  console.log(id)

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
            value={title}
            onChange={({ target: { value } }) => {
              setTitle(value)
            }}
          />
        </Grid>
        <button onClick={() => {}}>
          <EditOutlinedIcon />
        </button>
        <button onClick={() => {}}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </ListItem>
    </div>
  )
}
