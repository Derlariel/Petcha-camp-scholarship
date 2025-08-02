import React from 'react'
import {motion} from "framer-motion"
import { CheckCircle, Sparkles } from 'lucide-react';
import { containerVariants, sectionVariants, reducedMotionVariants } from '@/utils/animationVariants';

interface AnimatedSuccessModalProps {
  prefersReducedMotion: boolean;
}

const AnimatedSuccessModal: React.FC<AnimatedSuccessModalProps> = ({
  prefersReducedMotion
}) => {
  const currentVariants = prefersReducedMotion ? reducedMotionVariants : containerVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={currentVariants}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-gray-100 flex items-center justify-center p-4"
    >
      <motion.div
        variants={prefersReducedMotion ? reducedMotionVariants : sectionVariants}
        className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </motion.div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
          สมัครสำเร็จ!
        </h2>
        <p className="text-gray-600 mb-4">ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว</p>
        <p className="text-sm text-gray-500">ทางทีมงานจะติดต่อกลับในเร็วๆ นี้</p>
        
        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={prefersReducedMotion ? {} : {
                y: [0, -10, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }
              }}
              className="w-2 h-2 bg-orange-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedSuccessModal 