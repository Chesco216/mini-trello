import { Dashboard } from "./components/Dashboard/Dashboard"
import { MainLayout } from "./layouts/MainLayout"
import { TaskProvider } from "./components/Tasks/reducer/TasksContext"

function App() {

  return (
    <>
    <MainLayout>
    <TaskProvider>
      <Dashboard/>
    </TaskProvider>
    </MainLayout>
    </>
  )
}

export default App
