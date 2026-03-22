import { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const normalizeTask = (task) => ({
    ...task,
    _id: task._id ?? task.id,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const normalizeTasks = (taskList) =>
    Array.isArray(taskList) ? taskList.map(normalizeTask) : [];


  // Vérifier le token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Récupérer les tâches
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(apiUrl("/api/tasks"), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        }

        const data = await res.json();
        const rawTasks = Array.isArray(data) ? data : data.tasks || [];
        setTasks(normalizeTasks(rawTasks));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [normalizeTasks]);

  // Ajouter une tâche
  const addTask = async (title) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(apiUrl("/api/tasks"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      const data = await res.json();
      const normalized = normalizeTask(data);

      setTasks((prevTasks) => [normalized, ...prevTasks]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Supprimer tâche
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(apiUrl(`/api/tasks/${id}`), {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id && task.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Changer status
  const changeStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("token");

    const nextStatus =
      currentStatus === "To-Do"
        ? "Doing"
        : currentStatus === "Doing"
        ? "Done"
        : "To-Do";

    try {
      const res = await fetch(apiUrl(`/api/tasks/${id}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await res.json();
      const normalizedUpdated = normalizeTask(updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id || task.id === id ? normalizedUpdated : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Filtrer les tâches
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || "")
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

      <AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask} />

      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No matching tasks found 🔍</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              changeStatus={changeStatus}
            />
          ))
        )}
      </div>

      <button
        className="mt-6 p-2 bg-red-500 text-white rounded"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;