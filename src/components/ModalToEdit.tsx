/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./MyModal.css";
import { TaskDetails } from "..";

function ModalToEdit({
  taskToEdit,
  closeModal,
  settaskDetail,
}: {
  taskToEdit: TaskDetails;
  closeModal: any;
  settaskDetail: any;
}) {
  const [taskName, setTaskName] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const Save = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: taskToEdit.id,
      title: taskName,
      description: description,
      done: false,
    };
    console.log("updated task", updatedTask);
    settaskDetail(updatedTask);
    closeModal();
  };
  return (
    <div className="modal flex items-center justify-center">
      <div className="myModal p-4 relative">
        <div className="flex items-center justify-center mb-2">
          <h1>Edit Task</h1>
          <svg
            className="absolute right-4 cursor-pointer"
            onClick={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5.33335 15.8334L4.16669 14.6667L8.83335 10.0001L4.16669 5.33341L5.33335 4.16675L10 8.83342L14.6667 4.16675L15.8334 5.33341L11.1667 10.0001L15.8334 14.6667L14.6667 15.8334L10 11.1667L5.33335 15.8334Z"
              fill="#30507D"
            />
          </svg>
        </div>
        <form onSubmit={Save}>
          <div
            className={`input-container ${
              isFocused || taskName ? "active" : ""
            }`}
          >
            <input
              className="newTaskName"
              type="text"
              id="inputField"
              onChange={(e) => setTaskName(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <label htmlFor="inputField" className="placeholder-label">
              Task Name
            </label>
          </div>

          <textarea
            className="resize-none h-[99px] text-[10px]"
            id="descriptionField"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type task details here..."
          />

          <button
            className="bg-[#6a6ce0] mt-2 mb-3 rounded px-10 py-2 w-full text-white cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalToEdit;
