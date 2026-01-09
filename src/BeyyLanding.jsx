import React from "react";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import "./beyy.css";

export default function BeyyLanding() {
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>High Performance Gaming Starts Here</h1>
            <p>Fast PCs, smooth internet, competitive vibes.</p>
          </motion.div>
        </section>

        {/* ================= PC SPEC ================= */}
        <section id="specs" className="section">
          <h2>PC Spec</h2>

          {/* 🔥 GAMING PC DETAIL ALWAYS VISIBLE */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="spec-detail"
          >
            <h3>Gaming PC Specification</h3>
            <div className="spec-text">
              <p><strong>CPU:</strong> Intel Core i5-13400F</p>
              <p><strong>GPU:</strong> NVIDIA RTX 4060</p>
              <p><strong>RAM:</strong> 32GB DDR4</p>
              <p><strong>Storage:</strong> 1TB NVMe SSD</p>
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