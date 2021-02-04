import { FaTimes } from 'react-icons/fa'

const Task = ({ task, deleteTask, toggleReminder }) => {
    return (
        <div className = {`task ${task.reminder ? 'reminder' : ''}`} 
        onDoubleClick = {() => toggleReminder(task.id)}>
            <h3>
                {task.text} <br />
                {task.date}
                <FaTimes 
                style={{ color:"red", cursor:"pointer" }}
                onClick = {() => deleteTask(task.id)
                }
                />
            </h3>
        </div>
    )
}

export default Task
