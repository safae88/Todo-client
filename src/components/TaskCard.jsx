import React from "react";

function TaskCard({ task, deleteTask, changeStatus }) {
  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p
          className={`mt-1 font-medium ${
            task.status === "To-Do"
              ? "text-gray-500"
              : task.status === "Doing"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {task.status}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => changeStatus(task._id, task.status)}
          className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Change Status
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;