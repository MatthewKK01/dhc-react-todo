/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Modal from "react-modal";

function CustomModal({ isOpen, onRequestClose }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <h1>Create Task</h1>
        <p onClick={onRequestClose}>X</p>
        <input type="text" placeholder="Task Name" />
        <textarea name="" placeholder="Description" id=""></textarea>
      </Modal>
    </div>
  );
}

export default CustomModal;
