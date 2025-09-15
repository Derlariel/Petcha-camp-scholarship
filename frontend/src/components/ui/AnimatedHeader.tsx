import React from 'react'
import {motion} from "framer-motion"
import { Sparkles, Heart, GraduationCap } from 'lucide-react';
import { sectionVariants } from '@/utils/animationVariants';
import PetchaLogo from "/petcha-logo.png"

interface AnimatedHeaderProps {
  prefersReducedMotion: boolean;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  prefersReducedMotion
}) => {
  return (
    <motion.div
      variants={sectionVariants}
      className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white p-4 md:p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 text-center">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-2 md:mb-4"
        >
          <div className="h-12 md:h-16 w-12 md:w-16 bg-white rounded-lg flex items-center justify-center">
            <img src={PetchaLogo} alt="" />
          </div>
        </motion.div>
        
        <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">ลงทะเบียนค่าย Petcha Camp</h1>
        <p className="text-orange-100 text-sm md:text-lg">วันอาทิตย์ที่ 21 กันยายน 2568 ณ โรงอาหารอาคารพระจอมเกล้าราชานุสรณ์ 190 ปี</p>
        
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{
                y: [-10, 10, -10],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }
              }}
              className="absolute top-2 md:top-4 left-2 md:left-4 hidden md:block"
            >
              <Sparkles className="w-4 md:w-6 h-4 md:h-6 text-yellow-300 opacity-70" />
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
              className="absolute top-4 md:top-8 right-4 md:right-8 hidden md:block"
            >
              <Heart className="w-3 md:w-5 h-3 md:h-5 text-pink-300 opacity-70" />
            </motion.div>
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
              className="absolute bottom-2 md:bottom-4 left-4 md:left-8 hidden md:block"
            >
              <GraduationCap className="w-4 md:w-6 h-4 md:h-6 text-blue-300 opacity-70" />
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default AnimatedHeader 