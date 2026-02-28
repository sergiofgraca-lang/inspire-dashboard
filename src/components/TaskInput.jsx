import { useState } from "react"

function TaskInput({ addTask }) {
  const [text, setText] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === "") return

    addTask(text)
    setText("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", marginTop: "20px" }}
    >
      <input
        type="text"
        placeholder="Digite uma tarefa..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          outline: "none",
          fontSize: "16px"
        }}
      />

      <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#4CAF50",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.3s"
        }}
      >
        +
      </button>
    </form>
  )
}

export default TaskInput