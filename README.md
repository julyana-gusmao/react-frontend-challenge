# 📚 Libris - Biblioteca Virtual

Libris é uma aplicação web de biblioteca virtual construída com React, seguindo **arquitetura FSD (Feature-Sliced Design)**, priorizando **acessibilidade, componentização e boas práticas de frontend moderno.**

## 🏛 Arquitetura e Estrutura

O projeto segue a **arquitetura FSD**, organizada em camadas e features para garantir clareza, escalabilidade e manutenção:

src/<br/>
├─ app/               # Rotas e layouts (Private / Public)<br/>
├─ entities/          # Modelos de dados e lógicas de negócio<br/>
├─ features/          # Funcionalidades específicas (ex: autenticação, busca)<br/>
├─ shared/            # Componentes e libs reutilizáveis<br/>
├─ widgets/           # Combinações de features em componentes compostos<br/>
└─ pages/             # Páginas finais do aplicativo<br/>

### Boas práticas aplicadas:

- export * em index.ts para simplificar imports.
- Separação clara entre entidades, features e camadas de apresentação.
- Componentes isolados e reutilizáveis com foco em responsividade e acessibilidade.
- Private e Public Layouts, garantindo proteção de rotas privadas e consistência visual.
- Page Transitions com **viewTransition**

## ♿ Acessibilidade

Todos os componentes seguem práticas de **A11y**:

- Uso de `aria-label`, `alt` em imagens, `tabIndex` e navegação por teclado.
- Labels e inputs conectados com Radix UI para maior compatibilidade.
- Feedbacks visuais e sonoros claros (via `sonner` para toast notifications).

## 🧩 Componentização e Design System

- Utilizamos o **ShadCN/UI** como design system principal.
- Componentes seguem **tailwindcss, tailwind-merge, e class-variance-authority** para variações de estilo.
- Layouts responsivos com atenção especial para **mobile-first.**
- Reaproveitamento máximo de componentes em todas as páginas.

## ⚡ Funcionalidades principais

- Infinite Scroll usando `@tanstack/react-virtual.`
- Formulários validados com `react-hook-form + zod.`
- Tabela dinâmica com `@tanstack/react-table.`
- Dropdowns, selects e labels com `@radix-ui.`
- Theming e dark mode com `next-themes.`
- State management via `zustand.`
- Rotas gerenciadas com `@tanstack/react-router.`
- Sanitização de HTML com `dompurify.`

## ⚡ Como rodar o projeto

1 - Clone o repositório e instale dependências:

```git
git clone https://github.com/julyana-gusmao/react-frontend-challenge.git
cd libris
npm install
```

2 - Crie um arquivo .env na raiz do projeto:

```git
VITE_GOOGLE_BOOKS_KEY=AIzaSyDbfj635fh1FS2qXzGClnmZ9rS1oQEGnuw
```

Obs: A chave do Google Books API é mutável por segurança, distribuída no momento apenas para o teste e driblar o `rate-limiting` da API.

3 - Rode o projeto:
```git
npm run dev
```

4 - Execute os testes:
```git
npm run test
```

## 📖 Estrutura de arquivos exportáveis

- Todos os índices (index.ts) exportam entidades, hooks, componentes e utils para facilitar imports consistentes.

- Segue padrão de arquitetura limpa:
  - `entities` → lógicas de negócio
  - `features` → comportamentos específicos
  - `shared` → UI e helpers
  - `widgets` → composição de features

## ✅ Testes

- Testes unitários e hooks usando Vitest e Testing Library.
- Cobertura de lógica de features, stores e componentes.
- Hooks customizados testados com renderHook e vi.mock.
