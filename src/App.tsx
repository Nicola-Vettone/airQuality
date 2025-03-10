import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login";
import PassDim from "./components/Password_dim";
import Register from "./components/Register";
import { Alert } from "react-bootstrap";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Password_dimenticata" element={<PassDim />} />
        <Route
          path="*"
          element={
            <Alert className="mt-3 text-center" variant="danger">
              Error 404-pagina non trovata
            </Alert>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
