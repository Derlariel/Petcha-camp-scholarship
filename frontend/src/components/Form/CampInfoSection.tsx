import React from 'react'
import {motion} from "framer-motion"
import { GraduationCap, AlertCircle } from 'lucide-react';
import { sectionVariants } from '@/utils/animationVariants';
import type { RegistrationRequest } from '@/types/api';
import { SHIRT_SIZES } from '@/constants/shirtSizes';
import { PARTICIPATION_BENEFITS } from '@/constants/participationBenefits';

interface CampInfoSectionProps {
  formData: RegistrationRequest;
  handleInputChange: (field: keyof RegistrationRequest, value: any) => void;
  errors: Record<string, string>;
  prefersReducedMotion: boolean;
}

const CampInfoSection: React.FC<CampInfoSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  prefersReducedMotion
}) => {
  return (
    <motion.div variants={sectionVariants} className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-gray-800 border-b-2 border-orange-200 pb-2">
        <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg">
          <GraduationCap className="w-4 md:w-6 h-4 md:h-6 text-white" />
        </div>
        ข้อมูลการเข้าร่วมค่าย
      </div>

      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
        className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-4 md:p-6"
      >
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="can_attend"
            checked={formData.can_attend}
            onChange={(e) => handleInputChange('can_attend', e.target.checked)}
            className="mt-1 w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-all duration-200"
          />
          <label htmlFor="can_attend" className="text-sm text-gray-700 leading-relaxed">
            ข้าพเจ้าสามารถเข้าร่วมค่ายทุนเพชรพระจอมเกล้าและแสดเหลืองเรืองรุ่ง ปีการศึกษา 2568 
            ได้ในวัน <span className="font-bold text-orange-600">อาทิตย์ที่ 21 กันยายน 2568</span> ณ โรงอาหารอาคารพระจอมเกล้าราชานุสรณ์ 190 ปี
            <br />
            <span className="text-xs text-gray-500 mt-2 block">
              * หากไม่สามารถเข้าร่วมได้ กรุณาส่งอีเมลชี้แจงเหตุผลมาที่ wimolwan.cha@kmutt.ac.th
            </span>
          </label>
        </div>
        {errors.can_attend && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-red-500 text-sm mt-3 flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.can_attend}
          </motion.p>
        )}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">อาหารที่แพ้ (ไม่บังคับ)</label>
          <textarea
            value={formData.food_allergies || '-'}
            onChange={(e) => handleInputChange('food_allergies', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ระบุอาหารที่แพ้ (ถ้ามี)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">โรคประจำตัว (ไม่บังคับ)</label>
          <textarea
            value={formData.medical_conditions || '-'}
            onChange={(e) => handleInputChange('medical_conditions', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ระบุโรคประจำตัว (ถ้ามี)"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ชั่วโมงที่ต้องการรับ</label>
        <select 
          value={formData.participation_benefits ?? 'activity'}
          onChange={(e) => {
            console.log('Selected participation benefit:', e.target.value);
            handleInputChange('participation_benefits', e.target.value as 'activity' | 'orientation');
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PARTICIPATION_BENEFITS.map((participation) => (
            <option key={participation.value} value={participation.value}>{participation.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ขนาดเสื้อ</label>
        <select 
          value={formData.shirt_size}
          onChange={(e) => handleInputChange('shirt_size', e.target.value as any)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SHIRT_SIZES.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
    </motion.div>
  )
}

export default CampInfoSection
