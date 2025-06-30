import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    supportStyle: user?.supportStyle || '',
    language: user?.language || 'english',
    traits: user?.traits || []
  });

  const supportStyles = [
    { value: 'motivational', label: 'Motivational', description: 'Encouraging and uplifting approach' },
    { value: 'analytical', label: 'Analytical', description: 'Logical and structured guidance' },
    { value: 'empathetic', label: 'Empathetic', description: 'Compassionate and understanding' },
    { value: 'practical', label: 'Practical', description: 'Action-oriented solutions' }
  ];

  const commonTraits = [
    'Gets anxious before deadlines',
    'Prefers quiet environments',
    'Likes inspirational quotes',
    'Responds well to structure',
    'Enjoys creative activities',
    'Values deep conversations',
    'Prefers morning reflections',
    'Benefits from breathing exercises'
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      updateProfile(formData);
      navigate('/journal');
    }
  };

  const handleTraitToggle = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait]
    }));
  };

  return (
    <div className="min-h-screen pb-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Step {step} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to rooh.AI
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Let's personalize your wellness journey. What would you like us to call you?
              </p>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose Your Support Style
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  How would you prefer rooh.AI to communicate with you?
                </p>
              </div>
              
              <div className="space-y-4">
                {supportStyles.map((style) => (
                  <motion.div
                    key={style.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                      formData.supportStyle === style.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, supportStyle: style.value }))}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{style.label}</h3>
                    <p className="text-gray-600 text-sm">{style.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Tell Us About Yourself
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Select traits that resonate with you to get more personalized support
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonTraits.map((trait) => (
                  <motion.div
                    key={trait}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 text-sm ${
                      formData.traits.includes(trait)
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleTraitToggle(trait)}
                  >
                    {trait}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.name) ||
                (step === 2 && !formData.supportStyle)
              }
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {step === 3 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;