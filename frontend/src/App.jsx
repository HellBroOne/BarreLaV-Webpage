import { useState } from 'react'
//import X from './comps'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// estilos
import './App.css'
import './index.css'

// paginas 
import Home from './pages/Home'
import Clases from './pages/Clases'
import Horario from './pages/Horario'
import Costos from './pages/Costos'
import Ubicacion from './pages/Ubicacion'
import Reservar from './pages/Reservar'

function App() {
  //const [count, setCount] = useState(0)
  //
  //<Route path="/nosotros" element={<Nosotros />} />
  //<Route path="/contacto" element={<Contacto />} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/horarios" element={<Horario />} />
        <Route path="/costos" element={<Costos />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/reservar" element={<Reservar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
