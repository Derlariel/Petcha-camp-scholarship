import React from 'react'
import {motion} from "framer-motion"
import { sectionVariants } from '@/utils/animationVariants';

interface SubmitButtonProps {
  isSubmitting: boolean;
  onSubmit: () => void;
  prefersReducedMotion: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  onSubmit,
  prefersReducedMotion
}) => {
  return (
    <motion.div
      variants={sectionVariants}
      className="flex justify-center pt-6"
    >
      <motion.button
        onClick={onSubmit}
        disabled={isSubmitting}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งใบสมัคร'}
      </motion.button>
    </motion.div>
  )
}

export default SubmitButton 