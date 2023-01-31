import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
  const isLogging = useSelector((state) => state.cart.isLogging);
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isLogging ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
