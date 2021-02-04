import Header from './components/Header'
import About from './components/About'
import Footer from './components/Footer'
import Task from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [taskList, setstate] = useState([])
  const TASK_DB = 'http://localhost:5000/tasks/'

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setstate(tasksFromServer)
    }

    getTasks()    
  }, [])

  const fetchTasks = async() => {
    const res = await fetch(TASK_DB)
    const data = await res.json()

    return data
  }

  const fetchTask = async(id) => {
    const res = await fetch(TASK_DB + `${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    const res = await fetch(TASK_DB, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setstate([...taskList, data])
  }

  const deleteTask = async (id) => {
    await fetch(TASK_DB + `${id}`, {
      method: 'DELETE'
    })
    console.log(TASK_DB + {id})
    setstate(taskList.filter( (task) => task.id !== id ))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    await fetch(TASK_DB + `${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    setstate(taskList.map((task) => task.id === id ?
    {...task, "reminder": !task.reminder} : task))
  }

  return (
    <Router>
    <div className="container">
      <Header 
      toggleTask = {() => setShowAddTask(!showAddTask)}
      showAdd = {showAddTask}/>
      
      <Route path = '/' exact render = {(props) => (
          <>
            {showAddTask && <AddTask addTask = {addTask}/>}
            { taskList.length > 0 ?
            <Task taskArr = {taskList} deleteTask = {deleteTask} 
            toggleReminder = { toggleReminder }/> :
            <h1>No Tasks</h1>
            }
          </>
      )} />
      <Route path = '/about' component = {About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
