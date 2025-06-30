import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useMood } from '../contexts/MoodContext';
import { TrendingUp, Calendar, Heart, BarChart3 } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';

const Dashboard: React.FC = () => {
  const { entries } = useMood();

  // Generate mock data for demonstration if no real entries exist
  const mockData = useMemo(() => {
    const today = new Date();
    const mockEntries = [];
    
    for (let i = 13; i >= 0; i--) {
      const date = subDays(today, i);
      const moods = ['happy', 'sad', 'anxious', 'calm', 'neutral'];
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const intensity = Math.floor(Math.random() * 5) + 1;
      
      mockEntries.push({
        date: format(date, 'MMM dd'),
        mood,
        intensity,
        fullDate: date
      });
    }
    
    return mockEntries;
  }, []);

  const displayData = entries.length > 0 ? entries.map(entry => ({
    date: format(entry.date, 'MMM dd'),
    mood: entry.mood,
    intensity: entry.intensity,
    fullDate: entry.date
  })) : mockData;

  const moodCounts = useMemo(() => {
    const counts = displayData.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([mood, count]) => ({
      mood: mood.charAt(0).toUpperCase() + mood.slice(1),
      count,
      color: getMoodColor(mood)
    }));
  }, [displayData]);

  const averageIntensity = useMemo(() => {
    if (displayData.length === 0) return 0;
    return displayData.reduce((sum, entry) => sum + entry.intensity, 0) / displayData.length;
  }, [displayData]);

  function getMoodColor(mood: string): string {
    const colors = {
      happy: '#F59E0B',
      sad: '#3B82F6',
      anxious: '#EF4444',
      angry: '#DC2626',
      calm: '#10B981',
      neutral: '#6B7280'
    };
    return colors[mood as keyof typeof colors] || colors.neutral;
  }

  const stats = [
    {
      title: 'Total Entries',
      value: displayData.length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Average Intensity',
      value: averageIntensity.toFixed(1),
      icon: BarChart3,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Streak Days',
      value: Math.floor(Math.random() * 15) + 1, // Mock streak
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Wellness Score',
      value: Math.floor(Math.random() * 40) + 60, // Mock score
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Wellness Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your emotional journey and discover patterns in your mood
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Mood Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Mood Intensity Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 5]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Mood Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Mood Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodCounts}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  nameKey="mood"
                  label={({ mood, percent }) => `${mood} ${(percent * 100).toFixed(0)}%`}
                >
                  {moodCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Weekly Mood Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Mood Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                domain={[0, 5]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="intensity" 
                fill="#14B8A6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Insights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Your mood intensity has been relatively stable this week.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                <p className="text-gray-700">You've maintained a consistent journaling habit - great job!</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Consider exploring what triggers your happiest moments.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Your self-awareness through journaling is improving your emotional intelligence.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;