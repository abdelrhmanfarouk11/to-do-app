// App.tsx
import { ThemeProvider } from "./context/themeContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ThemeProvider>
      <Navbar/>
      <Home />
    </ThemeProvider>
  );
};

export default App;
