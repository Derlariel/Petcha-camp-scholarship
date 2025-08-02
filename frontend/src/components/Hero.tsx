import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { containerVariants, sectionVariants } from '@/utils/animationVariants';
import RegistrationForm from '@/components/Form/RegistrationForm';
import PetchLogo from "/petcha-logo.png"
const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const
              }
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: 1
              }
            }}
            className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30"
          />
          <motion.div
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: 2
              }
            }}
            className="absolute bottom-20 left-20 w-24 h-24 bg-orange-100 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: 0.5
              }
            }}
            className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-300 rounded-full opacity-25"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            variants={sectionVariants}
            className="mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-24 h-24 md:w-48 md:h-48  shadow-2xl mb-2"
            >
              {/* <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-orange-500" /> */}
              <img src={PetchLogo} alt="" className="w-18 h-18 md:w-32 md:h-32 text-orange-500" />
            </motion.div>
          </motion.div>

          {/* Typography */}
          <motion.div
            variants={sectionVariants}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Petcha Camp
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
              ค่ายทุนเพชรพระจอมเกล้าและแสดเหลืองเรืองรุ่ง
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              เปิดรับสมัครนักศึกษาที่มีความโดดเด่นในด้านต่างๆ 
              เพื่อเข้าร่วมค่ายพัฒนาศักยภาพและสร้างเครือข่าย
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={sectionVariants}
            className="mb-8"
          >
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-lg md:text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <span>สมัครเข้าร่วมโครงการ</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={sectionVariants}
            className="text-sm md:text-base text-gray-500"
          >
            <p>📅 วันที่ 30-31 สิงหาคม 2568</p>
            <p>📍 โรงแรม เขาใหญ่ จังหวัดนครราชสีมา</p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const
            }
          }}
          className="absolute top-10 left-10 hidden md:block"
        >
          <Sparkles className="w-6 h-6 text-yellow-300 opacity-70" />
        </motion.div>
        <motion.div
          animate={{
            y: [-10, 10, -10],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 1
            }
          }}
          className="absolute top-20 right-10 hidden md:block"
        >
          <Sparkles className="w-4 h-4 text-orange-300 opacity-70" />
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Registration Form */}
              <div className="max-h-[90vh] overflow-y-auto">
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