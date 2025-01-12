'use client';

import { ResumeUploadForm } from "@/components/resume-upload-form";
import { BackgroundParticles } from "@/components/background-particles";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <BackgroundParticles />
      </div>
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/70 to-indigo-100/70 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-10">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Resume Parser for Developers
            </motion.h1>
            <motion.p 
              className="text-center text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Optimize your tech career with AI-powered resume analysis
              <br />
              <span className="text-base text-blue-600 font-mono">{"{"} supports: PDF format | max_size: 5MB {"}"}</span>
            </motion.p>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm py-10 px-6 shadow-xl rounded-2xl sm:px-12 transition-all hover:shadow-2xl hover:bg-white/90 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.9) 100%)",
            }}
          >
            <ResumeUploadForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
