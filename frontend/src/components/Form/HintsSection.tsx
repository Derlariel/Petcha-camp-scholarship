import React from 'react'
import {motion} from "framer-motion"
import { Sparkles, AlertCircle } from 'lucide-react';
import { sectionVariants } from '@/utils/animationVariants';
import type { RegistrationRequest } from '@/types/api';

interface HintsSectionProps {
  formData: RegistrationRequest;
  handleHintChange: (index: number, value: string) => void;
  errors: Record<string, string>;
  prefersReducedMotion: boolean;
}

const HintsSection: React.FC<HintsSectionProps> = ({
  formData,
  handleHintChange,
  errors
}) => {
  return (
    <motion.div variants={sectionVariants} className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-gray-800 border-b-2 border-orange-200 pb-2">
        <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg">
          <Sparkles className="w-4 md:w-6 h-4 md:h-6 text-white" />
        </div>
        คำใบ้ (10 ข้อ)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.hints.map((hint, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คำใบ้ที่ {index + 1}
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => handleHintChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`คำใบ้ที่ ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {errors.hints && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          {errors.hints}
        </motion.p>
      )}
    </motion.div>
  )
}

export default HintsSection
