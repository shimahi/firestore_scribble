import React, { useState, useEffect } from 'react'

import { db } from '_firebase'

export const IndexTemplate = () => {
  const [tasks, setTasks] = useState([
    {
      id: '',
      title: '',
    },
  ])

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

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <h2>{task.title}</h2>
          </div>
        )
      })}
    </div>
  )
}
