"use client";
import { useRef, useState, MouseEvent } from "react";

export default function Cubo3D() {
  const cuboRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 15 });
  const [dragging, setDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const startDrag = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const onDrag = (e: MouseEvent<HTMLDivElement>) => {
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

  const cubeSize = 320;
  const halfSize = cubeSize / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center lg:flex-row">
      <div className="lg:w-1/3 p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Cubo 3D Interactivo
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Arrastra el cubo para rotarlo en cualquier dirección
        </p>
        <div className="text-sm text-gray-400 space-y-2">
          <p>• Haz clic y arrastra para rotar</p>
          <p>• Cada cara tiene un color diferente</p>
          <p>• Efectos de iluminación morada en los bordes</p>
          <p>• Construido con CSS 3D transforms</p>
        </div>
      </div>
      <div
        className="lg:w-2/3 flex justify-center items-center min-h-[600px] lg:min-h-screen"
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div
          className="relative"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "center center",
          }}
        >
          <div
            ref={cuboRef}
            className={`relative cursor-${dragging ? "grabbing" : "grab"}`}
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: dragging ? "none" : "transform 0.1s ease-out",
            }}
            onMouseDown={startDrag}
          >
            <div
              className="absolute inset-0 bg-gray-900 border-2 border-white flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `translateZ(${halfSize}px)`,
                boxShadow:
                  "0 0 30px rgba(138,43,226,0.6), inset 0 0 30px rgba(138,43,226,0.2)",
              }}
            >
              FRONT
            </div>
            <div
              className="absolute inset-0 bg-gray-900 border-2 border-white flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateY(180deg) translateZ(${halfSize}px)`,
                boxShadow:
                  "0 0 30px rgba(138,43,226,0.6), inset 0 0 30px rgba(138,43,226,0.2)",
              }}
            >
              BACK
            </div>
            <div
              className="absolute inset-0 bg-gray-800 border-2 border-white flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                boxShadow:
                  "0 0 30px rgba(138,43,226,0.6), inset 0 0 30px rgba(138,43,226,0.2)",
              }}
            >
              RIGHT
            </div>
            <div
              className="absolute inset-0 bg-gray-800 border-2 border-white flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                boxShadow:
                  "0 0 30px rgba(138,43,226,0.6), inset 0 0 30px rgba(138,43,226,0.2)",
              }}
            >
              LEFT
            </div>
            <div
              className="absolute inset-0 bg-gray-700 border-2 border-white flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                boxShadow:
                  "0 0 30px rgba(138,43,226,0.6), inset 0 0 30px rgba(138,43,226,0.2)",
              }}
            >
              TOP
            </div>
            <div
              className="absolute inset-0 bg-gray-700 border-2 border-white flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                boxShadow:
                  "0 0 30px rgba(138,43,226,0.6), inset 0 0 30px rgba(138,43,226,0.2)",
              }}
            >
              BOTTOM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
