import { createBrowserRouter } from "react-router";
import { Workspace } from "../components/workspaces/Workspace";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Workspace/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  }
])
