import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ErrorModalProps = {
  errors: Record<string, string>;
  onClose: () => void;
  prefersReducedMotion?: boolean;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ errors, onClose, prefersReducedMotion }) => {
  const errorMessages = Object.entries(errors)
    .filter(([_, msg]) => msg)
    .map(([, msg]) => `${msg}`);

  if (errorMessages.length === 0) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { 
      y: prefersReducedMotion ? 0 : 40, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30, delay: 0.1 }
    },
    exit: { 
      y: prefersReducedMotion ? 0 : 40, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        onClick={onClose} 
        style={{ touchAction: 'none' }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
          variants={contentVariants}
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-red-600 flex items-center">
              <svg 
                className="w-6 h-6 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
              กรุณาแก้ไขข้อมูลที่ผิดพลาด
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="ปิด"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <ul className="space-y-2">
              {errorMessages.map((msg, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <svg 
                    className="w-4 h-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="text-sm">{msg}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-3">
            <button
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
              onClick={onClose}
            >
              ปิด
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorModal;