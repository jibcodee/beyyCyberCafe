import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor } from "lucide-react";
import "./beyy.css";

import AOC from "./assets/AOC.jpg";
import HyperX from "./assets/hyperX.jpeg";
import Nvidia from "./assets/nvidia.jpg";
import Redragon from "./assets/redragon.jpeg";

const images = [AOC, HyperX, Nvidia, Redragon];

export default function BeyyLanding() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <div className="logo">
            <Monitor className="logo-icon" />
            <span>Beyy Cyber Cafe</span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>High Performance Gaming Starts Here</h1>
            <p>Fast PCs, smooth internet, competitive vibes.</p>
          </motion.div>

          {/* IMAGE SLIDER */}
          <div className="slider-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt="Cyber Cafe Equipment"
                className="slider-image"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>

            <div className="slider-controls">
              <button onClick={() => setIndex((index - 1 + images.length) % images.length)}>◀</button>
              <button onClick={() => setIndex((index + 1) % images.length)}>▶</button>
            </div>
          </div>
        </section>

        <section id="specs" className="section">
          <h2>PC Spec</h2>

          <div className="spec-detail">
            <h3>Gaming PC Specification</h3>
            <p><strong>CPU:</strong> Intel Core i5-13400F</p>
            <p><strong>GPU:</strong> NVIDIA RTX 4060</p>
            <p><strong>RAM:</strong> 32GB DDR4</p>
            <p><strong>Storage:</strong> 1TB NVMe SSD</p>
          </div>
        </section>
      </main>
    </div>
  );
}
