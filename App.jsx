import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [streak, setStreak] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      setStreak(Number(savedStreak));
    }
  }, []);

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, { task: newTodo, isCompleted: false }]);
      setNewTodo('');
      setCompletedTasks(completedTasks + 1);
      updateStreak();
    }
  };

  const updateStreak = () => {
    const newStreak = completedTasks >= 10 ? streak + 1 : streak;
    setStreak(newStreak);
    localStorage.setItem('streak', newStreak);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Exam Preparation To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add study task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <h2>Current Streak: {streak} days</h2>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(completedTasks / 10) * 100}%` }}
        ></div>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo.task}
            <button onClick={() => deleteTodo(index)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
