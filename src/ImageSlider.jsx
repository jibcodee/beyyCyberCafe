import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/slide1.jpg",
  "/assets/slide2.jpg",
  "/assets/slide3.jpg",
  "/assets/slide4.jpg"
];

function ImageSlider() {
  const [index, setIndex] = useState(0);

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((index + 1) % images.length);
  const prevSlide = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="slider-container">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Beyy Cyber Cafe"
          className="slider-image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      <div className="slider-controls">
        <button onClick={prevSlide}>◀</button>
        <button onClick={nextSlide}>▶</button>
      </div>
    </div>
  );
}

export default ImageSlider;