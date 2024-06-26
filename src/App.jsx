/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import "./App.css";

const Torus = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  });

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={size} />
      <MeshTransmissionMaterial {...materialProps} color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    <div className="container">
      <Canvas>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 0, 2]} />
        <Text
          position={[0, 0, -0.5]}
          fontSize={1}
          fontWeight={"bold"}
          color={"white"}
        >
          {" "}
          hello world{" "}
        </Text>
        <Torus position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default App;
