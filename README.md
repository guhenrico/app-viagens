
# Geolink – Sistema de Recomendação de Viagens com Grafos

## 🌍 Visão Geral
O Geolink é um aplicativo que recomenda destinos de viagem com base em perfis de clientes semelhantes, utilizando banco de dados de grafos (Neo4j) para representar conexões entre usuários e cidades visitadas.

---

## 🧠 Problema que Resolve
Muitas pessoas não sabem para onde viajar. O Geolink ajuda sugerindo cidades que foram visitadas por usuários com idade ou perfil semelhante.

---

## 🛠 Tecnologias Utilizadas

- Frontend: React
- Backend: Node.js + Express
- Banco de Dados: Neo4j AuraDB (na nuvem)
- Visualização de grafos: Neo4j Browser

---

## 🧩 Estrutura do Grafo

- Nó Cliente: `name`, `age`, `gender`
- Nó Cidade: `name`, `country`
- Relacionamento: `(Cliente)-[:VISITED]->(Cidade)`


---

## 🧠 Lógica da Recomendação

```cypher
MATCH (c:Client {name: $clientName})-[:VISITED]->(ci:City)<-[:VISITED]-(other:Client)-[:VISITED]->(rec:City)
WHERE c.gender = other.gender OR abs(c.age - other.age) <= 5
RETURN DISTINCT rec.name AS city, rec.country AS country LIMIT 5
```

Recomenda cidades que outros clientes com idade parecida ou mesmo sexo visitaram, e que o cliente ainda **não visitou**.

---

## ⚙️ Funcionalidades

- Cadastro de cliente
- Cadastro de cidade
- Registro de visitas
- Recomendação automática de destinos

---

## 🧑‍🤝‍🧑 Papéis do Grupo

- Felipe Slides, roteiro e documentação
- Gabriel: Frontend (React)
- Gustavo: Backend (Node.js + Neo4j)

---


## ✅ Como Rodar

1. Acesse o backend:
```bash
cd backend
npm install
node index.js
```

2. Acesse o frontend:
```bash
cd frontend
npm install
npm start
```

---
