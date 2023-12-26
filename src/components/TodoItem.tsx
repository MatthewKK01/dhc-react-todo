/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import checkOne from "../assets/check_one.svg";
import arrow from "../assets/tabler_chevron-up.svg";
import "./TodoItem.css";
function TodoItem({ task, index, toggleDone, removeTask, editTask }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleArrowClick = () => {
    setShowDescription(!showDescription);
  };
  return (
    <li>
      <div className="flex items-center justify-between  mb-[30px]">
        <h1>{task.title}</h1>
        <img
          onClick={handleArrowClick}
          style={{
            transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
          }}
          src={arrow}
          alt=""
        />
      </div>
      {showDescription && (
        <div className="description mb-6">
          <p>{task.description}</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="buttons flex gap-[10px]">
          <button
            onClick={() => {
              const updatedTask = prompt("Enter updated task:", task.title);
              if (updatedTask !== null) {
                editTask(index, { ...task, title: updatedTask });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.16665 16.6667H15.8333C16.0543 16.6667 16.2663 16.7545 16.4226 16.9108C16.5788 17.0671 16.6666 17.2791 16.6666 17.5001C16.6666 17.7211 16.5788 17.9331 16.4226 18.0893C16.2663 18.2456 16.0543 18.3334 15.8333 18.3334H4.16665C3.94563 18.3334 3.73367 18.2456 3.57739 18.0893C3.42111 17.9331 3.33331 17.7211 3.33331 17.5001C3.33331 17.2791 3.42111 17.0671 3.57739 16.9108C3.73367 16.7545 3.94563 16.6667 4.16665 16.6667ZM3.33331 12.5001L11.6666 4.16675L14.1666 6.66675L5.83331 15.0001H3.33331V12.5001ZM12.5 3.33341L14.1666 1.66675L16.6666 4.16675L14.9991 5.83425L12.5 3.33341Z"
                fill="#372F2F"
              />
            </svg>
          </button>
          <button onClick={() => removeTask(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5.83335 3.33341C5.83335 2.89139 6.00895 2.46746 6.32151 2.1549C6.63407 1.84234 7.05799 1.66675 7.50002 1.66675H12.5C12.942 1.66675 13.366 1.84234 13.6785 2.1549C13.9911 2.46746 14.1667 2.89139 14.1667 3.33341V5.00008H17.5C17.721 5.00008 17.933 5.08788 18.0893 5.24416C18.2456 5.40044 18.3334 5.6124 18.3334 5.83341C18.3334 6.05443 18.2456 6.26639 18.0893 6.42267C17.933 6.57895 17.721 6.66675 17.5 6.66675H16.6092L15.8867 16.7851C15.8568 17.2056 15.6686 17.5991 15.3601 17.8864C15.0516 18.1737 14.6457 18.3334 14.2242 18.3334H5.77502C5.35347 18.3334 4.94758 18.1737 4.63909 17.8864C4.33061 17.5991 4.14245 17.2056 4.11252 16.7851L3.39169 6.66675H2.50002C2.27901 6.66675 2.06704 6.57895 1.91076 6.42267C1.75448 6.26639 1.66669 6.05443 1.66669 5.83341C1.66669 5.6124 1.75448 5.40044 1.91076 5.24416C2.06704 5.08788 2.27901 5.00008 2.50002 5.00008H5.83335V3.33341ZM7.50002 5.00008H12.5V3.33341H7.50002V5.00008ZM5.06169 6.66675L5.77585 16.6667H14.225L14.9392 6.66675H5.06169ZM8.33335 8.33341C8.55437 8.33341 8.76633 8.42121 8.92261 8.57749C9.07889 8.73377 9.16669 8.94573 9.16669 9.16675V14.1667C9.16669 14.3878 9.07889 14.5997 8.92261 14.756C8.76633 14.9123 8.55437 15.0001 8.33335 15.0001C8.11234 15.0001 7.90038 14.9123 7.7441 14.756C7.58782 14.5997 7.50002 14.3878 7.50002 14.1667V9.16675C7.50002 8.94573 7.58782 8.73377 7.7441 8.57749C7.90038 8.42121 8.11234 8.33341 8.33335 8.33341ZM11.6667 8.33341C11.8877 8.33341 12.0997 8.42121 12.2559 8.57749C12.4122 8.73377 12.5 8.94573 12.5 9.16675V14.1667C12.5 14.3878 12.4122 14.5997 12.2559 14.756C12.0997 14.9123 11.8877 15.0001 11.6667 15.0001C11.4457 15.0001 11.2337 14.9123 11.0774 14.756C10.9211 14.5997 10.8334 14.3878 10.8334 14.1667V9.16675C10.8334 8.94573 10.9211 8.73377 11.0774 8.57749C11.2337 8.42121 11.4457 8.33341 11.6667 8.33341Z"
                fill="#F48686"
              />
            </svg>
          </button>
        </div>
        <label className="flex gap-2" htmlFor="mark">
          <span>Mark Completed</span> <img src={checkOne} alt="" />{" "}
        </label>
        <input
          className="hidden"
          id="mark"
          type="checkbox"
          checked={task.done}
          onChange={() => toggleDone(index)}
        />
      </div>
    </li>
  );
}

export default TodoItem;
