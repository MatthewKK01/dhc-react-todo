/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import TodoItem from "./TodoItem";
import MyModal from "./MyModal";

const TasksPage = ({
  filteredTasks,
  toggleDone,
  removeTask,
  editTask,
  openModal,
  addTask,
  closeModal,
  modalIsOpen,
}) => {
  return (
    <div>
      <article className="todoList">
        <ul className="flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              index={task.id}
              toggleDone={toggleDone}
              removeTask={removeTask}
              editTask={editTask}
            />
          ))}
        </ul>
      </article>
      <div
        onClick={openModal}
        className="bg-[#6A6CE0] flex justify-center items-center cursor-pointer left-1/2 -translate-x-1/2 absolute bottom-[30px] w-[52px] h-[52px] rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M15.913 9.13039H9.13039V15.913H6.86952V9.13039H0.0869141V6.86952H6.86952V0.0869141H9.13039V6.86952H15.913V9.13039Z"
            fill="#FFFEFC"
          />
        </svg>
      </div>
      {modalIsOpen && <MyModal addTask={addTask} onRequestClose={closeModal} />}
    </div>
  );
};

export default TasksPage;
