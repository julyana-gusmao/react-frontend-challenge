import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router"

import { requireAuth } from "@/shared/lib/auth/require-auth"

import LoginPage from "@/pages/login/page"
import BooksPage from "@/pages/books/page"
import BookPage from "@/pages/book/page"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

/*
LOGIN
*/

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
})

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  beforeLoad: requireAuth,
  component: () => <Outlet />,
})

/*
BOOKS
*/

const booksRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/books",
  component: BooksPage,
})

const bookRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/book/$id",
  component: BookPage,
})

/*
TREE
*/

const routeTree = rootRoute.addChildren([
  loginRoute,
  appRoute.addChildren([
    booksRoute,
    bookRoute,
  ]),
])

export const router = createRouter({
  routeTree,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}