import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, isEditing: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const saveTask = (index, newText) => {
    const updatedTasks = tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return { ...task, text: newText, isEditing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => saveTask(index, e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
            {task.isEditing && (
              <button onClick={() => saveTask(index, task.text)}>Save</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
