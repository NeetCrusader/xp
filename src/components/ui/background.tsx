"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <div className="fixed bottom-0 right-0 z-0 w-full flex justify-end">
        <div className="w-full max-w-[960px]">
          <Image
            src="/background/d7c6e17c60769b1e1908c37ad9fc8261270142befa471342bacfe07ef25cd7f6a49151961025296be864781dd8c7c91af83f367c8e4f3eeb2b9995486779b703.jpeg"
            alt="Background"
            width={960}
            height={480}
            className="w-full h-auto max-h-[50vh] sm:max-h-[480px] object-contain"
            priority
          />
        </div>
      </div>

      <audio ref={audioRef} loop preload="auto" aria-label="Background music">
        <source
          src="/background/12d4fdaf09689f63882f4134baef1a5690990f2a355b8184aa660400e2d7b5c3497263e48432e784ac799d40e58ff68fc63a31af27282221f260ec77b7426733.opus"
          type="audio/ogg"
        />
        Your browser does not support the audio element.
      </audio>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 bg-white z-20 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            }}
            onClick={handleClick}
          >
            <motion.div
              className="text-center text-black px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                I wanna just kms
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="relative z-10 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}