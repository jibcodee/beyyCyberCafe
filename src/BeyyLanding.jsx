import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Printer } from "lucide-react";
import "./beyy.css";

import AOC from "./assets/AOC.jpg";
import HyperX from "./assets/hyperX.jpg";
import Nvidia from "./assets/nvidia.jpg";
import Redragon from "./assets/redragon.jpg";

const images = [AOC, HyperX, Nvidia, Redragon];

export default function BeyyLanding() {
  const [index, setIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  const [showPrinterPrice, setShowPrinterPrice] = useState(false);
  const [showGamingPrice, setShowGamingPrice] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState("Package 1");
  const [selectedPrice, setSelectedPrice] = useState("1 hour / RM 8");
  const [showPopup, setShowPopup] = useState(false);

  // Auto slide banner
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for nav highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "specs", "services", "booking", "contact"];
      let scrollPos = window.scrollY + 200;
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollPos) setActiveNav(sec);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const specs = {
    gaming: {
      title: "Package 1",
      cpu: "Intel Core i5-13400F",
      gpu: "NVIDIA RTX 4060",
      ram: "32GB DDR4",
      storage: "1TB NVMe SSD",
      price: "1 hour / RM 8",
    },
    streaming: { title: "Package 2", price: "3 hour / RM 21" },
    casual: { title: "Package 3", price: "5 hour / RM 45" },
  };

  const handleReserveClick = (packageKey) => {
    setSelectedPackage(specs[packageKey].title);
    setSelectedPrice(specs[packageKey].price);
    setShowPopup(true);
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
            <a href="#hero" className={activeNav === "hero" ? "active" : ""}>Home</a>
            <a href="#specs" className={activeNav === "specs" ? "active" : ""}>PC Spec</a>
            <a href="#services" className={activeNav === "services" ? "active" : ""}>Service</a>
            <a href="#booking" className={activeNav === "booking" ? "active" : ""}>Reserve Now</a>
            <a href="#contact" className={activeNav === "contact" ? "active" : ""}>Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section id="hero" className="hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
                draggable={true}
              />
            </AnimatePresence>
          </div>
        </section>

        {/* ================= PC SPEC ================= */}
        <section id="specs" className="section">
          <h2>PC Spec</h2>
          <motion.div className="spec-detail" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Gaming PC Specification</h3>
            <div className="spec-text">
              <p><strong>CPU:</strong> {specs.gaming.cpu}</p>
              <p><strong>GPU:</strong> {specs.gaming.gpu}</p>
              <p><strong>RAM:</strong> {specs.gaming.ram}</p>
              <p><strong>Storage:</strong> {specs.gaming.storage}</p>
            </div>
          </motion.div>

          <div className="spec-grid">
            {Object.values(specs).map((pkg, idx) => (
              <div
                key={idx}
                className={`spec-card ${selectedPackage === pkg.title ? "highlight" : ""}`}
              >
                <h3>{pkg.title}</h3>
                <p>{pkg.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section">
          <h2>Service</h2>
          <div className="service-grid">
            <div
              className="service-card service-flex"
              onClick={() => setShowPrinterPrice(!showPrinterPrice)}
            >
              <Printer className="service-icon" />
              <span>Printing</span>
              {showPrinterPrice && (
                <div className="service-price">
                  <p>RM 0.50 per page B/W</p>
                  <p>RM 1.50 per page Color</p>
                </div>
              )}
            </div>
            <div
              className="service-card service-flex"
              onClick={() => {
                setShowGamingPrice(!showGamingPrice);
                // scroll to PC Spec
                document.getElementById("specs").scrollIntoView({ behavior: "smooth" });
                setSelectedPackage("Package 1"); // highlight Package 1
              }}
            >
              <Monitor className="service-icon" />
              <span>Gaming PCs</span>
              {showGamingPrice && <span className="service-price">{specs.gaming.price}</span>}
            </div>
          </div>
        </section>

        {/* ================= BOOKING FORM ================= */}
        <section id="booking" className="section">
          <h2>Reserve Your PC</h2>
          <div className="booking-form">
            <input type="text" placeholder="Your Name" />
            <select onChange={(e) => {
              const key = e.target.value;
              setSelectedPackage(specs[key].title);
              setSelectedPrice(specs[key].price);
            }}>
              <option value="gaming">Package 1</option>
              <option value="streaming">Package 2</option>
              <option value="casual">Package 3</option>
            </select>
            <button onClick={() => setShowPopup(true)}>Reserve Now</button>
          </div>
        </section>

        {/* ================= POPUP ================= */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Confirm Booking</h3>
              <p>Confirm book <strong>{selectedPackage}</strong> for <strong>{selectedPrice}</strong>?</p>
              <div className="popup-buttons">
                <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
                <button className="continue-btn" disabled>Continue</button>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <h3>WhatsApp</h3>
              <p>012-3456789</p>
            </div>
            <div className="contact-item">
              <h3>Email</h3>
              <p>contact@beyycybercafe.com</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>Durian Tunggal, Melaka</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
