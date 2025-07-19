import "../css/home.css";
import TaskHolder from "../components/TaskHolder";
import { useState } from "react";
type Task = {
  text: string;
  pinned: boolean;
};
const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const pinnedTasks = tasks.filter((tasks) => tasks.pinned);

  const unPinned = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  return (
    <div className="home">
      <div className="container">
        <div className="aside">
          <p>pinned tasks</p>
          <hr />
          <ul className="">
            {pinnedTasks.length === 0 ? (
              <p>empty!</p>
            ) : (
              pinnedTasks.map((task, index) => (
                <li key={index}>
                  {task.text}
                  <i
                    className="fa-solid fa-check check-btn"
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => unPinned(index)}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="content">
          <TaskHolder tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
