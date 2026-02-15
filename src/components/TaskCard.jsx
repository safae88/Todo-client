function TaskCard({ task, deleteTask, changeStatus }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <span className="font-medium">{task.title}</span>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded text-sm text-white ${
            task.status === "To-Do"
              ? "bg-gray-500"
              : task.status === "Doing"
              ? "bg-yellow-500"
              : "bg-green-600"
          }`}
        >
          {task.status}
        </span>

        <button
          onClick={() => changeStatus(task.id)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
