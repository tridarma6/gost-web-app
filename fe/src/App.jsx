import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import EncryptPage from "./pages/EncryptPage"
import DecryptPage from "./pages/DecryptPage"
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
      </Routes>
    </Router>
  )
}

export default App
