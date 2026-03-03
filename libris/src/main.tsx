import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"

import { router } from "@/app/router"

import { AppProvider } from "@/app/providers/app-provider"
import { AuthProvider } from "@/features/auth/provider/auth-provider"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
)