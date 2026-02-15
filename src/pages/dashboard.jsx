import { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");


useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        status: "To-Do",
      },
    ]);

    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changeStatus = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const nextStatus =
            task.status === "To-Do"
              ? "Doing"
              : task.status === "Doing"
              ? "Done"
              : "To-Do";

          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    filterStatus === "All" || task.status === filterStatus;

  return matchesSearch && matchesStatus;
});


  return (
    <div className="min-h-screen bg-gray-100 p-6">
<h1 className="text-3xl font-bold mb-2">📋 My Tasks</h1>
<p className="text-gray-600 mb-6">
  Organize your time and track your progress
</p>

 <div className="flex flex-col md:flex-row gap-4 mb-6">
  <input
    type="text"
    placeholder="🔍 Search for a task..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-1 p-3 border rounded focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="p-3 border rounded"
  >
    <option value="All">All</option>
    <option value="To-Do">To-Do</option>
    <option value="Doing">Doing</option>
    <option value="Done">Done</option>
  </select>
</div>


      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />

      <div className="grid gap-4">
  {filteredTasks.length === 0 ? (
    <div className="text-center text-gray-500 mt-10">
      <p className="text-lg">No matching tasks found 🔍</p>
    </div>
  ) : (
    filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        changeStatus={changeStatus}
      />
    ))
  )}
</div>

    </div>
  );
}

export default Dashboard;