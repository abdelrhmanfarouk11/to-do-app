import { useState } from "react";
import "../css/taskholder.css";

type Task = {
  text: string;
  pinned: boolean;
};

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskHolder = ({ tasks, setTasks }: Props) => {
  const [newTask, setNewTask] = useState("");

  const handleTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const addTasks = () => {
    if (newTask.trim() !== "") {
      setTasks((prev) => [...prev, { text: newTask, pinned: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handlePin = (index: number) => {
    const updatedTasks = [...tasks];
    const [selectedTask] = updatedTasks.splice(index, 1);
    if (selectedTask.pinned) {
      selectedTask.pinned = false;
      updatedTasks.unshift(selectedTask);
    } else {
      selectedTask.pinned = true;
      updatedTasks.push(selectedTask);
    }
    setTasks(updatedTasks);
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
        <p className="content-title">your tasks will appear here!</p>
      ) : (
        <div className="task-content">
          {visableTasks.map((task) => {
            const realIndex = tasks.indexOf(task);

            return (
              <div
                className={`task ${task.pinned ? "active" : ""}`}
                key={realIndex}
              >
                {task.text}
                <div className="icon-container">
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(realIndex)}
                  >
                    <i className="fa-solid fa-check hover"></i>
                  </button>
                  <button
                    className="pin-btn"
                    onClick={() => handlePin(realIndex)}
                  >
                    <i className="fa-solid fa-thumbtack hover"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskHolder;
