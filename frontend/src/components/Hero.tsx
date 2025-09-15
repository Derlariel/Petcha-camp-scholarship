import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, X, Star, Award } from "lucide-react";
import RegistrationForm from "@/components/Form/RegistrationForm";
import PetchLogo from "/petcha-logo.png";
import Athletic from "@/assets/athletic.PNG";
import Academic from "@/assets/academic.PNG";
import Innovation from "@/assets/innovation.PNG";
import LeaderShip from "@/assets/leadership.PNG";
import Musician from "@/assets/musician.PNG";
import Typo from "@/assets/petchTrans-01.png";

const mascots = [
  { name: "Academic", image: Academic, color: "#e54d1d" },
  { name: "Athletic", image: Athletic, color: "#f9d924" },
  { name: "Innovation", image: Innovation, color: "#e54d1d" },
  { name: "Leadership", image: LeaderShip, color: "#f9d924" },
  { name: "Musician", image: Musician, color: "#e54d1d" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMascot, setCurrentMascot] = useState(0); // เพิ่ม state ที่หายไป
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentMascot((prev) => (prev + 1) % mascots.length);
    }, isMobile ? 2000 : 3000);
    
    return () => clearInterval(interval);
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
  console.log({
    prefersReducedMotion,
    isMobile,
    currentMascot
  });
}, [prefersReducedMotion, isMobile, currentMascot]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getFloatingVariants = () => ({
    float:
      prefersReducedMotion || isMobile
        ? {}
        : {
            y: [-10, 10],
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse" as const,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
  });

  const getSparkleVariants = () => ({
    twinkle:
      prefersReducedMotion || isMobile
        ? {}
        : {
            scale: [0.9, 1.1, 0.9],
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
  });

  const orbVariants = {
    animate1: {
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    animate2: {
      scale: [1.1, 1, 1.1],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: 2,
      },
    },
  };

  const logoVariants = {
    breathe:
      prefersReducedMotion || isMobile
        ? {}
        : {
            scale: [1, 1.02, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {!isMobile && !prefersReducedMotion && (
            <>
              <motion.div
                variants={orbVariants}
                animate="animate1"
                className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"
              />
              <motion.div
                variants={orbVariants}
                animate="animate2"
                className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
              />
            </>
          )}
        </div>

        {!isMobile && !prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={getSparkleVariants()}
                animate="twinkle"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
                className="absolute"
              >
                <Star
                  className="w-3 h-3 text-yellow-300/60"
                  fill="currentColor"
                />
              </motion.div>
            ))}

            <motion.div
              variants={getFloatingVariants()}
              animate="float"
              className="absolute top-32 left-16 w-8 h-8 bg-gradient-to-r from-orange-400/40 to-yellow-400/40 rounded-lg rotate-45"
            />
            <motion.div
              variants={getFloatingVariants()}
              animate="float"
              style={{ animationDelay: "1s" }}
              className="absolute bottom-32 right-32 w-6 h-6 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full"
            />
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <motion.div variants={sectionVariants} className="mb-6 md:mb-8">
            <motion.div
              variants={logoVariants}
              animate="breathe"
              className="inline-flex items-center justify-center w-24 h-24 md:w-40 md:h-40 bg-white/10 backdrop-blur-sm rounded-full shadow-xl mb-4 border border-white/20"
            >
              <img
                src={PetchLogo}
                alt="Petcha Camp Logo"
                className="w-16 h-16 md:w-28 md:h-28 drop-shadow-lg"
              />
            </motion.div>
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1] as const
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-64 md:h-64 bg-gradient-to-r from-orange-400/30 to-yellow-400/30 rounded-full blur-xl -z-10"
            />
          </motion.div>

        
          <motion.div variants={sectionVariants} className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <img src={Typo} alt="Petcha Camp Typography" className="mx-auto max-h-20 md:max-h-32" />
            </h1>

            <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-6 md:mb-8">
              ค่ายสัมมนานักศึกษาทุนเพชรพระจอมเกล้าและแสดเหลืองเรืองรุ่ง 2568
            </h2>

            <div className="grid grid-cols-5 gap-4 md:gap-6 max-w-md mx-auto mb-6">
              {mascots.map((mascot, index) => (
                <motion.div
                  key={mascot.name}
                  className={`text-center transform transition-all duration-300 cursor-pointer ${
                    currentMascot === index ? 'scale-105' : 'hover:scale-110'
                  }`}
                  onClick={() => setCurrentMascot(index)}
                  whileHover={!isMobile ? { scale: 1.1 } : {}}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    opacity: index === currentMascot ? 1 : 0.4
                  }}
                >
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg transition-all duration-300 overflow-hidden"
                    style={{ 
                      backgroundColor: currentMascot === index ? mascot.color : '#dedbdb',
                    }}
                    animate={currentMascot === index ? { y: [-2, 2, -2] } : { y: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] as const }}
                  >
                    <img 
                      src={mascot.image}
                      alt={mascot.name}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                      style={{
                        filter: currentMascot === index ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.8)'
                      }}
                    />
                  </motion.div>
                  <p className={`text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 ${
                    currentMascot === index ? 'text-white' : 'text-white/70'
                  }`}>
                    {mascot.name}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              เปิดรับสมัครนักศึกษาที่มีความโดดเด่นในด้านต่างๆ
              เพื่อเข้าร่วมค่ายพัฒนาศักยภาพและสร้างเครือข่าย
            </p>
          </motion.div>

          <motion.div variants={sectionVariants} className="mb-8 md:mb-10">
            <motion.button
              onClick={openModal}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 md:px-12 md:py-5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-lg md:text-xl font-bold rounded-xl shadow-xl transition-all duration-300"
            >
              <span>สมัครเข้าร่วมโครงการ</span>
              <motion.div
                animate={
                  !prefersReducedMotion && !isMobile
                    ? {
                        x: [0, 5, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1] as const,
                }}
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
            </motion.button>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="space-y-3 md:space-y-4"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-white/80">
              <motion.div
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/20"
              >
                <span className="text-lg md:text-xl">📅</span>
                <span className="text-sm md:text-base">
                  วันที่ 21 กันยายน 2568
                </span>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 mt-6 md:mt-8"
              variants={sectionVariants}
            >
              <motion.div
                whileHover={!isMobile ? { scale: 1.1 } : {}}
                className="flex items-center gap-2 text-white/70"
              >
                <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                <span className="text-xs md:text-sm">2 ประเภททุน</span>
              </motion.div>
              <motion.div
                whileHover={!isMobile ? { scale: 1.1 } : {}}
                className="flex items-center gap-2 text-white/70"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <span className="text-xs md:text-sm">5 สาขา</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {!isMobile && !prefersReducedMotion && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 hidden lg:block"
            >
              <Sparkles className="w-6 h-6 text-yellow-300/50" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-20 hidden lg:block"
            >
              <Award className="w-5 h-5 text-purple-300/50" />
            </motion.div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70"
              onClick={closeModal}
              style={{ backdropFilter: isMobile ? "none" : "blur(8px)" }}
            />

            <motion.div
              initial={{ scale: isMobile ? 1 : 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: isMobile ? 1 : 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden bg-white rounded-2xl md:rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </motion.button>

              <div className="max-h-[95vh] overflow-y-auto">
                <RegistrationForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
