import React from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
  li: 'flex justify-between bg-slate-200 p-4 my-2 capitalize',
  li_complete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize',
  row: 'flex-col',
  title: 'ml-2 text-xl font-bold text-gray-800',
  text: 'ml-2',
  text_complete: 'ml-2 line-through',
  date: 'ml-2',
  button: 'cursor-pointer flex items-center'
}

const Tasks = ({task, toggleComplete, deleteTask}) => {
  return (
    <li className = {task.completed ? style.li_complete : style.li}>
      <div className={style.row}>
        {/* <input onChange={() => toggleComplete(task)} type='checkbox' checked={task.completed ? 'checked' : ''} /> */}
        <h1 className={task.completed ? style.text_complete : style.title}>{task.title}</h1>
        <p className={task.completed ? style.text_complete : style.text}>{task.desc}</p>
        <p className={task.completed ? style.text_complete : style.date}>Due: {task.date}</p>
        <p className={task.completed ? style.text_complete : style.text}>{task.priority}</p>
        <p className={task.completed ? style.text_complete : style.text}>{task.status}</p>
      </div>
      <button className={style.button} onClick={() => deleteTask(task.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Tasks;