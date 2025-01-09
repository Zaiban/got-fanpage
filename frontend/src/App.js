import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chosenCharacter, setChosenCharacter] = useState({ fullName: 'No character chosen' });

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

  const chooseCharacter = (id) => {
    console.log('clicked: ', id);
    setChosenCharacter(characters.find((item) => (item.id === id)));

  }

  console.log('chosenCharacter:', chosenCharacter)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Got fanpage</h1>

        <div className='container'>
          <div className='box right' style={{ border: '3px solid white', margin: '1em' }}>
            <h1>Details about: {chosenCharacter.fullName}</h1>

            <img width={200} src={chosenCharacter.imageUrl}></img>

            <p>Family: {chosenCharacter.family}</p>
            <p>First name: {chosenCharacter.firstName}</p>
            <p>Last name: {chosenCharacter.lastName}</p>
            <p>Title: {chosenCharacter.title}</p>


          </div>

          <div className='box left'>

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
                <tr onClick={() => chooseCharacter(character.id)}>
                  <td>{character.id}</td>
                  <td>{character.fullName}</td>
                  <td>{character.title}</td>
                  <td><img width={80} src={character.imageUrl}></img></td>
                </tr>
              )
              )}

            </table>
          </div>

        </div>



      </header>
    </div>
  );
}

export default App;
