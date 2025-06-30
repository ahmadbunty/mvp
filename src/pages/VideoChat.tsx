import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Settings,
  MessageCircle,
  Heart
} from 'lucide-react';

const VideoChat: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const handleStartCall = useCallback(() => {
    setConnectionStatus('connecting');
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      setIsCallActive(true);
    }, 2000);
  }, []);

  const handleEndCall = useCallback(() => {
    setIsCallActive(false);
    setConnectionStatus('disconnected');
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoOn(prev => !prev);
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioOn(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        {!isCallActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Video Session with rooh.AI
            </h1>
            <p className="text-lg text-gray-300">
              Have a face-to-face conversation with your AI wellness companion
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-black rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              {isVideoOn ? (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <VideoOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Camera is off</p>
                  </div>
                </div>
              )}

              {/* AI Avatar Overlay */}
              {isCallActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 right-6 w-48 h-36 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <div className="text-center text-white">
                    <Heart className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                    <p className="text-sm font-medium">rooh.AI</p>
                    <p className="text-xs opacity-75">Active Session</p>
                  </div>
                </motion.div>
              )}

              {/* Connection Status */}
              {connectionStatus === 'connecting' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Connecting to rooh.AI...</p>
                  </div>
                </div>
              )}

              {/* Call Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-4 bg-white bg-opacity-10 backdrop-blur-md rounded-full px-6 py-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleVideo}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isVideoOn ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleAudio}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isAudioOn ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </motion.button>

                  {!isCallActive ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleStartCall}
                      disabled={connectionStatus === 'connecting'}
                      className="w-16 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEndCall}
                      className="w-16 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <PhoneOff className="w-5 h-5" />
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl h-full flex flex-col"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Session Chat</h3>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {isCallActive ? (
                    <>
                      <div className="bg-blue-50 rounded-2xl p-4">
                        <p className="text-sm text-blue-800">
                          <strong>rooh.AI:</strong> Hello! I can see you're here for our video session. How are you feeling today?
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-700">
                          This is where our conversation will appear as we chat during the video call.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start a video call to begin chatting</p>
                    </div>
                  )}
                </div>
              </div>

              {isCallActive && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Session Info */}
        {!isCallActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Personalized video conversations with rooh.AI</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Real-time emotional support and guidance</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Secure and private video sessions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Interactive wellness exercises and techniques</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;