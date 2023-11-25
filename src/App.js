
import './App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskManager />
      </header>
    </div>
  );
}

const TaskManager = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  /*const addNote = () => {
    if (note.trim() !== '') {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };*/

  useEffect(() => {
      axios.get('http://localhost:4000/api/tasks')
       .then((response) => setNotes(response.data))
       .catch((error) => console.log('Error fetching data', error));
  }, []);

  const addTask = async () => {
    axios.post('http://localhost:4000/api/tasks', { text: note})
    .then((response) => {
        console.log(response.data.text  )  
      setNotes([...notes, response.data.text]);
        setNote('');
    })
    .catch((error) => {
      console.error('Error adding task', error);
    });
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Enter Task"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}> {note.text}  </li>
          
        ))}
      </ul>
    </div>
  );
}

export default App;

/*<button onClick={() => deleteNote(index)}>Delete</button>*/