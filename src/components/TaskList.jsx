function TaskList({ tasks, removeTask, toggleTask }) {
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
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            transition: "0.3s"
          }}
        >
          <span
            onClick={() => toggleTask(task.id)}
            style={{
              cursor: "pointer",
              fontSize: "16px",
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#c55d5d" : "#333"
            }}
          >
            {task.text}
          </span>

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
        </li>
      ))}
    </ul>
  )
}

export default TaskList