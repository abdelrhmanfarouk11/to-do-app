import "../css/home.css";
import TaskHolder from "../components/TaskHolder";
import { useState, useEffect } from "react";
type Task = {
  id: string;
  text: string;
  pinned: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const pinnedCount = tasks.filter((task) => task.pinned).length;
  const pinnedTasks = tasks.filter((task) => task.pinned);
  const [isOpen, setIsOpen] = useState(false);

  const handleAsideOpen = () => {
    setIsOpen(!isOpen);
  };

  const unPinned = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="home">
      <div className="container">
        <div className={`aside ${isOpen ? "open-aside" : "close-aside"}`}>
          <div className="aside-title">
            <p className="aside-title">pinned tasks </p>
            <i
              className="fa-solid fa-arrow-up hadle-open"
              onClick={handleAsideOpen}
            ></i>
            {pinnedCount > 0 && (
              <div
                className={`pinned-count ${
                  isOpen ? "open-aside" : "close-aside"
                }`}
              >
                {pinnedCount}
              </div>
            )}
          </div>
          <ul className={`  ${isOpen ? "open-aside" : "close-aside"}`}>
            {pinnedTasks.length === 0 ? (
              <p className={`  ${isOpen ? "open-aside" : "close-aside"}`}>
                empty!
              </p>
            ) : (
              pinnedTasks.map((task) => (
                <li
                  className={`  ${isOpen ? "open-aside" : "close-aside"}`}
                  key={task.id}
                >
                  {task.text}
                  <i
                    className="fa-solid fa-check check-btn"
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => unPinned(task.id)}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
        <div
          className={` content ${isOpen ? "open-content" : "close-content"}`}
        >
          <TaskHolder
            tasks={tasks}
            setTasks={setTasks}
            pinnedCount={pinnedCount}
          />
        </div>
      </div>
      <footer>
          <h3>
            write all your daily tasks eaisly with <span>Taskify</span>
            <i className="fa fa-flag"></i>
          </h3>
          <p>
            all rights reseved for{" "}
            <a
              href="mailto:abdelrhmanfaroukaa@gmail.com?subject=Hello%20Farouk&body=Hi%20Farouk,%0D%0A%0D%0AI%20want%20to%20contact%20you%20regarding..."
              target="_blank"
              rel="noopener noreferrer"
            >
              abdelrhmanfaroukaa@gmail.com
            </a>
            in 2025
          </p>
        <div className="rights">
          <div className="contact">
          <a
            href="https://www.facebook.com/AbdelrhmanFarouka"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/abdelrhman-farouk-98b708271/"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/abdelrhmanfarouk11"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        </div>
        
      </footer>
    </div>
  );
};

export default Home;
