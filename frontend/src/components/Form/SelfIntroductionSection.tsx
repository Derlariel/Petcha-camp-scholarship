import React from 'react'
import {motion} from "framer-motion"
import { MessageSquare, Instagram } from 'lucide-react';
import { sectionVariants } from '@/utils/animationVariants';
import type { RegistrationRequest } from '@/types/api';

interface SelfIntroductionSectionProps {
  formData: RegistrationRequest;
  handleInputChange: (field: keyof RegistrationRequest, value: any) => void;
  errors: Record<string, string>;
  prefersReducedMotion: boolean;
}

const SelfIntroductionSection: React.FC<SelfIntroductionSectionProps> = ({
  formData,
  handleInputChange,
  errors
}) => {
  return (
    <motion.div variants={sectionVariants} className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-gray-800 border-b-2 border-orange-200 pb-2">
        <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg">
          <MessageSquare className="w-4 md:w-6 h-4 md:h-6 text-white" />
        </div>
        แนะนำตัว
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">แนะนำตัว (ไม่เกิน 100 ตัวอักษร) *</label>
        <textarea
          value={formData.self_introduction}
          onChange={(e) => handleInputChange('self_introduction', e.target.value)}
          rows={4}
          maxLength={100}
          className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.self_introduction ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300'}`}
          placeholder="แนะนำตัวคุณใน 100 ตัวอักษร..."
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {formData.self_introduction.length}/100 ตัวอักษร
          </span>
          {errors.self_introduction && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm"
            >
              {errors.self_introduction}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">ผลงานที่ภาคภูมิใจ (ไม่เกิน 500 ตัวอักษร) *</label>
        <textarea
          value={formData.proud_achievement}
          onChange={(e) => handleInputChange('proud_achievement', e.target.value)}
          rows={6}
          maxLength={500}
          className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.proud_achievement ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300'}`}
          placeholder="เล่าผลงานที่คุณภาคภูมิใจ..."
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {formData.proud_achievement.length}/500 ตัวอักษร
          </span>
          {errors.proud_achievement && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm"
            >
              {errors.proud_achievement}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (ไม่บังคับ)</label>
        <div className="relative">
          <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.instagram_handle || ''}
            onChange={(e) => handleInputChange('instagram_handle', e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="@username"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SelfIntroductionSection
