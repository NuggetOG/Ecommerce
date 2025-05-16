import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const menImages = [
  "/images/covermen.png",
  "/images/main2.png",
  "/images/hoodie.png",
];

const womenImages = [
  "/images/girlss.png",
  "/images/sunglasses.png",
  "/images/cap.png",
];

export const Cover = () => {
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);

  // Sync both sections' images
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % menImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.25,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const spanVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const bgVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-[70vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Men Section */}
      <div
        onClick={() => navigate("/store/men")}
        className="relative group cursor-pointer overflow-hidden h-[35vh] md:h-auto bg-cover bg-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={menImages[imgIdx]}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${menImages[imgIdx]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center z-10">
          <motion.span
            variants={spanVariants}
            initial="hidden"
            animate="visible"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className="text-white text-3xl md:text-5xl tracking-wide border-2 px-6 py-2 bg-black bg-opacity-30 rounded"
          >
            Men's section
          </motion.span>
        </div>
      </div>

      {/* Women Section */}
      <div
        onClick={() => navigate("/store/women")}
        className="relative group cursor-pointer overflow-hidden h-[35vh] md:h-auto bg-cover bg-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={womenImages[imgIdx]}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${womenImages[imgIdx]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center z-10">
          <motion.span
            variants={spanVariants}
            initial="hidden"
            animate="visible"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className="text-pink-800 text-3xl md:text-5xl tracking-wide border-2 px-6 py-2 bg-white bg-opacity-30 rounded"
          >
            Women's section
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};