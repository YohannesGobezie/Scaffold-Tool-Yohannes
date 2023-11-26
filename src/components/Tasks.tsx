import React from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
  li: 'flex justify-between bg-slate-200 p-4 my-2 capitalize',
  li_complete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize',
  row: 'flex',
  text: 'ml-2 cursor-pointer',
  text_complete: 'ml-2 cursor-pointer line-through',
  button: 'cursor-pointer flex items-center'
}

const Tasks = ({task, toggleComplete, deleteTask}) => {
  return (
    <li className = {task.completed ? style.li_complete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleComplete(task)} type='checkbox' checked={task.completed ? 'checked' : ''} />
        <h1 onClick={() => toggleComplete(task)} className={task.completed ? style.text_complete : style.text}>{task.title}</h1>
        <p>{task.desc}</p>
      </div>
      <button onClick={() => deleteTask(task.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Tasks;