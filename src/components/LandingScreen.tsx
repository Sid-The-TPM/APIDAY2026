'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface LandingScreenProps {
  onEnter: () => void;
}

export function LandingScreen({ onEnter }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center max-w-2xl px-6"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-7xl font-black mb-4 neon-glow"
        >
          CITYPULSE X
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-3xl text-neon-blue mb-6 font-light"
        >
          The Autonomous API City
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg text-gray-300 mb-2"
        >
          Humans supervise. APIs decide.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 mb-8 max-w-lg mx-auto"
        >
          Watch a fully autonomous digital city powered entirely by APIs, events, and orchestration. No AI models. No probability. Just rules, policies, and self-healing systems.
        </motion.p>

        {/* Key Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            '🔗 API-Native',
            '🔄 Event-Driven',
            '🛡️ Resilient',
            '📊 Observable',
          ].map((feature) => (
            <div
              key={feature}
              className="p-3 bg-dark-secondary border border-gray-700 rounded text-sm font-semibold text-gray-300"
            >
              {feature}
            </div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-8 py-4 bg-neon-blue text-dark-bg font-bold rounded text-lg flex items-center gap-3 mx-auto hover:bg-opacity-80 transition"
        >
          ENTER COMMAND CENTER
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Secondary CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xs text-gray-500 mt-8"
        >
          Prepare for chaos. Watch the system survive.
        </motion.p>
      </motion.div>

      {/* Animated Corner Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-20 h-20 border-2 border-neon-blue rounded"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 left-10 w-20 h-20 border-2 border-neon-purple rounded"
      />
    </motion.div>
  );
}
