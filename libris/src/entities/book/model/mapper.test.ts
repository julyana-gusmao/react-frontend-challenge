import { describe, it, expect } from "vitest"
import { mapGoogleBookToEntity, type GoogleBookVolume } from "./mapper"

describe("mapGoogleBookToEntity", () => {
    it("deve mapear corretamente dados da API", () => {
        const input: GoogleBookVolume = {
            id: "123",
            volumeInfo: {
                title: "Livro Teste",
                authors: ["Julya"],
                imageLinks: {
                    thumbnail: "http://example.com/image.jpg",
                },
            },
        }

        const result = mapGoogleBookToEntity(input)

        expect(result.title).toBe("Livro Teste")
        expect(result.authors).toEqual(["Julya"])
        expect(result.thumbnail).toContain("https://")
    })

    it("deve tratar dados ausentes", () => {
        const input: GoogleBookVolume = {
            id: "123",
        }

        const result = mapGoogleBookToEntity(input)

        expect(result.title).toBe("Sem título")
        expect(result.authors).toEqual(["Autor desconhecido"])
    })

    it("deve retornar thumbnail undefined quando não houver imagem", () => {
        const input: GoogleBookVolume = {
            id: "123",
            volumeInfo: {
                title: "Livro sem capa",
            },
        }

        const result = mapGoogleBookToEntity(input)

        expect(result.thumbnail).toBeUndefined()
    })
})