/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

function TodoItem({ task, index, toggleDone, removeTask, editTask }) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleDone(index)}
        />
        {!task.done && (
          <>
            <h1>Hello</h1>
          </>
        )}
        <button onClick={() => removeTask(index)}>Remove</button>
        <button
          onClick={() => {
            const updatedTask = prompt("Enter updated task:", task.title);
            if (updatedTask !== null) {
              editTask(index, { ...task, title: updatedTask });
            }
          }}
        >
          Edit
        </button>
      </li>
    </div>
  );
}

export default TodoItem;
