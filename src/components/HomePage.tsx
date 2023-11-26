import React, {useState, useEffect} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import Select from "react-dropdown-select";

import Tasks from './Tasks';
import {db} from '../firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

const style = {
  o_container: 'flex justify-center items-center w-full h-full',
  container: 'bg-slate-100 max-w-[700px] w-full m-auto rounded-md shadow-xl p-4',
  o_heading: 'text-2xl font-bold text-gray-800',
  heading: 'text-3xl font-bold text-center text-gray-800 p-2',
  form: 'flex justify-between',
  input: 'border p-2 w-full text-xl',
  button: 'border p-4 ml-2 bg-purple-500 text-slate-100',
  count: 'text-center p-2'
}

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const priorityOptions = [
    { 
      value: 1,
      label: 'High'
    },
    {
      value:  2,
      label: 'Medium'
    },
    {
      value: 3,
      label: 'Low'
    },
  ];
  const [priority, setPriority] = useState('');
  const statusOptions = [
    { 
      value: 1,
      label: 'To Do'
    },
    {
      value:  2,
      label: 'In Progress'
    },
    {
      value: 3,
      label: 'Completed'
    },
  ];
  const [status, setStatus] = useState('');

  // Create task
  const createTask = async (e) => {
    e.preventDefault(e) // prevent page reloading
    if (input === '' || desc === '' || dueDate === '' || priority === '' || status === ''){
      alert('Please enter a valid task.')
      return
    }
    await addDoc(collection(db, 'tasks'), {
      title: input,
      completed: false,
      desc: desc,
      date: dueDate,
      priority: priority,
      status: status,
    });
    setInput('');
    setDesc('');
    setDueDate('');
    setPriority('');
    setStatus('');
  };

  // Read task from firebase
  useEffect(() => {
    const q = query(collection(db, 'tasks'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = []
      querySnapshot.forEach((doc) => {
        tasksArr.push({...doc.data(), id: doc.id})
      });
      setTasks(tasksArr)
    })
    return () => unsubscribe()
  }, [])

  // Update task in firebase
  const toggleComplete = async (task) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      completed: !task.completed
    })
  }

  // Delete task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id))
  }
  
  return (
    <div className="w-screen h-screen">
      <div className={style.o_container}>
        {/* <h1 className={style.o_heading}>Welcome to Home Page</h1> */}
        <div className={style.container}>
          <h3 className={style.heading}>Tasks</h3>
          <form onSubmit={createTask} className={style.form}>
            {/* Title */}
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className={style.input} 
              type='text' 
              placeholder='Title' 
            />
            {/* Desc */}
            <input 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              className={style.input} 
              type='text' 
              placeholder='Description' 
            />
            {/* Due Date */}
            <input 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              className={style.input} 
              type='date'
            />
            {/* Priority */}
            <Select 
              placeholder='Priority'
              className={style.input} 
              options={priorityOptions} 
              onChange={(choice) => setPriority(choice[0].label)}
              values={[]}
            />
            {/* Status */}
            <Select 
              placeholder='Status'
              className={style.input} 
              options={statusOptions} 
              onChange={(choice) => setStatus(choice[0].label)}
              values={[]}
            />
            <button className={style.button}>{<AiOutlinePlus size={25}/>}</button>
          </form>
          <ul>
            {tasks.map((task, index)=> (
              <Tasks 
                key={index} 
                task={task} 
                toggleComplete={toggleComplete} 
                deleteTask={deleteTask}
              />
            ))}
          </ul>
          {tasks.length < 2 ? null : <p className={style.count}>{`You have ${tasks.length} tasks`}</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
