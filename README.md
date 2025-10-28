# Pivô - Backend

Este é o repositório do backend para a aplicação To-Do List "Pivô". Construído com NestJS, Drizzle ORM e PostgreSQL, ele fornece a API necessária para o frontend (desenvolvido separadamente em Next.js).

## ✨ Funcionalidades Implementadas

* **Autenticação:**
    * Registro de usuários (`POST /users`) com hashing de senha (bcrypt).
    * Login de usuários (`POST /auth/login`) com geração de tokens JWT.
    * Proteção de rotas da API usando JWT (`JwtAuthGuard`).
* **Colunas (Kanban):**
    * CRUD completo para colunas (`POST`, `GET`, `PATCH`, `DELETE /columns/:id`).
    * Associação de colunas a usuários (`authorId`).
    * Ordenação de colunas.
* **Tasks:**
    * CRUD completo para tasks (`POST`, `GET`, `PATCH`, `DELETE /tasks/:id`).
    * Associação de tasks a usuários (`authorId`) e colunas (`columnId`).
    * Ordenação de tasks (`order`).
    * Status de tasks (pending, in_progress, completed) com validação via Enum.
    * Endpoint de busca (`GET /tasks/search?q=...`) por título/descrição.
    * Endpoint de listagem com filtro por status (`GET /tasks?status=...`).
* **Board:**
    * Endpoint principal (`GET /board`) que retorna todas as colunas do usuário autenticado, com suas tasks aninhadas e ordenadas.

## 🚀 Tecnologias Utilizadas

* **Framework:** [NestJS](https://nestjs.com/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (executando em [Docker](https://www.docker.com/))
* **Autenticação:** [Passport.js](http://www.passportjs.org/) (`passport-local`, `passport-jwt`), `@nestjs/jwt`, `bcrypt`
* **Validação:** `class-validator`, `class-transformer`, `zod` (para variáveis de ambiente)
* **Containerização:** Docker, Docker Compose
* **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: >=18)
* [pnpm](https://pnpm.io/installation)
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/) (geralmente incluído na instalação do Docker Desktop)

## ⚙️ Configuração e Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ismaeldan/Pivo-BackEnd.git](https://github.com/ismaeldan/Pivo-BackEnd.git)
    cd Pivo-BackEnd
    ```

2.  **Crie o arquivo de ambiente:**
    * Copie o arquivo de exemplo: `cp .env.example .env` (Crie um `.env.example` se não existir, veja a seção "Variáveis de Ambiente" abaixo).
    * **Preencha as variáveis** no arquivo `.env` com suas configurações (especialmente `JWT_SECRET`).

3.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

## 💾 Configuração do Banco de Dados

1.  **Inicie o container PostgreSQL:**
    * Certifique-se que o Docker está rodando.
    * Execute o Docker Compose (as credenciais serão lidas do seu `.env`):
        ```bash
        docker-compose up -d
        ```

2.  **Aplique as migrações:**
    * Gere os arquivos SQL de migração com base no schema Drizzle:
        ```bash
        pnpm run db:generate
        ```
    * Aplique as migrações ao banco de dados rodando no Docker:
        ```bash
        pnpm run db:migrate
        ```

3.  **(Opcional) Visualize o banco de dados:**
    * Você pode usar o Drizzle Studio para ver e manipular os dados:
        ```bash
        pnpm run db:studio
        ```
    * Ou conecte-se usando um cliente como Beekeeper Studio, DBeaver, etc., usando as credenciais do `.env`.

## ▶️ Executando a Aplicação (Modo de Desenvolvimento)

1.  **Inicie o servidor NestJS:**
    ```bash
    pnpm run start:dev
    ```
    A aplicação estará disponível em `http://localhost:<PORT>` (o `PORT` definido no seu `.env`, padrão 3001). O servidor reiniciará automaticamente ao detectar alterações nos arquivos.

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```dotenv
# Configuração do Banco de Dados (usado pelo docker-compose e db.module)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=docker
DATABASE_PASSWORD=docker # Troque por uma senha mais segura se desejar
DATABASE_NAME=pivo

# Usado pelo Drizzle para conexão direta (se db.module usar DATABASE_URL)
# DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"

# Configuração da Aplicação NestJS
PORT=3001
NODE_ENV=development

# Configuração do JWT
JWT_SECRET=SUA_CHAVE_SECRETA_MUITO_FORTE_AQUI # Gere uma string aleatória segura
JWT_EXPIRATION=3600 # Tempo de expiração em segundos (ex: 3600 para 1 hora)