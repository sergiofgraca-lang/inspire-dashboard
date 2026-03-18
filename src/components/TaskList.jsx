// TaskList.js
import { useState } from "react"

function TaskList({ tasks, removeTask, toggleTask, editTask }) {

  const [editingId, setEditingId] = useState(null)
  const [newText, setNewText] = useState("")

  const handleEdit = (task) => {
    setEditingId(task.id)
    setNewText(task.text)
  }

  const handleSave = (id) => {
    if (!newText.trim()) return
    editTask(id, newText)
    setEditingId(null)
    setNewText("")
  }

  const handleCancel = () => {
    setEditingId(null)
    setNewText("")
  }

  // 🔥 FORMATAÇÃO SEGURA
  const formatarData = (time) => {
    if (!time) return null

    const data = new Date(time)

    // se for válida
    if (!isNaN(data.getTime())) {
      return `📅 ${data.toLocaleDateString("pt-BR")} ⏰ ${data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      })}`
    }

    // fallback (não quebra nada)
    return `🕒 ${time}`
  }

  return (
    <ul style={{ marginTop: "25px", padding: 0 }}>
      {tasks.map(task => (
        <li
          key={task.id}
          style={{
            listStyle: "none",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
          }}
        >
          {editingId === task.id ? (
            <input
              autoFocus
              type="text"
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSave(task.id)
                if (e.key === "Escape") handleCancel()
              }}
              style={{
                flex: 1,
                marginRight: "10px",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
          ) : (
            <div
              onClick={() => toggleTask(task.id)}
              style={{
                cursor: "pointer",
                flex: 1,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#c55d5d" : "#333"
                }}
              >
                {task.text}
              </span>

              {/* ✅ DATA FUNCIONANDO */}
              {task.time && (
                <span style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  {formatarData(task.time)}
                </span>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: "5px" }}>
            {editingId === task.id ? (
              <>
                <button
                  onClick={() => handleSave(task.id)}
                  style={{
                    background: "#4caf50",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  💾
                </button>

                <button
                  onClick={handleCancel}
                  style={{
                    background: "#999",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  ✖
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(task)}
                  style={{
                    background: "#ffc107",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  ✎
                </button>

                <button
                  onClick={() => removeTask(task.id)}
                  style={{
                    background: "#972424",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList