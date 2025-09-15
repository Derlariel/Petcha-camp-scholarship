import { useState, useEffect } from 'react';
import type { RegistrationRequest } from '@/types/api';
import { validateRegistrationForm, isFormValid, type ValidationErrors } from '@/utils/validateRegistrationForm';
import { submitRegistration } from '@/services/apiToBE';

export const useRegistration = () => {
  const [formData, setFormData] = useState<RegistrationRequest>({
   id:'',
      student_id: '',
      fullname_th: '',
      fullname_en: '',
      nickname_th: '',
      nickname_en: '',
      scholarship_type: 'เพชรพระจอมเกล้า',
      scholarship_category: 'ผู้นำ',
      academic_year: 1,
      department_code: '',
      mbti: '',
      can_attend: false,
      food_allergies: '',
      medical_conditions: '',
      shirt_size: 'M',
      self_introduction: '',
      proud_achievement: '',
      instagram_handle: '',
      hints: Array(10).fill(''),
      participation_benefits: 'activity'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleInputChange = (field: keyof RegistrationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...formData.hints];
    newHints[index] = value;
    setFormData(prev => ({ ...prev, hints: newHints }));
  };

  const validateForm = (): boolean => {
    const newErrors = validateRegistrationForm(formData);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const cleanedHints = formData.hints.map(h => h.trim());
      const response = await submitRegistration({
      ...formData,
      hints: cleanedHints
    });

      if (response.success) {
        setShowSuccess(true);
      } else {
        alert(response.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id:'',
      student_id: '',
      fullname_th: '',
      fullname_en: '',
      nickname_th: '',
      nickname_en: '',
      scholarship_type: 'เพชรพระจอมเกล้า',
      scholarship_category: 'ผู้นำ',
      academic_year: 1,
      department_code: '',
      mbti: '',
      can_attend: true,
      food_allergies: '',
      medical_conditions: '',
      shirt_size: 'M',
      self_introduction: '',
      proud_achievement: '',
      instagram_handle: '',
      hints: Array(10).fill(''),
      participation_benefits: 'activity'
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    showSuccess,
    errors,
    prefersReducedMotion,
    
    handleInputChange,
    handleHintChange,
    handleSubmit,
    resetForm,
    
    isFormValid: () => isFormValid(errors)
  };
};
