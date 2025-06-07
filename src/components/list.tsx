import React from "react";
import { format } from "date-fns";
import "./list.css";
import { TodoItem } from "../App.tsx";

interface TodoItemWithClick extends TodoItem {
  onClick: () => void;
  onSetComplete: () => void;
  onClickDelete: () => void;
}

  const Lists : React.FC<TodoItemWithClick> = ({completed, title, description, createdAt, updatedAt, onClick, onSetComplete, onClickDelete}) => {
    const displayDate = format(updatedAt? updatedAt : createdAt, "yyyy-MM-dd HH:mm")

    return(
      <div className={`todo-item ${completed ? 'completed' : 'pending'}`} >
        <div className="todo-title-field">
          <h2 className="todo-title" onClick={onClick}>{title}</h2>
          <p className="todo-status" onClick={onSetComplete}>
            {completed ? (
                  <span className="completed-icon">✔️ 完了</span>
              ) : (
                  <span className="pending-icon">❌ 未完了</span>
              )}
          </p>
          <button className='delete-button' onClick={onClickDelete}>削除</button>
        </div>
        <div>
          <p className="todo-description" onClick={onClick}>{description}</p>
          <p className='todo-time'>{displayDate}</p>
        </div>
      </div>
    )
}
export default Lists;
