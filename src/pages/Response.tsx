import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { Heart, Lightbulb, BarChart3, MessageCircle, ArrowRight } from 'lucide-react';

const Response: React.FC = () => {
  const { currentEntry } = useMood();

  if (!currentEntry) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No journal entry found.</p>
          <Link
            to="/journal"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create a new entry
          </Link>
        </div>
      </div>
    );
  }

  const getMoodColor = (mood: string) => {
    const colors = {
      happy: 'from-yellow-400 to-orange-500',
      sad: 'from-blue-400 to-blue-600',
      anxious: 'from-red-400 to-red-600',
      angry: 'from-red-500 to-red-700',
      calm: 'from-green-400 to-green-600',
      neutral: 'from-gray-400 to-gray-600'
    };
    return colors[mood as keyof typeof colors] || colors.neutral;
  };

  const getMoodEmoji = (mood: string) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      anxious: '😰',
      angry: '😠',
      calm: '😌',
      neutral: '😐'
    };
    return emojis[mood as keyof typeof emojis] || '😐';
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Emotional Insights
          </h1>
          <p className="text-lg text-gray-600">
            Here's my analysis and personalized support for you
          </p>
        </motion.div>

        {/* Mood Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <div className={`w-20 h-20 bg-gradient-to-r ${getMoodColor(currentEntry.mood)} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{getMoodEmoji(currentEntry.mood)}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Primary Mood: {currentEntry.mood.charAt(0).toUpperCase() + currentEntry.mood.slice(1)}
            </h2>
            <p className="text-lg text-gray-600">
              Emotion: {currentEntry.emotion} • Intensity: {currentEntry.intensity}/5
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Journal Entry</h3>
            <p className="text-gray-700 leading-relaxed italic">
              "{currentEntry.text.substring(0, 200)}..."
            </p>
          </div>
        </motion.div>

        {/* AI Response Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">rooh.AI's Response</h3>
          </div>
          <p className="text-gray-800 leading-relaxed text-lg">
            {currentEntry.aiResponse}
          </p>
        </motion.div>

        {/* Suggestions Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Personalized Suggestions</h3>
          </div>
          <div className="space-y-4">
            {currentEntry.suggestions?.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{suggestion}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Link
            to="/dashboard"
            className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Dashboard
          </Link>
          
          <Link
            to="/chat"
            className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Continue Chat
          </Link>
          
          <Link
            to="/journal"
            className="flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            New Entry
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Response;