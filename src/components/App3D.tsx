import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import { JSX } from "react";

function App3D(): JSX.Element {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cube />
      </Canvas>
    </div>
  );
}

export default App3D;
