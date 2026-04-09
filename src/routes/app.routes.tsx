import { createBrowserRouter } from "react-router";
import { Workspace } from "../components/workspaces/Workspace";
import { DashboardValidator } from "../components/Dashboard/DashboardValidator";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Workspace/>
  },
  {
    path: '/dashboard/:workspaceId',
    element: <DashboardValidator element={<Dashboard/>}/>
  }
])
