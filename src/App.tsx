import { Route, Routes } from 'react-router-dom'
import CreateWorksheetPage from './pages/CreateWorksheetPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateWorksheetPage />} />
      <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
    </Routes>
  )
}

export default App
