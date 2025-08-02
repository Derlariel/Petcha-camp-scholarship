import { useState, useEffect } from 'react';
import type { RegistrationRequest } from '@/types/api';
import { validateRegistrationForm, isFormValid, type ValidationErrors } from '@/utils/validateRegistrationForm';
import { submitRegistration } from '@/services/apiToBE';

export const useRegistration = () => {
  const [formData, setFormData] = useState<RegistrationRequest>({
    scholarship_type: 'เพชรพระจอมเกล้า',
    scholarship_category: 'ผู้นำ',
    nickname_th: '',
    nickname_en: '',
    academic_year: 2568,
    department_code: '',
    mbti: '',
    can_attend: false,
    food_allergies: '',
    medical_conditions: '',
    shirt_size: 'M',
    self_introduction: '',
    proud_achievement: '',
    instagram_handle: '',
    hints: Array(10).fill('')
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ตรวจสอบ reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // จัดการการเปลี่ยนแปลง input fields
  const handleInputChange = (field: keyof RegistrationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // ลบ error เมื่อผู้ใช้เริ่มพิมพ์
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // จัดการการเปลี่ยนแปลง hints
  const handleHintChange = (index: number, value: string) => {
    const newHints = [...formData.hints];
    newHints[index] = value;
    setFormData(prev => ({ ...prev, hints: newHints }));
  };

  // ตรวจสอบความถูกต้องของ form
  const validateForm = (): boolean => {
    const newErrors = validateRegistrationForm(formData);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  // จัดการการส่ง form
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await submitRegistration(formData);
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

  // Reset form
  const resetForm = () => {
    setFormData({
      scholarship_type: 'เพชรพระจอมเกล้า',
      scholarship_category: 'ผู้นำ',
      nickname_th: '',
      nickname_en: '',
      academic_year: 2568,
      department_code: '',
      mbti: '',
      can_attend: false,
      food_allergies: '',
      medical_conditions: '',
      shirt_size: 'M',
      self_introduction: '',
      proud_achievement: '',
      instagram_handle: '',
      hints: Array(10).fill('')
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  return {
    // State
    formData,
    isSubmitting,
    showSuccess,
    errors,
    prefersReducedMotion,
    
    // Actions
    handleInputChange,
    handleHintChange,
    handleSubmit,
    resetForm,
    
    // Computed
    isFormValid: () => isFormValid(errors)
  };
};
