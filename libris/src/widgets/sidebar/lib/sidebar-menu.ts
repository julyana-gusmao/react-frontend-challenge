import { Book, Home } from "lucide-react";

export const MENU = [
    {
        key: "home",
        label: "Explorar Livros",
        icon: Home,
        path: "/app/books",
    },
    {
        key: "bookshelf",
        label: "Minha Estante",
        icon: Book,
        path: "/app/bookshelf",
    },
]