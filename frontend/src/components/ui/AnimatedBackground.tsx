import React from 'react'
import {motion} from "framer-motion"

interface AnimatedBackgroundProps {
  prefersReducedMotion: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  prefersReducedMotion
}) => {
  if (prefersReducedMotion) return null;

  return (
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
        className="absolute top-20 left-4 md:left-10 w-12 md:w-20 h-12 md:h-20 bg-orange-200 rounded-full opacity-20"
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
        className="absolute top-40 right-4 md:right-20 w-8 md:w-16 h-8 md:h-16 bg-yellow-200 rounded-full opacity-30"
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
        className="absolute bottom-20 left-4 md:left-20 w-16 md:w-24 h-16 md:h-24 bg-orange-100 rounded-full opacity-20"
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
        className="absolute bottom-40 right-2 md:right-10 w-6 md:w-12 h-6 md:h-12 bg-yellow-300 rounded-full opacity-25"
      />
    </div>
  )
}

export default AnimatedBackground 