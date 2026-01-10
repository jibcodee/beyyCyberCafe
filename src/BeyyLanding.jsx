import React, { useEffect, useState } from "react";
import "./beyy.css";
import { Monitor, Printer } from "lucide-react";

export default function BeyyLanding() {
  const [activeNav, setActiveNav] = useState("specs");
  const [showPrintPrice, setShowPrintPrice] = useState(false);

  /* ================= SCROLL SPY (OPTIMIZED) ================= */
  useEffect(() => {
    const sections = ["specs", "services", "packages", "booking", "contact"];

    const onScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(id);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">

      {/* ================= NAV ================= */}
      <header className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => scrollTo("specs")}>
            <Monitor />
            <span>Beyy Cyber Cafe</span>
          </div>

          <nav className="nav-links">
            {["specs","services","packages","booking","contact"].map((id) => (
              <span
                key={id}
                className={activeNav === id ? "active" : ""}
                onClick={() => scrollTo(id)}
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

      {/* ================= PC SPEC ================= */}
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

      {/* ================= PACKAGES ================= */}
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

      {/* ================= SERVICES ================= */}
      <section id="services" className="section">
        <h2>Service</h2>

        <div className="service-grid">
          {/* PRINTING */}
          <div
            className="service-card rgb-border"
            onClick={() => setShowPrintPrice(!showPrintPrice)}
          >
            <div className="service-head">
              <Printer />
              <h3>Printing</h3>
            </div>

            {showPrintPrice && (
              <div className="print-price">
                <p>RM 0.50 / page (B&W)</p>
                <p>RM 1.50 / page (Color)</p>
              </div>
            )}
          </div>

          {/* GAMING */}
          <div
            className="service-card rgb-border"
            onClick={() => scrollTo("specs")}
          >
            <div className="service-head">
              <Monitor />
              <h3>Gaming PCs</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING ================= */}
      <section id="booking" className="section">
        <h2>Reserve Your PC</h2>

        <div className="booking-form rgb-border">
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

    </div>
  );
}
