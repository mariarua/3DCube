"use client";
import { useRef, useState } from "react";

export default function Cubo3D() {
  const cuboRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const startDrag = (e) => {
    setDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - lastPosition.current.x;
    const deltaY = e.clientY - lastPosition.current.y;
    setRotation((prev) => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const stopDrag = () => setDragging(false);

  return (
    <div
      className="flex justify-center items-center h-screen bg-black"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
    >
      {/* Contenedor con perspectiva 3D */}
      <div className="relative w-40 h-40 perspective-[800px]">
        <div
          ref={cuboRef}
          className="absolute w-40 h-40 transform-style-preserve-3d cursor-grab"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d", // Asegura que el cubo se mantenga en 3D
          }}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
        >
          {/* Cara frontal */}
          <div
            className="absolute w-40 h-40 bg-black border-2 border-white shadow-[0_0_20px_rgba(138,43,226,0.8)]"
            style={{
              transform: "translateZ(20px)", // Frente
            }}
          ></div>

          {/* Cara trasera */}
          <div
            className="absolute w-40 h-40 bg-black border-2 border-white shadow-[0_0_20px_rgba(138,43,226,0.8)]"
            style={{
              transform: "rotateY(180deg) translateZ(20px)", // Trasera
            }}
          ></div>

          {/* Cara izquierda */}
          <div
            className="absolute w-40 h-40 bg-black border-2 border-white shadow-[0_0_20px_rgba(138,43,226,0.8)]"
            style={{
              transform: "rotateY(-90deg) translateZ(20px)", // Izquierda
            }}
          ></div>

          {/* Cara derecha */}
          <div
            className="absolute w-40 h-40 bg-black border-2 border-white shadow-[0_0_20px_rgba(138,43,226,0.8)]"
            style={{
              transform: "rotateY(90deg) translateZ(20px)", // Derecha
            }}
          ></div>

          {/* Cara superior */}
          <div
            className="absolute w-40 h-40 bg-black border-2 border-white shadow-[0_0_20px_rgba(138,43,226,0.8)]"
            style={{
              transform: "rotateX(-90deg) translateZ(20px)", // Arriba
            }}
          ></div>

          {/* Cara inferior */}
          <div
            className="absolute w-40 h-40 bg-black border-2 border-white shadow-[0_0_20px_rgba(138,43,226,0.8)]"
            style={{
              transform: "rotateX(90deg) translateZ(20px)", // Abajo
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
