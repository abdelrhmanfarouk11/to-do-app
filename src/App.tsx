import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import './css/app.css'
const App = () => {
  return (
    <div className="main-content">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
