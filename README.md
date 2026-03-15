# BeTalent - Multi-Gateway Payment API

API RESTful para gerenciamento de pagamentos multi-gateway, desenvolvida como parte do processo seletivo da BeTalent. A aplicação permite realizar cobranças de forma resiliente, alternando entre gateways de pagamento caso ocorram falhas.

## 🛠 Tecnologias

- Runtime: Node.js
- Linguagem: TypeScript
- Framework: Express
- ORM: Prisma
- Banco de Dados: MySQL 8
- Containerização: Docker & Docker Compose
- Segurança: Autenticação JWT e tratamento de roles (permissões).
- Testes: Jest

## 🚀 Como rodar o projeto

Você precisará apenas do Docker e Docker Compose instalados.

### Clone o repositório

```bash
git clone https://github.com/VRDuarte8/PaymentsOrchestrator.git
```

### Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto seguindo o modelo:

```env
DATABASE_URL="mysql://root:root@mysql:3306/betalent"
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=betalent
JWT_SECRET=sua_chave_secreta
```

### Suba os containers

```bash
docker compose up --build
```

A API estará disponível em http://localhost:4000

### Sincronize o Banco de Dados
Em um novo terminal, execute:
```bash
docker compose exec api npx prisma db push
```

## 📌 Rotas

### Públicas

POST api/auth/register - Cria um novo usuário

Body

```json
{
  "email": "vinicius@email.com",
  "password": "123456",
  "role": "ADMIN"
}
```

POST api/auth/login - Autentica usuário

Body

```json
{
  "email": "vinicius@email.com",
  "password": "123456"
}
````

POST api/purchase - Realiza uma transação

Body

```json
{
  "product_id": "e313...",
  "quantity": "3",
  "name": "Vinicius",
  "email": "vinicius@teste.com",
  "cardNumber": "9874563211236547",
  "cvv": "695"
}
```

### Privadas (Requerem Token Bearer)

### 👤 Users - Apenas role ADMIN e MANAGER

PUT api/users/:id - Atualiza user

DELETE api/users/:id - Deleta um usuário

### 🏪 Products - Apenas role ADMIN, MANAGER e FINANCE

GET api/products/ - Lista todos os produtos

GET api/products/:id - Lista produto pelo ID

- Apenas role ADMIN, MANAGER e FINANCE
  
POST api/products/register - Registra um produto
  
Body

```json
{
  "name": "Arroz",
  "amount": "10.00"
}
```

PUT api/products/:id - Atualiza um produto

DELETE api/products/:id - Deleta um produto

### 🛜 Gateways

GET api/gateways/ - Lista todos os gateways

GET api/gateways/:id - Lista gateway pelo ID

- Apenas role ADMIN e FINANCE

POST api/gateways/register - Registra um gateway

Body
```json
{
  "name": "gateway1",
}
```

PUT api/gateways/active/:id - Ativa ou desativa um gateway

PUT api/gateways/priority/:id - Altera a prioridade de um gateway

Body
```json
{
  "priority": "3"
}
```

DELETE api/gateways/:id - Deleta um gateway

### 🛍️ Transactions

GET api/purchase/ - Lista todas as transações

GET api/purchase/:id - Lista transação pelo ID

GET api/purchase/clients - Lista todos os clientes

GET api/purchase/clients/:id - Lista cliente pelo ID

## 🧪 Testes

```bash
docker compose exec api npm test
```

## 👨‍💻 Autor

Vinicius Duarte

Desenvolvedor Back-end Node.js
