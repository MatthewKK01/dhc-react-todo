/* eslint-disable @typescript-eslint/no-unused-vars */

import TodoItem from "./TodoItem";

function HistoryPage({ completedTasks }) {
  return (
    <ul>
      {completedTasks.map((task, index) => (
        <li>{task.title}</li>
      ))}
    </ul>
  );
}

export default HistoryPage;
