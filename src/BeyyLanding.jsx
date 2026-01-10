import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const [printingOpen, setPrintingOpen] = useState(false);
  const heroRef = useRef(null);
  const printingRef = useRef(null);
  const sliderTimer = useRef(null);

  // preload
  useEffect(() => {
    images.forEach((s) => {
      const i = new Image();
      i.src = s;
    });
  }, []);

  // slider: CSS-based fade; keep JS minimal and pause when hero not visible or tab hidden.
  useEffect(() => {
    let observer;
    const start = () => {
      if (sliderTimer.current) return;
      sliderTimer.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 3500);
    };
    const stop = () => {
      if (sliderTimer.current) {
        clearInterval(sliderTimer.current);
        sliderTimer.current = null;
      }
    };

    // pause on visibility change
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    // observe hero visibility
    if (heroRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0.25 }
      );
      observer.observe(heroRef.current);
    } else {
      start();
    }

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      if (observer) observer.disconnect();
    };
  }, []);

  // nav highlight with IntersectionObserver
  useEffect(() => {
    const ids = ["hero", "specs", "services", "booking", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    let last = activeNav;
    const io = new IntersectionObserver(
      (entries) => {
        // choose highest intersectionRatio
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const id = visible[0].target.id;
          if (id !== last) {
            last = id;
            setActiveNav(id);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-25% 0% -40% 0%" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close printing on outside click
  useEffect(() => {
    function handleDown(e) {
      if (!printingOpen) return;
      if (printingRef.current && !printingRef.current.contains(e.target)) {
        setPrintingOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleDown);
    return () => document.removeEventListener("pointerdown", handleDown);
  }, [printingOpen]);

  // Close printing when services scroll out
  useEffect(() => {
    if (!printingOpen) return;
    const services = document.getElementById("services");
    if (!services) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) setPrintingOpen(false);
    }, { threshold: 0.3 });
    io.observe(services);
    return () => io.disconnect();
  }, [printingOpen]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="app">
      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => scrollTo("hero")} role="button">
            <Monitor className="logo-icon" />
            <span>Beyy Cyber Cafe</span>
          </div>

          <nav className="nav-links" aria-label="main navigation">
            {["hero", "specs", "services", "booking", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
                className={activeNav === id ? "active" : ""}
                aria-current={activeNav === id ? "page" : undefined}
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

      <main>
        {/* HERO */}
        <section id="hero" className="hero" ref={heroRef}>
          <div className="hero-inner">
            <h1>High Performance Gaming Starts Here</h1>
            <p>Fast PCs, smooth internet, competitive vibes.</p>
          </div>

          <div className="slider-container" aria-hidden="false">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Showcase ${i + 1}`}
                className={`slider-image ${i === index ? "active" : ""}`}
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </section>

        {/* SPECS */}
        <section id="specs" className="section">
          <h2>PC Spec</h2>
          <div className="spec-grid">
            <div className="spec-card always-rgb">
              <h3 className="spec-title">Package 1</h3>
              <p>Intel i5 / RTX 4060 / 32GB / 1TB NVMe</p>
              <p className="spec-price">1 hour / RM 8</p>
            </div>
            <div className="spec-card always-rgb">
              <h3 className="spec-title">Package 2</h3>
              <p>Streaming setup</p>
              <p className="spec-price">3 hour / RM 21</p>
            </div>
            <div className="spec-card always-rgb">
              <h3 className="spec-title">Package 3</h3>
              <p>Casual setup</p>
              <p className="spec-price">5 hour / RM 45</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <h2>Service</h2>
          <div className="service-grid">
            <div
              ref={printingRef}
              className={`service-card always-rgb printing-card ${printingOpen ? "open" : ""}`}
              onClick={() => setPrintingOpen((s) => !s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPrintingOpen((s) => !s);
                }
              }}
              aria-expanded={printingOpen}
            >
              <div className="service-main">
                <Printer className="service-icon" />
                <span className="service-title">Printing</span>
              </div>

              {/* overlay inside card (absolute) */}
              <div className={`printing-overlay ${printingOpen ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                <p>RM 0.50 per page (B/W)</p>
                <p>RM 1.50 per page (Color)</p>
              </div>
            </div>

            <div className="service-card always-rgb" onClick={() => scrollTo("specs")} role="button">
              <div className="service-main">
                <Monitor className="service-icon" />
                <span className="service-title">Gaming PCs</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING */}
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
