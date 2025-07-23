import { useState } from "react";
import "../css/taskholder.css";

type Task = {
  id: string;
  text: string;
  pinned: boolean;
};

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  pinnedCount: number;
};

const TaskHolder = ({ tasks, setTasks, pinnedCount }: Props) => {
  const [newTask, setNewTask] = useState("");

  const handleTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const addTasks = () => {
    if (newTask.trim() !== "") {
      const newTaskObj: Task = {
        id: Date.now().toString(),
        text: newTask,
        pinned: false,
      };
      setTasks((prev) => [...prev, newTaskObj]);
      setNewTask("");
    }
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handlePin = (id: string) => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      const [selectedTask] = updatedTasks.splice(index, 1);
      selectedTask.pinned = !selectedTask.pinned;
      if (selectedTask.pinned) {
        updatedTasks.push(selectedTask);
      } else {
        updatedTasks.unshift(selectedTask);
      }
      setTasks(updatedTasks);
    }
  };

  const visableTasks = tasks.filter((task) => !task.pinned);

  return (
    <div className="task-holder">
      <div className="enter-task">
        <input
          type="text"
          placeholder="Enter a Task.."
          onChange={handleTasks}
          value={newTask}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTasks();
          }}
        />
        <button className="add-btn" onClick={addTasks}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      {visableTasks.length === 0 ? (
        <p className="content-title">Your tasks will appear here!</p>
      ) : (
        <div className="task-content">
          {visableTasks.map((task) => (
            <div
              className={`task ${task.pinned ? "active" : ""}`}
              key={task.id}
            >
              {task.text}
              <div className="icon-container">
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  <i className="fa-solid fa-check hover"></i>
                </button>
                <button className="pin-btn" onClick={() => handlePin(task.id)}>
                  <i className="fa-solid fa-thumbtack hover"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskHolder;
