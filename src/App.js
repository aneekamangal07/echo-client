import { Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
import "./App.css";


function App() {
  
  return (
    <div className="App">
      {/* Bringing You Closer, Virtually. */}
      <Routes>
        <Route path="/" element={<Info />} />
       
      </Routes>
    </div>
  );
}

export default App;
