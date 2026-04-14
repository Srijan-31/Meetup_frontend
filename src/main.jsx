import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Details from './pages/Details.jsx'

const router=createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/details/:eventId",
    element:<Details/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {
      <RouterProvider router={router}/>
    }
  </StrictMode>,
)
