import Task from './Task'

function Tasks({ taskArr, deleteTask, toggleReminder }) {
    return (
        <>
          {
          taskArr.map((task) => (
              <Task key = {task.id} 
              task = {task} 
              deleteTask = {deleteTask} 
              toggleReminder = { toggleReminder }/>
          )
          )}
        </>
    )
}

export default Tasks
