{/* ================= CONTACT ================= */}
<section id="contact" className="section">
  <h2>Contact & Quick Links</h2>
  <div className="contact-grid">
    {/* WhatsApp */}
    <div
      className={`contact-item ${selectedPackage === "WhatsApp" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("WhatsApp")}
    >
      <h3>WhatsApp</h3>
      <p>012-3456789</p>
    </div>

    {/* Email */}
    <div
      className={`contact-item ${selectedPackage === "Email" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("Email")}
    >
      <h3>Email</h3>
      <p>contact@beyycybercafe.com</p>
    </div>

    {/* Address */}
    <div
      className={`contact-item ${selectedPackage === "Address" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("Address")}
    >
      <h3>Address</h3>
      <p>Durian Tunggal, Melaka</p>
    </div>

    {/* Quick links for packages/services */}
    <div
      className={`contact-item ${selectedPackage === "Package 2" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("Package 2")}
    >
      <h3>Package 2</h3>
      <p>3 hour / RM 21</p>
    </div>

    <div
      className={`contact-item ${selectedPackage === "Package 3" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("Package 3")}
    >
      <h3>Package 3</h3>
      <p>5 hour / RM 45</p>
    </div>

    <div
      className={`contact-item ${selectedPackage === "Printing" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("Printing")}
    >
      <h3>Printing</h3>
      <p>RM 0.50 B/W | RM 1.50 Color</p>
    </div>

    <div
      className={`contact-item ${selectedPackage === "Gaming PC" ? "highlight" : ""}`}
      onClick={() => setSelectedPackage("Gaming PC")}
    >
      <h3>Gaming PC</h3>
      <p>1 hour / RM 8</p>
    </div>
  </div>
</section>
