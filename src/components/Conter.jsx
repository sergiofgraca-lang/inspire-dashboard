import { useState } from "react"

function App() {
  const [contador, setContador] = useState(0)

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 Meu Primeiro App React</h1>
      <h2>Contador: {contador}</h2>

      <button onClick={() => setContador(contador + 1)}>
        Aumentar
      </button>

      <button onClick={() => setContador(contador - 1)} style={{ marginLeft: "10px" }}>
        Diminuir
      </button>
    </div>
  )
}

export default App