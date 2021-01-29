
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
//import admin from 'firebase-admin'
import Todo from './component/Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {

   const [ todos, setTodos ] = useState([])
   const [ input, setInput ] = useState('')

  //  when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  // useeffect loads one time when app loads
  useEffect(() => {
    // this code here... fires when the app.js loads

    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })

  }, [])


  //const fieldValue = admin.firestore.FieldValue; 
  const addTodo = event => {
    // this will fire off when we click the button
    event.preventDefault(); // will stop the refresh
    // setTodos([...todos , input])

    // add data to database
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(''); // clear up the input after clicking on add todo button
    console.log(todos);
  }

  return (
    <div className="App">
     <h1>To do Lists</h1>
      <form>
      <FormControl>
        <InputLabel >✅Write a Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
      </FormControl>
      <Button disabled={!input} onClick={addTodo} variant="contained" color="primary" type="submit">Add todo</Button>
      </form>
     <ul>
        {todos.map(todo => (
          <Todo todo={todo} key={Math.random()}/>
        ))}
     </ul>
    </div>
  );
}

export default App;
