import React from 'react';
import { motion } from "framer-motion"
import { sectionVariants } from '@/utils/animationVariants';
import { useRegistration } from '@/hooks/useRegistration';
import PersonalInfoSection from './PersonalInfoSection';
import CampInfoSection from './CampInfoSection';
import SelfIntroductionSection from './SelfIntroductionSection';
import HintsSection from './HintsSection';
import AnimatedBackground from '../ui/AnimatedBackground';
import AnimatedHeader from '../ui/AnimatedHeader';
import AnimatedSuccessModal from '../ui/AnimatedSuccessModal';
import ErrorModal from '../ui/ErrorModal';
import SubmitButton from './SubmitButton';


export default function RegistrationForm() {
  const {
    formData,
    isSubmitting,
    showSuccess,
    errors,
    prefersReducedMotion,
    handleInputChange,
    handleHintChange,
    handleSubmit,
    isFormValid
  } = useRegistration();

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  // ฟังก์ชัน submit ใหม่
  const handleFormSubmit = async () => {
    if (!isFormValid()) {
      setShowErrorModal(true);
      return;
    }
    await handleSubmit();
  };

  if (showSuccess) {
    return <AnimatedSuccessModal prefersReducedMotion={prefersReducedMotion} />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-gray-100 relative overflow-hidden"
    >
      <AnimatedBackground prefersReducedMotion={prefersReducedMotion} />

      <div className="py-4 md:py-8 px-2 md:px-4">
        <motion.div
          variants={sectionVariants}
          className="max-w-5xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden"
        >
          <AnimatedHeader prefersReducedMotion={prefersReducedMotion} />

          <div className="p-4 md:p-8 space-y-6 md:space-y-10">
            {/* Personal Information */}
            <PersonalInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Camp Information */}
            <CampInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Self Introduction */}
            <SelfIntroductionSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Hints Section */}
            <HintsSection
              formData={formData}
              handleHintChange={handleHintChange}
              errors={errors}
              prefersReducedMotion={prefersReducedMotion}
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              onSubmit={handleFormSubmit}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </motion.div>
      </div>
      {showErrorModal && (
        <ErrorModal errors={errors} onClose={() => setShowErrorModal(false)} prefersReducedMotion={prefersReducedMotion} />
      )}
    </motion.div>
  );
}