import { Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
import "./App.css";
import Room from "./pages/Room";

function App() {
  return (
    <div className="App">
      {/* Bringing You Closer, Virtually. */}
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
