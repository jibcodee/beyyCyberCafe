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

  const specs = {
    gaming: {
      title: "Package 1",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

          {/* IMAGE SLIDER */}
          {/* IMAGE SLIDER BANNER */}
<div className="slider-banner">
  <AnimatePresence mode="wait">
    <motion.img
      key={index}
      src={images[index]}
      alt="Cyber Cafe Equipment"
      className="slider-image"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, info) => {
        if (info.offset.x < -100) {
          setIndex((index + 1) % images.length);
        } else if (info.offset.x > 100) {
          setIndex((index - 1 + images.length) % images.length);
        }
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    />
  </AnimatePresence>
</div>


        {/* ================= PC SPEC ================= */}
        <section id="specs" className="section">
          <h2>PC Spec</h2>

          {/* 🔥 ALWAYS VISIBLE DETAIL */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="spec-detail"
          >
            <h3>Gaming PC Specification</h3>
            <p><strong>CPU:</strong> Intel Core i5-13400F</p>
            <p><strong>GPU:</strong> NVIDIA RTX 4060</p>
            <p><strong>RAM:</strong> 32GB DDR4</p>
            <p><strong>Storage:</strong> 1TB NVMe SSD</p>
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
