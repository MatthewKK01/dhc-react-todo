/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import james from "./assets/james.svg";
import settings from "./assets/carbon_settings.svg";
import search from "./assets/search.svg";
import taskPage from "./assets/tasks.svg";
import history from "./assets/history.svg";
import TodoItem from "./TodoItem";
import Modal from "./Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { title: newTask, description: "", done: false }]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTask };
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const toggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={james} alt="" />
          <h1 className="text-[#545871] font-bold text-base">James Ronald</h1>
        </div>
        <img src={settings} alt="" />
      </div>
      <div className="searchbar bg-[#FFFEFC] mt-4 mb-11 p-1 flex items-center justify-between">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search for notes"
        />
        <img src={search} alt="" />
      </div>
      <main className="">
        <div className="clearer flex justify-between items-end">
          <div className="switcher flex gap-5 ">
            <div className="flex flex-col">
              <small>Tasks</small>
              <img src={taskPage} alt="" />
            </div>
            <div className="flex flex-col">
              <small>History</small>
              <img src={history} alt="" />
            </div>
          </div>
          <a
            className="cursor-pointer text-[#30507D] text-xs underline"
            onClick={clearAllTasks}
          >
            Clear all Tasks
          </a>
        </div>
        <article className="todoList">
          <ul>
            {filteredTasks.map((task, index) => (
              <TodoItem
                key={index}
                task={task}
                index={index}
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
      
      </main>
    </>
  );
}

export default App;
