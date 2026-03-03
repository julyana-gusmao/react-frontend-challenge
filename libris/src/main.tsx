import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"

import { router } from "./app/router/router"
import { AppProvider } from "./app/providers/app-provider"

import "./index.css"
import { AuthProvider } from "./features/auth/provider/auth-provider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
       <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
)