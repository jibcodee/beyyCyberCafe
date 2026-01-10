import React, { useEffect, useRef, useState } from "react";
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
  const [showPrinting, setShowPrinting] = useState(false);
  const heroRef = useRef(null);

  /* ================= SLIDER (optimized) ================= */
  useEffect(() => {
    let interval;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(
            () => setIndex((i) => (i + 1) % images.length),
            3500
          );
        } else {
          clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  /* ================= NAV SCROLL SPY ================= */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* ================= NAV ================= */}
      <header className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => scrollTo("hero")}>
            <Monitor />
            <span>Beyy Cyber Cafe</span>
          </div>

          <nav className="nav-links">
            {["hero", "specs", "services", "booking", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeNav === id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
              >
                {id === "hero"
                  ? "Home"
                  : id === "specs"
                  ? "PC Spec"
                  : id === "services"
                  ? "Service"
                  : id === "booking"
                  ? "Reserve Now"
                  : "Contact"}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section id="hero" className="hero" ref={heroRef}>
        <h1>High Performance Gaming Starts Here</h1>
        <p>Fast PCs, smooth internet, competitive vibes.</p>

        <div className="slider-container">
          <img
            src={images[index]}
            alt="Cyber Cafe"
            className="slider-image"
          />
        </div>
      </section>

      {/* ================= SPEC ================= */}
      <section id="specs" className="section">
        <h2>PC Spec</h2>

        <div className="spec-grid">
          <div className="spec-card always-rgb">
            <h3 className="spec-title">Package 1</h3>
            <p>1 hour / RM 8</p>
          </div>
          <div className="spec-card always-rgb">
            <h3 className="spec-title">Package 2</h3>
            <p>3 hour / RM 21</p>
          </div>
          <div className="spec-card always-rgb">
            <h3 className="spec-title">Package 3</h3>
            <p>5 hour / RM 45</p>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="section">
        <h2>Service</h2>

        <div className="service-grid">
          {/* Printing */}
          <div
            className="service-card always-rgb"
            onClick={() => setShowPrinting((v) => !v)}
          >
            <div className="service-flex-row">
              <Printer />
              <span className="service-title">Printing</span>
            </div>

            {showPrinting && (
              <div className="printing-info">
                <p>RM 0.50 per page (B/W)</p>
                <p>RM 1.50 per page (Color)</p>
              </div>
            )}
          </div>

          {/* Gaming */}
          <div
            className="service-card always-rgb"
            onClick={() => scrollTo("specs")}
          >
            <div className="service-flex-row">
              <Monitor />
              <span className="service-title">Gaming PCs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section id="booking" className="section">
        <h2>Reserve Now</h2>
        <div className="booking-form">
          <input placeholder="Your Name" />
          <select>
            <option>Package 1</option>
            <option>Package 2</option>
            <option>Package 3</option>
          </select>
          <button>Reserve Now</button>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
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
    </div>
  );
}
