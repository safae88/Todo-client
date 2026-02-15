function AddTask({ newTask, setNewTask, addTask }) {
  return (
    <form onSubmit={addTask} className="flex gap-4 mb-6">
      <input
  type="text"
  placeholder="Write a new task..."
  value={newTask}
  onChange={(e) => setNewTask(e.target.value)}
  className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


      <button
  disabled={!newTask.trim()}
  className={`px-6 rounded text-white ${
    newTask.trim()
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Add
</button>

    </form>
  );
}

export default AddTask;
