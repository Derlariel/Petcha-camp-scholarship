import React from 'react'
import {motion, AnimatePresence} from "framer-motion"
import {  User, GraduationCap, MessageSquare, Instagram, AlertCircle, Sparkles } from 'lucide-react';
import { sectionVariants, imageVariants, reducedMotionVariants } from '@/utils/animationVariants';
import type { RegistrationRequest } from '@/types/api';
import { CATEGORY_IMAGES } from '@/constants/categoryImage';
import { SHIRT_SIZES } from '@/constants/shirtSizes';
import { DEPARTMENTS } from '@/constants/departments';

interface PersonalInfoSectionProps {
  formData: RegistrationRequest;
  handleInputChange: (field: keyof RegistrationRequest, value: any) => void;
  errors: Record<string, string>;
  prefersReducedMotion: boolean;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  prefersReducedMotion
}) => {
  return (
    <motion.div variants={sectionVariants} className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-gray-800 border-b-2 border-orange-200 pb-2">
        <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg">
          <User className="w-4 md:w-6 h-4 md:h-6 text-white" />
        </div>
        ข้อมูลส่วนตัว
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ทุนการศึกษา</label>
          <select 
            value={formData.scholarship_type}
            onChange={(e) => handleInputChange('scholarship_type', e.target.value as any)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="เพชรพระจอมเกล้า">เพชรพระจอมเกล้า</option>
            <option value="แสดเหลืองเรืองรุ่ง">แสดเหลืองเรืองรุ่ง</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ด้านทุน</label>
          <select 
            value={formData.scholarship_category}
            onChange={(e) => handleInputChange('scholarship_category', e.target.value as any)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ผู้นำ">ผู้นำ</option>
            <option value="นวัตกรรม">นวัตกรรม</option>
            <option value="กีฬา">กีฬา</option>
            <option value="เรียนดี">เรียนดี</option>
            <option value="ศิลป์วัฒนธรรม">ศิลป์วัฒนธรรม</option>
          </select>
        </div>
      </div>

      {/* Category Image Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={formData.scholarship_category}
          variants={prefersReducedMotion ? reducedMotionVariants : imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex justify-center my-4 md:my-6"
        >
          <div className="relative group">
            <div className="w-72 md:w-[30em] h-auto md:h-[30em] rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 p-4">
              <motion.img
                src={CATEGORY_IMAGES[formData.scholarship_category]}
                alt={`ด้าน${formData.scholarship_category}`}
                className="w-full h-full object-contain rounded-lg"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple/50 to-transparent rounded-xl flex items-end justify-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-orange-500  font-extrabold text-xl md:text-2xl mb-2 md:mb-3"
              >
                ด้าน{formData.scholarship_category}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อเล่น (ภาษาไทย) *</label>
          <input
            type="text"
            value={formData.nickname_th}
            onChange={(e) => handleInputChange('nickname_th', e.target.value)}
            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nickname_th ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300'}`}
            placeholder="เช่น สมชาย"
          />
          {errors.nickname_th && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.nickname_th}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อเล่น (ภาษาอังกฤษ) *</label>
          <input
            type="text"
            value={formData.nickname_en}
            onChange={(e) => handleInputChange('nickname_en', e.target.value)}
            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nickname_en ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300'}`}
            placeholder="e.g. John"
          />
          {errors.nickname_en && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.nickname_en}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ชั้นปี</label>
          <input
            type="number"
            value={formData.academic_year || ''}
            onChange={(e) => handleInputChange('academic_year', parseInt(e.target.value) || undefined)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ภาควิชา *</label>
          <input
            type="text"
            value={formData.department_code || ''}
            onChange={(e) => handleInputChange('department_code', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.department_code ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="เช่น วิศวกรรมคอมพิวเตอร์ (ตัวย่อ)"
          />
          {errors.department_code && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.department_code}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">MBTI (ไม่บังคับ)</label>
          <input
            type="text"
            value={formData.mbti || '-'}
            onChange={(e) => handleInputChange('mbti', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="เช่น ENFP"
            maxLength={4}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default PersonalInfoSection