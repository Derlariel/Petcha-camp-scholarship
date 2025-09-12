import type { RegistrationRequest } from '@/types/api';

export type ValidationErrors = Record<string, string>;

export const validateRegistrationForm = (formData: RegistrationRequest): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.nickname_th.trim()) {
    errors.nickname_th = 'กรุณากรอกชื่อเล่นภาษาไทย';
  }

  if (!formData.nickname_en.trim()) {
    errors.nickname_en = 'กรุณากรอกชื่อเล่นภาษาอังกฤษ';
  }

  if (!formData.department_code) {
    errors.department_code = 'กรุณาเลือกภาควิชา';
  }

  if (!formData.can_attend) {
    errors.can_attend = 'กรุณายืนยันการเข้าร่วมค่าย';
  }

  if (formData.self_introduction.length > 100) {
    errors.self_introduction = 'แนะนำตัวไม่เกิน 100 ตัวอักษร';
  }

  if (formData.proud_achievement.length > 500) {
    errors.proud_achievement = 'ผลงานที่ภาคภูมิใจไม่เกิน 500 ตัวอักษร';
  }

  const filledHints = formData.hints.filter(hint => hint.trim().length > 0);
  if (filledHints.length < 10) {
    errors.hints = 'กรุณากรอกคำใบ้ครบ 10 ข้อ';
  }

  return errors;
};

export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};
