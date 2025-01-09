import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Thrones API
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data);
        console.log('data fetched: ', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []); // Empty dependency array ensures it runs only once

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Got fanpage</h1>
        <table style={{
          border: '3px solid white'
        }}>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>title</th>
            <th>image</th>
          </tr>
          {characters.map((character) => (
            <tr>
              <td>{character.id}</td>
              <td>{character.fullName}</td>
              <td>{character.title}</td>
              <td><img width={80} src={character.imageUrl}></img></td>
            </tr>
          )
          )}

        </table>



      </header>
    </div>
  );
}

export default App;
