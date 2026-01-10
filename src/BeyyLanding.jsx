import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./beyy.css";
import { Monitor, Printer, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function BeyyLanding() {
  const sectionsIds = useMemo(
    () => ["specs", "services", "packages", "booking", "contact"],
    []
  );

  const [activeNav, setActiveNav] = useState("specs");
  const [showPrintPrice, setShowPrintPrice] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Booking form state
  const [name, setName] = useState("");
  const [packageChoice, setPackageChoice] = useState("Package 1");

  // Confirmation popup state
  const [showConfirm, setShowConfirm] = useState(false);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Sample slider images - replace with your actual images
  const sliderImages = [
    "https://picsum.photos/1200/420?random=1",
    "https://picsum.photos/1200/420?random=2",
    "https://picsum.photos/1200/420?random=3",
  ];

  // Refs to DOM nodes for scroll spy
  const sectionsRef = useRef({});

  useEffect(() => {
    // Cache section elements
    sectionsRef.current = sectionsIds.reduce((acc, id) => {
      const el = document.getElementById(id);
      if (el) acc[id] = el;
      return acc;
    }, {});
  }, [sectionsIds]);

  // Debounced scroll spy (simple throttle)
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = window.scrollY + 200;
        let current = sectionsIds[0];
        for (const id of sectionsIds) {
          const el = sectionsRef.current[id];
          if (el && el.offsetTop <= offset) {
            current = id;
          }
        }
        setActiveNav((prev) => (prev === current ? prev : current));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionsIds]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  }, []);

  // When user clicks Reserve Now: show confirmation popup (if name provided)
  const handleReserveSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!name.trim()) {
        alert("Please enter your name.");
        return;
      }
      // Show confirmation popup with current name and package
      setShowConfirm(true);
    },
    [name]
  );

  // Cancel button: close popup only
  const handleCancel = useCallback(() => {
    setShowConfirm(false);
  }, []);

  // Continue button: placeholder action (does NOT close popup)
  const handleContinue = useCallback(() => {
    // Replace this with real booking logic (API call, etc.)
    console.log("Continue clicked. Booking details:", { name, packageChoice });
    // Intentionally not closing the popup per request
  }, [name, packageChoice]);

  // Get package price based on selection
  const getPackagePrice = useCallback((packageName) => {
    const prices = {
      "Package 1": "RM 8",
      "Package 2": "RM 21",
      "Package 3": "RM 45"
    };
    return prices[packageName] || "RM 0";
  }, []);

  // Slider functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, [sliderImages.length]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - translateX);
  }, [translateX]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      setTranslateX(x);
    },
    [isDragging, startX]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX < -100) {
      nextSlide();
    } else if (translateX > 100) {
      prevSlide();
    }
    setTranslateX(0);
  }, [isDragging, translateX, nextSlide, prevSlide]);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="app">
      <header className="nav" role="banner">
        <div className="nav-inner">
          <div
            className="logo"
            onClick={() => scrollTo("specs")}
            tabIndex={0}
            role="button"
            aria-label="Go to top"
          >
            <Monitor />
            <span>Beyy Cyber Cafe</span>
          </div>

          <button
            className="mobile-toggle"
            aria-expanded={mobileOpen}
            aria-controls="main-nav"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <nav
            id="main-nav"
            className={`nav-links ${mobileOpen ? "open" : ""}`}
            role="navigation"
            aria-label="Main navigation"
          >
            {sectionsIds.map((id) => (
              <span
                key={id}
                className={activeNav === id ? "active" : ""}
                onClick={() => scrollTo(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollTo(id);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-current={activeNav === id ? "page" : undefined}
              >
                {id === "specs" && "PC Spec"}
                {id === "services" && "Service"}
                {id === "packages" && "Packages"}
                {id === "booking" && "Reserve Now"}
                {id === "contact" && "Contact"}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Image Slider Banner */}
      <div className="slider-container">
        <div className="slider-wrapper">
          <button 
            className="slider-btn slider-btn-left" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>

          <div
            className="slider-track"
            style={{
              transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
              transition: isDragging ? 'none' : 'transform 0.5s ease',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {sliderImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Slide ${idx + 1}`}
                className="slider-image"
                draggable="false"
              />
            ))}
          </div>

          <button 
            className="slider-btn slider-btn-right" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>

          {/* Slider dots */}
          <div className="slider-dots">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                className={`slider-dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* Hero Banner */}
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Welcome to Beyy Cyber Cafe</h1>
            <p>Experience Next-Gen Gaming with RTX 4060 & i5 13th Gen</p>
            <button className="hero-btn" onClick={() => scrollTo("booking")}>
              Book Now
            </button>
          </div>
        </section>

        <section id="specs" className="section">
          <h2>PC Specifications</h2>
          <div className="pc-spec-card rgb-border">
            <ul>
              <li>Intel Core i5 13th Gen</li>
              <li>NVIDIA RTX4060</li>
              <li>16GB DDR5 RAM</li>
              <li>1TB NVMe SSD</li>
              <li>High Refresh Rate Monitor</li>
              <li>Mechanical Keyboard & Gaming Mouse</li>
            </ul>
          </div>
        </section>

        <section id="packages" className="section">
          <h2>Packages</h2>
          <div className="package-grid">
            <div className="package-card rgb-border">
              <h3>Package 1</h3>
              <p>RM 8 / 1 Hour</p>
            </div>

            <div className="package-card rgb-border">
              <h3>Package 2</h3>
              <p>RM 21 / 3 Hours</p>
            </div>

            <div className="package-card rgb-border">
              <h3>Package 3</h3>
              <p>RM 35 / 5 Hours</p>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <h2>Service</h2>
          <div className="service-grid">
            <div
              className="service-card rgb-border"
              onClick={() => setShowPrintPrice((s) => !s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowPrintPrice((s) => !s);
              }}
              aria-pressed={showPrintPrice}
            >
              <div className="service-head">
                <Printer />
                <h3>Printing</h3>
              </div>

              {showPrintPrice && (
                <div className="print-price" aria-live="polite">
                  <p>RM 0.50 / page B&W</p>
                  <p>RM 1.50 / page Color</p>
                </div>
              )}
            </div>

            <div
              className="service-card rgb-border"
              onClick={() => scrollTo("specs")}
              role="button"
              tabIndex={0}
            >
              <div className="service-head">
                <Monitor />
                <h3>Gaming PCs</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="section">
          <h2>Reserve Your PC</h2>
          <form className="booking-form rgb-border" onSubmit={handleReserveSubmit}>
            <label className="sr-only" htmlFor="res-name">
              Your Name
            </label>
            <input
              id="res-name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
            />

            <label className="sr-only" htmlFor="res-package">
              Package
            </label>
            <select
              id="res-package"
              value={packageChoice}
              onChange={(e) => setPackageChoice(e.target.value)}
              aria-label="Choose package"
            >
              <option>Package 1</option>
              <option>Package 2</option>
              <option>Package 3</option>
            </select>

            <button type="submit">Reserve Now</button>
          </form>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="contact-card rgb-border">
              <h4>WhatsApp</h4>
              <p>012-345 6789</p>
            </div>

            <div className="contact-card rgb-border">
              <h4>Address</h4>
              <p>Durian Tunggal, Melaka</p>
            </div>
          </div>
        </section>
      </main>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="popup-box rgb-border">
            <h3 id="confirm-title">Confirm booking?</h3>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Package:</strong> {packageChoice}
            </p>
            <p>
              <strong>Price:</strong> {getPackagePrice(packageChoice)}
            </p>

            <div className="popup-buttons">
              <button className="cancel-btn" type="button" onClick={handleCancel}>
                Cancel
              </button>

              <button
                className="continue-btn"
                type="button"
                onClick={handleContinue}
                aria-label="Continue with booking"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}