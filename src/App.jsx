import { useState, useEffect } from "react"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"

function App() {

  // 🔹 Carrega do LocalStorage ao iniciar
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState("all")

  // 🔹 Salva no LocalStorage sempre que tasks mudar
  useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date()

    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (
          task.time &&
          !task.completed &&
          !task.notified &&
          new Date(task.time) <= now
        ) 
        useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])
        
        {
          alert("🔔 Lembrete: " + task.text)
          return { ...task, notified: true }
        }
        return task
      })
    )
  }, 60000) // verifica a cada 1 minuto

  return () => clearInterval(interval)
}, [])

  function addTask(text, time) {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    time: time || null,
    notified: false
  }

  setTasks(prev => [...prev, newTask])
}

function removeTask(id) {
  setTasks(prev => prev.filter(task => task.id !== id))
}

function toggleTask(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "34px",
            marginBottom: "10px",
            color: "#203a43"
          }}
        >
          🚀 Inspire Dashboard
        </h1>

        <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
          Total: {total} | Concluídas: {completed}
        </p>

        {/* 🔹 Botões de filtro */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button onClick={() => setFilter("all")} style={{ margin: "5px" }}>
            Todas
          </button>
          <button onClick={() => setFilter("pending")} style={{ margin: "5px" }}>
            Pendentes
          </button>
          <button onClick={() => setFilter("completed")} style={{ margin: "5px" }}>
            Concluídas
          </button>
        </div>

        <TaskInput addTask={addTask} />

        <TaskList
          tasks={filteredTasks}
          removeTask={removeTask}
          toggleTask={toggleTask}
        />
      </div>
    </div>
  )
}

export default App