// import firebase from 'firebase/app'
import { ListItem /* TextField, Grid */ } from '@material-ui/core'
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

type Props = {
  id: string
  title: string
}

export const TaskItem = ({ title, id }: Props) => {
  console.log(id)

  return (
    <div>
      <ListItem>
        <h2>{title}</h2>
      </ListItem>
    </div>
  )
}
