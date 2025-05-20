import React, { useState } from 'react';

function App() {
  const [client, setClient] = useState({ name: '', age: '', gender: '' });
  const [city, setCity] = useState({ name: '', country: '' });
  const [visit, setVisit] = useState({ clientName: '', cityName: '' });
  const [recommendations, setRecommendations] = useState([]);

  const api = 'http://localhost:3001';

  const postData = async (endpoint, data) => {
    try {
      const res = await fetch(`${api}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      alert('✅ Operação realizada com sucesso!');
    } catch (err) {
      alert('❌ Erro: ' + err.message);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await fetch(`${api}/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName: visit.clientName }),
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      alert('Erro ao buscar recomendações');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cadastro de Cliente</h1>
      <input placeholder='Nome' value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} />
      <input placeholder='Idade' value={client.age} onChange={e => setClient({ ...client, age: e.target.value })} />
      <input placeholder='Sexo' value={client.gender} onChange={e => setClient({ ...client, gender: e.target.value })} />
      <button onClick={() => postData('/add-client', client)}>Cadastrar Cliente</button>

      <h1>Cadastro de Cidade</h1>
      <input placeholder='Nome da Cidade' value={city.name} onChange={e => setCity({ ...city, name: e.target.value })} />
      <input placeholder='País' value={city.country} onChange={e => setCity({ ...city, country: e.target.value })} />
      <button onClick={() => postData('/add-city', city)}>Cadastrar Cidade</button>

      <h1>Registrar Visita</h1>
      <input placeholder='Nome do Cliente' value={visit.clientName} onChange={e => setVisit({ ...visit, clientName: e.target.value })} />
      <input placeholder='Nome da Cidade' value={visit.cityName} onChange={e => setVisit({ ...visit, cityName: e.target.value })} />
      <button onClick={() => postData('/visit', visit)}>Registrar Visita</button>

      <h1>Recomendações de Viagem</h1>
      <input
        placeholder='Nome do Cliente'
        value={visit.clientName}
        onChange={(e) => setVisit({ ...visit, clientName: e.target.value })}
      />
      <button onClick={fetchRecommendations}>Buscar Recomendações</button>
      <ul>
        {recommendations.map((rec, i) => (
          <li key={i}>{rec.name} ({rec.country})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
