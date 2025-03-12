import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login";
import PassDim from "./components/Password_dim";
import Register from "./components/Register";
import { Alert } from "react-bootstrap";
import MQTTClient from "./components/MttqClient";
import Module3D from "./components/3D_Models";
import GraficiMqtt from "./components/Grafici";
import Tools from "./components/Tools";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Password_dimenticata" element={<PassDim />} />
        <Route path="/mqtt" element={<MQTTClient />} />
        <Route path="/3Dmodels" element={<Module3D />} />
        <Route path="/grafici" element={<GraficiMqtt />} />
        <Route path="/tools" element={<Tools />} />
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
