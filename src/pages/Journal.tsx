import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { useAuth } from '../contexts/AuthContext';
import { Send, BookOpen, Sparkles } from 'lucide-react';

const Journal: React.FC = () => {
  const navigate = useNavigate();
  const { addEntry } = useMood();
  const { user } = useAuth();
  const [journalText, setJournalText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    setIsAnalyzing(true);

    try {
      // Simulate API call to analyze journal entry
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock AI analysis results
      const mockAnalysis = {
        mood: determineMockMood(journalText),
        emotion: determineMockEmotion(journalText),
        intensity: Math.floor(Math.random() * 5) + 1,
        aiResponse: generateMockResponse(journalText, user?.supportStyle || 'motivational'),
        suggestions: generateMockSuggestions(journalText)
      };

      addEntry({
        date: new Date(),
        text: journalText,
        ...mockAnalysis
      });

      navigate('/response');
    } catch (error) {
      console.error('Error analyzing journal entry:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const determineMockMood = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited')) {
      return 'happy';
    } else if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('depressed')) {
      return 'sad';
    } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous')) {
      return 'anxious';
    } else if (lowerText.includes('angry') || lowerText.includes('frustrated') || lowerText.includes('mad')) {
      return 'angry';
    } else if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed')) {
      return 'calm';
    }
    return 'neutral';
  };

  const determineMockEmotion = (text: string): string => {
    const emotions = ['hopeful', 'overwhelmed', 'grateful', 'confused', 'determined', 'lonely', 'content'];
    return emotions[Math.floor(Math.random() * emotions.length)];
  };

  const generateMockResponse = (text: string, supportStyle: string): string => {
    const responses = {
      motivational: [
        "I can see you're processing some deep feelings. Remember, every challenge is an opportunity for growth. You have the strength within you to navigate through this.",
        "Your willingness to reflect shows incredible self-awareness. That's a powerful tool for personal development. Keep moving forward, one step at a time.",
        "I hear your thoughts, and I want you to know that feeling this way is completely valid. You're on a journey of self-discovery, and that takes courage."
      ],
      empathetic: [
        "Thank you for sharing your feelings with me. I can sense the emotions you're experiencing, and I want you to know that you're not alone in this.",
        "Your emotions are valid, and it's okay to feel whatever you're feeling right now. Take your time to process these thoughts.",
        "I'm here to listen and support you. Your feelings matter, and so do you."
      ],
      analytical: [
        "Based on what you've shared, it seems like you're experiencing a complex mix of emotions. Let's break this down and identify patterns.",
        "Your reflection shows clear emotional awareness. Consider what triggers led to these feelings and what coping strategies might be most effective.",
        "I notice several themes in your writing. Let's explore these systematically to better understand your emotional landscape."
      ],
      practical: [
        "Here are some concrete steps you can take right now to address what you're feeling. Start with small, manageable actions.",
        "Let's focus on actionable solutions. Based on your situation, here are some practical approaches you might consider.",
        "Your situation calls for a structured approach. Let's identify specific actions you can take today to move forward."
      ]
    };

    const styleResponses = responses[supportStyle as keyof typeof responses] || responses.motivational;
    return styleResponses[Math.floor(Math.random() * styleResponses.length)];
  };

  const generateMockSuggestions = (text: string): string[] => {
    const allSuggestions = [
      "Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8",
      "Take a 10-minute walk in nature to clear your mind",
      "Practice progressive muscle relaxation before bed",
      "Write down three things you're grateful for today",
      "Listen to calming music or nature sounds",
      "Try journaling for 5 minutes each morning",
      "Practice mindful meditation for 10 minutes",
      "Connect with a friend or family member",
      "Engage in a creative activity you enjoy",
      "Do some gentle stretching or yoga"
    ];

    // Return 3 random suggestions
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Express Yourself
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts, feelings, and experiences. I'm here to listen and provide personalized support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8">
            <div className="mb-6">
              <label htmlFor="journal" className="block text-lg font-semibold text-gray-900 mb-4">
                How are you feeling today?
              </label>
              <textarea
                id="journal"
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Write about your thoughts, emotions, experiences, or anything that's on your mind..."
                rows={12}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 leading-relaxed"
                disabled={isAnalyzing}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                {journalText.length > 0 && (
                  <span>{journalText.length} characters • Estimated reading time: {Math.ceil(journalText.length / 200)} min</span>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={!journalText.trim() || isAnalyzing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Submit for Analysis
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Journaling Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Be honest and authentic with your feelings</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Don't worry about grammar or structure</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Focus on what you're experiencing right now</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Include both positive and challenging emotions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Journal;