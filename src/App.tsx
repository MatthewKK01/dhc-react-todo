/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import james from "./assets/james.svg";
import settings from "./assets/carbon_settings.svg";
import search from "./assets/search.svg";
import taskPage from "./assets/tasks.svg";
import history from "./assets/history.svg";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import TasksPage from "./components/TasksPage";
function App() {
  const [tasks, setTasks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    try {
      const updatedTasks = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTask };
    setTasks(updatedTasks);
  };
  const removeTask = (index) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating tasks after removal:", error);
    }
  };

  const clearAllTasks = () => {
    try {
      localStorage.removeItem("tasks");
      setTasks([]);
    } catch (error) {
      console.error("Error clearing all tasks:", error);
    }
  };

  const toggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchDescription = task.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    console.log(
      "Title:",
      task.title,
      "Description:",
      task.description,
      "Search Term:",
      searchTerm
    );
    return matchTitle || matchDescription;
  });

  function openModal(): void {
    setIsOpen(true);
  }
  function closeModal(): void {
    setIsOpen(false);
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
      <div className="clearer flex justify-between items-end">
        <div className="switcher flex gap-5 ">
          <div className="flex flex-col">
            <small>Tasks</small>
            <Link to={"/tasks"}>
              <img src={taskPage} alt="" />
            </Link>
          </div>
          <div className="flex flex-col">
            <small>History</small>
            <Link to={"/history"}>
              <img src={history} alt="" />
            </Link>
          </div>
        </div>
        <a
          className="cursor-pointer text-[#30507D] text-xs underline"
          onClick={clearAllTasks}
        >
          Clear all Tasks
        </a>
      </div>
      <main className="">
        <Routes>
          <Route
            path="/tasks"
            element={
              <TasksPage
                filteredTasks={filteredTasks}
                toggleDone={toggleDone}
                removeTask={removeTask}
                editTask={editTask}
                openModal={openModal}
                modalIsOpen={modalIsOpen}
                addTask={addTask}
                closeModal={closeModal}
              />
            }
          />
          <Route path="/history" element={<HistoryPage />} />
          <Route
            path="/"
            element={
              <TasksPage
                modalIsOpen={modalIsOpen}
                addTask={addTask}
                closeModal={closeModal}
                filteredTasks={filteredTasks}
                toggleDone={toggleDone}
                removeTask={removeTask}
                editTask={editTask}
                openModal={openModal}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
