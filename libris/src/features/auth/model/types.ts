export type LoginResponse = {
    token: string
    user: User
}

type User = {
    email: string
}