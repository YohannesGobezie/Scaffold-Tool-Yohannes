import React, {useState, useEffect} from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import Tasks from './Tasks';

import {db} from '../firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

const style = {
  o_container: 'flex justify-center items-center w-full h-full',
  container: 'bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4',
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

  // Create task
  const createTask = async (e) => {
    e.preventDefault(e) // prevent page reloading
    if (input === ''){
      alert('Please enter a valid task.')
      return
    }
    await addDoc(collection(db, 'tasks'), {
      title: input,
      completed: false,
      desc: input,
    });
    setInput('');
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
              placeholder='Add text' 
            />
            {/* Desc */}
            
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
          {tasks.length < 1 ? null : <p className={style.count}>{`You have ${tasks.length} tasks`}</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
