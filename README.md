# ParcelFlow API

API REST para gerenciamento de encomendas, usuários, sessões e histórico de entregas. O projeto foi desenvolvido como estudo junto com a Rocketseat, aplicando autenticação JWT, autorização por perfil, validação de dados e persistência com PostgreSQL.

## Visão geral

ParcelFlow API simula o backend de um fluxo de entregas:

- Cadastro e listagem de usuários
- Autenticação com JWT
- Controle de acesso por perfil (`customer` e `sale`)
- Cadastro e acompanhamento de entregas
- Atualização de status da entrega
- Registro e consulta de logs de entrega

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker Compose
- JWT
- Zod
- Jest
- Supertest

## Requisitos

- Node.js
- npm
- Docker e Docker Compose

## Configuração

Clone o projeto e instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Preencha as variáveis de ambiente:

```env
PORT=3333
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=parcelflow
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/parcelflow
JWT_SECRET=your-secret
```

Suba o banco de dados:

```bash
docker compose up -d
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie a API em modo desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3333
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm test` | Executa os testes em modo watch |
| `npm run test:ci` | Executa os testes uma vez, indicado para CI |

## Modelo de dados

### User

Representa um usuário da aplicação.

- `customer`: cliente que acompanha suas entregas
- `sale`: usuário com permissão para gerenciar entregas e logs

> [!IMPORTANT]
> O cadastro de usuários cria registros com perfil `customer` por padrão. Para testar rotas administrativas, utilize um usuário com perfil `sale`.

### Delivery

Representa uma encomenda vinculada a um usuário.

Status disponíveis:

- `processing`
- `shipped`
- `delivered`

### DeliveryLog

Representa eventos registrados durante o ciclo de vida da entrega.

## Endpoints

### Health check

```http
GET /
```

Retorna uma mensagem simples indicando que a API está ativa.

### Users

```http
POST /users
```

Cria um usuário.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

```http
GET /users
```

Lista os usuários cadastrados.

### Sessions

```http
POST /sessions
```

Autentica um usuário e retorna o token JWT.

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Deliveries

> [!NOTE]
> As rotas de entregas exigem autenticação e perfil `sale`.

```http
POST /deliveries
```

Cria uma entrega.

```json
{
  "user_id": "user-uuid",
  "description": "Notebook Dell"
}
```

```http
GET /deliveries
```

Lista todas as entregas com dados básicos do usuário.

```http
PATCH /deliveries/:id/status
```

Atualiza o status de uma entrega e cria um log automático.

```json
{
  "status": "shipped"
}
```

### Delivery logs

```http
POST /deliveries-logs
```

Cria um log para uma entrega.

> [!NOTE]
> Esta rota exige autenticação e perfil `sale`.

```json
{
  "delivery_id": "delivery-uuid",
  "description": "Encomenda saiu para entrega"
}
```

```http
GET /deliveries-logs/:id
```

Consulta uma entrega com seus logs.

> [!NOTE]
> Usuários `sale` podem consultar entregas. Usuários `customer` possuem acesso restrito às próprias entregas.

## Autenticação

Rotas protegidas esperam o token JWT no header:

```http
Authorization: Bearer <token>
```

O token é retornado pela rota:

```http
POST /sessions
```

## Testes

Execute:

```bash
npm run test:ci
```

Os testes usam Jest e Supertest para validar fluxos de usuários e autenticação.

## Estrutura do projeto

```text
src/
  configs/       Configurações da aplicação
  controllers/   Regras das rotas HTTP
  database/      Cliente Prisma
  middlewares/   Autenticação, autorização e tratamento de erros
  routes/        Definição das rotas
  tests/         Testes automatizados
  utils/         Utilitários compartilhados
prisma/
  migrations/    Histórico de migrations
  schema.prisma  Schema do banco de dados
```
