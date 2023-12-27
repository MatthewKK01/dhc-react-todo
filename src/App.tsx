/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import james from "./assets/james.svg";
import settings from "./assets/carbon_settings.svg";
import search from "./assets/search.svg";
import taskPage from "./assets/tasks.svg";
import history from "./assets/history.svg";

import { Routes, Route, Link, useLocation } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import TasksPage from "./components/TasksPage";
function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const localStorageCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setCompletedTasks(localStorageCompletedTasks);
  }, []);

  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Define a function to determine if a route is active
  const isRouteActive = (path) => location.pathname === path;

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTask };
    setTasks(updatedTasks);
  };
  const removeTask = (index: string) => {
    console.log(index);
    const updatedTasks = tasks.filter((task) => task.id !== index);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    localStorage.clear();
    setTasks([]);
  };

  const toggleDone = (taskId) => {
    console.log(taskId);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Toggle the 'done' property
        return { ...task, done: !task.done };
      }
      return task;
    });

    const updatedCompletedTasks = updatedTasks.filter(
      (task) => task.done === true
    );

    const updatedIncompleteTasks = updatedTasks.filter(
      (task) => task.done === false
    );

    localStorage.setItem("tasks", JSON.stringify(updatedIncompleteTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchDescription = task.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return !task.done && (matchTitle || matchDescription);
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
          <div className="flex flex-col items-center">
            <small>Tasks</small>
            <Link to={"/tasks"}>
              <div
                className={`bg-${
                  isRouteActive("/tasks") ? "[#6A6CE0]" : "[#D8D8D8]"
                } rounded-lg p-1 w-9 h-9`}
              >
                <img src={taskPage} alt="" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <small>History</small>
            <Link to={"/history"}>
              <div
                className={`bg-${
                  isRouteActive("/history") ? "[#6A6CE0]" : "[#D8D8D8]"
                } rounded-lg p-1 w-9 h-9`}
              >
                <img src={history} alt="" />
              </div>
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
      <main className="mt-4">
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
          <Route
            path="/history"
            element={
              <HistoryPage
                setCompletedTasks={setCompletedTasks}
                completedTasks={completedTasks}
              />
            }
          />
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
