export interface RegistrationData {
  id: string;
  scholarship_type: 'เพชรพระจอมเกล้า' | 'แสดเหลืองเรืองรุ่ง';
  scholarship_category: 'ผู้นำ' | 'นวัตกรรม' | 'กีฬา' | 'เรียนดี' | 'ศิลป์วัฒนธรรม';
  nickname_th: string;
  nickname_en: string;
  academic_year?: number;
  department_code: string;
  mbti?: string;
  can_attend: boolean;
  food_allergies?: string;
  medical_conditions?: string;
  shirt_size: 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
  self_introduction: string;
  proud_achievement: string;
  instagram_handle?: string;
}

export interface HintsData {
  hints: string[];
}

export interface RegistrationRequest extends RegistrationData, HintsData {}
