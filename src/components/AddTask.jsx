import React from "react";

function AddTask({ newTask, setNewTask, addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    addTask(newTask.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <input
        type="text"
        placeholder="📝 Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 p-3 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}

export default AddTask;