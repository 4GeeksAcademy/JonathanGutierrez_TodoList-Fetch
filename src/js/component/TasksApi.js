import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const TasksApi = () => {

  const [tasksLeft, setTasksLeft] = useState(3);
  const [apiTasks, setApiTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {

    getAllelements();


  }, [])

  const getAllelements = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/jgutierrez", requestOptions)
      .then(response => response.json())
      .then(result => setApiTasks(result))
      .catch(error => console.log('error', error));
  }



  const handleAddTask = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    let agregar = apiTasks.concat({
      "label": input,
      "done": false
    })

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(agregar),
      redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/jgutierrez", requestOptions)
      .then(response => response.json())
      .then(result => getAllelements())
      .catch(error => console.log('error', error));

  }

  const handleDeleteTask = (index) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    let deleteTask = apiTasks.filter((task, i) => i !== index);



    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(deleteTask),
      redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/jgutierrez", requestOptions)
      .then(response => response.json())
      .then(result => getAllelements())
      .catch(error => console.log('error', error));

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("escribiendo");
  }

  const handleTasksLeft = () => {
    setTasksLeft(tasksLeft + 1);
  };



  return (
    <div className="listaDeTareas-container">
      <h1>TODOS</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Añadir tarea" value={input} onChange={(e) => setInput(e.target.value)}></input>

        <button onClick={handleAddTask}>Enviar</button>
      </form>

      <ul className="list-group">
        {apiTasks.map((task, index) => (
          <li className="list-group-item" key={index}>
            {task.label}
            <span className="eliminar" onClick={() => handleDeleteTask(index)}>
              <AiOutlineCloseCircle />
            </span>
          </li>
        ))}
      </ul>

      <p className="taskLeft">{tasksLeft} tareas pendientes</p>
      {tasksLeft === 0 ? (
        <h2 className="display-none">No hay tareas, añadir tareas</h2>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TasksApi;
