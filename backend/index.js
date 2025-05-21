const express = require('express');
const cors = require('cors');
const neo4j = require('neo4j-driver');

const app = express();
app.use(cors());
app.use(express.json());

const driver = neo4j.driver(
  'neo4j+s://194a3781.databases.neo4j.io',
  neo4j.auth.basic('neo4j', 'ISuU9wx1hOjcwH5XRO7PNSdQFElfKEPbuFvUzxpymzM')
);

// Cadastrar cliente
app.post('/add-client', async (req, res) => {
  const { name, age, gender } = req.body;
  const session = driver.session();
  try {
    await session.run(
      'CREATE (:Client {name: $name, age: toInteger($age), gender: $gender})',
      { name, age, gender }
    );
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await session.close();
  }
});

// Cadastrar cidade
app.post('/add-city', async (req, res) => {
  const { name, country } = req.body;
  const session = driver.session();
  try {
    await session.run('CREATE (:City {name: $name, country: $country})', {
      name,
      country,
    });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await session.close();
  }
});

// Registrar visita
app.post('/visit', async (req, res) => {
  const { clientName, cityName } = req.body;
  const session = driver.session();
  try {
    await session.run(
      `MATCH (c:Client {name: $clientName}), (ci:City {name: $cityName})
       CREATE (c)-[:VISITED]->(ci)`,
      { clientName, cityName }
    );
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await session.close();
  }
});

// Buscar recomendações
app.post('/recommendations', async (req, res) => {
  const { clientName } = req.body;
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (c:Client {name: $clientName})-[:VISITED]->(:City)<-[:VISITED]-(other:Client)-[:VISITED]->(rec:City)
       WHERE (c.gender = other.gender OR abs(c.age - other.age) <= 5)
         AND NOT (c)-[:VISITED]->(rec)
       RETURN DISTINCT rec.name AS city, rec.country AS country
       LIMIT 5`,
      { clientName }
    );
    const recommendations = result.records.map(r => ({
      name: r.get('city'),
      country: r.get('country'),
    }));
    res.json(recommendations);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await session.close();
  }
});

app.listen(3001, () => {
  console.log('🚀 Backend rodando em http://localhost:3001');
});
