import { useState } from "react"

function TaskInput({ addTask }) {
  const [text, setText] = useState("")
  const [time, setTime] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return

    addTask(text, time)
    setText("")
    setTime("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Digite a tarefa..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", width: "60%", marginRight: "10px" }}
      />

      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button type="submit">
        Adicionar
      </button>
    </form>
  )
}

export default TaskInput