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

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const specs = {
    gaming: {
      title: "Package 1",
      cpu: "Intel Core i5-13400F",
      gpu: "NVIDIA RTX 4060",
      ram: "32GB DDR4",
      storage: "1TB NVMe SSD",
      price: "1 hour / RM 8"
    },
    streaming: {
      title: "Package 2",
      price: "3 hour / RM 21"
    },
    casual: {
      title: "Package 3",
      price: "5 hour / RM 45"
    }
  };

  return (
    <div className="app">
      {/* ================= NAV ================= */}
      <header className="nav">
        <div className="nav-inner">
          <div className="logo">
            <Monitor className="logo-icon" />
            <span>Beyy Cyber Cafe</span>
          </div>
          <nav className="nav-links">
            <a href="#specs">PC Spec</a>
            <a href="#services">Service</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container">
        {/* ================= HERO ================= */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>High Performance Gaming Starts Here</h1>
            <p>Fast PCs, smooth internet, competitive vibes.</p>
          </motion.div>

          {/* ================= IMAGE BANNER ================= */}
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
                draggable={true} // allows drag
              />
            </AnimatePresence>
          </div>
        </section>

        {/* ================= PC SPEC ================= */}
        <section id="specs" className="section">
          <h2>PC Spec</h2>

          {/* GAMING PC DETAIL VISIBLE */}
          <motion.div
            className="spec-detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Gaming PC Specification</h3>
            <div className="spec-text">
              <p><strong>CPU:</strong> {specs.gaming.cpu}</p>
              <p><strong>GPU:</strong> {specs.gaming.gpu}</p>
              <p><strong>RAM:</strong> {specs.gaming.ram}</p>
              <p><strong>Storage:</strong> {specs.gaming.storage}</p>
            </div>
          </motion.div>

          {/* PRICE CARDS */}
          <div className="spec-grid">
            <div className="spec-card">
              <h3>{specs.gaming.title}</h3>
              <p>{specs.gaming.price}</p>
            </div>
            <div className="spec-card">
              <h3>{specs.streaming.title}</h3>
              <p>{specs.streaming.price}</p>
            </div>
            <div className="spec-card">
              <h3>{specs.casual.title}</h3>
              <p>{specs.casual.price}</p>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section">
          <h2>Service</h2>
          <div className="service-grid">
            <div className="service-card service-flex">
              <Monitor className="service-icon" />
              <span>Printing</span>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>WhatsApp / Instagram / Walk-in</p>
        </section>
      </main>
    </div>
  );
}
