import React from "react";
import close from "./assets/close.svg";

function Modal() {
  return (
    <>
      <div className="flex">
        <h1>Create Task</h1>
        <img src={close} alt="" />
      </div>
    </>
  );
}

export default Modal;
