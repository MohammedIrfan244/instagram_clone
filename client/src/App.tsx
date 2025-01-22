import AppRoutes from "./pages/layout/AppRoutes"
import useConnectSocket from "./hooks/useConnectSocket"

function App() {
  useConnectSocket()
  return (
    <div>
      <AppRoutes />
    </div>
  )
}

export default App
