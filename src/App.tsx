import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import AuthPage from "./components/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Homepage />} />
    </Routes>
  );
}

export default App;
