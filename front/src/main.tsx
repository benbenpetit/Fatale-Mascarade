import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/main.scss'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import routes from '@/core/routes.tsx'
import { LobbyProvider } from '@/core/contexts/LobbyContext'
import CustomToast from '@/components/UI/CustomToast/CustomToast'
import App from '@/App'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LobbyProvider>
      <App>
        {/* <CustomToast /> */}
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
      </App>
    </LobbyProvider>
  </React.StrictMode>
)
