import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Printer } from "lucide-react";
import "./beyy.css";

import AOC from "./assets/AOC.jpg";
import HyperX from "./assets/HyperX.jpg";
import Nvidia from "./assets/nvidia.jpg";
import Redragon from "./assets/redragon.jpg";

const images = [AOC, HyperX, Nvidia, Redragon];

export default function BeyyLanding() {
  const [index, setIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  const [hoveredService, setHoveredService] = useState("");
  const [hoveredSpec, setHoveredSpec] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("gaming");
  const [userName, setUserName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // printing panel inside the service card
  const [printingOpen, setPrintingOpen] = useState(false);
  const printingRef = useRef(null);

  // Auto slide banner
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver for robust nav highlight
  useEffect(() => {
    const ids = ["hero", "specs", "services", "booking", "contact"];
    const sectionElements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    let observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersectionRatio (most visible)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveNav(visible[0].target.id);
        } else {
          // if none intersecting, keep last known or fallback to hero
          // do nothing (keeps previous activeNav)
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px", // tunes when a section is considered 'active'
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close printing panel when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (printingOpen && printingRef.current && !printingRef.current.contains(e.target)) {
        setPrintingOpen(false);
      }
    }
    if (printingOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [printingOpen]);

  // Close printing panel when user scrolls away from services
  useEffect(() => {
    if (activeNav !== "services" && printingOpen) {
      setPrintingOpen(false);
    }
  }, [activeNav, printingOpen]);

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // activeNav will update via IntersectionObserver
    }
  };

  const handleReserveClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="app">
      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => scrollToSection("hero")}>
            <Monitor className="logo-icon" />
            <span>Beyy Cyber Cafe</span>
          </div>

          <nav className="nav-links" role="navigation" aria-label="main">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className={activeNav === "hero" ? "active" : ""}
            >
              Home
            </a>

            <a
              href="#specs"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("specs");
              }}
              className={activeNav === "specs" ? "active" : ""}
            >
              PC Spec
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className={activeNav === "services" ? "active" : ""}
            >
              Service
            </a>

            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("booking");
              }}
              className={activeNav === "booking" ? "active" : ""}
            >
              Reserve Now
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className={activeNav === "contact" ? "active" : ""}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>High Performance Gaming Starts Here</h1>
            <p>Fast PCs, smooth internet, competitive vibes.</p>
          </motion.div>

          <div className="slider-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt="Cyber Cafe Showcase"
                className="slider-image"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
                draggable
              />
            </AnimatePresence>
          </div>
        </section>

        {/* PC SPEC */}
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
            {Object.keys(specs).map((key) => {
              const pkg = specs[key];
              return (
                <div
                  key={key}
                  className={`spec-card always-rgb ${hoveredSpec === pkg.title ? "green-highlight" : ""}`}
                  onMouseEnter={() => setHoveredSpec(pkg.title)}
                  onMouseLeave={() => setHoveredSpec("")}
                  onClick={() => setSelectedPackage(key)}
                >
                  <h3 className="spec-title">{pkg.title}</h3>
                  <p>{pkg.price}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <h2>Service</h2>
          <div className="service-grid">
            {/* Printing (expand inside card) */}
            <div
              ref={printingRef}
              className={`service-card always-rgb ${hoveredService === "Printing" ? "green-highlight" : ""} ${printingOpen ? "printing-open" : ""}`}
              onMouseEnter={() => setHoveredService("Printing")}
              onMouseLeave={() => setHoveredService("")}
              onClick={() => setPrintingOpen((p) => !p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPrintingOpen((p) => !p);
                }
              }}
              aria-expanded={printingOpen}
              aria-controls="printing-panel"
            >
              <div className="service-flex-row">
                <Printer className="service-icon" />
                <span className="service-title">Printing</span>
              </div>

              {/* Printing panel inside card */}
              <div id="printing-panel" className={`printing-panel ${printingOpen ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                <p>RM 0.50 per page (B/W)</p>
                <p>RM 1.50 per page (Color)</p>
              </div>
            </div>

            <div
              className={`service-card always-rgb ${hoveredService === "Gaming PCs" ? "green-highlight" : ""}`}
              onMouseEnter={() => setHoveredService("Gaming PCs")}
              onMouseLeave={() => setHoveredService("")}
              onClick={() => scrollToSection("specs")}
            >
              <div className="service-flex-row">
                <Monitor className="service-icon" />
                <span className="service-title">Gaming PCs</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="section">
          <h2>Reserve Your PC</h2>

          <div className="booking-form">
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
              <option value="gaming">Package 1</option>
              <option value="streaming">Package 2</option>
              <option value="casual">Package 3</option>
            </select>

            <button onClick={handleReserveClick}>Reserve Now</button>
          </div>
        </section>

        {/* POPUP */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Confirm Booking</h3>
              <p><strong>Name:</strong> {userName || "(not provided)"}</p>
              <p><strong>Package:</strong> {specs[selectedPackage].title}</p>
              <p><strong>Price:</strong> {specs[selectedPackage].price}</p>

              <div className="popup-buttons">
                <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
                <button className="continue-btn" disabled>Continue</button>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="contact-item always-rgb">
              <h3 className="contact-title">WhatsApp</h3>
              <p>012-3456789</p>
            </div>
            <div className="contact-item always-rgb">
              <h3 className="contact-title">Email</h3>
              <p>contact@beyycybercafe.com</p>
            </div>
            <div className="contact-item always-rgb">
              <h3 className="contact-title">Address</h3>
              <p>Durian Tunggal, Melaka</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
