import React, { useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

export default function App() {

  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
      url,
      techs
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
    setTitle('');
    setUrl('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = [...repositories];
    const repositoryIndex = repositories.findIndex(repository =>repository.id === id);
    newRepositories.splice(repositoryIndex, 1);
    setRepositories(newRepositories);
  }

  return (
    <div>
        <label>Title</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
        <label>Url</label>
          <input onChange={(e) => setUrl(e.target.value)} value={url} type="text" />
        <label>Techs</label>
          <input onChange={(e) => setTechs(e.target.value)} value={techs} type="text" />
        <button onClick={handleAddRepository}>Adicionar</button>
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))}
        </ul>
    </div>
  );
}


