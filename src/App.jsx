import { useState, useEffect } from "react"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState("all")

  // 🔊 Som protegido
  const playSound = () => {
    try {
      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg")
      audio.volume = 0.8
      audio.play()
    } catch (error) {
      console.log("Som bloqueado pelo navegador")
    }
  }

  // 🔹 Salvar no LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // 🔹 Permissão notificação
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission()
    }
  }, [])

  // 🔹 Verificação segura (não quebra se data for inválida)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()

      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (!task.time || task.completed || task.notified) return task

          const data = new Date(task.time)

          // 🔒 só compara se for válida
          if (!isNaN(data.getTime()) && data <= now) {

            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("🔔 Lembrete", {
                body: task.text
              })
            }

            playSound()

            return { ...task, notified: true }
          }

          return task
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ✅ ADD COM DATA SEGURA
  function addTask(text, time) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,

      // 🔒 mantém compatível com tudo
      time: time || null,

      notified: false
    }

    setTasks(prev => [...prev, newTask])
  }

  // ✅ EDITAR (FALTAVA ISSO)
  function editTask(id, newText) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, text: newText }
          : task
      )
    )
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
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

  // 🎨 estilo mantido (não alterei nada)
  const buttonStyle = (type) => ({
    margin: "5px",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "all 0.2s ease",
    backgroundColor:
      filter === type
        ? type === "all"
          ? "#1046db"
          : type === "pending"
          ? "#ff0000"
          : "#4caf50"
        : "#eedf09d8",
    color: filter === type ? "white" : "#1679b2",
    boxShadow:
      filter === type
        ? "0 4px 10px rgba(223, 200, 200, 0.2)"
        : "none"
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
            color: "#470f4e"
          }}
        >
          🚀 MINHAS TAREFAS
        </h1>

        <p style={{ textAlign: "center", marginBottom: "20px", color: "#a70b0b" }}>
          Total: {total} | Concluídas: {completed}
        </p>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button style={buttonStyle("all")} onClick={() => setFilter("all")}>
            Todas
          </button>

          <button style={buttonStyle("pending")} onClick={() => setFilter("pending")}>
            Pendentes
          </button>

          <button style={buttonStyle("completed")} onClick={() => setFilter("completed")}>
            Concluídas
          </button>
        </div>

        <TaskInput addTask={addTask} />

        <TaskList
          tasks={filteredTasks}
          removeTask={removeTask}
          toggleTask={toggleTask}
          editTask={editTask} // 🔥 ESSA LINHA RESOLVE O EDITAR
        />
      </div>
    </div>
  )
}

export default App