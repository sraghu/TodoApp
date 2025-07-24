import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup'

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (task.trim()) {
      const newTodo = { id: Date.now().toString(), task };
      axios.post("http://localhost:5000/api/todos", newTodo).then((res) => {
        setTodos([...todos, res.data]);
        setTask("");
      });
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div className="w-50 mx-auto" style={{ padding: "20px" }}>
      <h2 className="text-center">TODO List</h2>
      <div className="input-group">
        <input
          value={task}
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTodo}>
          Add
        </button>
      </div>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <div className="d-flex">{todo.task}
            <button className="ms-auto btn btn-sm btn-danger"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button></div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
